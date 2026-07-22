import React, { useState, useRef, forwardRef } from 'react';
import SelectInput from '../SelectInput';
import { Flex, Row, Col, Button, Tag, Popover, Empty } from 'antd';
import { FetchScrollLoader } from '@kne/scroll-loader';
import SearchInput from '@kne/search-input';
import { computedIsSelectAll } from '../SelectedAll';
import classnames from 'classnames';
import SimpleBar from 'simplebar-react';
import { createWithIntlProvider, useIntl } from '@kne/react-intl';
import style from './style.module.scss';
import 'simplebar-react/dist/simplebar.min.css';
import TableView, { flattenAllTree, isTreeDataType, normalizeTreeData } from '@kne/table-view';
import '@kne/table-view/dist/index.css';
import { CentralContent } from '@kne/info-page';
import '@kne/info-page/dist/index.css';

import zhCn from '../locale/zh-CN';

const isEmptyParentKey = value => value == null || value === '';

const flattenSelectList = (list, { dataType, rowKey, parentKey, childrenKey }) => {
  if (!list || !isTreeDataType(dataType)) {
    return list || [];
  }
  const tree = normalizeTreeData(list, { dataType, rowKey, parentKey, childrenKey });
  return flattenAllTree(tree, { rowKey, childrenKey }).map(row => row.item);
};

const filterTreeOptions = (options, searchProps, getSearchCallback, targetProps, { dataType, valueKey, parentKey, childrenKey }) => {
  if (typeof getSearchCallback !== 'function') {
    return options;
  }

  if (dataType === 'tree') {
    const filterNodes = nodes =>
      (nodes || []).reduce((acc, item) => {
        const rawChildren = Array.isArray(item[childrenKey]) ? item[childrenKey] : [];
        const filteredChildren = filterNodes(rawChildren);
        const selfMatch = getSearchCallback(searchProps, item, targetProps);
        if (selfMatch) {
          acc.push(item);
        } else if (filteredChildren.length > 0) {
          acc.push(Object.assign({}, item, { [childrenKey]: filteredChildren }));
        }
        return acc;
      }, []);
    return filterNodes(options);
  }

  if (dataType === 'treeList') {
    const matched = options.filter(item => getSearchCallback(searchProps, item, targetProps));
    if (matched.length === 0) {
      return [];
    }
    const idSet = new Set(matched.map(item => item[valueKey]));
    const map = new Map(options.map(item => [item[valueKey], item]));
    matched.forEach(item => {
      let parentId = item[parentKey];
      while (!isEmptyParentKey(parentId) && !idSet.has(parentId)) {
        idSet.add(parentId);
        const parent = map.get(parentId);
        if (!parent) {
          break;
        }
        parentId = parent[parentKey];
      }
    });
    return options.filter(item => idSet.has(item[valueKey]));
  }

  return options.filter(item => getSearchCallback(searchProps, item, targetProps));
};

