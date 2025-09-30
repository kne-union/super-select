const { SelectTableList } = _SuperSelect;
const { Space, Button, Divider } = antd;

const optionList = Array.from({ length: 20 }).map((item, key) => {
  return {
    id: key + 1, label: `名称${key + 1}`, count: key + 1, description: `描述${key + 1}`, disabled: key === 1
  };
});

const columns = [{
  name: 'label', title: '名称', span: 8
}, {
  name: 'count', title: '数量', span: 4
}, {
  name: 'description', title: '描述', span: 8
}, {
  name: 'options', title: '操作', span: 4, getValueOf: (item, { column, context }) => {
    return <Button type="link" danger disabled={!!item.disabled} className="btn-no-padding" onClick={(e) => {
      e.stopPropagation();
      const { data, setData } = context.fetchApi;
      if (context.value) {
        //如果已选数据中还有该项，需要同时删除
        const index = context.value.findIndex((target) => target.id === item.id);
        if (index > -1) {
          const newValue = context.value.slice(0);
          newValue.splice(index, 1);
          context.setValue(newValue);
        }
      }
      const index = data.pageData.findIndex((target) => target.id === item.id);
      const newPageData = data.pageData.slice(0);
      newPageData.splice(index, 1);
      setData(Object.assign({}, data, {
        pageData: newPageData
      }));
    }}>删除</Button>;
  }
}];

const BaseExample = () => {
  return <Space wrap>
    <SelectTableList options={optionList} columns={columns} valueKey="id" footer={<Button type="link">预览</Button>} />
    <SelectTableList single options={optionList} columns={columns} valueKey="id"
                     footer={<Button type="link">预览</Button>} />
    <SelectTableList allowSelectedAll options={optionList} columns={columns} valueKey="id"
                     footer={<Button type="link">预览</Button>} getSearchCallback={({ searchText }, item) => {
      return !searchText || item.label.indexOf(searchText) > -1;
    }} />
    <SelectTableList options={optionList} columns={columns} isPopup={false} valueKey="id"
                     footer={<Button type="link">预览</Button>} />
    <SelectTableList allowSelectedAll options={optionList} columns={columns} isPopup={false} valueKey="id"
                     footer={<Button type="link">预览</Button>} getSearchCallback={({ searchText }, item) => {
      return !searchText || item.label.indexOf(searchText) > -1;
    }} />
    <SelectTableList single options={optionList} columns={columns} isPopup={false} valueKey="id"
                     footer={<Button type="link">预览</Button>} />
    <SelectTableList single options={[]} columns={columns} isPopup={false} valueKey="id"
                     footer={<Button type="link">预览</Button>} />
    <div>
      <Divider />
      <SelectTableList allowSelectedAll options={optionList} columns={columns} isPopup={false} valueKey="id"
                       onChange={(value) => {
                         console.log(value);
                       }} getSearchCallback={({ searchText }, item) => {
        return !searchText || item.label.indexOf(searchText) > -1;
      }} footer={<Button type="link">预览</Button>} renderContent={(target) => target} />
    </div>
  </Space>;
};

render(<BaseExample />);
