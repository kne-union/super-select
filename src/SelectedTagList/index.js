import React from 'react';
import { Flex, Tag } from 'antd';
import { useContext } from '../SelectInput';
import SimpleBar from 'simplebar-react';
import style from './style.module.scss';
import 'simplebar-react/dist/simplebar.min.css';

const SelectedTagList = () => {
  const { props, value, onRemove } = useContext();
  const { locale, single, maxLength } = Object.assign({}, props);

  return (
    <Flex className={style['tag-list']} gap={8}>
      <div className={style['label']}>
        {locale.selected}
        {!single && value.length > 0 && `(${value.length}${Number.isInteger(maxLength) ? `/${maxLength}` : ''})`}:
      </div>
      <SimpleBar className={style['tag-container']}>
        <Flex gap={8} wrap className={style['tag-container-inner']}>
          {value.map(item => {
            return (
              <Tag
                key={item.value}
                closable
                bordered={false}
                onClose={e => {
                  e.preventDefault();
                  onRemove(item);
                }}
              >
                {item.label}
              </Tag>
            );
          })}
        </Flex>
      </SimpleBar>
    </Flex>
  );
};

export default SelectedTagList;
