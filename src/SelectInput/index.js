import React, { useEffect, useState } from 'react';
import { Provider } from './context';
import useResize from '@kne/use-resize';
import useControlValue from '@kne/use-control-value';
import classnames from 'classnames';
import isEqual from 'lodash/isEqual';
import { Tag, Flex, Popover, Dropdown, Modal, App } from 'antd';
import { DownOutlined, CloseCircleFilled } from '@ant-design/icons';
import style from './style.module.scss';

const numberToPx = val => {
  return typeof val === 'number' ? `${val}px` : val;
};

const pxToNumber = value => {
  if (!value) return 0;
  const match = value.match(/^\d*(\.\d*)?/);
  return match ? Number(match[0]) : 0;
};

const ModalContent = ({ children, ...others }) => {
  const { open, value: propsValue } = others;
  const [value, setValue] = useState(propsValue);
  useEffect(() => {
    if (open && !isEqual(value, propsValue)) {
      setValue(propsValue);
    }
  }, [open]);
  const contextProps = Object.assign({}, others, {
    value,
    setValue,
    onComplete: () => others.setValue(value),
    onAdd: item => others.onAdd(item, setValue),
    onSelect: item => others.onSelect(item, setValue),
    onRemove: item => others.onRemove(item, setValue),
    children
  });

  return <Provider value={contextProps}>{children(contextProps)}</Provider>;
};

const SelectInput = p => {
  const locale = Object.assign(
    {},
    {
      placeholder: '请选择',
      selectAll: '全选',
      selected: '已选',
      search: '搜索',
      numberOf: '%s个',
      maxLengthError: '最大数量不能超过%s',
      defaultChildren: '下拉内容，需要调用方实现'
    },
    p.locale
  );
  const props = Object.assign(
    {},
    {
      children: () => locale.defaultChildren,
      maxLength: null,
      single: false,
      disabled: false,
      isPopup: true,
      defaultValue: [],
      placeholder: locale.placeholder,
      searchPlaceholder: locale.search,
      allowSelectedAll: false,
      selectedAllValue: { value: 'all', label: locale.selectAll },
      placement: 'bottomLeft',
      labelWrap: true,
      showSelectedTag: true,
      allowClear: true,
      prefix: null,
      suffix: null,
      extra: null,
      renderModal: contextProps => {
        const { props, open, onComplete, onOpenChange } = contextProps;
        const { placeholder, children } = props;
        return (
          <Modal
            width={1000}
            open={open}
            title={placeholder}
            onCancel={() => {
              onOpenChange(false);
            }}
            onOk={() => {
              onComplete();
              onOpenChange(false);
            }}
          >
            {children(contextProps)}
          </Modal>
        );
      }
    },
    p,
    { locale }
  );

  const [stateValue, setValue] = useControlValue(props);
  const value = stateValue || [];
  const [searchText, setSearchText] = useState('');
  const [open, setOpen] = useState(false);
  const [hover, setHover] = useState(false);
  const [inputWidth, setInputWidth] = useState(0);

  const inputRef = useResize(el => {
    setInputWidth(el.clientWidth);
  });

  const { children, prefix, suffix, className, maxLength, overlayClassName, single, labelWrap, isPopup, allowClear, disabled, placeholder, selectedAllValue, overlayWidth, placement, renderModal } = props;

  const popupOverlayWidth = numberToPx(Math.max(inputWidth, pxToNumber(overlayWidth)));

  const { message } = App.useApp();

  const checkMaxLength = (value, maxLength) => {
    if (Number.isInteger(maxLength) && maxLength > 0 && value.length >= maxLength) {
      message.error(locale.maxLengthError.replace('%s', maxLength));
      return false;
    }
    return true;
  };

  const onRemove = (item, currentSetValue) => {
    (currentSetValue || setValue)(value => {
      const newValue = value.slice(0);
      const index = value.findIndex(currentItem => currentItem.value === item.value);
      if (index > -1) {
        newValue.splice(index, 1);
      }
      return newValue;
    });
  };

  const onAdd = (item, currentSetValue) => {
    (currentSetValue || setValue)(value => {
      if (checkMaxLength(value, maxLength)) {
        return value;
      }
      const newValue = value.slice(0);
      const index = value.findIndex(currentItem => currentItem.value === item.value);
      if (index === -1) {
        newValue.push(item);
      }
      return newValue;
    });
  };

  const onSelect = (item, currentSetValue) => {
    (currentSetValue || setValue)(value => {
      const newValue = (value || []).slice(0);
      const index = newValue.findIndex(currentItem => currentItem.value === item.value);
      if (index === -1 && !checkMaxLength(newValue, maxLength)) {
        return value;
      }
      if (index === -1) {
        newValue.push(item);
      } else {
        newValue.splice(index, 1);
      }
      return newValue;
    });
  };

  const inputInnerRender = (props = {}) => (
    <Flex
      {...props}
      ref={inputRef}
      className={classnames(className, style['select-input'], 'select-input', {
        [style['wrap']]: labelWrap,
        [style['disabled']]: disabled
      })}
      justify="space-between"
      onMouseOver={() => {
        setHover(true);
      }}
      onMouseOut={() => {
        setHover(false);
      }}
    >
      {prefix && (
        <span
          className={classnames(style['select-input-prefix'], 'select-input-prefix')}
          onClick={e => {
            e.stopPropagation();
          }}
        >
          {typeof prefix === 'function' ? prefix(contextProps) : prefix}
        </span>
      )}
      <div className={classnames(style['select-input-inner'], 'select-input-inner')}>
        {value.length > 0 ? (
          single || value[0].value === selectedAllValue.value ? (
            value[0].label
          ) : (
            value.map(item => {
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
            })
          )
        ) : (
          <span className={classnames(style['placeholder'], 'select-input-placeholder')}>{placeholder}</span>
        )}
      </div>
      <div className={classnames(style['select-input-icon'], 'select-input-icon')}>
        {!disabled && allowClear && hover && value.length > 0 ? (
          <CloseCircleFilled
            onClick={e => {
              e.stopPropagation();
              setValue([]);
            }}
          />
        ) : (
          <DownOutlined />
        )}
      </div>
      {suffix && (
        <span
          className={classnames(style['select-input-suffix'], 'select-input-suffix')}
          onClick={e => {
            e.stopPropagation();
          }}
        >
          {typeof suffix === 'function' ? suffix(contextProps) : suffix}
        </span>
      )}
    </Flex>
  );

  const contextProps = {
    props,
    value: value,
    setValue,
    searchText,
    setSearchText,
    hover,
    inputWidth,
    onAdd,
    onRemove,
    onSelect,
    open: !disabled && open,
    onOpenChange: setOpen,
    children
  };

  return (
    <Provider value={contextProps}>
      {isPopup ? (
        <Dropdown
          open={!disabled && open}
          onOpenChange={setOpen}
          placement={placement}
          arrow={false}
          overlayClassName={classnames(style['overlay'], overlayClassName)}
          trigger="click"
          dropdownRender={() => (
            <div
              style={{ '--overlay-width': popupOverlayWidth }}
              className={classnames(style['overlay-content'], 'over-content')}
              onClick={e => {
                e.stopPropagation();
              }}
            >
              {children(contextProps)}
            </div>
          )}
        >
          <span>{inputInnerRender()}</span>
        </Dropdown>
      ) : (
        <>
          {inputInnerRender({
            onClick: () => {
              setOpen(true);
            }
          })}
          <ModalContent {...contextProps}>{renderModal}</ModalContent>
        </>
      )}
    </Provider>
  );
};

export * from './context';
export default SelectInput;
