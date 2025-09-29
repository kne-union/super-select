const { SelectTableList } = _SuperSelect;
const { Space, Button } = antd;

const optionList = Array.from({ length: 20 }).map((item, key) => {
  return {
    id: key + 1, label: `名称${key + 1}`, count: key + 1, description: `描述${key + 1}`, disabled: key === 1
  };
});

const columns = [{
  name: 'label', title: '名称', span: 8
}, {
  name: 'count', title: '数量', span: 8
}, {
  name: 'description', title: '描述', span: 8
}];

const BaseExample = () => {
  return <Space wrap>
    <SelectTableList options={optionList} columns={columns} valueKey="id" footer={<Button type="link">预览</Button>} />
    <SelectTableList single options={optionList} columns={columns} valueKey="id"
                     footer={<Button type="link">预览</Button>} />
    <SelectTableList allowSelectedAll options={optionList} columns={columns} valueKey="id"
                     footer={<Button type="link">预览</Button>} />
    <SelectTableList options={optionList} columns={columns} isPopup={false} valueKey="id"
                     footer={<Button type="link">预览</Button>} />
    <SelectTableList allowSelectedAll options={optionList} columns={columns} isPopup={false} valueKey="id"
                     footer={<Button type="link">预览</Button>} />
    <SelectTableList single options={optionList} columns={columns} isPopup={false} valueKey="id"
                     footer={<Button type="link">预览</Button>} />
    <SelectTableList single options={[]} columns={columns} isPopup={false} valueKey="id"
                     footer={<Button type="link">预览</Button>} />
  </Space>;
};

render(<BaseExample />);
