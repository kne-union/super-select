import React, { useState } from 'react';
import { Provider } from './context';
import useResize from '@kne/use-resize';
import useControlValue from '@kne/use-control-value';
import classnames from 'classnames';
import { Tag, Flex, Popover, Modal, App } from 'antd';
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

const ModalContent = ({ open, onOpenChange, props, value: propsValue, setValue: propsSetValue, hover, inputWidth, onAdd, onRemove, children }) => {
  const [value, setValue] = useState(propsValue);

  return (
    <Modal
      width={1000}
      open={open}
      title={props.placeholder}
      onCancel={() => {
        onOpenChange(false);
      }}
      onOk={() => {
        propsSetValue(value);
        onOpenChange(false);
      }}
    >
      {children({
        props,
        value,
        setValue,
        hover,
        inputWidth,
        onAdd,
        onRemove
      })}
    </Modal>
  );
};

const SelectInput = p => {
  const lang = Object.assign(
    {},
    {
      placeholder: '请选择',
      selectAll: '全选',
      maxLengthError: '最大数量不能超过%s',
      defaultChildren: '下拉内容，需要调用方实现'
    },
    p.lang
  );
  const props = Object.assign(
    {},
    {
      children: () => lang.defaultChildren,
      maxLength: null,
      single: false,
      disabled: false,
      isPopup: true,
      defaultValue: [],
      placeholder: lang.placeholder,
      allowSelectedAll: false,
      selectedAllValue: { value: 'all', label: lang.selectAll },
      placement: 'bottomLeft',
      labelWrap: true,
      showSelectedTag: true,
      allowClear: true,
      extra: null,
      renderModal: props => <ModalContent {...props} />
    },
    p,
    { lang }
  );

  const [value, setValue] = useControlValue(props);
  const [open, setOpen] = useState(false);
  const [hover, setHover] = useState(false);
  const [inputWidth, setInputWidth] = useState(0);

  const inputRef = useResize(el => {
    setInputWidth(el.clientWidth);
  });

  const { children, className, maxLength, overlayClassName, single, labelWrap, isPopup, allowClear, disabled, placeholder, selectedAllValue, overlayWidth, placement, renderModal } = props;

  const popupOverlayWidth = numberToPx(Math.max(inputWidth, pxToNumber(overlayWidth)));

  const { message } = App.useApp();

  const onRemove = item => {
    setValue(value => {
      const newValue = value.slice(0);
      const index = value.findIndex(currentItem => currentItem.value === item.value);
      if (index > -1) {
        newValue.splice(index, 1);
      }
      return newValue;
    });
  };

  const onAdd = item => {
    setValue(value => {
      if (Number.isInteger(maxLength) && maxLength > 0 && value.length > maxLength) {
        message.error(lang.maxLengthError.replace('%s', maxLength));
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

  const inputInnerRender = (props = {}) => (
    <Flex
      {...props}
      ref={inputRef}
      className={classnames(className, style['select-input'], {
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
      <div className={style['select-input-inner']}>
        {(value || []).length > 0 ? (
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
          <span className={style['placeholder']}>{placeholder}</span>
        )}
      </div>
      <div className={style['select-input-icon']}>
        {!disabled && allowClear && hover && (value || []).length > 0 ? (
          <CloseCircleFilled
            onClick={() => {
              setValue([]);
            }}
          />
        ) : (
          <DownOutlined />
        )}
      </div>
    </Flex>
  );
  return (
    <Provider value={{ props, value, setValue, hover, inputWidth, onAdd, onRemove }}>
      {isPopup ? (
        <Popover
          open={!disabled && open}
          onOpenChange={setOpen}
          placement={placement}
          arrow={false}
          transitionName=""
          overlayClassName={classnames(style['overlay'], overlayClassName)}
          trigger="click"
          content={
            <div
              style={{ '--overlay-width': popupOverlayWidth }}
              className={classnames(style['overlay-content'], 'over-content')}
              onClick={e => {
                e.stopPropagation();
              }}
            >
              {children({
                props,
                value,
                setValue,
                hover,
                inputWidth,
                onAdd,
                onRemove
              })}
            </div>
          }
        >
          <span>{inputInnerRender()}</span>
        </Popover>
      ) : (
        <>
          {inputInnerRender({
            onClick: () => {
              setOpen(true);
            }
          })}
          {renderModal({
            open: !disabled && open,
            onOpenChange: setOpen,
            props,
            value,
            setValue,
            hover,
            inputWidth,
            onAdd,
            onRemove,
            children
          })}
        </>
      )}
    </Provider>
  );
};

export default SelectInput;
