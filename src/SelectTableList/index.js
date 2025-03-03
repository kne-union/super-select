import React, { useState, Fragment, useRef, forwardRef } from 'react';
import SelectInput from '../SelectInput';
import { Flex, Row, Col, Button, Checkbox, Tag, Popover } from 'antd';
import { FetchScrollLoader } from '@kne/scroll-loader';
import SearchInput from '@kne/search-input';
import { computedIsSelectAll } from '../SelectedAll';
import get from 'lodash/get';
import classnames from 'classnames';
import SimpleBar from 'simplebar-react';
import { createWithIntlProvider, useIntl } from '@kne/react-intl';
import style from './style.module.scss';
import 'simplebar-react/dist/simplebar.min.css';
import { CheckOutlined } from '@ant-design/icons';

import zhCn from '../locale/zh-CN';

const SelectTableList = createWithIntlProvider('zh-CN', zhCn, 'super-select')(forwardRef((p, ref) => {
  const { formatMessage } = useIntl();
  const [tagSearchText, setTagSearchText] = useState('');
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
            className={classnames(style['select-search'], 'select-list-search', {
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
        const { props, value, setValue, onSelect, onRemove, onOpenChange } = targetProps;
        const { filterRender, columns, options, getSearchCallback, getTagSearchCallback, api, selectedAllValue, isPopup, single, maxLength, getSearchProps, searchPlaceholder, allowSelectedAll, labelKey, valueKey, searchProps } =
          props;
        const isSelectedAll = computedIsSelectAll(value, selectedAllValue, valueKey);
        return (
          <Row wrap={false} ref={bodyRef}>
            <Col span={single ? 24 : 16}>
              <div>{filterRender(Object.assign({}, targetProps))}</div>
              <Row wrap={false} className={classnames(style['header'], 'select-table-list-header')}>
                {!single && (
                  <Col className={classnames(style['col'], 'select-table-list-col')}>
                    {allowSelectedAll ? (
                      <Checkbox
                        checked={isSelectedAll}
                        onChange={e => {
                          const checked = e.target.checked;
                          if (!checked) {
                            setValue([]);
                          } else {
                            setValue([selectedAllValue]);
                          }
                        }}
                      />
                    ) : (
                      <Checkbox style={{ visibility: 'hidden' }} />
                    )}
                  </Col>
                )}
                <Col flex={1}>
                  <Row wrap={false}>
                    {columns.map(column => {
                      const { name, title, span } = column;
                      return (
                        <Col key={name} span={span} className={classnames(style['col'], 'select-table-list-col')}>
                          {title}
                        </Col>
                      );
                    })}
                  </Row>
                </Col>
              </Row>
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
              >
                {fetchProps => {
                  const { list } = fetchProps;
                  const contextProps = Object.assign({}, fetchProps, targetProps, { isSelectedAll });
                  return list.map(item => {
                    const isChecked = value.some(target => target[valueKey] === item[valueKey]);
                    return (
                      <Row
                        wrap={false}
                        key={item[valueKey]}
                        className={classnames(style['body'], 'select-table-list-body', [
                          {
                            [style['is-selected-all']]: isSelectedAll,
                            [style['is-selected']]: isChecked,
                            [style['is-disabled']]: item.disabled
                          }
                        ])}
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
                          <Col className={classnames(style['col'], 'select-table-list-col')}>
                            <Checkbox disabled={item.disabled || isSelectedAll} checked={isSelectedAll || isChecked} />
                          </Col>
                        )}
                        <Col flex={1}>
                          <Row wrap={false}>
                            {columns.map(column => {
                              const { name, span, getValueOf } = column;
                              return (
                                <Col key={name} span={span} className={classnames(style['col'], 'select-table-list-col')}>
                                  {typeof getValueOf === 'function' ? getValueOf(item, contextProps) : get(item, name)}
                                </Col>
                              );
                            })}
                          </Row>
                        </Col>
                        {single && <Col className={classnames(style['col'], style['single-checked'], 'select-table-list-col')}>{isChecked && <CheckOutlined />}</Col>}
                      </Row>
                    );
                  });
                }}
              </FetchScrollLoader>
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
                      移除全部
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
                                <Row className={style['descriptions']}>
                                  {columns.map(({ name, title, getValueOf }) => {
                                    return (
                                      <Fragment key={name}>
                                        <Col span={8} className={style['descriptions-col-label']}>
                                          {title}
                                        </Col>
                                        <Col className={style['descriptions-col-content']} span={16}>
                                          {typeof getValueOf === 'function' ? getValueOf(item, targetProps) : get(item, name)}
                                        </Col>
                                      </Fragment>
                                    );
                                  })}
                                </Row>
                              }
                            >
                              <span className={style['tag-inner']}>{item[labelKey]}</span>
                            </Popover>
                          </Tag>
                        );
                      })}
                  </Flex>
                </SimpleBar>
              </Col>
            )}
          </Row>
        );
      }}
    </SelectInput>
  );
}));

export default SelectTableList;
