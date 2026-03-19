const { SelectTableList } = _SuperSelect;
const { Space, Button, Flex, Divider, Tag, Avatar, Switch } = antd;
const { useState } = React;

// 模拟员工数据
const employeeOptions = Array.from({ length: 25 }).map((_, index) => ({
  id: `emp_${index + 1}`,
  name: `员工${index + 1}`,
  email: `employee${index + 1}@company.com`,
  department: ['技术研发部', '产品设计部', '运营部', '市场部'][index % 4],
  position: ['工程师', '设计师', '经理', '专员'][index % 4],
  status: index === 3 ? 'inactive' : 'active',
  joinDate: `2023-${String((index % 12) + 1).padStart(2, '0')}-15`
}));

// 员工列表列配置
const employeeColumns = [
  {
    name: 'name',
    title: '姓名',
    span: 6,
    getValueOf: (item) => (
      <Flex align="center" gap={8}>
        <Avatar size="small" style={{ backgroundColor: '#1677ff' }}>
          {item.name.slice(-2)}
        </Avatar>
        <span>{item.name}</span>
      </Flex>
    )
  },
  {
    name: 'department',
    title: '部门',
    span: 6
  },
  {
    name: 'position',
    title: '职位',
    span: 4
  },
  {
    name: 'email',
    title: '邮箱',
    span: 6,
    getValueOf: (item) => (
      <span style={{ color: '#666', fontSize: 12 }}>{item.email}</span>
    )
  },
  {
    name: 'options',
    title: '操作',
    span: 2,
    getValueOf: (item, { context }) => {
      return (
        <Button
          type="link"
          size="small"
          danger
          disabled={item.status === 'inactive'}
          onClick={(e) => {
            e.stopPropagation();
            console.log('删除员工:', item.name);
          }}
        >
          移除
        </Button>
      );
    }
  }
];

// 产品数据
const productOptions = Array.from({ length: 20 }).map((_, index) => ({
  id: `prod_${index + 1}`,
  productName: `产品${index + 1}`,
  category: ['电子产品', '服装', '食品', '家居'][index % 4],
  price: Math.floor(Math.random() * 1000) + 100,
  stock: Math.floor(Math.random() * 500),
  status: index === 5 ? '下架' : '在售'
}));

const productColumns = [
  {
    name: 'productName',
    title: '产品名称',
    span: 6
  },
  {
    name: 'category',
    title: '分类',
    span: 4,
    getValueOf: (item) => (
      <Tag color="blue">{item.category}</Tag>
    )
  },
  {
    name: 'price',
    title: '价格',
    span: 4,
    getValueOf: (item) => `¥${item.price}`
  },
  {
    name: 'stock',
    title: '库存',
    span: 4,
    getValueOf: (item) => (
      <span style={{ color: item.stock < 50 ? 'red' : 'green' }}>
        {item.stock}
      </span>
    )
  },
  {
    name: 'status',
    title: '状态',
    span: 4,
    getValueOf: (item) => (
      <Tag color={item.status === '在售' ? 'success' : 'default'}>
        {item.status}
      </Tag>
    )
  }
];

// 基础表格选择
const BasicTableExample = ({ isPopup }) => {
  const [value, setValue] = useState([]);

  return (
    <Flex vertical gap={8}>
      <span>多选表格：</span>
      <SelectTableList
        options={employeeOptions}
        columns={employeeColumns}
        valueKey="id"
        labelKey="name"
        value={value}
        onChange={setValue}
        isPopup={isPopup}
        placeholder="请选择员工"
        style={{ width: 600 }}
      />
      {value.length > 0 && (
        <div>已选 {value.length} 人：{value.map(item => item.name).join('、')}</div>
      )}
    </Flex>
  );
};

// 单选表格
const SingleTableExample = ({ isPopup }) => {
  const [value, setValue] = useState(null);

  return (
    <Flex vertical gap={8}>
      <span>单选表格：</span>
      <SelectTableList
        single
        options={productOptions}
        columns={productColumns}
        valueKey="id"
        labelKey="productName"
        value={value}
        onChange={setValue}
        isPopup={isPopup}
        placeholder="请选择产品"
        style={{ width: 600 }}
      />
      {value && <div>已选：{value.productName}</div>}
    </Flex>
  );
};

