import React, { useEffect, useMemo, useRef, useState, useCallback } from 'react';
import SelectInput from '../SelectInput';
import SearchInput from '@kne/search-input';
import { Checkbox, Space, Spin, List, Empty, Badge } from 'antd';
import { RightOutlined } from '@ant-design/icons';
import createTreeUtils from './createTreeUtils';
import get from 'lodash/get';
import last from 'lodash/last';
import isNil from 'lodash/isNil';
import isEqual from 'lodash/isEqual';
import classnames from 'classnames';
import SimpleBar from 'simplebar-react';
import 'simplebar-react/dist/simplebar.min.css';
import style from './style.module.scss';
import { App } from 'antd';
import CustomMenu from './CustomMenu';
import { isNotEmpty } from '@kne/is-empty';

const numberToPx = val => {
  return typeof val === 'number' ? `${val}px` : val;
};

// 默认数据格式化函数
const defaultDataFormat = data => {
  const core = (data, parentId) => {
    const output = [];
    output.push(
      ...(data || []).map(item => {
        const node = {
          ...item,
          value: item.id,
          label: item.label || item.name,
          parentId
        };
        if (item.children && item.children.length > 0) {
          node.children = core(item.children, item.id).map(child => ({
            ...child,
            parentId: item.id
          }));
          output.push(...node.children);
        }
        return node;
      })
    );
    return output;
  };
  return {
    list: core(data, null)
  };
};

