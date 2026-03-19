# super-select

### 描述

React 复杂信息选择组件库，提供列表、表格、树形等多种选择模式，支持单选/多选、搜索、全选等功能

### 安装

```shell
npm i --save @kne/super-select
```

### 概述

一个功能强大的 React 组件库，专门用于处理复杂的信息选择场景。提供了一系列灵活且可组合的组件，使得在 React
应用中实现复杂的选择功能变得简单直观。

#### 主要功能

- 支持多种选择模式（单选、多选）
- 支持下拉框和弹窗两种展示模式
- 提供灵活的列表和表格展示方式
- 内置标签式选中项展示
- 支持全选/反选功能
- 内置国际化支持（中文和英文）
- 自定义样式支持（基于 CSS Modules）
- 标签溢出处理：单选文本省略、多选标签自动折叠显示 +N

#### 组件列表

| 组件名称            | 功能描述                        |
|-----------------|-----------------------------|
| SelectInput     | 基础选择输入组件，用于自定义构建其他选择组件的核心基础 |
| SelectList      | 列表选择组件，适用于常规列表选择场景          |
| SelectTableList | 表格形式选择组件，支持多列数据展示           |
| SelectedAll     | 全选功能组件，提供一键选择/取消选择          |
| SelectTree      | 树形选择组件，适用于层级数据              |
| SelectedTagList | 已选项标签列表组件                   |
| SelectCascader  | 级联选择组件，支持父子关联、搜索过滤          |

#### 快速选择指南

| 需求       | 推荐组件                        |
|----------|-----------------------------|
| 自定义选择组件  | SelectInput                 |
| 简单列表选择   | SelectList                  |
| 需要展示多列数据 | SelectTableList             |
| 层级数据选择   | SelectTree 或 SelectCascader |
| 全选/反选功能  | SelectedAll                 |
| 已选项标签展示  | SelectedTagList             |

#### 快速开始

```jsx
import { SelectInput, SelectList, SelectCascader } from '@kne/super-select';

// 自定义选择组件
<SelectInput placeholder="请选择" onChange={handleChange}>
  {(props) => <CustomDropdown {...props} />}
</SelectInput>

// 级联选择
<SelectCascader options={cascadeData} onChange={handleChange} />
```


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

- SelectInput 边界情况测试
- 测试超多选项（100项）、超长Label文本、大量已选项展示等边界场景
- _SuperSelect(@kne/current-lib_super-select)[import * as _SuperSelect from "@kne/super-select"],antd(antd),(@kne/current-lib_super-select/dist/index.css)

