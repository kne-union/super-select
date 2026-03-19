const { SelectTree } = _SuperSelect;
const { Space, Button, Flex, Divider, Tag, Switch } = antd;
const { useState } = React;

// 组织架构数据
const organizationTree = [
  {
    id: 'root',
    parentId: null,
    name: '集团总部',
    code: 'HQ',
    employeeCount: 500
  },
  {
    id: 'tech',
    parentId: 'root',
    name: '技术中心',
    code: 'TECH',
    employeeCount: 200
  },
  {
    id: 'tech-fe',
    parentId: 'tech',
    name: '前端开发组',
    code: 'FE',
    employeeCount: 50
  },
  {
    id: 'tech-be',
    parentId: 'tech',
    name: '后端开发组',
    code: 'BE',
    employeeCount: 80
  },
  {
    id: 'tech-qa',
    parentId: 'tech',
    name: '质量保障组',
    code: 'QA',
    employeeCount: 30
  },
  {
    id: 'tech-devops',
    parentId: 'tech',
    name: '运维组',
    code: 'DEVOPS',
    employeeCount: 20
  },
  {
    id: 'product',
    parentId: 'root',
    name: '产品中心',
    code: 'PRODUCT',
    employeeCount: 100
  },
  {
    id: 'product-design',
    parentId: 'product',
    name: '产品设计组',
    code: 'DESIGN',
    employeeCount: 40
  },
  {
    id: 'product-pm',
    parentId: 'product',
    name: '项目管理组',
    code: 'PM',
    employeeCount: 30
  },
  {
    id: 'operation',
    parentId: 'root',
    name: '运营中心',
    code: 'OP',
    employeeCount: 80
  },
  {
    id: 'operation-marketing',
    parentId: 'operation',
    name: '市场营销组',
    code: 'MARKETING',
    employeeCount: 50
  },
  {
    id: 'operation-cs',
    parentId: 'operation',
    name: '客户服务组',
    code: 'CS',
    employeeCount: 30
  },
  {
    id: 'hr',
    parentId: 'root',
    name: '人力资源部',
    code: 'HR',
    employeeCount: 40
  },
  {
    id: 'finance',
    parentId: 'root',
    name: '财务部',
    code: 'FINANCE',
    employeeCount: 30
  }
];

// 地区数据
const regionTree = [
  {
    id: 'china',
    parentId: null,
    name: '中国',
    code: 'CN'
  },
  {
    id: 'beijing',
    parentId: 'china',
    name: '北京市',
    code: 'BJ'
  },
  {
    id: 'shanghai',
    parentId: 'china',
    name: '上海市',
    code: 'SH'
  },
  {
    id: 'guangdong',
    parentId: 'china',
    name: '广东省',
    code: 'GD'
  },
  {
    id: 'guangzhou',
    parentId: 'guangdong',
    name: '广州市',
    code: 'GZ'
  },
  {
    id: 'shenzhen',
    parentId: 'guangdong',
    name: '深圳市',
    code: 'SZ'
  },
  {
    id: 'zhejiang',
    parentId: 'china',
    name: '浙江省',
    code: 'ZJ'
  },
  {
    id: 'hangzhou',
    parentId: 'zhejiang',
    name: '杭州市',
    code: 'HZ'
  },
  {
    id: 'jiangsu',
    parentId: 'china',
    name: '江苏省',
    code: 'JS'
  },
  {
    id: 'nanjing',
    parentId: 'jiangsu',
    name: '南京市',
    code: 'NJ'
  },
  {
    id: 'usa',
    parentId: null,
    name: '美国',
    code: 'US'
  },
  {
    id: 'newyork',
    parentId: 'usa',
    name: '纽约州',
    code: 'NY'
  },
  {
    id: 'california',
    parentId: 'usa',
    name: '加利福尼亚州',
    code: 'CA'
  }
];

// 分类数据
const categoryTree = [
  {
    id: 'electronics',
    parentId: null,
    name: '电子产品'
  },
  {
    id: 'phone',
    parentId: 'electronics',
    name: '手机'
  },
  {
    id: 'computer',
    parentId: 'electronics',
    name: '电脑'
  },
  {
    id: 'laptop',
    parentId: 'computer',
    name: '笔记本'
  },
  {
    id: 'desktop',
    parentId: 'computer',
    name: '台式机'
  },
  {
    id: 'clothing',
    parentId: null,
    name: '服装'
  },
  {
    id: 'mens',
    parentId: 'clothing',
    name: '男装'
  },
  {
    id: 'womens',
    parentId: 'clothing',
    name: '女装'
  }
];

// 基础树选择
const BasicTreeExample = ({ isPopup }) => {
  const [value, setValue] = useState([]);

  return (
    <Flex vertical gap={8}>
      <span>组织架构多选：</span>
      <SelectTree
        options={organizationTree}
        valueKey="id"
        labelKey="name"
        value={value}
        onChange={setValue}
        isPopup={isPopup}
        placeholder="请选择部门"
        style={{ width: 320 }}
      />
      {value.length > 0 && (
        <Flex wrap gap={4}>
          {value.map(item => (
            <Tag key={item.id} color="blue">{item.name}</Tag>
          ))}
        </Flex>
      )}
    </Flex>
  );
};

// 单选树
const SingleTreeExample = ({ isPopup }) => {
  const [value, setValue] = useState(null);

  return (
    <Flex vertical gap={8}>
      <span>地区单选：</span>
      <SelectTree
        single
        options={regionTree}
        valueKey="id"
        labelKey="name"
        value={value}
        onChange={setValue}
        isPopup={isPopup}
        placeholder="请选择地区"
        style={{ width: 320 }}
      />
      {value && <Tag color="green">已选：{value.name} ({value.code})</Tag>}
    </Flex>
  );
};

// 带搜索的树选择
const SearchableTreeExample = ({ isPopup }) => {
  const [value, setValue] = useState([]);

  return (
    <Flex vertical gap={8}>
      <span>带搜索功能：</span>
      <SelectTree
        options={organizationTree}
        valueKey="id"
        labelKey="name"
        value={value}
        onChange={setValue}
        isPopup={isPopup}
        placeholder="搜索部门名称或编码"
        style={{ width: 320 }}
      />
    </Flex>
  );
};

// 分类选择
const CategoryTreeExample = ({ isPopup }) => {
  const [value, setValue] = useState([]);

  return (
    <Flex vertical gap={8}>
      <span>商品分类选择：</span>
      <SelectTree
        options={categoryTree}
        valueKey="id"
        labelKey="name"
        value={value}
        onChange={setValue}
        isPopup={isPopup}
        placeholder="请选择分类"
        style={{ width: 320 }}
      />
      {value.length > 0 && (
        <div>已选分类：{value.map(item => item.name).join(' > ')}</div>
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
      <BasicTreeExample isPopup={isPopup} />
      <Divider />
      <SingleTreeExample isPopup={isPopup} />
      <Divider />
      <SearchableTreeExample isPopup={isPopup} />
      <Divider />
      <CategoryTreeExample isPopup={isPopup} />
    </Flex>
  );
};

render(<BaseExample />);