const SelectTableList = createWithIntlProvider(
  'zh-CN',
  zhCn,
  'super-select'
)(
  forwardRef((p, ref) => {
    const { formatMessage } = useIntl();
    const [tagSearchText, setTagSearchText] = useState('');
    const fetchListRef = useRef();
    const props = Object.assign(
      {},
      {
        overlayWidth: '600px',
        dataType: 'list',
        parentKey: 'parentId',
        childrenKey: 'children',
        hasChildrenKey: 'hasChildren',
        filterRender: contextProps => {
          const { props, searchProps, setSearchProps } = contextProps;
          const { isPopup, searchPlaceholder, api, getSearchProps, options, getSearchCallback } = props;
          if (!((api && typeof getSearchProps === 'function') || (options && typeof getSearchCallback === 'function'))) {
            return null;
          }
          return (
            <SearchInput
              className={classnames(style['select-search'], 'select-table-search', {
                'is-popup': isPopup
              })}
              placeholder={searchPlaceholder}
              value={searchProps.searchText || ''}
              onSearch={value => {
                setSearchProps(searchProps => Object.assign({}, searchProps, { searchText: value }));
              }}
              simple={isPopup}
              showSearchButton={!isPopup}
            />
          );
        },
        getTagSearchCallback: (tagSearchText, item, contextProps) => {
          const { props } = contextProps;
          const { labelKey } = props;
          if (!tagSearchText) {
            return true;
          }
          return item[labelKey].indexOf(tagSearchText) > -1;
        }
      },
      p
    );

    const bodyRef = useRef(null);

    return (
      <SelectInput {...props} ref={ref}>
        {targetProps => {
          const { props, value, setValue, onRemove, onOpenChange, searchProps, isMobile, open } = targetProps;
          const {
            footer,
            filterRender,
            columns,
            options,
            getSearchProps,
            getSearchCallback,
            getTagSearchCallback,
            api,
            selectedAllValue,
            isPopup,
            single,
            maxLength,
            searchPlaceholder,
            allowSelectedAll,
            labelKey,
            valueKey,
            renderMobile,
            dataType,
            parentKey,
            childrenKey,
            hasChildrenKey,
            treeTitleKey,
            onLoadChildren,
            expandedKeys,
            defaultExpandedKeys,
            onExpandedKeysChange,
            indentSize,
            checkRelation
          } = props;
          const isSelectedAll = computedIsSelectAll(value, selectedAllValue, valueKey);
          const resolvedTreeTitleKey = treeTitleKey || labelKey;

          const footerEl = footer && (
            <div className={classnames(style['footer'], 'select-table-footer')}>
              {typeof footer === 'function'
                ? footer({
                    reload: () => {
                      fetchListRef.current?.fetchApi && fetchListRef.current?.fetchApi.reload();
                    },
                    close: () => {
                      onOpenChange(false);
                    }
                  })
                : footer}
            </div>
          );

          const renderScrollList = renderContent =>
            open ? (
              <FetchScrollLoader
                {...props}
                className={classnames(style['list'], 'select-table-list-scroll-list', {
                  'is-popup': isPopup
                })}
                useSimpleBar={!isMobile}
                searchProps={searchProps}
                getSearchProps={getSearchProps}
                api={Object.assign(
                  {},
                  options
                    ? {
                        data: { options, searchProps },
                        loader: ({ data }) => {
                          const { options, searchProps } = data;
                          return {
                            pageData: filterTreeOptions(options, searchProps, getSearchCallback, targetProps, {
                              dataType,
                              valueKey,
                              parentKey,
                              childrenKey
                            })
                          };
                        }
                      }
                    : api
                )}
              >
                {fetchProps => {
                  fetchListRef.current = fetchProps;
                  const { list } = fetchProps;
                  const contextProps = Object.assign({}, fetchProps, targetProps, { isSelectedAll });
                  if (!(list && list.length > 0)) {
                    return props.empty || <Empty className={classnames(style['empty'])} />;
                  }

                  return renderContent(list, contextProps);
                }}
              </FetchScrollLoader>
            ) : null;

          const tableSelection = {
            allowSelectedAll,
            isSelectedAll,
            onIsSelectAllChange: isSelectedAll => {
              setValue(isSelectedAll ? [selectedAllValue] : []);
            },
            type: single ? 'radio' : 'checkbox',
            selectedRowKeys: (value || []).map(item => item[valueKey]),
            checkRelation,
            onChange: selectedRowKeys => {
              setValue(prev => {
                const prevMap = new Map((prev || []).map(item => [item[valueKey], item]));
                const listMap = new Map(
                  flattenSelectList(fetchListRef.current?.list, {
                    dataType,
                    rowKey: valueKey,
                    parentKey,
                    childrenKey
                  }).map(item => [item[valueKey], item])
                );
                return (selectedRowKeys || []).map(key => prevMap.get(key) || listMap.get(key)).filter(Boolean);
              });
              if (isPopup && single && selectedRowKeys && selectedRowKeys.length > 0) {
                onOpenChange(false);
              }
            }
          };

          const selectedPanel = !single && (
            <div
              className={classnames(style['right-options'], {
                'is-popup': isPopup,
                [style['is-mobile']]: isMobile
              })}
            >
              <SearchInput
                className={style['tags-search']}
                placeholder={searchPlaceholder}
                value={tagSearchText}
                onSearch={value => {
                  setTagSearchText(value);
                }}
                showSearchButton={false}
              />
              <Row wrap={false} justify={'space-between'} align={'middle'}>
                <Col>
                  {formatMessage({ id: 'selected' })}
                  {value.length > 0 && `(${value.length}${Number.isInteger(maxLength) ? `/${maxLength}` : ''})`}:
                </Col>
                <Col>
                  <Button
                    className={style['no-padding-btn']}
                    type="link"
                    onClick={() => {
                      setValue([]);
                    }}
                  >
                    {formatMessage({ id: 'removeAll' })}
                  </Button>
                </Col>
              </Row>
              {(() => {
                const selectedTags = (
                  <Flex wrap gap={8}>
                    {value
                      .filter(item => getTagSearchCallback(tagSearchText, item, targetProps))
                      .map(item => {
                        return (
                          <Tag
                            className={style['tag']}
                            key={item[valueKey]}
                            closable
                            bordered={false}
                            onClose={e => {
                              e.preventDefault();
                              onRemove(item);
                            }}
                          >
                            <Popover
                              getPopupContainer={() => bodyRef.current}
                              content={
                                <CentralContent
                                  className={style['descriptions']}
                                  columns={columns
                                    .filter(item => {
                                      if (Object.hasOwn(item, 'previewHidden')) {
                                        return !item.previewHidden;
                                      }
                                      return item.name !== 'options';
                                    })
                                    .map(item => Object.assign({}, item, { span: 12 }))}
                                  dataSource={Object.assign({}, item)}
                                  context={Object.assign({}, targetProps, {
                                    fetchApi: fetchListRef.current?.fetchApi,
                                    list: fetchListRef.current?.list
                                  })}
                                />
                              }
                            >
                              <span className={style['tag-inner']}>{item[labelKey]}</span>
                            </Popover>
                          </Tag>
                        );
                      })}
                  </Flex>
                );
                // 移动端弹窗内不用 SimpleBar，改原生滚动
                if (isMobile) {
                  return <div className={style['selected-tags-scroll']}>{selectedTags}</div>;
                }
                return <SimpleBar className={style['selected-tags-scroll']}>{selectedTags}</SimpleBar>;
              })()}
              {footerEl}
            </div>
          );

          const tablePanel = (
            <div className={classnames(style['table-panel'], { [style['single-body']]: single })}>
              <div className={style['filter-wrap']}>{filterRender(Object.assign({}, targetProps))}</div>
              <div className={classnames(style['table'], 'select-table')}>
                {renderScrollList((list, contextProps) => {
                  const tableViewProps = {
                    dataSource: list,
                    columns,
                    rowKey: valueKey,
                    rowSelection: tableSelection,
                    context: contextProps,
                    dataType,
                    parentKey,
                    childrenKey,
                    hasChildrenKey,
                    treeTitleKey: resolvedTreeTitleKey,
                    renderMobile:
                      renderMobile === false
                        ? false
                        : typeof renderMobile === 'function'
                          ? mobileProps =>
                              renderMobile({
                                ...mobileProps,
                                ...contextProps,
                                list: mobileProps.displayDataSource || list,
                                dataSource: list,
                                renderBody: (nextList = mobileProps.displayDataSource || list, nextContext = contextProps) => mobileProps.renderBody(nextList, nextContext)
                              })
                          : true
                  };
                  // 可选树形 props：仅在有值 / 用户显式传入时透传，避免 undefined 覆盖 TableView 默认值
                  if (typeof onLoadChildren === 'function') {
                    tableViewProps.onLoadChildren = onLoadChildren;
                  }
                  if (typeof onExpandedKeysChange === 'function') {
                    tableViewProps.onExpandedKeysChange = onExpandedKeysChange;
                  }
                  if (indentSize != null) {
                    tableViewProps.indentSize = indentSize;
                  }
                  if (Object.prototype.hasOwnProperty.call(p, 'expandedKeys')) {
                    tableViewProps.expandedKeys = expandedKeys;
                  }
                  if (Object.prototype.hasOwnProperty.call(p, 'defaultExpandedKeys')) {
                    tableViewProps.defaultExpandedKeys = defaultExpandedKeys;
                  }
                  return <TableView {...tableViewProps} />;
                })}
              </div>
              {(single && footerEl) || (!isMobile && <div className={classnames(style['footer'], 'select-table-footer')} />)}
            </div>
          );

          // 移动端：表格在上、已选在下（上下布局）
          if (isMobile) {
            return (
              <div ref={bodyRef} className={classnames(style['body'], style['is-mobile'], 'select-table-list-body')}>
                <div className={style['table-panel-wrap']}>{tablePanel}</div>
                {selectedPanel ? <div className={style['selected-panel-wrap']}>{selectedPanel}</div> : null}
              </div>
            );
          }

          return (
            <Row wrap={false} ref={bodyRef} className={classnames(style['body'], 'select-table-list-body')}>
              <Col
                className={classnames({
                  [style['single-body']]: single
                })}
                span={single ? 24 : 16}
              >
                {tablePanel}
              </Col>
              {!single && (
                <Col span={8} className={style['right-options-col']}>
                  {selectedPanel}
                </Col>
              )}
            </Row>
          );
        }}
      </SelectInput>
    );
  })
);

export default SelectTableList;
