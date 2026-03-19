
# super-select


### 描述

React 复杂信息选择组件库，提供列表、表格、树形等多种选择模式，支持单选/多选、搜索、全选等功能


### 安装

```shell
npm i --save @kne/super-select
```


### 概述

@kne/super-select 是一个功能强大的 React 组件库，专门用于处理复杂的信息选择场景。它提供了一系列灵活且可组合的组件，使得在 React 应用中实现复杂的选择功能变得简单直观。

### 主要功能

- 支持多种选择模式（单选、多选）
- 提供灵活的列表和表格展示方式
- 内置标签式选中项展示
- 支持全选/反选功能
- 内置国际化支持（中文和英文）
- 自定义样式支持（基于CSS Modules）

### 组件概述

#### SelectInput
基础选择输入组件，提供核心的选择功能和状态管理。可以独立使用，也可以作为其他选择组件的基础。

#### SelectList
基于 SelectInput 的列表选择组件，适用于常规的列表选择场景。提供了简洁的列表界面和直观的选择交互。

#### SelectTableList
表格形式的选择组件，适用于需要展示多列数据的选择场景。支持自定义列配置和表格样式。

#### SelectedAll
全选功能组件，提供一键选择/取消选择所有项的功能。可以与其他选择组件配合使用。

#### SelectTree
树形选择组件，适用于层级数据的展示和选择。支持展开/折叠节点，并提供灵活的节点渲染方式。

#### SelectedTagList
已选项标签列表组件，以标签形式展示已选中的项目。支持单个标签删除和清空所有已选项。

### 使用场景

- 复杂的数据筛选和选择
- 多条件组合查询
- 批量操作数据
- 表格数据的多选处理
- 带标签展示的数据选择
- 需要全选/反选功能的列表操作

### 技术特点

- 基于 React 开发
- 使用 CSS Modules 进行样式隔离
- 支持 ES6+ 语法
- 模块化设计，组件可独立使用
- 支持主题定制
- 完善的类型定义支持


### 示例


#### 示例样式

```scss
.max-width-150 {
  max-width: 150px;
}
```

#### 示例代码

- SelectInput 基础组件
- 基础选择输入组件，展示尺寸、多选、弹窗模式、前后缀等核心功能
- _SuperSelect(@kne/current-lib_super-select)[import * as _SuperSelect from "@kne/super-select"],antd(antd),(@kne/current-lib_super-select/dist/index.css)