```jsx
const { SelectInput } = _SuperSelect;
const { Flex, Tag } = antd;
const { useState } = React;

// 超多选项测试示例（100项）
const ManyOptionsExample = () => {
  const manyOptions = Array.from({ length: 100 }, (_, i) => ({
    value: &#96;user_${i + 1}&#96;,
    label: &#96;用户${i + 1}&#96;
  }));
  
  // 直接预选10项测试
  const [value, setValue] = useState(manyOptions.slice(0, 10));

  return (
    <Flex vertical gap={12}>
      <span>超多选项显示测试（已选10项）：</span>
      <SelectInput
        value={value}
        onChange={setValue}
        placeholder="请选择用户"
        style={{ width: 400 }}
      >
        {() => <div style={{ padding: 12 }}>下拉内容</div>}
      </SelectInput>
      <Tag color="blue">已选择 {value.length} 项</Tag>
    </Flex>
  );
};

// 超长Label测试示例
const LongLabelExample = () => {
  const longLabelOptions = [
    { value: 'dept-1', label: '人工智能与机器学习应用技术研发中心' },
    { value: 'dept-2', label: '自然语言处理与智能对话系统研发组' },
    { value: 'dept-3', label: '大语言模型训练与优化专项小组' },
    { value: 'dept-4', label: '云计算与大数据平台架构设计及实施运维中心' },
    { value: 'dept-5', label: '网络安全与数据隐私保护技术保障中心' },
    { value: 'dept-6', label: '物联网设备智能互联与边缘计算技术研发中心' },
    { value: 'dept-7', label: '智能客服机器人产品研发团队-多模态交互技术组' },
    { value: 'dept-8', label: '金融科技创新应用与区块链技术研发实验室' }
  ];
  
  const [value, setValue] = useState(longLabelOptions);

  return (
    <Flex vertical gap={12}>
      <span>超长Label文本省略测试：</span>
      <SelectInput
        value={value}
        onChange={setValue}
        placeholder="请选择部门"
        style={{ width: 280 }}
      >
        {() => <div style={{ padding: 12 }}>下拉内容</div>}
      </SelectInput>
    </Flex>
  );
};

// 单选模式下超长Label测试
const SingleLongLabelExample = () => {
  const [value, setValue] = useState({ 
    value: 1, 
    label: '人工智能与机器学习应用技术研发中心-自然语言处理与智能对话系统研发组-大语言模型训练与优化专项小组' 
  });

  return (
    <Flex vertical gap={12}>
      <span>单选模式 - 超长Label：</span>
      <SelectInput
        single
        value={value}
        onChange={setValue}
        placeholder="请选择部门"
        style={{ width: 240 }}
      >
        {() => <div style={{ padding: 12 }}>下拉内容</div>}
      </SelectInput>
      {value && <Tag color="green">已选：{value.label}</Tag>}
    </Flex>
  );
};

// 大量已选项展示测试
const ManySelectedExample = () => {
  const [value, setValue] = useState(
    Array.from({ length: 20 }, (_, i) => ({
      value: &#96;item_${i + 1}&#96;,
      label: &#96;选项${i + 1}&#96;
    }))
  );

  return (
    <Flex vertical gap={12}>
      <span>大量已选项展示（默认已选20项）：</span>
      <SelectInput
        value={value}
        onChange={setValue}
        placeholder="请选择"
        style={{ width: 400 }}
      >
        {() => <div style={{ padding: 12 }}>下拉内容</div>}
      </SelectInput>
    </Flex>
  );
};

const BaseExample = () => {
  return (
    <Flex vertical gap={24}>
      <ManyOptionsExample />
      <LongLabelExample />
      <SingleLongLabelExample />
      <ManySelectedExample />
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
  value: &#96;user_${index + 1}&#96;,
  label: &#96;用户${index + 1}&#96;,
  email: &#96;user${index + 1}@company.com&#96;,
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
              {value.length > 0 ? &#96;已选择 ${value.length} 项&#96; : '点击选择部门'}
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
  id: &#96;emp_${index + 1}&#96;,
  name: &#96;员工${index + 1}&#96;,
  email: &#96;employee${index + 1}@company.com&#96;,
  department: ['技术研发部', '产品设计部', '运营部', '市场部'][index % 4],
  position: ['工程师', '设计师', '经理', '专员'][index % 4],
  status: index === 3 ? 'inactive' : 'active',
  joinDate: &#96;2023-${String((index % 12) + 1).padStart(2, '0')}-15&#96;
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
  id: &#96;prod_${index + 1}&#96;,
  productName: &#96;产品${index + 1}&#96;,
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
    getValueOf: (item) => &#96;¥${item.price}&#96;
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
            padding: 16
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
    setLog(prev => [...prev, &#96;[${new Date().toLocaleTimeString()}] ${msg}&#96;]);
  };

  const userOptions = Array.from({ length: 15 }).map((_, i) => ({
    value: &#96;user_${i + 1}&#96;,
    label: &#96;用户${i + 1}&#96;
  }));

  const handleGetValue = () => {
    const currentValue = selectRef.current?.value || [];
    addLog(&#96;当前值: ${JSON.stringify(currentValue.map(v => v.label))}&#96;);
    message.info(&#96;已选 ${currentValue.length} 项&#96;);
  };

  const handleClear = () => {
    selectRef.current?.setValue([]);
    addLog('已清空选择');
  };

  const handleSelectFirst = () => {
    const firstOption = userOptions[0];
    if (firstOption) {
      selectRef.current?.onSelect(firstOption);
      addLog(&#96;已选择: ${firstOption.label}&#96;);
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

- SelectCascader 级联选择
- 级联选择组件，支持多列菜单展示、父子关联选择、末级选择限制、搜索过滤等功能
- _SuperSelect(@kne/current-lib_super-select)[import * as _SuperSelect from "@kne/super-select"],antd(antd),(@kne/current-lib_super-select/dist/index.css)

```jsx
const { SelectCascader } = _SuperSelect;
const { Space, Button, Flex, Divider, Tag, Switch, message } = antd;
const { useState, useRef } = React;

