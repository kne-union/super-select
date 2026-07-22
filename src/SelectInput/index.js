import React, { useEffect, useLayoutEffect, useState, forwardRef, useImperativeHandle, useMemo, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { Provider } from './context';
import useResize from '@kne/use-resize';
import useControlValue from '@kne/use-control-value';
import classnames from 'classnames';
import isEqual from 'lodash/isEqual';
import last from 'lodash/last';
import { Flex, Dropdown, Modal, App } from 'antd';
import { DownOutlined, CloseCircleFilled } from '@ant-design/icons';
import { isNotEmpty } from '@kne/is-empty';
import { MOBILE_POPUP_MODE, useMobilePopupMount, usePopupContainer, useScrollElement } from '@kne/responsive-utils';
import style from './style.module.scss';
import zhCn from '../locale/zh-CN';
import enUS from '../locale/en-US';
import { createWithIntlProvider, useIntl } from '@kne/react-intl';
import TagOverflowInner from './TagOverflowInner';
import 'simplebar-react/dist/simplebar.min.css';

const MOBILE_SHEET_MAX_HEIGHT = '80%';
const MOBILE_SHEET_MIN_HEIGHT = '30%';
const MOBILE_MASK_Z_INDEX = 1000;
const MOBILE_POPUP_Z_INDEX = 1050;
const MASK_ANIMATION_DURATION = 180;

let parentScrollLockCount = 0;
let parentScrollLocked = [];

const lockParentScroll = getScrollElements => {
  parentScrollLockCount += 1;
  if (parentScrollLockCount === 1) {
    const targets = [];
    if (typeof document !== 'undefined') {
      targets.push(document.body);
      if (document.documentElement) {
        targets.push(document.documentElement);
      }
    }
    (typeof getScrollElements === 'function' ? getScrollElements() : []).forEach(el => {
      if (el && !targets.includes(el)) {
        targets.push(el);
      }
    });
    parentScrollLocked = targets.map(el => {
      const prev = {
        overflow: el.style.overflow,
        overscrollBehavior: el.style.overscrollBehavior
      };
      el.style.overflow = 'hidden';
      el.style.overscrollBehavior = 'none';
      return { el, prev };
    });
  }
  return () => {
    parentScrollLockCount = Math.max(0, parentScrollLockCount - 1);
    if (parentScrollLockCount === 0) {
      parentScrollLocked.forEach(({ el, prev }) => {
        el.style.overflow = prev.overflow;
        el.style.overscrollBehavior = prev.overscrollBehavior;
      });
      parentScrollLocked = [];
    }
  };
};

const useLockParentScroll = (enabled, getScrollElements) => {
  useEffect(() => {
    if (!enabled) {
      return undefined;
    }
    return lockParentScroll(getScrollElements);
  }, [enabled, getScrollElements]);
};

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

// 与 Modal 模式一致：面板内用临时 value，确认后才写回
const ModalContent = ({ children: renderContent, ...others }) => {
  const { open, value: propsValue } = others;
  const [value, setValue] = useState(propsValue);
  useEffect(() => {
    if (open && !isEqual(value, propsValue)) {
      setValue(propsValue);
    }
  }, [open]);
  // 半屏(isPopup=true)拦截内容区 onOpenChange(false)，避免单选自动关（由取消/确认关）；
  // Modal 模式(isPopup=false)必须放行关闭，否则取消/右上角关不掉
  const contextProps = Object.assign({}, others, {
    value,
    setValue,
    onComplete: () => others.setValue(value),
    onAdd: item => others.onAdd(item, setValue),
    onSelect: item => others.onSelect(item, setValue),
    onRemove: item => others.onRemove(item, setValue),
    onOpenChange: nextOpen => {
      if (nextOpen || others.props?.isPopup === false) {
        others.onOpenChange && others.onOpenChange(!!nextOpen);
      }
    }
  });

  return <Provider value={contextProps}>{renderContent(contextProps)}</Provider>;
};

const MobileSheetMask = ({ open, mountNode, fixedModeClass, onClose }) => {
  const [renderMask, setRenderMask] = useState(false);
  const [maskClosing, setMaskClosing] = useState(false);

  useEffect(() => {
    if (open) {
      setRenderMask(true);
      setMaskClosing(false);
      return;
    }
    if (!renderMask) return;
    setMaskClosing(true);
    const timer = setTimeout(() => {
      setRenderMask(false);
      setMaskClosing(false);
    }, MASK_ANIMATION_DURATION);
    return () => {
      clearTimeout(timer);
    };
  }, [open, renderMask]);

  if (!renderMask || !mountNode) {
    return null;
  }

  return createPortal(
    <div
      className={classnames(style['mobile-sheet-mask'], maskClosing && style['mobile-sheet-mask-leave'], fixedModeClass)}
      style={{ zIndex: MOBILE_MASK_Z_INDEX }}
      onClick={onClose}
      onTouchMove={e => {
        e.preventDefault();
      }}
    />,
    mountNode
  );
};

const MobileSheetHeader = ({ title, cancelText, confirmText, onCancel, onConfirm }) => {
  return (
    <div className={style['mobile-sheet-header']}>
      <button type="button" className={style['mobile-sheet-action']} onClick={onCancel}>
        {cancelText}
      </button>
      <div className={style['mobile-sheet-title']} title={title}>
        {title}
      </div>
      <button type="button" className={classnames(style['mobile-sheet-action'], style['mobile-sheet-confirm'])} onClick={onConfirm}>
        {confirmText}
      </button>
    </div>
  );
};

const MobileSheetPanel = ({ open, mountNode, fixedModeClass, overlayClassName, title, cancelText, confirmText, onCancel, onConfirm, children }) => {
  if (!open || !mountNode) {
    return null;
  }
  return createPortal(
    <div
      className={classnames(style['mobile-sheet-popup'], style['mobile-sheet-portal'], fixedModeClass, overlayClassName)}
      style={{ zIndex: MOBILE_POPUP_Z_INDEX, maxHeight: MOBILE_SHEET_MAX_HEIGHT, minHeight: MOBILE_SHEET_MIN_HEIGHT }}
      onTouchMove={e => {
        // 仅非列表区域阻止穿透；列表滚动容器内允许原生滚动
        const scrollable = e.target.closest('.simplebar-content-wrapper, .simplebar-content, .select-list-scroll-list, .select-table-list-scroll-list, .select-tree-scroll-list, .load-container, .info-page-table-mobile-card-list');
        if (!scrollable) {
          e.preventDefault();
        }
      }}
    >
      <MobileSheetHeader title={title} cancelText={cancelText} confirmText={confirmText} onCancel={onCancel} onConfirm={onConfirm} />
      <div
        className={classnames(style['mobile-sheet-body'], style['overlay-content'], 'over-content')}
        onClick={e => {
          e.stopPropagation();
        }}
      >
        {children}
      </div>
    </div>,
    mountNode
  );
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
        size: 'default',
        disableMobileSheet: false,
        renderModal: contextProps => {
          const { props, open, onComplete, onOpenChange, isMobile, getPopupContainer, formatMessage, fixedModeClass } = contextProps;
          const { placeholder, children, overlayClassName, disableMobileSheet } = props;
          if (isMobile && !disableMobileSheet) {
            const mountNode = typeof getPopupContainer === 'function' ? getPopupContainer() : null;
            const closeWithoutCommit = () => onOpenChange(false);
            return (
              <>
                <MobileSheetMask open={open} mountNode={mountNode} fixedModeClass={fixedModeClass} onClose={closeWithoutCommit} />
                <MobileSheetPanel
                  open={open}
                  mountNode={mountNode}
                  fixedModeClass={fixedModeClass}
                  overlayClassName={overlayClassName}
                  title={placeholder}
                  cancelText={formatMessage({ id: 'cancel' })}
                  confirmText={formatMessage({ id: 'confirm' })}
                  onCancel={closeWithoutCommit}
                  onConfirm={() => {
                    onComplete();
                    onOpenChange(false);
                  }}
                >
                  {open ? children(contextProps) : null}
                </MobileSheetPanel>
              </>
            );
          }
          return (
            <Modal
              className={overlayClassName}
              width={1000}
              open={open}
              destroyOnClose
              destroyOnHidden
              title={placeholder}
              onCancel={() => {
                onOpenChange(false);
              }}
              onOk={() => {
                onComplete();
                onOpenChange(false);
              }}
            >
              {open ? children(contextProps) : null}
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

    const {
      children,
      prefix,
      suffix,
      className,
      maxLength,
      overlayClassName,
      overlayStyle,
      getPopupContainer: getPopupContainerProp,
      zIndex,
      align,
      autoAdjustOverflow,
      transitionName,
      single,
      labelWrap,
      isPopup,
      allowClear,
      disabled,
      placeholder,
      selectedAllValue,
      overlayWidth,
      placement,
      renderModal,
      labelKey,
      valueKey,
      size,
      disableMobileSheet
    } = props;

    const getPopupContainerDefault = usePopupContainer();
    const getScrollElement = useScrollElement();
    const wrapCustomGetPopupContainer = useMemo(() => {
      if (typeof getPopupContainerProp === 'function') {
        return triggerNode => getPopupContainerProp(triggerNode) || null;
      }
      if (getPopupContainerProp) {
        return () => getPopupContainerProp;
      }
      return undefined;
    }, [getPopupContainerProp]);
    const {
      isMobile,
      fixedModeClass,
      getPopupContainer: getSheetPopupContainer,
      anchorRef
    } = useMobilePopupMount({
      cover: 'viewport',
      getPopupContainer: wrapCustomGetPopupContainer
    });
    const useMobileSheet = isMobile && !disableMobileSheet;
    const useBoundaryMount = !!(isMobile && fixedModeClass === MOBILE_POPUP_MODE.boundary);

    const mergedOverlayStyle = useMemo(() => {
      return Object.assign({}, overlayStyle, zIndex != null ? { zIndex } : null);
    }, [overlayStyle, zIndex]);

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
    const [innerWidth, setInnerWidth] = useState(0);
    const [containerWidth, setContainerWidth] = useState(0);
    const [popupMountNode, setPopupMountNode] = useState(null);

    const containerWidthChange = el => {
      if (!el) {
        return;
      }
      const containerWidth = el.clientWidth;
      setContainerWidth(containerWidth);
      const innerEl = el.querySelector('.select-input-inner');
      setInnerWidth(innerEl.clientWidth);
    };

    const popupOverlayWidth = useMemo(() => {
      return numberToPx(Math.max(containerWidth, pxToNumber(overlayWidth)));
    }, [containerWidth, overlayWidth]);

    const resizeRef = useResize(containerWidthChange);
    const setContainerRef = useCallback(
      node => {
        resizeRef.current = node;
        anchorRef(node);
      },
      [anchorRef, resizeRef]
    );

    const resolveGetPopupContainer = useCallback(
      triggerNode => {
        if (typeof getPopupContainerProp === 'function') {
          const customContainer = getPopupContainerProp(triggerNode);
          if (customContainer) {
            return customContainer;
          }
        } else if (getPopupContainerProp) {
          return getPopupContainerProp;
        }
        if (useMobileSheet) {
          return getSheetPopupContainer(triggerNode);
        }
        return getPopupContainerDefault(triggerNode);
      },
      [getPopupContainerDefault, getPopupContainerProp, getSheetPopupContainer, useMobileSheet]
    );

    // 打开时再取挂载节点，避免落到错误容器
    useLayoutEffect(() => {
      if (!useMobileSheet) {
        setPopupMountNode(null);
        return;
      }
      setPopupMountNode(resolveGetPopupContainer(resizeRef.current) || (typeof document !== 'undefined' ? document.body : null));
    }, [useMobileSheet, resolveGetPopupContainer, open, resizeRef]);

    const getLockScrollTargets = useCallback(() => {
      const targets = [];
      const scrollEl = typeof getScrollElement === 'function' ? getScrollElement() : null;
      if (scrollEl) {
        targets.push(scrollEl);
      }
      const mountNode = popupMountNode;
      if (mountNode && mountNode !== document.body) {
        targets.push(mountNode);
      }
      return targets;
    }, [getScrollElement, popupMountNode]);

    const sheetOpen = !disabled && open;
    useLockParentScroll(useMobileSheet && sheetOpen, getLockScrollTargets);

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

    const handleOpenChange = useCallback(
      nextOpen => {
        setOpen(nextOpen);
      },
      [setOpen]
    );

    // 关闭时清空搜索，保证下次展开重新请求且从初始搜索态开始
    useEffect(() => {
      if (!open) {
        setSearchProps({});
      }
    }, [open]);

    const contextProps = {
      props,
      value: value,
      setValue,
      searchProps,
      setSearchProps,
      hover,
      inputWidth: containerWidth,
      onAdd,
      onRemove,
      onSelect,
      open: !disabled && open,
      onOpenChange: setOpen,
      children,
      isMobile,
      useBoundaryMount,
      fixedModeClass,
      getPopupContainer: resolveGetPopupContainer,
      formatMessage
    };

    const inputInnerRender = (props = {}) => {
      if (typeof contextProps.props.inputRender === 'function') {
        return contextProps.props.inputRender(props, contextProps);
      }
      return (
        <Flex
          {...props}
          ref={setContainerRef}
          className={classnames(className, style['select-input'], 'select-input', {
            [style['wrap']]: labelWrap,
            [style['disabled']]: disabled,
            [style['small']]: size === 'small',
            [style['large']]: size === 'large',
            [style['is-mobile']]: isMobile
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
                <span className={classnames(style['single-label'], 'select-input-single-label')} title={value[0][labelKey]}>
                  {value[0][labelKey]}
                </span>
              ) : (
                <TagOverflowInner value={value} innerWidth={innerWidth} labelKey={labelKey} valueKey={valueKey} onRemove={onRemove} />
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

    // 嵌入模式内容常显，视为已展开，保证会发起请求
    if (props.renderContent && typeof props.renderContent === 'function') {
      return props.renderContent(children(Object.assign({}, contextProps, { open: true })));
    }

    const isOverlayOpen = !disabled && open;

    // 移动端半屏：与 Modal 一致，临时选中 + 取消/确认
    if (useMobileSheet) {
      const closeWithoutCommit = () => setOpen(false);
      return (
        <Provider value={contextProps}>
          {inputInnerRender({
            onClick: () => {
              if (!disabled) {
                setOpen(true);
              }
            }
          })}
          <ModalContent {...contextProps}>
            {sheetContextProps => {
              const { onComplete } = sheetContextProps;
              return (
                <>
                  <MobileSheetMask open={sheetOpen} mountNode={popupMountNode} fixedModeClass={fixedModeClass} onClose={closeWithoutCommit} />
                  <MobileSheetPanel
                    open={sheetOpen}
                    mountNode={popupMountNode}
                    fixedModeClass={fixedModeClass}
                    overlayClassName={overlayClassName}
                    title={placeholder}
                    cancelText={formatMessage({ id: 'cancel' })}
                    confirmText={formatMessage({ id: 'confirm' })}
                    onCancel={closeWithoutCommit}
                    onConfirm={() => {
                      onComplete();
                      setOpen(false);
                    }}
                  >
                    {/* 仅展开时挂载列表，关闭卸载以便下次展开重新请求 */}
                    {sheetOpen ? children(sheetContextProps) : null}
                  </MobileSheetPanel>
                </>
              );
            }}
          </ModalContent>
        </Provider>
      );
    }

    const overlayContent = (
      <div
        style={{ '--overlay-width': popupOverlayWidth }}
        className={classnames(style['overlay-content'], 'over-content')}
        onClick={e => {
          e.stopPropagation();
        }}
      >
        {/* 仅展开时挂载列表，关闭卸载以便下次展开重新请求 */}
        {isOverlayOpen ? children(contextProps) : null}
      </div>
    );

    return (
      <Provider value={contextProps}>
        {isPopup ? (
          <Dropdown
            open={isOverlayOpen}
            onOpenChange={handleOpenChange}
            placement={placement}
            arrow={false}
            getPopupContainer={resolveGetPopupContainer}
            overlayClassName={classnames(style['overlay'], overlayClassName)}
            overlayStyle={mergedOverlayStyle}
            align={align}
            autoAdjustOverflow={autoAdjustOverflow}
            transitionName={transitionName}
            trigger="click"
            destroyPopupOnHide
            destroyOnHidden
            popupRender={() => overlayContent}
            dropdownRender={() => overlayContent}
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