```jsx
const { SelectInput } = _SuperSelect;
const { Space, Flex, Divider, Button, Tag, Switch } = antd;
const { useState } = React;

// 基础示例：展示基本使用和尺寸
const BasicExample = ({ isPopup }) => {
  return (
    <Flex vertical gap={12}>
      <Flex gap={8} align="center">
        <span>基础使用：</span>
        <SelectInput isPopup={isPopup} placeholder="请选择" style={{ width: 200 }} />
        <SelectInput isPopup={isPopup} placeholder="禁用状态" disabled style={{ width: 200 }} />
      </Flex>
      <Flex gap={8} align="center">
        <span>尺寸：</span>
        <SelectInput isPopup={isPopup} size="small" placeholder="小尺寸" style={{ width: 120 }} />
        <SelectInput isPopup={isPopup} size="default" placeholder="默认尺寸" style={{ width: 140 }} />
        <SelectInput isPopup={isPopup} size="large" placeholder="大尺寸" style={{ width: 160 }} />
      </Flex>
    </Flex>
  );
};

// 多选示例：展示多选和标签显示
const MultiSelectExample = ({ isPopup }) => {
  const [value, setValue] = useState([
    { value: 'react', label: 'React' },
    { value: 'vue', label: 'Vue' }
  ]);

  return (
    <Flex vertical gap={12}>
      <Flex gap={8} align="center">
        <span>多选模式：</span>
        <SelectInput
          value={value}
          onChange={setValue}
          isPopup={isPopup}
          placeholder="请选择技术栈"
          style={{ width: 300 }}
        />
      </Flex>
      <Flex gap={8} align="center">
        <span>带数量限制：</span>
        <SelectInput
          defaultValue={[
            { value: 1, label: '选项一' },
            { value: 2, label: '选项二' }
          ]}
          isPopup={isPopup}
          maxLength={3}
          placeholder="最多选择3项"
          style={{ width: 300 }}
        />
      </Flex>
    </Flex>
  );
};

// 自定义前后缀示例
const PrefixSuffixExample = ({ isPopup }) => {
  const [value, setValue] = useState([
    { value: 'tech', label: '技术研发部' }
  ]);

  return (
    <Flex vertical gap={12}>
      <Flex gap={12} align="center">
        <SelectInput
          value={value}
          onChange={setValue}
          isPopup={isPopup}
          prefix={
            <Tag color="blue" style={{ margin: 0, borderRadius: 4 }}>
              部门
            </Tag>
          }
          placeholder="请选择部门"
          style={{ width: 240 }}
        />
        <SelectInput
          defaultValue={[{ value: 'project', label: '项目A' }]}
          isPopup={isPopup}
          suffix={
            <Button type="primary" size="small" style={{ fontSize: 12 }}>
              详情
            </Button>
          }
          placeholder="请选择项目"
          style={{ width: 240 }}
        />
      </Flex>
      <Flex gap={12} align="center">
        <SelectInput
          defaultValue={[{ value: 'user1', label: '张三' }]}
          isPopup={isPopup}
          prefix={
            <span style={{ 
              color: '#1677ff', 
              fontWeight: 500,
              fontSize: 13
            }}>
              负责人：
            </span>
          }
          placeholder="请选择负责人"
          style={{ width: 220 }}
        />
        <SelectInput
          size="large"
          isPopup={isPopup}
          defaultValue={[{ value: 'pending', label: '待处理' }]}
          suffix={
            <Tag color="orange" style={{ margin: 0 }}>
              3条待办
            </Tag>
          }
          placeholder="请选择状态"
          style={{ width: 260 }}
        />
      </Flex>
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
      <BasicExample isPopup={isPopup} />
      <Divider />
      <MultiSelectExample isPopup={isPopup} />
      <Divider />
      <PrefixSuffixExample isPopup={isPopup} />
    </Flex>
  );
};

render(<BaseExample />);

```

- SuperSelect 列表选择
- 通用列表选择组件，支持单选/多选、搜索、全选、数量限制、弹窗模式等功能
- _SuperSelect(@kne/current-lib_super-select)[import * as _SuperSelect from "@kne/super-select"],antd(antd),(@kne/current-lib_super-select/dist/index.css)

```jsx
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

```

- SelectTableList 表格选择
- 表格形式的选择组件，适合复杂数据的展示和选择，支持自定义列、搜索、单选/多选等
- _SuperSelect(@kne/current-lib_super-select)[import * as _SuperSelect from "@kne/super-select"],antd(antd),(@kne/current-lib_super-select/dist/index.css)

```jsx
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

```

- SelectTree 树形选择
- 树形结构的选择组件，适用于组织架构、地区、分类等层级数据的选择
- _SuperSelect(@kne/current-lib_super-select)[import * as _SuperSelect from "@kne/super-select"],antd(antd),(@kne/current-lib_super-select/dist/index.css)

```jsx
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

```

- Ref 使用方法
- 展示如何通过 ref 控制选择器的打开/关闭、获取/设置值、程序化选择等操作
- _SuperSelect(@kne/current-lib_super-select)[import * as _SuperSelect from "@kne/super-select"],antd(antd),(@kne/current-lib_super-select/dist/index.css)