// 级联选择内容组件
const CascaderInner = ({ options, value, setValue, maxLength, single, onlyAllowLastLevel, openLoadData, onLoadMore, parentIdKey, menuItemWidth, isPopup, searchPlaceholder, onSearch, valueKey, labelKey, onOpenChange, open }) => {
  const { message } = App.useApp();
  const [searchText, setSearchText] = useState('');
  const [loading, setLoading] = useState(false);

  // 构建 mapping
  const mapping = useMemo(() => {
    const map = new Map();
    const processData = (items, parentId = null) => {
      items.forEach(item => {
        const node = {
          ...item,
          id: item[valueKey],
          label: item[labelKey],
          parentId
        };
        if (item.children && item.children.length > 0) {
          node.children = item.children.map(child => ({
            ...child,
            id: child[valueKey],
            label: child[labelKey],
            parentId: node.id
          }));
          processData(item.children, node.id);
        }
        map.set(node.id, node);
      });
    };
    processData(options);
    return map;
  }, [options, valueKey, labelKey]);

  // 创建树工具
  const treeUtils = useMemo(() => {
    return createTreeUtils(mapping);
  }, [mapping]);

  // 当前选中的列
  const [selectedIds, setSelectedIds] = useState(() => {
    const initValue = value.find(item => {
      const id = typeof item === 'object' ? item[valueKey] : item;
      return !!mapping.get(id);
    });

    if (initValue) {
      const id = typeof initValue === 'object' ? initValue[valueKey] : initValue;
      return treeUtils.getSelectedQueue(id);
    }

    // 默认选中第一列
    const firstNode = Array.from(mapping.values()).find(item => isNil(item.parentId));
    if (firstNode) {
      return treeUtils.getSelectedQueue(firstNode.id);
    }
    return [];
  });

  // 当 Modal 打开时,根据 value 重新初始化 selectedIds
  const prevOpenRef = useRef(open);
  useEffect(() => {
    // 只在非 popup 模式下且 Modal 从关闭变为打开时处理
    if (!isPopup && open && !prevOpenRef.current) {
      const initValue = value.find(item => {
        const id = typeof item === 'object' ? item[valueKey] : item;
        return !!mapping.get(id);
      });

      if (initValue) {
        const id = typeof initValue === 'object' ? initValue[valueKey] : initValue;
        setSelectedIds(treeUtils.getSelectedQueue(id));
      } else {
        // 默认选中第一列
        const firstNode = Array.from(mapping.values()).find(item => isNil(item.parentId));
        if (firstNode) {
          setSelectedIds(treeUtils.getSelectedQueue(firstNode.id));
        }
      }
    }
    prevOpenRef.current = open;
  }, [open, value, mapping, treeUtils, valueKey, isPopup]);

  // 懒加载支持
  const loadMorePropsRef = useRef({});
  loadMorePropsRef.current = {
    openLoadData,
    onLoadMore,
    parentIdKey,
    treeUtils
  };

  useEffect(() => {
    if (!openLoadData || !onLoadMore) {
      return;
    }

    const lastNode = mapping.get(last(selectedIds));
    if (!lastNode) {
      return;
    }

    // 检查是否需要加载子节点
    if (lastNode.hasOwnProperty('children') && lastNode.children !== undefined) {
      return;
    }

    setLoading(true);
    onLoadMore({ [parentIdKey]: lastNode.id })
      .then(() => {
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, [selectedIds, mapping, openLoadData, onLoadMore, parentIdKey]);

  // 检查是否为非叶子节点
  const isNotLastNode = useCallback(
    id => {
      const node = mapping.get(id);
      if (!node) return false;
      if (openLoadData && !node.hasOwnProperty('children')) {
        return true;
      }
      return node.children && node.children.length > 0;
    },
    [mapping, openLoadData]
  );

  // 选择处理
  const onCheckedChange = useCallback(
    (checked, id) => {
      const newValue = (() => {
        if (onlyAllowLastLevel && checked) {
          const currentIds = value.map(item => (typeof item === 'object' ? item[valueKey] : item));
          if (currentIds.includes(id)) return currentIds;
          return [...currentIds, id];
        }
        if (onlyAllowLastLevel) {
          const currentIds = value.map(item => (typeof item === 'object' ? item[valueKey] : item));
          return currentIds.filter(itemId => itemId !== id);
        }
        const currentIds = value.map(item => (typeof item === 'object' ? item[valueKey] : item));
        return checked ? treeUtils.setNodeChecked(id, currentIds) : treeUtils.setNodeUnchecked(id, currentIds);
      })();

      if (newValue.length > maxLength) {
        message.error(`最多只能选择 ${maxLength} 项`);
        return;
      }

      // 转换回完整对象
      const newValues = newValue
        .map(id => {
          const node = mapping.get(id);
          // 返回完整的节点数据，保留所有原始字段
          return node ? { ...node, [valueKey]: node.id, [labelKey]: node.label } : null;
        })
        .filter(Boolean);

      const finalValue = single && newValues.length > 0 ? [last(newValues)] : newValues;
      setValue(finalValue);

      // 单选且是叶子节点且在 popup 模式下，自动关闭下拉框
      if (single && newValues.length > 0 && !isNotLastNode(id) && isPopup && onOpenChange) {
        onOpenChange(false);
      }
    },
    [value, maxLength, single, onlyAllowLastLevel, treeUtils, mapping, message, valueKey, labelKey, isPopup, onOpenChange, isNotLastNode]
  );

  // 搜索结果
  const searchResults = useMemo(() => {
    if (!searchText || !onSearch) return null;
    const keyword = searchText.toLowerCase();
    return Array.from(mapping.values()).filter(item => {
      return item.label && item.label.toLowerCase().includes(keyword);
    });
  }, [searchText, mapping, onSearch]);

  // 搜索选择
  const onSearchSelect = item => {
    const currentIds = value.map(v => (typeof v === 'object' ? v[valueKey] : v));
    const checked = currentIds.includes(item.id);
    onCheckedChange(!checked, item.id);
    if (!checked) {
      setSelectedIds(treeUtils.getSelectedQueue(item.id));
    }
    setSearchText('');
  };

  // 渲染搜索内容
  if (searchText && searchResults) {
    const currentIds = value.map(v => (typeof v === 'object' ? v[valueKey] : v));
    return (
      <div className={classnames(style['content'], { [style['is-popup']]: isPopup })}>
        <SearchInput className={classnames(style['search-input'], { 'is-popup': isPopup })} placeholder={searchPlaceholder} value={searchText} onSearch={setSearchText} simple={isPopup} showSearchButton={!isPopup} />
        <SimpleBar className={style['scroll-plus-box']}>
          {searchResults.length === 0 ? (
            <Empty description="暂无数据" />
          ) : (
            <List
              className={style['list']}
              size="small"
              dataSource={searchResults}
              rowKey="id"
              renderItem={item => {
                const checked = currentIds.includes(item.id);
                return (
                  <List.Item className={classnames({ [style['is-selected']]: checked })} onClick={() => onSearchSelect(item)}>
                    <span>{item.label}</span>
                    {checked && <span style={{ marginLeft: 8, color: '#1677ff' }}>✓</span>}
                  </List.Item>
                );
              }}
            />
          )}
        </SimpleBar>
      </div>
    );
  }

  // 渲染级联列
  const currentIds = value.map(v => (typeof v === 'object' ? v[valueKey] : v));

  return (
    <div
      className={classnames(style['content'], {
        [style['is-popup']]: isPopup,
        [style['has-search']]: !!onSearch
      })}
      style={{
        '--menu-item-width': numberToPx(menuItemWidth)
      }}
    >
      {onSearch && <SearchInput className={classnames(style['search-input'], { 'is-popup': isPopup })} placeholder={searchPlaceholder} value={searchText} onSearch={setSearchText} simple={isPopup} showSearchButton={!isPopup} />}
      <SimpleBar className={style['scroller']} options={{ autoHide: false }}>
        <div className={style['columns']}>
          {selectedIds.map((selectedId, index) => {
            const selectNode = mapping.get(selectedId);
            const siblingNodes = treeUtils.getSiblingNode(selectedId);
            const isLastLevel = !isNotLastNode(selectNode?.id) && index > 0;

            return (
              <SimpleBar
                key={selectedId || index}
                className={classnames(style['content-item'], {
                  [style['last-level-area']]: isLastLevel
                })}
              >
                {isLastLevel ? (
                  <Space wrap style={{ padding: 12 }} className={classnames({ [style['single-mode']]: single })}>
                    {siblingNodes.map(node => {
                      const { checked, indeterminate } = treeUtils.computedCheckboxStatus(node.id, currentIds);
                      return (
                        <Checkbox key={node.id} checked={checked} indeterminate={indeterminate} onChange={e => onCheckedChange(e.target.checked, node.id)}>
                          {node.label}
                        </Checkbox>
                      );
                    })}
                  </Space>
                ) : (
                  <CustomMenu
                    className={style['menu']}
                    selectedKeys={index === selectedIds.length - 1 ? [] : selectedIds}
                    onSelect={({ key }) => {
                      const node = mapping.get(key);
                      if (!node) return;

                      if (isNotLastNode(node.id)) {
                        setSelectedIds(treeUtils.getSelectedQueue(node.id));
                      } else {
                        const { checked } = treeUtils.computedCheckboxStatus(node.id, currentIds);
                        onCheckedChange(!checked, node.id);
                      }
                    }}
                    items={siblingNodes.map(node => {
                      const { checked, indeterminate } = treeUtils.computedCheckboxStatus(node.id, currentIds);
                      const hasChildren = isNotLastNode(node.id);

                      // 计算子级选中数量
                      const childrenSelectedCount = hasChildren ? treeUtils.getAllChildren(node.id).filter(child => currentIds.includes(child.id)).length : 0;

                      return {
                        key: node.id,
                        label: (
                          <Space
                            className={classnames(style['menu-item'], {
                              [style['checkbox-hidden']]: onlyAllowLastLevel && hasChildren,
                              [style['single-mode']]: single
                            })}
                          >
                            {(!onlyAllowLastLevel || !hasChildren) && (
                              <Checkbox
                                checked={checked}
                                indeterminate={indeterminate}
                                onClick={e => e.stopPropagation()}
                                onChange={e => {
                                  e.stopPropagation();
                                  onCheckedChange(e.target.checked, node.id);
                                }}
                              />
                            )}
                            <div className={style['menu-label']}>
                              <span className={style['menu-label-text']}>{node.label}</span>
                              {hasChildren && childrenSelectedCount > 0 && <Badge count={childrenSelectedCount} size="small" />}
                            </div>
                            {hasChildren ? <RightOutlined className={style['menu-item-icon']} /> : <span className={style['menu-item-placeholder']} />}
                          </Space>
                        )
                      };
                    })}
                  />
                )}
              </SimpleBar>
            );
          })}
          {loading && (
            <div className={style['loading']}>
              <Spin size="small" />
            </div>
          )}
        </div>
      </SimpleBar>
    </div>
  );
};

// 主组件
const SelectCascader = ({
  options = [],
  value,
  onChange,
  defaultValue,
  maxLength = Number.MAX_VALUE,
  single = false,
  onlyAllowLastLevel = false,
  openLoadData = false,
  onLoadMore,
  parentIdKey = 'id',
  menuItemWidth = 180,
  isPopup = true,
  searchPlaceholder,
  onSearch,
  valueKey = 'id',
  labelKey = 'label',
  placeholder = '请选择',
  disabled = false,
  size = 'default',
  overlayWidth,
  ...props
}) => {
  // 内部始终使用数组格式处理
  // SelectInput 会处理 single 模式的 value 和 onChange 转换
  const [innerValue, setInnerValue] = useState(Array.isArray(defaultValue) ? defaultValue : defaultValue ? [defaultValue] : []);

  // currentValue 用于内部处理，始终是数组
  const currentValue = useMemo(() => {
    if (value !== undefined) {
      // 外部传入的 value 可能是对象（single）或数组（多选）
      return Array.isArray(value) ? value : value ? [value] : [];
    }
    return innerValue;
  }, [value, innerValue]);

  const setValue = useCallback(
    newValue => {
      // SelectInput 在 single 模式下会传单个对象或 null/undefined，需要转换为数组
      const normalizedValue = (() => {
        if (single) {
          // 单选模式：可能是单个对象、null、undefined 或数组
          if (Array.isArray(newValue)) {
            return newValue;
          }
          return isNotEmpty(newValue) ? [newValue] : [];
        }
        // 多选模式：确保是数组
        return Array.isArray(newValue) ? newValue : [];
      })();

      if (value === undefined) {
        setInnerValue(normalizedValue);
      }

      // 根据单选/多选模式转换输出格式
      if (single) {
        // 单选：返回单个对象或 null
        onChange?.(normalizedValue.length > 0 ? normalizedValue[0] : null);
      } else {
        // 多选：返回数组
        onChange?.(normalizedValue);
      }
    },
    [value, onChange, single]
  );

  // 传递给 SelectInput 的值：根据 single 参数决定格式
  const selectInputValue = useMemo(() => {
    if (single) {
      // single 模式：传单个对象或 undefined
      return currentValue.length > 0 ? currentValue[0] : undefined;
    }
    // 多选模式：传数组
    return currentValue;
  }, [currentValue, single]);

  // 计算 label 显示
  const displayValue = useMemo(() => {
    // currentValue 已经是数组格式了
    return currentValue
      .map(item => {
        // 如果已经是对象，确保有标准化的字段
        if (typeof item === 'object') {
          // 优先使用 item[labelKey]，然后是 item.label，最后是 item.name
          const label = item[labelKey] || item.label || item.name || String(item[valueKey] || '');
          return {
            ...item,
            [valueKey]: item[valueKey] || item.id,
            [labelKey]: label
          };
        }
        // 如果是值，从 options 中查找
        const findLabel = items => {
          for (const node of items) {
            if (node[valueKey] === item) {
              return { [valueKey]: item, [labelKey]: node[labelKey] || node.name || String(item) };
            }
            if (node.children) {
              const found = findLabel(node.children);
              if (found) return found;
            }
          }
          return null;
        };
        return findLabel(options) || { [valueKey]: item, [labelKey]: String(item) };
      })
      .filter(Boolean);
  }, [currentValue, options, valueKey, labelKey]);

  return (
    <SelectInput
      {...props}
      value={selectInputValue}
      onChange={setValue}
      single={single}
      maxLength={maxLength}
      isPopup={isPopup}
      placeholder={placeholder}
      disabled={disabled}
      size={size}
      valueKey={valueKey}
      labelKey={labelKey}
      overlayWidth={overlayWidth || menuItemWidth * 2}
    >
      {contextProps => {
        // 使用 contextProps 中的 value 和 setValue,支持 Modal 模式下的内部状态管理
        const contextValue = contextProps.value;
        const contextSetValue = contextProps.setValue;

        // 计算当前显示的 value
        const currentDisplayValue = contextValue
          .map(item => {
            // 如果已经是对象,确保有标准化的字段
            if (typeof item === 'object') {
              const label = item[labelKey] || item.label || item.name || String(item[valueKey] || '');
              return {
                ...item,
                [valueKey]: item[valueKey] || item.id,
                [labelKey]: label
              };
            }
            // 如果是值,从 options 中查找
            const findLabel = items => {
              for (const node of items) {
                if (node[valueKey] === item) {
                  return { [valueKey]: item, [labelKey]: node[labelKey] || node.name || String(item) };
                }
                if (node.children) {
                  const found = findLabel(node.children);
                  if (found) return found;
                }
              }
              return null;
            };
            return findLabel(options) || { [valueKey]: item, [labelKey]: String(item) };
          })
          .filter(Boolean);

        return (
          <CascaderInner
            options={options}
            value={currentDisplayValue}
            setValue={contextSetValue}
            maxLength={maxLength}
            single={single}
            onlyAllowLastLevel={onlyAllowLastLevel}
            openLoadData={openLoadData}
            onLoadMore={onLoadMore}
            parentIdKey={parentIdKey}
            menuItemWidth={menuItemWidth}
            isPopup={isPopup}
            searchPlaceholder={searchPlaceholder}
            onSearch={onSearch}
            valueKey={valueKey}
            labelKey={labelKey}
            onOpenChange={contextProps.onOpenChange}
            open={contextProps.open}
          />
        );
      }}
    </SelectInput>
  );
};

export { createTreeUtils };
export default SelectCascader;