// 中国地区数据
const regionData = [
  {
    id: 'beijing',
    name: '北京市',
    children: [
      { id: 'haidian', name: '海淀区' },
      { id: 'chaoyang', name: '朝阳区' },
      { id: 'dongcheng', name: '东城区' },
      { id: 'xicheng', name: '西城区' }
    ]
  },
  {
    id: 'shanghai',
    name: '上海市',
    children: [
      { id: 'pudong', name: '浦东新区' },
      { id: 'huangpu', name: '黄浦区' },
      { id: 'jingan', name: '静安区' },
      { id: 'xuhui', name: '徐汇区' }
    ]
  },
  {
    id: 'guangdong',
    name: '广东省',
    children: [
      {
        id: 'guangzhou',
        name: '广州市',
        children: [
          { id: 'tianhe', name: '天河区' },
          { id: 'yuexiu', name: '越秀区' },
          { id: 'panyu', name: '番禺区' }
        ]
      },
      {
        id: 'shenzhen',
        name: '深圳市',
        children: [
          { id: 'nanshan', name: '南山区' },
          { id: 'futian', name: '福田区' },
          { id: 'luohu', name: '罗湖区' }
        ]
      },
      { id: 'dongguan', name: '东莞市' }
    ]
  },
  {
    id: 'zhejiang',
    name: '浙江省',
    children: [
      {
        id: 'hangzhou',
        name: '杭州市',
        children: [
          { id: 'xihu', name: '西湖区' },
          { id: 'binjiang', name: '滨江区' }
        ]
      },
      {
        id: 'ningbo',
        name: '宁波市',
        children: [
          { id: 'haishu', name: '海曙区' },
          { id: 'yinzhou', name: '鄞州区' }
        ]
      }
    ]
  },
  {
    id: 'jiangsu',
    name: '江苏省',
    children: [
      {
        id: 'nanjing',
        name: '南京市',
        children: [
          { id: 'xuanwu', name: '玄武区' },
          { id: 'qinhuai', name: '秦淮区' }
        ]
      },
      {
        id: 'suzhou',
        name: '苏州市',
        children: [
          { id: 'gusu', name: '姑苏区' },
          { id: 'industrial', name: '工业园区' }
        ]
      }
    ]
  }
];

// 组织架构数据
const organizationData = [
  {
    id: 'tech',
    name: '技术研发中心',
    code: 'TECH',
    children: [
      {
        id: 'tech-fe',
        name: '前端开发组',
        code: 'FE',
        children: [
          { id: 'fe-react', name: 'React 团队', code: 'REACT' },
          { id: 'fe-vue', name: 'Vue 团队', code: 'VUE' }
        ]
      },
      {
        id: 'tech-be',
        name: '后端开发组',
        code: 'BE',
        children: [
          { id: 'be-java', name: 'Java 团队', code: 'JAVA' },
          { id: 'be-go', name: 'Go 团队', code: 'GO' }
        ]
      },
      { id: 'tech-qa', name: '质量保障组', code: 'QA' }
    ]
  },
  {
    id: 'product',
    name: '产品设计中心',
    code: 'PRODUCT',
    children: [
      { id: 'product-design', name: 'UI设计组', code: 'DESIGN' },
      { id: 'product-pm', name: '产品经理组', code: 'PM' }
    ]
  },
  {
    id: 'operation',
    name: '运营中心',
    code: 'OP',
    children: [
      { id: 'op-marketing', name: '市场营销组', code: 'MARKETING' },
      { id: 'op-cs', name: '客户服务组', code: 'CS' }
    ]
  }
];

// 商品分类数据
const categoryData = [
  {
    id: 'electronics',
    name: '电子产品',
    children: [
      {
        id: 'phone',
        name: '手机',
        children: [
          { id: 'iphone', name: 'iPhone' },
          { id: 'android', name: '安卓手机' }
        ]
      },
      {
        id: 'computer',
        name: '电脑',
        children: [
          { id: 'laptop', name: '笔记本' },
          { id: 'desktop', name: '台式机' }
        ]
      }
    ]
  },
  {
    id: 'clothing',
    name: '服装',
    children: [
      {
        id: 'mens',
        name: '男装',
        children: [
          { id: 'mens-shirt', name: '衬衫' },
          { id: 'mens-pants', name: '裤子' }
        ]
      },
      {
        id: 'womens',
        name: '女装',
        children: [
          { id: 'womens-dress', name: '连衣裙' },
          { id: 'womens-blouse', name: '上衣' }
        ]
      }
    ]
  }
];

