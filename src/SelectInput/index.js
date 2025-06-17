import React, { useEffect, useState, forwardRef, useImperativeHandle } from 'react';
import { Provider } from './context';
import useResize from '@kne/use-resize';
import useControlValue from '@kne/use-control-value';
import classnames from 'classnames';
import isEqual from 'lodash/isEqual';
import last from 'lodash/last';
import { Tag, Flex, Dropdown, Modal, App } from 'antd';
import { DownOutlined, CloseCircleFilled } from '@ant-design/icons';
import { isNotEmpty } from '@kne/is-empty';
import style from './style.module.scss';
import zhCn from '../locale/zh-CN';
import enUS from '../locale/en-US';
import { createWithIntlProvider, useIntl } from '@kne/react-intl';

const numberToPx = val => {
  return typeof val === 'number' ? `${val}px` : val;
};

const pxToNumber = value => {
  if (!value) return 0;
  if (Number.isInteger(value)) {
    return value;
  }
  const match = value.toString().match(/^\d*(\.\d*)?/);
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

const SelectInput = createWithIntlProvider({
  defaultLocale: 'zh-CN',
  namespace: 'super-select',
  messages: {
    'zh-CN': zhCn,
    'en-US': enUS
  }
})(
  forwardRef((p, ref) => {
    const intl = useIntl();
    const { formatMessage } = intl;
    const props = Object.assign(
      {},
      {
        children: () => formatMessage({ id: 'defaultChildren' }),
        maxLength: null,
        defaultOpen: false,
        single: false,
        disabled: false,
        isPopup: true,
        placeholder: formatMessage({ id: 'placeholder' }),
        searchPlaceholder: formatMessage({ id: 'search' }),
        completeTips: null,
        allowSelectedAll: false,
        labelKey: 'label',
        valueKey: 'value',
        selectedAllValue: { value: 'all', label: formatMessage({ id: 'selectAll' }) },
        placement: 'bottomLeft',
        labelWrap: false,
        showSelectedTag: false,
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
      p
    );

    props.selectedAllValue = {
      [props.valueKey]: props.selectedAllValue.value,
      [props.labelKey]: props.selectedAllValue.label
    };

    const { children, prefix, suffix, className, maxLength, overlayClassName, single, labelWrap, isPopup, allowClear, disabled, placeholder, selectedAllValue, overlayWidth, placement, renderModal, labelKey, valueKey } = props;

    const transformValue = value => {
      if (single) {
        return isNotEmpty(value) ? [value] : [];
      } else {
        return Array.isArray(value) ? value : [];
      }
    };

    const [value, setValue] = useControlValue(
      Object.assign(
        {},
        props,
        {
          onChange: value => {
            props.onChange && props.onChange(props.single ? last(value) : value);
          }
        },
        'value' in props ? { value: transformValue(props.value) } : { defaultValue: transformValue(props.defaultValue) }
      )
    );

    const [searchProps, setSearchProps] = useState({});
    const [open, setOpen] = useControlValue(props, {
      defaultValue: 'defaultOpen',
      value: 'open',
      onChange: 'onOpenChange'
    });
    const [hover, setHover] = useState(false);
    const [inputWidth, setInputWidth] = useState(0);

    const inputRef = useResize(el => {
      setInputWidth(el.clientWidth);
    });

    const popupOverlayWidth = numberToPx(Math.max(inputWidth, pxToNumber(overlayWidth)));

    const { message } = App.useApp();

    const checkMaxLength = (value, maxLength) => {
      if (Number.isInteger(maxLength) && maxLength > 0 && value.length >= maxLength) {
        message.error(formatMessage({ id: 'maxLengthError' }, { maxLength }));
        return false;
      }
      return true;
    };

    const onRemove = (item, currentSetValue) => {
      (currentSetValue || setValue)(value => {
        const newValue = value.slice(0);
        const index = value.findIndex(currentItem => currentItem[valueKey] === item[valueKey]);
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
        const index = value.findIndex(currentItem => currentItem[valueKey] === item[valueKey]);
        if (index === -1) {
          newValue.push(item);
        }
        return newValue;
      });
    };

    const onSelect = (item, currentSetValue) => {
      (currentSetValue || setValue)(value => {
        const newValue = (value || []).slice(0);
        const index = newValue.findIndex(currentItem => currentItem[valueKey] === item[valueKey]);
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

    const contextProps = {
      props,
      value: value,
      setValue,
      searchProps,
      setSearchProps,
      hover,
      inputWidth,
      onAdd,
      onRemove,
      onSelect,
      open: !disabled && open,
      onOpenChange: setOpen,
      children
    };

    const inputInnerRender = (props = {}) => {
      if (typeof contextProps.props.inputRender === 'function') {
        return contextProps.props.inputRender(props, contextProps);
      }
      return (
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
          {(() => {
            const current = typeof prefix === 'function' ? prefix(contextProps) : prefix;
            return (
              current && (
                <span
                  className={classnames(style['select-input-prefix'], 'select-input-prefix')}
                  onClick={e => {
                    e.stopPropagation();
                  }}
                >
                  {current}
                </span>
              )
            );
          })()}
          <div className={classnames(style['select-input-inner'], 'select-input-inner')}>
            {value.length > 0 ? (
              single || value[0][valueKey] === selectedAllValue[valueKey] ? (
                value[0][labelKey]
              ) : (
                value.map(item => {
                  return (
                    <Tag
                      key={item[valueKey]}
                      closable
                      bordered={false}
                      onClose={e => {
                        e.preventDefault();
                        onRemove(item);
                      }}
                    >
                      {item[labelKey]}
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
          {(() => {
            const current = typeof suffix === 'function' ? suffix(contextProps) : suffix;
            return (
              current && (
                <span
                  className={classnames(style['select-input-suffix'], 'select-input-suffix')}
                  onClick={e => {
                    e.stopPropagation();
                  }}
                >
                  {current}
                </span>
              )
            );
          })()}
        </Flex>
      );
    };

    useImperativeHandle(ref, () => {
      return contextProps;
    });

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
            popupRender={() => (
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
  })
);

export * from './context';
export default SelectInput;
