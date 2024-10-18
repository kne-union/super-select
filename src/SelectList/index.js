import React from 'react';
import { Flex, List, Checkbox } from 'antd';
import { CheckOutlined } from '@ant-design/icons';
import SelectInput from '../SelectInput';
import SearchInput from '@kne/search-input';
import SelectedAll, { computedIsSelectAll } from '../SelectedAll';
import SelectedTagList from '../SelectedTagList';
import { FetchScrollLoader } from '@kne/scroll-loader';
import classnames from 'classnames';
import style from './style.module.scss';

const SelectList = ({ children, ...p }) => {
  const props = Object.assign(
    {},
    {
      renderItemContent: ({ item, props }) => {
        const { labelKey } = props;
        return (
          <>
            <div className={'select-list-item-label'}>{item[labelKey]}</div>
            {item.description && <div className={'select-list-item-description'}>{item.description}</div>}
          </>
        );
      },
      renderItem: contextProps => {
        const { item, props, isSelectedAll, value, onSelect, setValue, onOpenChange } = contextProps;
        const { single, isPopup, renderItemContent, valueKey } = props;
        const isChecked = value.some(target => target[valueKey] === item[valueKey]);
        return (
          <List.Item
            className={classnames(style['default-list-item'], 'select-list-item', {
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
            <Flex vertical gag={8} flex={1} className={'select-list-item-content'}>
              {renderItemContent(contextProps)}
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
        const { isPopup, getSearchProps, getSearchCallback, searchPlaceholder, valueKey, single, allowSelectedAll, showSelectedTag, api, options, renderList, selectedAllValue } = props;
        const components = {
          search: ((api && typeof getSearchProps === 'function') || (options && typeof getSearchCallback === 'function')) && (
            <SearchInput
              className={classnames(style['select-search'], 'select-list-search', {
                'is-popup': isPopup
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
          selectedAll: (
            <div
              className={classnames(style['selected-all'], 'select-list-selected-all', {
                'is-popup': isPopup
              })}
            >
              {!single && allowSelectedAll && <SelectedAll />}
            </div>
          ),
          fetchList: (
            <FetchScrollLoader
              {...props}
              className={classnames(style['list'], 'select-list-scroll-list', {
                'is-popup': isPopup
              })}
              searchProps={{ searchText }}
              getSearchProps={getSearchProps}
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
                const isSelectedAll = computedIsSelectAll(value, selectedAllValue, valueKey);
                return renderList(Object.assign({}, fetchProps, targetProps, { isSelectedAll }));
              }}
            </FetchScrollLoader>
          ),
          selectedTag: showSelectedTag && (
            <div
              className={classnames(style['selected-tag'], 'select-list-selected-tag', {
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
            {components.fetchList}
            {components.selectedTag}
          </Flex>
        );
      }}
    </SelectInput>
  );
};

export default SelectList;