```jsx
const { default: SuperSelect } = _SuperSelect;
const { Space, Button, Flex, Divider, message } = antd;
const { useRef, useState } = React;

// 基础 ref 操作示例
const BasicRefExample = () => {
  const selectRef = useRef();
  const [value, setValue] = useState([]);

  const departmentOptions = [
    { value: 'tech', label: '技术研发部' },
    { value: 'product', label: '产品设计部' },
    { value: 'operation', label: '运营管理部' },
    { value: 'hr', label: '人力资源部' }
  ];

  return (
    <Flex vertical gap={12}>
      <span>通过 ref 控制选择器：</span>
      <Flex gap={8}>
        <SuperSelect
          ref={selectRef}
          options={departmentOptions}
          value={value}
          onChange={setValue}
          placeholder="请选择部门"
          style={{ width: 240 }}
        />
        <Button type="primary" onClick={() => selectRef.current?.onOpenChange(true)}>
          打开
        </Button>
        <Button onClick={() => selectRef.current?.onOpenChange(false)}>
          关闭
        </Button>
      </Flex>
    </Flex>
  );
};

// 完整 ref 属性展示
const FullRefExample = () => {
  const selectRef = useRef();
  const [value, setValue] = useState([]);
  const [log, setLog] = useState([]);

  const addLog = (msg) => {
    setLog(prev => [...prev, `[${new Date().toLocaleTimeString()}] ${msg}`]);
  };

  const userOptions = Array.from({ length: 15 }).map((_, i) => ({
    value: `user_${i + 1}`,
    label: `用户${i + 1}`
  }));

  const handleGetValue = () => {
    const currentValue = selectRef.current?.value || [];
    addLog(`当前值: ${JSON.stringify(currentValue.map(v => v.label))}`);
    message.info(`已选 ${currentValue.length} 项`);
  };

  const handleClear = () => {
    selectRef.current?.setValue([]);
    addLog('已清空选择');
  };

  const handleSelectFirst = () => {
    const firstOption = userOptions[0];
    if (firstOption) {
      selectRef.current?.onSelect(firstOption);
      addLog(`已选择: ${firstOption.label}`);
    }
  };

  return (
    <Flex vertical gap={12}>
      <span>ref 完整功能展示：</span>
      <Flex gap={8} wrap>
        <SuperSelect
          ref={selectRef}
          options={userOptions}
          value={value}
          onChange={setValue}
          placeholder="请选择用户"
          style={{ width: 240 }}
        />
      </Flex>
      <Flex gap={8} wrap>
        <Button type="primary" onClick={() => selectRef.current?.onOpenChange(true)}>
          打开下拉
        </Button>
        <Button onClick={() => selectRef.current?.onOpenChange(false)}>
          关闭下拉
        </Button>
        <Button onClick={handleGetValue}>
          获取当前值
        </Button>
        <Button onClick={handleClear}>
          清空选择
        </Button>
        <Button onClick={handleSelectFirst}>
          选择第一项
        </Button>
      </Flex>
      <div style={{
        background: '#f5f5f5',
        padding: 12,
        borderRadius: 4,
        maxHeight: 120,
        overflow: 'auto',
        fontSize: 12
      }}>
        <div style={{ marginBottom: 4, fontWeight: 'bold' }}>操作日志：</div>
        {log.length === 0 ? (
          <div style={{ color: '#999' }}>暂无操作</div>
        ) : (
          log.map((item, index) => <div key={index}>{item}</div>)
        )}
      </div>
    </Flex>
  );
};

// ref 常见场景
const CommonScenariosExample = () => {
  const selectRef = useRef();

  const options = [
    { value: 1, label: '选项一' },
    { value: 2, label: '选项二' },
    { value: 3, label: '选项三' }
  ];

  return (
    <Flex vertical gap={12}>
      <span>常见使用场景：</span>
      <Flex gap={8} align="center">
        <SuperSelect
          ref={selectRef}
          options={options}
          placeholder="请选择"
          style={{ width: 200 }}
        />
        <Button
          type="primary"
          onClick={() => {
            selectRef.current?.onOpenChange(true);
          }}
        >
          外部触发打开
        </Button>
      </Flex>
      <div style={{ color: '#666', fontSize: 12 }}>
        提示：ref 可用于表单联动、外部控制弹窗、程序化操作等场景
      </div>
    </Flex>
  );
};

const BaseExample = () => {
  return (
    <Flex vertical gap={24}>
      <BasicRefExample />
      <Divider />
      <FullRefExample />
      <Divider />
      <CommonScenariosExample />
    </Flex>
  );
};

render(<BaseExample />);

```


### API

#### SelectInput

基础选择输入组件，提供核心的选择功能和状态管理。