// 超长文字测试数据
const longTextData = [
  {
    id: 'dept-1',
    name: '人工智能与机器学习应用技术研发中心',
    children: [
      {
        id: 'dept-1-1',
        name: '自然语言处理与智能对话系统研发组',
        children: [
          { id: 'dept-1-1-1', name: '大语言模型训练与优化专项小组' },
          { id: 'dept-1-1-2', name: '智能客服机器人产品研发团队' },
          { id: 'dept-1-1-3', name: '多语言机器翻译引擎研发组' },
          { id: 'dept-1-1-4', name: '知识图谱构建与智能问答系统研发小组' },
          { id: 'dept-1-1-5', name: '文本挖掘与情感分析技术研发团队' }
        ]
      },
      {
        id: 'dept-1-2',
        name: '计算机视觉与图像识别技术研发组',
        children: [
          { id: 'dept-1-2-1', name: '工业质检视觉检测算法研发小组' },
          { id: 'dept-1-2-2', name: '人脸识别与活体检测技术研发团队' },
          { id: 'dept-1-2-3', name: '医疗影像AI辅助诊断研发组' },
          { id: 'dept-1-2-4', name: '自动驾驶视觉感知算法研发小组' },
          { id: 'dept-1-2-5', name: '视频内容理解与智能分析研发团队' }
        ]
      },
      {
        id: 'dept-1-3',
        name: '语音识别与合成技术研发小组',
        children: [
          { id: 'dept-1-3-1', name: '端到端语音识别引擎研发团队' },
          { id: 'dept-1-3-2', name: '多风格语音合成与情感表达研发组' }
        ]
      },
      {
        id: 'dept-1-4',
        name: '强化学习与决策智能研发组',
        children: [
          { id: 'dept-1-4-1', name: '智能博弈与游戏AI研发团队' },
          { id: 'dept-1-4-2', name: '机器人控制与路径规划算法研发组' }
        ]
      }
    ]
  },
  {
    id: 'dept-2',
    name: '云计算与大数据平台技术中心',
    children: [
      {
        id: 'dept-2-1',
        name: '分布式存储与计算架构研发组',
        children: [
          { id: 'dept-2-1-1', name: '高可用分布式数据库内核研发团队' },
          { id: 'dept-2-1-2', name: '云原生容器编排与调度系统研发组' },
          { id: 'dept-2-1-3', name: '对象存储与分布式文件系统研发小组' },
          { id: 'dept-2-1-4', name: '微服务架构与服务网格技术研发团队' }
        ]
      },
      {
        id: 'dept-2-2',
        name: '数据中台与数据治理解决方案团队',
        children: [
          { id: 'dept-2-2-1', name: '企业级数据仓库建模与ETL开发组' },
          { id: 'dept-2-2-2', name: '实时数据流处理与计算引擎研发组' },
          { id: 'dept-2-2-3', name: '数据资产管理与元数据管理研发小组' },
          { id: 'dept-2-2-4', name: '数据质量监控与异常检测系统研发团队' }
        ]
      },
      {
        id: 'dept-2-3',
        name: '云安全与合规性保障研发组',
        children: [
          { id: 'dept-2-3-1', name: '云原生安全架构与容器安全研发团队' },
          { id: 'dept-2-3-2', name: '数据加密与密钥管理系统研发组' }
        ]
      }
    ]
  },
  {
    id: 'dept-3',
    name: '网络安全与隐私保护技术中心',
    children: [
      {
        id: 'dept-3-1',
        name: '网络攻防与安全应急响应团队',
        children: [
          { id: 'dept-3-1-1', name: '威胁情报分析与安全态势感知研发组' },
          { id: 'dept-3-1-2', name: '零信任安全架构与企业安全网关研发组' },
          { id: 'dept-3-1-3', name: '漏洞挖掘与渗透测试技术研发小组' },
          { id: 'dept-3-1-4', name: '安全编排自动化与响应(SOAR)平台研发团队' }
        ]
      },
      {
        id: 'dept-3-2',
        name: '数据隐私计算与联邦学习研发小组',
        children: [
          { id: 'dept-3-2-1', name: '多方安全计算与隐私求交技术研发团队' },
          { id: 'dept-3-2-2', name: '联邦学习平台与隐私保护机器学习研发组' }
        ]
      }
    ]
  },
  {
    id: 'dept-4',
    name: '智能硬件与物联网技术研发中心',
    children: [
      {
        id: 'dept-4-1',
        name: '嵌入式系统与边缘计算研发组',
        children: [
          { id: 'dept-4-1-1', name: '物联网设备固件与操作系统研发团队' },
          { id: 'dept-4-1-2', name: '边缘AI推理与模型优化部署研发小组' },
          { id: 'dept-4-1-3', name: '工业物联网网关与协议转换研发组' }
        ]
      },
      {
        id: 'dept-4-2',
        name: '智能传感器与MEMS技术研发团队',
        children: [
          { id: 'dept-4-2-1', name: '多模态传感器融合算法研发小组' },
          { id: 'dept-4-2-2', name: '环境感知与智能检测传感器研发组' }
        ]
      },
      {
        id: 'dept-4-3',
        name: '智能家居与消费电子解决方案团队',
        children: [
          { id: 'dept-4-3-1', name: '智能音箱与语音交互产品研发小组' },
          { id: 'dept-4-3-2', name: '智能穿戴设备与健康监测研发团队' },
          { id: 'dept-4-3-3', name: '智能家居控制中枢与生态系统研发组' }
        ]
      }
    ]
  },
  {
    id: 'dept-5',
    name: '企业数字化转型与咨询服务事业部',
    children: [
      {
        id: 'dept-5-1',
        name: '行业解决方案与数字化咨询团队',
        children: [
          { id: 'dept-5-1-1', name: '金融行业数字化解决方案与实施团队' },
          { id: 'dept-5-1-2', name: '制造业智能制造与工业互联网咨询组' },
          { id: 'dept-5-1-3', name: '医疗健康行业数字化转型解决方案团队' },
          { id: 'dept-5-1-4', name: '零售电商与新零售数字化咨询研发组' }
        ]
      },
      {
        id: 'dept-5-2',
        name: '项目交付与技术支持服务团队',
        children: [
          { id: 'dept-5-2-1', name: '企业级系统架构设计与集成实施小组' },
          { id: 'dept-5-2-2', name: '客户成功与售后技术支持服务团队' }
        ]
      }
    ]
  }
];