// 带搜索的表格选择
const SearchableTableExample = ({ isPopup }) => {
  const [value, setValue] = useState([]);

  return (
    <Flex vertical gap={8}>
      <span>带搜索功能：</span>
      <SelectTableList
        options={employeeOptions}
        columns={employeeColumns}
        valueKey="id"
        labelKey="name"
        value={value}
        onChange={setValue}
        isPopup={isPopup}
        placeholder="搜索姓名、邮箱或部门"
        getSearchCallback={({ searchText }, item) => {
          if (!searchText) return true;
          const keyword = searchText.toLowerCase();
          return (
            item.name.toLowerCase().includes(keyword) ||
            item.email.toLowerCase().includes(keyword) ||
            item.department.toLowerCase().includes(keyword)
          );
        }}
        style={{ width: 600 }}
      />
    </Flex>
  );
};

// 全选功能
const SelectAllTableExample = ({ isPopup }) => {
  const [value, setValue] = useState([]);

  return (
    <Flex vertical gap={8}>
      <span>支持全选：</span>
      <SelectTableList
        allowSelectedAll
        options={productOptions.filter(item => item.status === '在售')}
        columns={productColumns}
        valueKey="id"
        labelKey="productName"
        value={value}
        onChange={setValue}
        isPopup={isPopup}
        placeholder="请选择在售产品"
        style={{ width: 600 }}
      />
    </Flex>
  );
};

// 自定义底部
const CustomFooterExample = ({ isPopup }) => {
  const [value, setValue] = useState([]);

  return (
    <Flex vertical gap={8}>
      <span>自定义底部操作：</span>
      <SelectTableList
        options={employeeOptions}
        columns={employeeColumns}
        valueKey="id"
        labelKey="name"
        value={value}
        onChange={setValue}
        isPopup={isPopup}
        placeholder="请选择员工"
        footer={({ close, reload }) => (
          <Flex justify="space-between" align="center">
            <Button type="link" onClick={reload}>
              刷新数据
            </Button>
            <Button type="primary" onClick={close}>
              确认选择
            </Button>
          </Flex>
        )}
        style={{ width: 600 }}
      />
    </Flex>
  );
};

// 直接展示在页面上（无触发器）
const DirectRenderExample = () => {
  const [value, setValue] = useState([]);

  return (
    <Flex vertical gap={8}>
      <span>直接展示在页面（嵌入模式）：</span>
      <SelectTableList
        options={employeeOptions}
        columns={employeeColumns}
        valueKey="id"
        labelKey="name"
        value={value}
        onChange={setValue}
        placeholder="请选择员工"
        getSearchCallback={({ searchText }, item) => {
          if (!searchText) return true;
          const keyword = searchText.toLowerCase();
          return (
            item.name.toLowerCase().includes(keyword) ||
            item.email.toLowerCase().includes(keyword) ||
            item.department.toLowerCase().includes(keyword)
          );
        }}
        style={{ width: '100%' }}
        renderContent={(content) => (
          <div style={{ 
            border: '1px solid #d9d9d9', 
            borderRadius: 6, 
            padding: 16,
            backgroundColor: '#fafafa'
          }}>
            {content}
          </div>
        )}
      />
      {value.length > 0 && (
        <div style={{ padding: '8px 12px', backgroundColor: '#e6f4ff', borderRadius: 4 }}>
          已选择 {value.length} 人：{value.map(item => item.name).join('、')}
        </div>
      )}
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
      <BasicTableExample isPopup={isPopup} />
      <Divider />
      <SingleTableExample isPopup={isPopup} />
      <Divider />
      <SearchableTableExample isPopup={isPopup} />
      <Divider />
      <SelectAllTableExample isPopup={isPopup} />
      <Divider />
      <CustomFooterExample isPopup={isPopup} />
      <Divider />
      <DirectRenderExample />
    </Flex>
  );
};

render(<BaseExample />);