| 属性名               | 说明                | 类型                            | 默认值                 |
|-------------------|-------------------|-------------------------------|---------------------|
| value             | 当前选中的值            | array                         | []                  |
| onChange          | 选中值变化时的回调函数       | function(value, item, {type}) | -                   |
| dataSource        | 数据源               | array                         | []                  |
| idField           | 数据项唯一标识字段         | string                        | 'id'                |
| multiple          | 是否支持多选            | boolean                       | false               |
| max               | 最多可选数量            | number                        | -                   |
| disabled          | 是否禁用              | boolean                       | false               |
| readOnly          | 是否只读              | boolean                       | false               |
| size              | 选择框尺寸             | 'small' \| 'default' \| 'large' | 'default'           |
| className         | 自定义类名             | string                        | -                   |
| style             | 自定义样式             | object                        | -                   |
| children          | 自定义渲染内容           | function(props)               | -                   |
| locale            | 国际化配置             | object                        | 默认中文                |
| getContainer      | 指定下拉菜单挂载的 HTML 节点 | function                      | () => document.body |
| getPopupContainer | 菜单渲染父节点           | function(triggerNode)         | () => document.body |
| onExceed          | 超出最大可选数量时的回调      | function(value, item)         | -                   |
| onSelect          | 选择时的回调            | function(value, item)         | -                   |
| onDeselect        | 取消选择时的回调          | function(value, item)         | -                   |

#### SelectList

基于 SelectInput 的列表选择组件，适用于常规的列表选择场景。

| 属性名           | 说明           | 类型                            | 默认值   |
|---------------|--------------|-------------------------------|-------|
| value         | 当前选中的值       | array                         | []    |
| onChange      | 选中值变化时的回调函数  | function(value, item, {type}) | -     |
| dataSource    | 数据源          | array                         | []    |
| idField       | 数据项唯一标识字段    | string                        | 'id'  |
| multiple      | 是否支持多选       | boolean                       | false |
| max           | 最多可选数量       | number                        | -     |
| disabled      | 是否禁用         | boolean                       | false |
| readOnly      | 是否只读         | boolean                       | false |
| className     | 自定义类名        | string                        | -     |
| style         | 自定义样式        | object                        | -     |
| renderItem    | 自定义列表项渲染     | function(item, index)         | -     |
| emptyContent  | 无数据时的显示内容    | ReactNode                     | -     |
| locale        | 国际化配置        | object                        | 默认中文  |
| onExceed      | 超出最大可选数量时的回调 | function(value, item)         | -     |
| onSelect      | 选择时的回调       | function(value, item)         | -     |
| onDeselect    | 取消选择时的回调     | function(value, item)         | -     |
| itemClassName | 列表项自定义类名     | string                        | -     |
| itemStyle     | 列表项自定义样式     | object                        | -     |

#### SelectTableList

表格形式的选择组件，适用于需要展示多列数据的选择场景。

| 属性名             | 说明           | 类型                            | 默认值   |
|-----------------|--------------|-------------------------------|-------|
| value           | 当前选中的值       | array                         | []    |
| onChange        | 选中值变化时的回调函数  | function(value, item, {type}) | -     |
| dataSource      | 数据源          | array                         | []    |
| idField         | 数据项唯一标识字段    | string                        | 'id'  |
| multiple        | 是否支持多选       | boolean                       | false |
| max             | 最多可选数量       | number                        | -     |
| disabled        | 是否禁用         | boolean                       | false |
| readOnly        | 是否只读         | boolean                       | false |
| className       | 自定义类名        | string                        | -     |
| style           | 自定义样式        | object                        | -     |
| columns         | 表格列配置        | array                         | []    |
| emptyContent    | 无数据时的显示内容    | ReactNode                     | -     |
| locale          | 国际化配置        | object                        | 默认中文  |
| onExceed        | 超出最大可选数量时的回调 | function(value, item)         | -     |
| onSelect        | 选择时的回调       | function(value, item)         | -     |
| onDeselect      | 取消选择时的回调     | function(value, item)         | -     |
| rowClassName    | 行自定义类名       | string                        | -     |
| rowStyle        | 行自定义样式       | object                        | -     |
| headerClassName | 表头自定义类名      | string                        | -     |
| headerStyle     | 表头自定义样式      | object                        | -     |

##### columns 配置项

| 属性名       | 说明            | 类型                            | 默认值 |
|-----------|---------------|-------------------------------|-----|
| title     | 列标题           | ReactNode                     | -   |
| dataIndex | 列数据在数据项中对应的路径 | string                        | -   |
| key       | React key     | string                        | -   |
| render    | 自定义渲染函数       | function(text, record, index) | -   |
| width     | 列宽度           | string \| number              | -   |
| className | 列自定义类名        | string                        | -   |
| style     | 列自定义样式        | object                        | -   |