// 基础级联选择
const BasicExample = ({ isPopup }) => {
  const [value, setValue] = useState([]);
  return (
    <Flex vertical gap={8}>
      <span>地区多选（父子关联）：</span>
      <SelectCascader
        options={regionData}
        value={value}
        onChange={setValue}
        isPopup={isPopup}
        valueKey="id"
        labelKey="name"
        placeholder="请选择地区"
        menuItemWidth={160}
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

// 单选模式
const SingleExample = ({ isPopup }) => {
  const [value, setValue] = useState(null);
  return (
    <Flex vertical gap={8}>
      <span>地区单选：</span>
      <SelectCascader
        single
        options={regionData}
        value={value}
        onChange={setValue}
        isPopup={isPopup}
        valueKey="id"
        labelKey="name"
        placeholder="请选择地区"
        menuItemWidth={160}
        style={{ width: 320 }}
      />
      {value && <Tag color="green">已选：{value.name}</Tag>}
    </Flex>
  );
};

// 只选末级
const OnlyLastLevelExample = ({ isPopup }) => {
  const [value, setValue] = useState([]);

  return (
    <Flex vertical gap={8}>
      <span>只允许选择末级节点：</span>
      <SelectCascader
        options={organizationData}
        value={value}
        onChange={setValue}
        isPopup={isPopup}
        valueKey="id"
        labelKey="name"
        onlyAllowLastLevel
        placeholder="请选择团队"
        menuItemWidth={180}
        style={{ width: 360 }}
      />
      {value.length > 0 && (
        <div>
          已选团队：{value.map(item => item.name).join('、')}
        </div>
      )}
    </Flex>
  );
};

// 数量限制
const MaxLimitExample = ({ isPopup }) => {
  const [value, setValue] = useState([]);

  return (
    <Flex vertical gap={8}>
      <span>最多选择 3 项：</span>
      <SelectCascader
        options={regionData}
        value={value}
        onChange={setValue}
        isPopup={isPopup}
        valueKey="id"
        labelKey="name"
        maxLength={3}
        placeholder="请选择地区（最多3项）"
        menuItemWidth={160}
        style={{ width: 320 }}
      />
      <Tag color={value.length >= 3 ? 'red' : 'blue'}>
        已选择 {value.length}/3 项
      </Tag>
    </Flex>
  );
};

// 带搜索功能
const SearchExample = ({ isPopup }) => {
  const [value, setValue] = useState([]);

  return (
    <Flex vertical gap={8}>
      <span>带搜索功能：</span>
      <SelectCascader
        options={regionData}
        value={value}
        onChange={setValue}
        isPopup={isPopup}
        valueKey="id"
        labelKey="name"
        onSearch={(searchText, { mapping }) => {
          return Array.from(mapping.values()).filter(item => 
            item.name.toLowerCase().includes(searchText.toLowerCase())
          );
        }}
        searchPlaceholder="搜索地区名称"
        placeholder="搜索并选择地区"
        menuItemWidth={160}
        style={{ width: 360 }}
      />
    </Flex>
  );
};

// 商品分类选择
const CategoryExample = ({ isPopup }) => {
  const [value, setValue] = useState([]);

  return (
    <Flex vertical gap={8}>
      <span>商品分类选择：</span>
      <SelectCascader
        options={categoryData}
        value={value}
        onChange={setValue}
        isPopup={isPopup}
        valueKey="id"
        labelKey="name"
        placeholder="请选择商品分类"
        menuItemWidth={160}
        style={{ width: 320 }}
      />
      {value.length > 0 && (
        <div>
          已选分类：{value.map(item => item.name).join(' > ')}
        </div>
      )}
    </Flex>
  );
};

// 超长文字测试
const LongTextExample = ({ isPopup }) => {
  const [value, setValue] = useState([]);

  return (
    <Flex vertical gap={8}>
      <span>超长文字省略测试（部门选择）：</span>
      <SelectCascader
        options={longTextData}
        value={value}
        onChange={setValue}
        isPopup={isPopup}
        valueKey="id"
        labelKey="name"
        placeholder="请选择部门"
        menuItemWidth={200}
        style={{ width: 400 }}
      />
      {value.length > 0 && (
        <Flex wrap gap={4}>
          {value.map(item => (
            <Tag key={item.id} color="purple" style={{ maxWidth: 200, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {item.name}
            </Tag>
          ))}
        </Flex>
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
      <BasicExample isPopup={isPopup} />
      <Divider />
      <SingleExample isPopup={isPopup} />
      <Divider />
      <OnlyLastLevelExample isPopup={isPopup} />
      <Divider />
      <MaxLimitExample isPopup={isPopup} />
      <Divider />
      <SearchExample isPopup={isPopup} />
      <Divider />
      <CategoryExample isPopup={isPopup} />
      <Divider />
      <LongTextExample isPopup={isPopup} />
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
| value             | 当前选中的值            | array \| object               | []                  |
| defaultValue      | 默认选中的值            | array \| object               | []                  |
| onChange          | 选中值变化时的回调函数       | function(value)               | -                   |
| single            | 是否单选模式            | boolean                       | false               |
| maxLength         | 最多可选数量（多选模式）      | number                        | -                   |
| disabled          | 是否禁用              | boolean                       | false               |
| size              | 选择框尺寸             | 'small' \| 'default' \| 'large' | 'default'           |
| placeholder       | 输入框占位符            | string                        | '请选择'              |
| labelKey          | 数据项显示文本字段         | string                        | 'label'             |
| valueKey          | 数据项唯一标识字段         | string                        | 'value'             |
| isPopup           | 是否下拉模式（false 为弹窗）| boolean                       | true                |
| placement         | 下拉菜单位置            | string                        | 'bottomLeft'        |
| overlayWidth      | 下拉菜单宽度            | number \| string              | 同输入框宽度              |
| overlayClassName  | 下拉菜单自定义类名         | string                        | -                   |
| labelWrap         | 标签是否换行显示          | boolean                       | false               |
| allowClear        | 是否允许清空            | boolean                       | true                |
| allowSelectedAll  | 是否显示全选按钮          | boolean                       | false               |
| selectedAllValue  | 全选项的值配置           | object                        | { value: 'all', label: '全选' } |
| prefix            | 输入框前缀             | ReactNode \| function         | -                   |
| suffix            | 输入框后缀             | ReactNode \| function         | -                   |
| className         | 自定义类名             | string                        | -                   |
| style             | 自定义样式             | object                        | -                   |
| children          | 自定义渲染内容           | function(props)               | -                   |
| renderModal       | 自定义弹窗渲染（非 isPopup 模式）| function(contextProps)    | 默认 Modal 弹窗        |
| renderContent     | 自定义内容渲染           | function(children)            | -                   |
| inputRender       | 自定义输入框渲染          | function(props, contextProps) | -                   |
| open              | 是否打开下拉菜单          | boolean                       | -                   |
| defaultOpen       | 默认是否打开            | boolean                       | false               |
| onOpenChange      | 下拉菜单状态变化回调        | function(open)                | -                   |

##### 标签溢出处理

组件内置了标签溢出处理功能：

- **单选模式**：文本超出输入框宽度时显示省略号
- **多选模式**：
  - 单个标签最大宽度为 `min(150px, 容器宽度 - 60px)`
  - 超出容器宽度的标签自动隐藏，显示 `+N` 标签表示隐藏数量
  - 标签宽度根据实际内容动态计算，确保精确显示

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

#### SelectCascader

级联选择组件，适用于地区选择、组织架构、商品分类等层级数据的选择场景。支持多列菜单展示、父子关联选择、末级限制、搜索过滤等功能。

| 属性名               | 说明                | 类型                            | 默认值                 |
|-------------------|-------------------|-------------------------------|---------------------|
| options          | 级联数据源            | array                         | []                  |
| value            | 当前选中的值            | array \| object               | []                  |
| onChange         | 选中值变化时的回调函数       | function(value)               | -                   |
| defaultValue     | 默认选中的值            | array                         | []                  |
| single           | 是否单选模式            | boolean                       | false               |
| maxLength        | 最多可选数量            | number                        | Number.MAX_VALUE    |
| onlyAllowLastLevel | 是否只允许选择末级节点     | boolean                       | false               |
| openLoadData     | 是否开启懒加载           | boolean                       | false               |
| onLoadMore       | 懒加载回调函数           | function({ [parentIdKey]: id }) | -                 |
| parentIdKey      | 父节点ID字段名          | string                        | 'id'                |
| menuItemWidth    | 每列菜单宽度            | number                        | 180                 |
| isPopup          | 是否下拉模式（false 为弹窗）| boolean                       | true                |
| searchPlaceholder| 搜索框占位符            | string                        | '搜索...'             |
| onSearch         | 搜索回调函数            | function(searchText, { mapping }) | -              |
| valueKey         | 数据项唯一标识字段         | string                        | 'id'                |
| labelKey         | 数据项显示文本字段         | string                        | 'label'             |
| placeholder      | 输入框占位符            | string                        | '请选择'              |
| disabled         | 是否禁用              | boolean                       | false               |
| size             | 选择框尺寸             | 'small' \| 'default' \| 'large' | 'default'           |
| overlayWidth     | 下拉菜单宽度            | number                        | menuItemWidth * 2   |

##### options 数据结构

```javascript
[
  {
    id: 'node1',           // 唯一标识，字段名可通过 valueKey 配置
    name: '节点名称',       // 显示文本，字段名可通过 labelKey 配置
    children: [            // 子节点
      {
        id: 'node1-1',
        name: '子节点1',
        children: []
      }
    ]
  }
]
```

##### 父子关联选择

组件默认支持父子关联选择：
- 选中父节点时，自动选中所有子节点
- 取消父节点时，自动取消所有子节点
- 当所有子节点都被选中时，父节点自动选中

##### 搜索功能

通过 `onSearch` 属性开启搜索功能：

```jsx
<SelectCascader
  options={data}
  onSearch={(searchText, { mapping }) => {
    return Array.from(mapping.values()).filter(item => 
      item.name.includes(searchText)
    );
  }}
/>
```
