import React from 'react';
import { Flex, Checkbox } from 'antd';
import get from 'lodash/get';
import { useContext } from '../SelectInput';
import style from './style.module.scss';

const SelectedAll = () => {
  const { props, value, setValue } = useContext();
  const { unit, selectedAllValue, locale } = Object.assign(
    {},
    {
      unit: number => locale.numberOf.replace('%s', number)
    },
    props
  );
  const isSelectedAll = computedIsSelectAll(value, selectedAllValue);
  return (
    <Flex justify="space-between" className={style['selected-all']}>
      <Flex gap={8}>
        <span>{locale.selected}:</span>
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
          {locale.selectAll}
        </Checkbox>
      </span>
    </Flex>
  );
};

export const computedIsSelectAll = (value, selectedAllValue) => {
  return value?.length === 1 && get(value, '[0].value') === selectedAllValue.value;
};

export default SelectedAll;
