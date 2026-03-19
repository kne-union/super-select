const { default: SuperSelect } = _SuperSelect;
const { Space, Button, Flex, Divider, Tag, Switch } = antd;
const { useState } = React;

// 模拟部门数据
const departmentOptions = [
  { value: 'tech', label: '技术研发部', disabled: false },
  { value: 'product', label: '产品设计部', disabled: false },
  { value: 'operation', label: '运营管理部', disabled: false },
  { value: 'hr', label: '人力资源部', disabled: false },
  { value: 'finance', label: '财务部', disabled: true },
  { value: 'marketing', label: '市场营销部', disabled: false }
];

// 模拟用户数据
const userOptions = Array.from({ length: 30 }).map((_, index) => ({
  value: `user_${index + 1}`,
  label: `用户${index + 1}`,
  email: `user${index + 1}@company.com`,
  department: departmentOptions[index % departmentOptions.length].label,
  disabled: index === 5
}));

// 基础列表选择
const BasicListExample = ({ isPopup }) => {
  const [value, setValue] = useState([]);

  return (
    <Flex vertical gap={8}>
      <span>多选列表：</span>
      <SuperSelect
        options={departmentOptions}
        value={value}
        onChange={setValue}
        isPopup={isPopup}
        placeholder="请选择部门"
        style={{ width: 280 }}
      />
      {value.length > 0 && (
        <div>已选：{value.map(item => item.label).join('、')}</div>
      )}
    </Flex>
  );
};

// 单选列表
const SingleSelectExample = ({ isPopup }) => {
  const [value, setValue] = useState(null);

  return (
    <Flex vertical gap={8}>
      <span>单选列表：</span>
      <SuperSelect
        single
        options={userOptions.slice(0, 10)}
        value={value}
        onChange={setValue}
        isPopup={isPopup}
        placeholder="请选择负责人"
        style={{ width: 280 }}
      />
      {value && <div>已选：{value.label}</div>}
    </Flex>
  );
};

// 带搜索的选择
const SearchableExample = ({ isPopup }) => {
  const [value, setValue] = useState([]);

  return (
    <Flex vertical gap={8}>
      <span>带搜索功能：</span>
      <SuperSelect
        options={userOptions}
        value={value}
        onChange={setValue}
        isPopup={isPopup}
        placeholder="搜索并选择用户"
        getSearchCallback={({ searchText }, item) => {
          if (!searchText) return true;
          const keyword = searchText.toLowerCase();
          return (
            item.label.toLowerCase().includes(keyword) ||
            item.email.toLowerCase().includes(keyword)
          );
        }}
        style={{ width: 320 }}
      />
    </Flex>
  );
};

// 全选功能
const SelectAllExample = ({ isPopup }) => {
  const [value, setValue] = useState([]);

  return (
    <Flex vertical gap={8}>
      <span>支持全选：</span>
      <SuperSelect
        allowSelectedAll
        options={departmentOptions.filter(item => !item.disabled)}
        value={value}
        onChange={setValue}
        isPopup={isPopup}
        placeholder="请选择部门（支持全选）"
        style={{ width: 280 }}
      />
    </Flex>
  );
};

// 带数量限制
const MaxLimitExample = ({ isPopup }) => {
  const [value, setValue] = useState([]);

  return (
    <Flex vertical gap={8}>
      <span>最多选择3项：</span>
      <SuperSelect
        options={userOptions.slice(0, 10)}
        value={value}
        onChange={setValue}
        isPopup={isPopup}
        maxLength={3}
        placeholder="请选择（最多3项）"
        style={{ width: 320 }}
      />
      <Tag color={value.length >= 3 ? 'red' : 'blue'}>
        已选择 {value.length}/3 项
      </Tag>
    </Flex>
  );
};

// 自定义渲染
const CustomRenderExample = () => {
  return (
    <Flex vertical gap={8}>
      <span>自定义输入框渲染：</span>
      <SuperSelect
        options={departmentOptions}
        inputRender={(props, context) => {
          const { value } = context;
          return (
            <Button type="primary" {...props}>
              {value.length > 0 ? `已选择 ${value.length} 项` : '点击选择部门'}
            </Button>
          );
        }}
      />
    </Flex>
  );
};

const BaseExample = () => {
  const [isPopup, setIsPopup] = useState(true);

  return (
    <Flex vertical gap={24}>
      <Flex align="center" gap={12}>
        <span>展示模式：</span>
        <Switch
          checked={isPopup}
          onChange={setIsPopup}
          checkedChildren="下拉"
          unCheckedChildren="弹窗"
        />
        <span style={{ color: '#666', fontSize: 12 }}>
          {isPopup ? '点击输入框展开下拉菜单' : '点击输入框打开弹窗'}
        </span>
      </Flex>
      <Divider />
      <BasicListExample isPopup={isPopup} />
      <Divider />
      <SingleSelectExample isPopup={isPopup} />
      <Divider />
      <SearchableExample isPopup={isPopup} />
      <Divider />
      <SelectAllExample isPopup={isPopup} />
      <Divider />
      <MaxLimitExample isPopup={isPopup} />
      <Divider />
      <CustomRenderExample />
    </Flex>
  );
};

render(<BaseExample />);
