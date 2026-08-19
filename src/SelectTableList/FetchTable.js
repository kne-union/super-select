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
      open: false,
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
  const showPagination = paginationMerged.open && formatData.total > 0;
  const currentPage = get(requestParams, [paginationMerged.paramsType, paginationMerged.currentName], 1);
  const currentPageSize = Number(get(requestParams, [paginationMerged.paramsType, paginationMerged.pageSizeName], paginationMerged.pageSize)) || paginationMerged.pageSize || 20;

  return (
    <>
      <Table {...tableProps} dataSource={formatData.list || []} pagination={false} columns={columns} context={tableContext} columnRenderProps={tableContext} />
      {showPagination ? (
        <Pagination
          total={formatData.total}
          current={currentPage}
          pageSize={currentPageSize}
          showSizeChanger={paginationMerged.showSizeChanger}
          showQuickJumper={paginationMerged.showQuickJumper}
          hideOnSinglePage={paginationMerged.hideOnSinglePage}
          onChange={(page, size) => {
            (paginationMerged.requestType === 'refresh' ? refresh : reload)({
              [paginationMerged.paramsType]: Object.assign({}, get(requestParams, paginationMerged.paramsType), {
                [paginationMerged.currentName]: page,
                [paginationMerged.pageSizeName]: size
              })
            });
          }}
        />
      ) : null}
    </>
  );
};

const FetchTable = withFetch(FetchTableContent);

export default FetchTable;
