import React from 'react';
import { Flex, Tag } from 'antd';
import { useContext } from '../SelectInput';
import SimpleBar from 'simplebar-react';
import classnames from 'classnames';
import { createWithIntlProvider, useIntl } from '@kne/react-intl';
import style from './style.module.scss';
import 'simplebar-react/dist/simplebar.min.css';

import zhCn from '../locale/zh-CN';

const SelectedTagList = createWithIntlProvider('zh-CN', zhCn, 'super-select')(() => {
  const { formatMessage } = useIntl();
  const { props, value, onRemove } = useContext();
  const { single, maxLength, labelKey, valueKey } = Object.assign({}, props);

  return (
    <Flex className={classnames(style['tag-list'], 'selected-tag-list')} gap={8}>
      <div className={style['label']}>
        {formatMessage({ id: 'selected' })}
        {!single && value.length > 0 && `(${value.length}${Number.isInteger(maxLength) ? `/${maxLength}` : ''})`}:
      </div>
      <SimpleBar className={style['tag-container']}>
        <Flex gap={8} wrap className={style['tag-container-inner']}>
          {value.map(item => {
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
                <span className={style['tag-inner']}>{item[labelKey]}</span>
              </Tag>
            );
          })}
        </Flex>
      </SimpleBar>
    </Flex>
  );
});

export default SelectedTagList;
