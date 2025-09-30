import React, { useState, Fragment, useRef, forwardRef } from 'react';
import SelectInput from '../SelectInput';
import { Flex, Row, Col, Button, Checkbox, Tag, Popover, Empty } from 'antd';
import { FetchScrollLoader } from '@kne/scroll-loader';
import SearchInput from '@kne/search-input';
import { computedIsSelectAll } from '../SelectedAll';
import get from 'lodash/get';
import classnames from 'classnames';
import SimpleBar from 'simplebar-react';
import { createWithIntlProvider, useIntl } from '@kne/react-intl';
import style from './style.module.scss';
import 'simplebar-react/dist/simplebar.min.css';
import { TableView, computeColumnsValue, CentralContent } from '@kne/info-page';
import '@kne/info-page/dist/index.css';

import zhCn from '../locale/zh-CN';

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
        filterRender: contextProps => {
          const { props, searchProps, setSearchProps } = contextProps;
          const { isPopup, searchPlaceholder, api, getSearchProps, options, getSearchCallback, labelKey } = props;
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
          const { props, value, setValue, onSelect, onRemove, onOpenChange, searchProps } = targetProps;
          const { footer, filterRender, columns, options, getSearchProps, getSearchCallback, getTagSearchCallback, api, selectedAllValue, isPopup, single, maxLength, searchPlaceholder, allowSelectedAll, labelKey, valueKey } = props;
          const isSelectedAll = computedIsSelectAll(value, selectedAllValue, valueKey);

          const footerEl = footer && (
            <div className={classnames(style['footer'], 'select-table-footer')}>
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
          );
          return (
            <Row wrap={false} ref={bodyRef}>
              <Col
                className={classnames({
                  [style['single-body']]: single
                })}
                span={single ? 24 : 16}
              >
                <div>{filterRender(Object.assign({}, targetProps))}</div>
                <div className={classnames(style['table'], 'select-table')}>
                  <TableView
                    columns={columns}
                    rowKey={valueKey}
                    rowSelection={{
                      allowSelectedAll,
                      isSelectedAll,
                      onIsSelectAllChange: isSelectedAll => {
                        setValue(isSelectedAll ? [selectedAllValue] : []);
                      },
                      type: single ? 'radio' : 'checkbox',
                      selectedRowKeys: (value || []).map(item => item[valueKey]),
                      onChange: (selectedRowKeys, selectedRows) => {
                        setValue(selectedRows);
                        if (isPopup && single) {
                          onOpenChange(false);
                        }
                      }
                    }}
                    render={({ header, renderBody }) => {
                      return (
                        <>
                          {header}
                          <FetchScrollLoader
                            {...props}
                            className={classnames(style['list'], 'select-table-list-scroll-list', {
                              'is-popup': isPopup
                            })}
                            searchProps={searchProps}
                            getSearchProps={getSearchProps}
                            api={Object.assign(
                              {},
                              options
                                ? {
                                    data: { options, searchProps },
                                    loader: ({ data }) => {
                                      const { options, searchProps } = data;
                                      if (typeof getSearchCallback === 'function') {
                                        const newOptions = options.filter(item => getSearchCallback(searchProps, item, targetProps));
                                        return {
                                          pageData: newOptions
                                        };
                                      }
                                      return {
                                        pageData: options
                                      };
                                    }
                                  }
                                : api
                            )}
                            ref={fetchListRef}
                          >
                            {fetchProps => {
                              const { list } = fetchProps;
                              const contextProps = Object.assign({}, fetchProps, targetProps, { isSelectedAll });
                              if (!(list && list.length > 0)) {
                                return props.empty || <Empty className={classnames(style['empty'])} />;
                              }

                              return renderBody(list, contextProps);
                            }}
                          </FetchScrollLoader>
                        </>
                      );
                    }}
                  />
                </div>
                {(single && footerEl) || <div className={classnames(style['footer'], 'select-table-footer')} />}
              </Col>
              {!single && (
                <Col
                  className={classnames(style['right-options'], {
                    'is-popup': isPopup
                  })}
                  span={8}
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
                  <SimpleBar>
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
                                      fetchApi: fetchListRef.current
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
                  </SimpleBar>
                  {footerEl}
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
