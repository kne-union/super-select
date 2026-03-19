import React from 'react';
import { List } from 'antd';
import classnames from 'classnames';
import style from './style.module.scss';

const CustomMenu = ({ className, selectedKeys, items, onSelect }) => {
  const handleItemClick = (key, e) => {
    // 只阻止事件冒泡，不阻止默认行为
    e.stopPropagation();
    onSelect?.({ key, domEvent: e });
  };

  return (
    <List
      className={classnames(style['custom-menu'], className)}
      dataSource={items}
      renderItem={item => {
        const isSelected = selectedKeys?.includes(item.key);
        return (
          <List.Item
            className={classnames(style['custom-menu-item'], {
              [style['selected']]: isSelected
            })}
            onClick={e => handleItemClick(item.key, e)}
          >
            {item.label}
          </List.Item>
        );
      }}
    />
  );
};

export default CustomMenu;