#### SelectedAll

全选功能组件，提供一键选择/取消选择所有项的功能。

| 属性名        | 说明          | 类型                      | 默认值   |
|------------|-------------|-------------------------|-------|
| value      | 当前选中的值      | array                   | []    |
| onChange   | 选中值变化时的回调函数 | function(value, {type}) | -     |
| dataSource | 数据源         | array                   | []    |
| idField    | 数据项唯一标识字段   | string                  | 'id'  |
| disabled   | 是否禁用        | boolean                 | false |
| readOnly   | 是否只读        | boolean                 | false |
| className  | 自定义类名       | string                  | -     |
| style      | 自定义样式       | object                  | -     |
| children   | 自定义渲染内容     | function(props)         | -     |
| locale     | 国际化配置       | object                  | 默认中文  |

#### SelectTree

树形选择组件，适用于层级数据的展示和选择。

| 属性名               | 说明                | 类型                            | 默认值                 |
|-------------------|-------------------|-------------------------------|---------------------|
| value             | 当前选中的值            | array                         | []                  |
| onChange          | 选中值变化时的回调函数       | function(value, item, {type}) | -                   |
| dataSource        | 数据源               | array                         | []                  |
| idField           | 数据项唯一标识字段         | string                        | 'id'                |
| multiple          | 是否支持多选            | boolean                       | false               |
| max               | 最多可选数量            | number                        | -                   |
| disabled          | 是否禁用              | boolean                       | false               |
| readOnly          | 是否只读              | boolean                       | false               |
| className         | 自定义类名             | string                        | -                   |
| style             | 自定义样式             | object                        | -                   |
| renderItem        | 自定义树节点渲染         | function(item, index)         | -                   |
| emptyContent      | 无数据时的显示内容        | ReactNode                     | -                   |
| locale            | 国际化配置             | object                        | 默认中文                |
| onExceed          | 超出最大可选数量时的回调      | function(value, item)         | -                   |
| onSelect          | 选择时的回调            | function(value, item)         | -                   |
| onDeselect        | 取消选择时的回调          | function(value, item)         | -                   |

#### SelectedTagList

已选项标签列表组件，以标签形式展示已选中的项目。

| 属性名          | 说明          | 类型                            | 默认值   |
|--------------|-------------|-------------------------------|-------|
| value        | 当前选中的值      | array                         | []    |
| onChange     | 选中值变化时的回调函数 | function(value, item, {type}) | -     |
| dataSource   | 数据源         | array                         | []    |
| idField      | 数据项唯一标识字段   | string                        | 'id'  |
| disabled     | 是否禁用        | boolean                       | false |
| readOnly     | 是否只读        | boolean                       | false |
| className    | 自定义类名       | string                        | -     |
| style        | 自定义样式       | object                        | -     |
| renderItem   | 自定义标签渲染     | function(item, index)         | -     |
| emptyContent | 无数据时的显示内容   | ReactNode                     | -     |
| locale       | 国际化配置       | object                        | 默认中文  |
| onRemove     | 移除标签时的回调    | function(value, item)         | -     |
| onClear      | 清空所有标签时的回调  | function(value)               | -     |
| showClear    | 是否显示清空按钮    | boolean                       | true  |
| tagClassName | 标签自定义类名     | string                        | -     |
| tagStyle     | 标签自定义样式     | object                        | -     |

#### 国际化配置

组件内置了中文和英文两种语言配置，默认使用中文。可以通过 `locale` 属性进行自定义配置。

```jsx
import { zhCN, enUS } from '@kne/super-select/locale';

// 使用英文
<SelectList locale={enUS} />

// 自定义部分文案
<SelectList locale={{
  ...zhCN,
  empty: '暂无数据',
  selectAll: '全选',
  clearAll: '清空'
}} />
```

##### 可配置的文案

| 键名        | 说明        | 默认中文值          |
|-----------|-----------|----------------|
| empty     | 无数据时的提示文案 | 暂无数据           |
| selectAll | 全选按钮文案    | 全选             |
| clearAll  | 清空按钮文案    | 清空             |
| selected  | 已选文案      | 已选             |
| items     | 项文案       | 项              |
| exceed    | 超出限制提示文案  | 最多只能选择 {max} 项 |

