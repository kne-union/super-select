const { SelectInput } = _SuperSelect;
const { Space, Flex } = antd;

const BaseExample = () => {
  return <Flex vertical gap={8}>
    <Space>
      <SelectInput />
      <SelectInput defaultValue={[{ value: 0, label: '第一项' }, { value: 1, label: '第二项' }]} />
      <SelectInput defaultValue={[{ value: 'all', label: '全选' }]} />
      <SelectInput className="max-width-150" defaultValue={Array.from({ length: 10 }).map((value, index) => {
        return { value: index, label: `第${index}项` };
      })} />
      <SelectInput defaultValue={[{ value: 0, label: '第一项' }, { value: 1, label: '第二项' }]} disabled />
    </Space>
    <Space>
      <SelectInput isPopup={false}/>
    </Space>
  </Flex>;
};

render(<BaseExample />);
