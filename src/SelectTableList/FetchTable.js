import React, { useState, useEffect, useCallback, useRef } from 'react';
import { withFetch } from '@kne/react-fetch';
import { Pagination } from 'antd';
import { Table } from '@kne/table-view';
import get from 'lodash/get';

const defaultDataFormat = data => ({
  list: data?.pageData,
  total: data?.totalCount,
  data
});

const FetchTableContent = ({ data, reload, refresh, requestParams, fetchProps, dataFormat = defaultDataFormat, pagination, columns, columnRenderProps, ...tableProps }) => {
  const paginationMerged = Object.assign(
    {
      open: true,
      paramsType: 'data',
      requestType: 'reload',
      currentName: 'currentPage',
      pageSizeName: 'perPage',
      pageSize: 20,
      showSizeChanger: false,
      showQuickJumper: false,
      hideOnSinglePage: true
    },
    pagination
  );
  const formatData = dataFormat(data);
  const tableContext = Object.assign({}, columnRenderProps, { data, requestParams, fetchProps });
  const currentPage = get(requestParams, [paginationMerged.paramsType, paginationMerged.currentName], 1);
  const currentPageSize = Number(get(requestParams, [paginationMerged.paramsType, paginationMerged.pageSizeName], paginationMerged.pageSize)) || paginationMerged.pageSize || 20;
  const hasMore = formatData.total > currentPage * currentPageSize;
  const showPagination = paginationMerged.open && formatData.total > 0;

  const isLoadMoreMode = !paginationMerged.open;

  const [accumulatedList, setAccumulatedList] = useState([]);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const isLoadingMoreRef = useRef(false);
  const prevDataRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    if (!isLoadMoreMode) return;
    if (data === prevDataRef.current) return;
    prevDataRef.current = data;

    const newList = formatData.list || [];
    if (currentPage <= 1) {
      setAccumulatedList(newList);
    } else {
      setAccumulatedList(prev => prev.concat(newList));
    }
    setIsLoadingMore(false);
    isLoadingMoreRef.current = false;
  }, [data, isLoadMoreMode, currentPage, formatData.list]);

  const doLoadNextPage = useCallback(() => {
    if (isLoadingMoreRef.current || !hasMore || !isLoadMoreMode) return;
    isLoadingMoreRef.current = true;
    setIsLoadingMore(true);
    const nextPage = currentPage + 1;
    const currentParams = get(requestParams, paginationMerged.paramsType, {});
    (paginationMerged.requestType === 'refresh' ? refresh : reload)({
      [paginationMerged.paramsType]: Object.assign({}, currentParams, {
        [paginationMerged.currentName]: nextPage,
        [paginationMerged.pageSizeName]: currentPageSize
      })
    });
  }, [hasMore, isLoadMoreMode, currentPage, requestParams, paginationMerged, refresh, reload, currentPageSize]);

  useEffect(() => {
    if (!isLoadMoreMode) return;
    const container = containerRef.current;
    if (!container) return;
    const scrollEl = container.querySelector('.ant-table-body') || container.closest('.select-table-list-scroll-list');
    if (!scrollEl) return;

    const onScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = scrollEl;
      if (scrollHeight - scrollTop - clientHeight < 50) {
        doLoadNextPage();
      }
    };
    scrollEl.addEventListener('scroll', onScroll, { passive: true });
    return () => scrollEl.removeEventListener('scroll', onScroll);
  }, [isLoadMoreMode, doLoadNextPage]);

  // 如果当前列表高度没有超过容器（弹窗模式可能不出现滚动条），
  // 仅靠 scroll 事件无法触发 loadMore：自动补页直到出现溢出或没有更多。
  const autoLoadCountRef = useRef(0);
  useEffect(() => {
    if (!isLoadMoreMode) return;
    if (isLoadingMoreRef.current) return;
    if (!hasMore) return;

    const container = containerRef.current;
    if (!container) return;
    const scrollEl = container.querySelector('.ant-table-body') || container.closest('.select-table-list-scroll-list');
    if (!scrollEl) return;

    const isOverflowing = scrollEl.scrollHeight > scrollEl.clientHeight + 1;
    if (isOverflowing) {
      autoLoadCountRef.current = 0;
      return;
    }

    if (autoLoadCountRef.current >= 5) return;
    autoLoadCountRef.current += 1;

    setTimeout(() => doLoadNextPage(), 0);
  }, [isLoadMoreMode, hasMore, data, currentPage, currentPageSize, doLoadNextPage]);

  const displayList = isLoadMoreMode ? accumulatedList : formatData.list || [];

  return (
    <div ref={containerRef}>
      <Table {...tableProps} dataSource={displayList} pagination={false} columns={columns} context={tableContext} columnRenderProps={tableContext} />
      {showPagination ? (
        <div style={{ padding: '8px 12px', display: 'flex', justifyContent: 'flex-end' }}>
          <Pagination
            size="small"
            total={formatData.total}
            current={currentPage}
            pageSize={currentPageSize}
            showSizeChanger={paginationMerged.showSizeChanger}
            showQuickJumper={paginationMerged.showQuickJumper}
            hideOnSinglePage={paginationMerged.hideOnSinglePage}
            onChange={(page, size) => {
              const currentParams = get(requestParams, paginationMerged.paramsType, {});
              (paginationMerged.requestType === 'refresh' ? refresh : reload)({
                [paginationMerged.paramsType]: Object.assign({}, currentParams, {
                  [paginationMerged.currentName]: page,
                  [paginationMerged.pageSizeName]: size
                })
              });
            }}
          />
        </div>
      ) : null}
      {isLoadMoreMode ? (
        <div
          style={{
            textAlign: 'center',
            padding: '8px 0',
            color: '#999',
            fontSize: 12,
            height: 32,
            visibility: isLoadingMore ? 'visible' : 'hidden'
          }}
        >
          加载中...
        </div>
      ) : null}
    </div>
  );
};

const FetchTable = withFetch(FetchTableContent);

export default FetchTable;
