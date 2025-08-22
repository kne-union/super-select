import React, { forwardRef, useRef, useState } from 'react';
import { Flex, Checkbox, Tree } from 'antd';
import memoize from 'lodash/memoize';
import { CheckOutlined } from '@ant-design/icons';
import SelectInput from '../SelectInput';
import SelectedAll, { computedIsSelectAll } from '../SelectedAll';
import SelectedTagList from '../SelectedTagList';
import SimpleBar from 'simplebar-react';
import Fetch from '@kne/react-fetch';
import 'simplebar-react/dist/simplebar.min.css';
import classnames from 'classnames';
import style from './style.module.scss';

const parseTreeData = memoize((data = []) => {
  const parseTree = output => {
    return output.map(node => {
      const children = data.filter(item => {
        return item.parentId === node.id;
      });
      return Object.assign({}, node, { children: parseTree(children) });
    });
  };

  return {
    treeData: parseTree(data.filter(item => !item.parentId)),
    ids: data.map(item => item.id)
  };
});

const SelectTree = forwardRef(({ children, ...p }, ref) => {
  const fetchListRef = useRef(null);
  const [expandedKeys, setExpandedKeys] = useState([]);
  const props = Object.assign(
    {},
    {
      renderItemContent: ({ item, props }) => {
        const { labelKey } = props;
        return (
          <>
            <div className={'select-tree-item-label'}>{item[labelKey]}</div>
          </>
        );
      },
      renderItem: contextProps => {
        const { item, props, isSelectedAll, value, onSelect, setValue, onOpenChange } = contextProps;
        const { single, isPopup, renderItemContent, valueKey } = props;
        const isChecked = value.some(target => target[valueKey] === item[valueKey]);
        return (
          <Flex
            className={classnames(style['default-list-item'], 'select-tree-item', {
              [style['is-selected']]: isChecked,
              [style['is-disabled']]: item.disabled
            })}
            key={item[valueKey]}
            onClick={() => {
              if (item.disabled) {
                return;
              }
              if (isSelectedAll) {
                return;
              }
              if (single) {
                setValue([item]);
              } else {
                onSelect(item);
              }
              if (isPopup && single) {
                onOpenChange(false);
              }
            }}
          >
            {!single && (
              <Flex>
                <Checkbox checked={isSelectedAll || isChecked} disabled={isSelectedAll || item.disabled} />
              </Flex>
            )}
            <Flex vertical gag={8} flex={1} className={'select-tree-item-content'}>
              {renderItemContent(contextProps)}
            </Flex>
            {single && <div className={style['single-checked']}>{isChecked && <CheckOutlined />}</div>}
          </Flex>
        );
      },
      renderTree: contextProps => {
        const { props, isSelectedAll, data } = contextProps;
        const { renderItem, valueKey, labelKey, childrenKey } = props;
        const { treeData, ids } = parseTreeData(data);
        return (
          <Tree
            className={classnames(style['default-list'], {
              [style['is-selected-all']]: isSelectedAll
            })}
            showIcon
            selectable={false}
            expandedKeys={expandedKeys}
            fieldNames={{ title: labelKey, key: valueKey, children: childrenKey || 'children' }}
            treeData={treeData}
            onExpand={expandedKeys => {
              setExpandedKeys(expandedKeys);
            }}
            titleRender={node => {
              return renderItem(Object.assign({}, contextProps, { item: node }));
            }}
          />
        );
      }
    },
    p
  );
  return (
    <SelectInput {...props} ref={ref}>
      {targetProps => {
        const { props, value, onOpenChange } = targetProps;
        const { footer, isPopup, valueKey, single, allowSelectedAll, showSelectedTag, api, options, renderTree, selectedAllValue } = props;
        const components = {
          selectedAll: (
            <div
              className={classnames(style['selected-all'], 'select-tree-selected-all', {
                'is-popup': isPopup
              })}
            >
              {!single && allowSelectedAll && <SelectedAll />}
            </div>
          ),
          treeList: (
            <Fetch
              {...Object.assign(
                {},
                props,
                options
                  ? {
                      data: { options },
                      loader: ({ data }) => data.options
                    }
                  : api
              )}
              ref={fetchListRef}
              render={({ data, ...fetchProps }) => {
                const isSelectedAll = computedIsSelectAll(value, selectedAllValue, valueKey);
                return (
                  <SimpleBar
                    className={classnames(style['list'], 'select-tree-scroll-list', {
                      'is-popup': isPopup
                    })}
                  >
                    {renderTree(Object.assign({}, fetchProps, targetProps, { isSelectedAll, data }))}
                  </SimpleBar>
                );
              }}
            />
          ),
          selectedTag: showSelectedTag && (
            <div
              className={classnames(style['selected-tag'], 'select-tree-selected-tag', {
                'is-popup': isPopup
              })}
            >
              <SelectedTagList />
            </div>
          )
        };
        if (typeof children === 'function') {
          return children(Object.assign({}, targetProps, { components }));
        }
        return (
          <Flex vertical>
            {components.search}
            {components.selectedAll}
            {components.treeList}
            {footer && (
              <div className={classnames(style['footer'], 'select-tree-footer')}>
                {typeof footer === 'function'
                  ? footer({
                      reload: () => {
                        fetchListRef.current && fetchListRef.current.reload();
                      },
                      close: () => {
                        onOpenChange(false);
                      }
                    })
                  : footer}
              </div>
            )}
            {components.selectedTag}
          </Flex>
        );
      }}
    </SelectInput>
  );
});

export default SelectTree;
