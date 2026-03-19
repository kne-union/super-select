import React, { useState, useLayoutEffect, useRef } from 'react';
import { Tag } from 'antd';
import style from './style.module.scss';

/**
 * 标签溢出内部渲染组件
 * 根据 innerWidth 计算标签显示数量
 */
const TagOverflowInner = ({ value, innerWidth, labelKey, valueKey, onRemove, overflowTagWidth = 45, iconSpace = 20 }) => {
  const [visibleCount, setVisibleCount] = useState(value.length);

  const measureRef = useRef(null);

  // 测量每个标签的实际宽度并计算可见数量
  useLayoutEffect(() => {
    // innerWidth 为 0 时，保持当前状态，等待正确的宽度
    if (!measureRef.current || innerWidth === 0 || value.length === 0) {
      setVisibleCount(value.length);
      return;
    }

    const tagElements = measureRef.current.querySelectorAll('[data-tag-measure]');
    if (tagElements.length === 0) return;

    // 获取每个标签的实际占用宽度（包含 margin）
    const tagWidths = Array.from(tagElements).map(el => {
      const style = window.getComputedStyle(el);
      const marginLeft = parseFloat(style.marginLeft) || 0;
      const marginRight = parseFloat(style.marginRight) || 0;
      return el.offsetWidth + marginLeft + marginRight;
    });

    const availableWidth = innerWidth - iconSpace;

    let totalWidth = 0;
    let count = 0;

    for (let i = 0; i < tagWidths.length; i++) {
      // 如果不是最后一个，需要预留 +N 标签空间
      const needOverflowSpace = i < tagWidths.length - 1;
      const requiredWidth = tagWidths[i] + (needOverflowSpace ? overflowTagWidth : 0);

      if (totalWidth + requiredWidth <= availableWidth) {
        totalWidth += tagWidths[i];
        count++;
      } else {
        break;
      }
    }

    // 确保至少显示一个标签
    setVisibleCount(Math.max(1, count));
  }, [value, innerWidth, overflowTagWidth, iconSpace]);

  // 计算单个标签最大宽度：min(150px, innerWidth - 60)，初始状态默认 150px
  const maxTagWidth = innerWidth > 0 ? Math.min(150, Math.max(60, innerWidth - 60)) : 150;
  const displayTags = value.slice(0, visibleCount);
  const hiddenCount = value.length - visibleCount;

  return (
    <>
      {/* 隐藏的测量层 */}
      <div ref={measureRef} className={style['measure-layer']}>
        {value.map(item => (
          <Tag key={item[valueKey]} data-tag-measure closable bordered={false} className={style['tag-item']} style={{ '--max-tag-width': `${maxTagWidth}px` }}>
            <span className={style['tag-label']}>{item[labelKey]}</span>
          </Tag>
        ))}
      </div>
      {/* 实际显示的标签 */}
      {displayTags.map(item => (
        <Tag
          key={item[valueKey]}
          closable
          bordered={false}
          className={style['tag-item']}
          style={{ '--max-tag-width': `${maxTagWidth}px` }}
          onClose={e => {
            e.preventDefault();
            onRemove(item);
          }}
        >
          <span className={style['tag-label']} title={item[labelKey]}>
            {item[labelKey]}
          </span>
        </Tag>
      ))}
      {hiddenCount > 0 && <Tag className={style['overflow-tag']}>+{hiddenCount}</Tag>}
    </>
  );
};

export default TagOverflowInner;
