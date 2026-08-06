import React, { useMemo } from 'react';
import { Tag } from 'antd';
import { useOverflowItems } from '@kne/overflow-items';
import style from './style.module.scss';

const TAG_GAP = 8;

/**
 * 标签溢出：用 @kne/overflow-items 按容器宽度计算可见数量，预留 +N。
 */
const TagOverflowInner = ({ value, innerWidth, labelKey, valueKey, onRemove, iconSpace = 20 }) => {
  const list = Array.isArray(value) ? value : [];
  const availableWidth = Math.max((innerWidth || 0) - iconSpace, 0);
  const maxTagWidth = innerWidth > 0 ? Math.min(150, Math.max(60, innerWidth - 60)) : 150;

  const shareItems = useMemo(
    () =>
      list.map(item => ({
        key: item?.[valueKey],
        label: item?.[labelKey]
      })),
    [list, labelKey, valueKey]
  );

  const { setContainerRef, setMeasureRef, setMoreMeasureRef, visibleCount, ready, hiddenCount, shouldMeasure } = useOverflowItems({
    itemCount: list.length,
    items: shareItems,
    enabled: list.length > 0 && availableWidth > 0,
    gap: TAG_GAP,
    beforeReady: 'all',
    debounce: 0,
    itemSelector: '[data-tag-measure]'
  });

  const displayCount = ready ? visibleCount : list.length;
  const displayTags = list.slice(0, displayCount);
  const showOverflow = ready && hiddenCount > 0;

  return (
    <div ref={setContainerRef} className={style['tag-overflow']} style={{ width: availableWidth || '100%', maxWidth: '100%' }}>
      {shouldMeasure ? (
        <div ref={setMeasureRef} className={style['measure-layer']} aria-hidden style={{ gap: TAG_GAP }}>
          {list.map(item => (
            <div key={item[valueKey]} data-tag-measure>
              <Tag closable bordered={false} className={style['tag-item']} style={{ '--max-tag-width': `${maxTagWidth}px`, margin: 0 }}>
                <span className={style['tag-label']}>{item[labelKey]}</span>
              </Tag>
            </div>
          ))}
          <div ref={setMoreMeasureRef}>
            <Tag className={style['overflow-tag']} style={{ margin: 0 }}>
              +99
            </Tag>
          </div>
        </div>
      ) : null}
      <div className={style['tag-overflow-content']} style={{ gap: TAG_GAP }}>
        {displayTags.map(item => (
          <Tag
            key={item[valueKey]}
            closable
            bordered={false}
            className={style['tag-item']}
            style={{ '--max-tag-width': `${maxTagWidth}px`, margin: 0 }}
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
        {showOverflow ? <Tag className={style['overflow-tag']}>+{hiddenCount}</Tag> : null}
      </div>
    </div>
  );
};

export default TagOverflowInner;
