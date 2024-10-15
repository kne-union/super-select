import React from 'react';
import { Flex, List, Checkbox } from 'antd';
import { CheckOutlined } from '@ant-design/icons';
import SelectInput from '../SelectInput';
import SearchInput from '@kne/search-input';
import merge from 'lodash/merge';
import SelectedAll, { computedIsSelectAll } from '../SelectedAll';
import SelectedTagList from '../SelectedTagList';
import { FetchScrollLoader } from '@kne/scroll-loader';
import classnames from 'classnames';
import style from './style.module.scss';

const SelectList = ({ children, ...p }) => {
  const props = Object.assign(
    {},
    {
      renderItem: ({ item, props, isSelectedAll, value, onSelect, setValue, onOpenChange }) => {
        const { single, isPopup } = props;
        const isChecked = value.some(target => target.value === item.value);
        return (
          <List.Item
            className={classnames(style['default-list-item'], {
              [style['is-selected']]: isChecked
            })}
            key={item.value}
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
            <Flex vertical gag={8} flex={1}>
              <div className={style['default-item-label']}>{item.label}</div>
              {item.description && <div className={style['default-item-description']}>{item.description}</div>}
            </Flex>
            {single && <div className={style['single-checked']}>{isChecked && <CheckOutlined />}</div>}
          </List.Item>
        );
      },
      renderList: contextProps => {
        const { props, isSelectedAll, list } = contextProps;
        const { renderItem } = props;
        return (
          <List
            className={classnames(style['default-list'], {
              [style['is-selected-all']]: isSelectedAll
            })}
            size="small"
            dataSource={list}
            renderItem={item => renderItem(Object.assign({}, contextProps, { item }))}
          />
        );
      }
    },
    p
  );
  return (
    <SelectInput {...props}>
      {targetProps => {
        const { props, value, searchText, setSearchText } = targetProps;
        const { isPopup, getSearchProps, getSearchCallback, searchPlaceholder } = props;
        const { single, allowSelectedAll, showSelectedTag, api, options, renderList, selectedAllValue } = props;
        const components = {
          search: ((api && typeof getSearchProps === 'function') || (options && typeof getSearchCallback === 'function')) && (
            <SearchInput
              className={classnames(style['select-search'], {
                [style['is-popup']]: isPopup
              })}
              placeholder={searchPlaceholder}
              value={searchText}
              onSearch={value => {
                setSearchText(value);
              }}
              simple={isPopup}
              showSearchButton={!isPopup}
            />
          ),
          selectedAll: !single && allowSelectedAll && (
            <div
              className={classnames(style['select-all'], {
                [style['is-popup']]: isPopup
              })}
            >
              <SelectedAll />
            </div>
          ),
          fetchList: (
            <FetchScrollLoader
              {...props}
              className={classnames(style['list'], {
                [style['is-popup']]: isPopup
              })}
              api={Object.assign(
                {},
                options
                  ? {
                      data: { options, searchText },
                      loader: ({ data }) => {
                        const { options, searchText } = data;
                        if (typeof getSearchCallback === 'function') {
                          const newOptions = options.filter(item => getSearchCallback(searchText, item));
                          return {
                            pageData: newOptions,
                            totalCount: newOptions.length
                          };
                        }
                        return {
                          pageData: options,
                          totalCount: options.length
                        };
                      }
                    }
                  : merge({}, api, typeof getSearchProps === 'function' && searchText ? getSearchProps(searchText) : {})
              )}
            >
              {fetchProps => {
                const isSelectedAll = computedIsSelectAll(value, selectedAllValue);
                return renderList(Object.assign({}, fetchProps, targetProps, { isSelectedAll }));
              }}
            </FetchScrollLoader>
          ),
          selectedTag: showSelectedTag && (
            <div
              className={classnames(style['select-tag'], {
                [style['is-popup']]: isPopup
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
            {components.fetchList}
            {components.selectedTag}
          </Flex>
        );
      }}
    </SelectInput>
  );
};

export default SelectList;
