import React from 'react';
import { Flex, Checkbox } from 'antd';
import get from 'lodash/get';
import { useContext } from '../SelectInput';
import classnames from 'classnames';
import style from './style.module.scss';
import zhCn from '../locale/zh-CN';
import { createWithIntlProvider, useIntl } from '@kne/react-intl';

const SelectedAll = createWithIntlProvider(
  'zh-CN',
  zhCn,
  'super-select'
)(() => {
  const { formatMessage } = useIntl();
  const { props, value, setValue } = useContext();
  const { unit, selectedAllValue, valueKey } = Object.assign(
    {},
    {
      unit: number => formatMessage({ id: 'numberOf' }, { number })
    },
    props
  );
  const isSelectedAll = computedIsSelectAll(value, selectedAllValue, valueKey);
  return (
    <Flex justify="space-between" className={classnames(style['selected-all'], 'selected-all')}>
      <Flex gap={8}>
        <span>{formatMessage({ id: 'selected' })}:</span>
        <span>{isSelectedAll ? selectedAllValue.label : typeof unit === 'function' ? unit(value.length) : value.length}</span>
      </Flex>
      <span>
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
        >
          {formatMessage({ id: 'selectAll' })}
        </Checkbox>
      </span>
    </Flex>
  )
});

export const computedIsSelectAll = (value, selectedAllValue, valueKey = 'value') => {
  return value?.length === 1 && get(value, `[0][${valueKey}]`) === selectedAllValue[valueKey];
};

export default SelectedAll;
