
# super-select


### 描述

用于复杂信息选择.


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

- select-input
- 用于显示一个选择框，可以下拉展开选项或者以modal展示选项
- _SuperSelect(@kne/current-lib_super-select)[import * as _SuperSelect from "@kne/super-select"],antd(antd),(@kne/current-lib_super-select/dist/index.css)

```jsx
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

```

- select-list
- 列表选择
- _SuperSelect(@kne/current-lib_super-select)[import * as _SuperSelect from "@kne/super-select"],antd(antd),(@kne/current-lib_super-select/dist/index.css)

```jsx
const { default: SuperSelect } = _SuperSelect;
const { Space, Button } = antd;

const optionList = Array.from({ length: 20 }).map((item, key) => {
  return {
    label: `第${key + 1}项`,
    value: key + 1,
    disabled: key === 1
  };
});

const BaseExample = () => {
  return (
    <Space wrap>
      <SuperSelect options={optionList} suffix={<Button type="text">预览</Button>} prefix={<Button type="text">查看</Button>} />
      <SuperSelect
        single
        options={[
          ...optionList,
          {
            value: 'other',
            label: '超长label项超长label项超长label项超长label项超长label项超长label项超长label项超长label项'
          }
        ]}
      />
      <SuperSelect
        allowSelectedAll
        options={optionList}
        maxLength={10}
        getSearchCallback={({ searchText }, item) => {
          return !searchText || item.label.indexOf(searchText) > -1;
        }}
      />
      <SuperSelect
        allowSelectedAll
        options={optionList}
        isPopup={false}
        getSearchCallback={({ searchText }, item) => {
          return !searchText || item.label.indexOf(searchText) > -1;
        }}
      />
      <SuperSelect
        api={{
          data: {},
          loader: ({ data }) => {
            const searchText = data.searchProps && data.searchProps.searchText;
            if (!searchText) {
              return {
                pageData: optionList,
                totalCount: optionList.length
              };
            }
            const newOptionList = optionList.filter(item => !searchText || item.label.indexOf(searchText) > -1);
            return {
              pageData: newOptionList,
              totalCount: newOptionList.length
            };
          }
        }}
        isPopup={false}
        getSearchProps={({ searchText }) => {
          return { searchText };
        }}
      />

      <SuperSelect
        defaultOpen
        options={optionList}
        inputRender={({ value }) => {
          return <Button type="link">编辑</Button>;
        }}
      />

      <SuperSelect
        options={optionList}
        footer={({ close, reload }) => {
          return (
            <Button type="link" onClick={reload}>
              添加
            </Button>
          );
        }}
      />

      <SuperSelect
        options={[]}
        footer={({ close, reload }) => {
          return (
            <Button type="link" onClick={reload}>
              添加
            </Button>
          );
        }}
      />
    </Space>
  );
};

render(<BaseExample />);

```

- select--table-list
- 表格列表选择，适合更加复杂的数据选择
- _SuperSelect(@kne/current-lib_super-select)[import * as _SuperSelect from "@kne/super-select"],antd(antd),(@kne/current-lib_super-select/dist/index.css)

```jsx
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
                     footer={<Button type="link">预览</Button>} getSearchCallback={({ searchText }, item) => {
      return !searchText || item.label.indexOf(searchText) > -1;
    }}/>
    <SelectTableList options={optionList} columns={columns} isPopup={false} valueKey="id"
                     footer={<Button type="link">预览</Button>} />
    <SelectTableList allowSelectedAll options={optionList} columns={columns} isPopup={false} valueKey="id"
                     footer={<Button type="link">预览</Button>} getSearchCallback={({ searchText }, item) => {
      return !searchText || item.label.indexOf(searchText) > -1;
    }}/>
    <SelectTableList single options={optionList} columns={columns} isPopup={false} valueKey="id"
                     footer={<Button type="link">预览</Button>} />
    <SelectTableList single options={[]} columns={columns} isPopup={false} valueKey="id"
                     footer={<Button type="link">预览</Button>} />
  </Space>;
};

render(<BaseExample />);

```

- select-tree
- 树选择
- _SuperSelect(@kne/current-lib_super-select)[import * as _SuperSelect from "@kne/super-select"],antd(antd),(@kne/current-lib_super-select/dist/index.css)

```jsx
const { SelectTree } = _SuperSelect;
const { Space, Button } = antd;

const options = [
  {
    id: '216822533465310208',
    parentId: '216822162877580288',
    name: '点点滴滴',
    description: '点点滴滴',
    index: 0,
    createdAt: '2025-08-21T07:35:20.346Z',
    updatedAt: '2025-08-21T07:35:20.346Z',
    deletedAt: null,
    tenantId: '216429049541559296'
  },
  {
    id: '216827588281107456',
    parentId: '216822162877580288',
    name: '都是发的身份',
    description: '水电费是的水电费水电费',
    index: 0,
    createdAt: '2025-08-21T07:55:25.508Z',
    updatedAt: '2025-08-21T07:55:25.508Z',
    deletedAt: null,
    tenantId: '216429049541559296'
  },
  {
    id: '216820469385397248',
    parentId: null,
    name: '水电费水电费是11111',
    description: '水电费水电费是的撒地方水电费水电费水电费水电费水电费水电费水电费水电费水电费水电费水电费水电费水电费的身份',
    index: 0,
    createdAt: '2025-08-21T07:27:08.230Z',
    updatedAt: '2025-08-21T08:16:50.232Z',
    deletedAt: null,
    tenantId: '216429049541559296'
  },
  {
    id: '216838887668974592',
    parentId: '216822162877580288',
    name: '水电费水电费',
    description: '电饭锅梵蒂冈电饭锅',
    index: 0,
    createdAt: '2025-08-21T08:40:19.491Z',
    updatedAt: '2025-08-21T08:40:19.491Z',
    deletedAt: null,
    tenantId: '216429049541559296'
  },
  {
    id: '216838908569191424',
    parentId: '216822162877580288',
    name: '电饭锅电饭锅',
    description: '电饭锅电饭锅电饭锅电饭锅电饭锅',
    index: 0,
    createdAt: '2025-08-21T08:40:24.475Z',
    updatedAt: '2025-08-21T08:40:24.475Z',
    deletedAt: null,
    tenantId: '216429049541559296'
  },
  {
    id: '216838930408932352',
    parentId: '216822162877580288',
    name: '规范化风格化',
    description: '风格化风格化风格化风格化风格化',
    index: 0,
    createdAt: '2025-08-21T08:40:29.682Z',
    updatedAt: '2025-08-21T08:40:29.682Z',
    deletedAt: null,
    tenantId: '216429049541559296'
  },
  {
    id: '216843395140682752',
    parentId: null,
    name: '水电费的身份',
    description: '水电费是的的身份',
    index: 0,
    createdAt: '2025-08-21T08:58:14.156Z',
    updatedAt: '2025-08-21T08:58:14.156Z',
    deletedAt: null,
    tenantId: '216429049541559296'
  },
  {
    id: '216844313588401152',
    parentId: '216843395140682752',
    name: '水电费水电费',
    description: '身份是的水电费水电费',
    index: 0,
    createdAt: '2025-08-21T09:01:53.132Z',
    updatedAt: '2025-08-21T09:01:53.132Z',
    deletedAt: null,
    tenantId: '216429049541559296'
  },
  {
    id: '216844336053093376',
    parentId: '216843395140682752',
    name: '水电费水电费',
    description: '水电费水电费水电费水电费水电费',
    index: 0,
    createdAt: '2025-08-21T09:01:58.488Z',
    updatedAt: '2025-08-21T09:01:58.488Z',
    deletedAt: null,
    tenantId: '216429049541559296'
  },
  {
    id: '216844365669073920',
    parentId: '216844313588401152',
    name: '水电费水电费',
    description: '水电费水电费水电费水电费发大水',
    index: 0,
    createdAt: '2025-08-21T09:02:05.548Z',
    updatedAt: '2025-08-21T09:02:05.548Z',
    deletedAt: null,
    tenantId: '216429049541559296'
  },
  {
    id: '216844381611623424',
    parentId: '216844336053093376',
    name: '的身份水电费是的',
    description: null,
    index: 0,
    createdAt: '2025-08-21T09:02:09.349Z',
    updatedAt: '2025-08-21T09:02:09.349Z',
    deletedAt: null,
    tenantId: '216429049541559296'
  },
  {
    id: '216844403434587136',
    parentId: '216843395140682752',
    name: '水电费水电费水电费是的',
    description: null,
    index: 0,
    createdAt: '2025-08-21T09:02:14.553Z',
    updatedAt: '2025-08-21T09:02:14.553Z',
    deletedAt: null,
    tenantId: '216429049541559296'
  },
  {
    id: '216822162877580288',
    parentId: '216820469385397248',
    name: '水电费是的',
    description: '水电费水电费的身份水电费11111',
    index: 0,
    createdAt: '2025-08-21T07:33:51.990Z',
    updatedAt: '2025-08-21T09:09:38.933Z',
    deletedAt: null,
    tenantId: '216429049541559296'
  },
  {
    id: '216847218563351552',
    parentId: null,
    name: '水电费是的',
    description: '的身份是的的身份水电费',
    index: 0,
    createdAt: '2025-08-21T09:13:25.732Z',
    updatedAt: '2025-08-21T09:13:25.732Z',
    deletedAt: null,
    tenantId: '216429049541559296'
  },
  {
    id: '216854106755564544',
    parentId: '216847218563351552',
    name: '让是非得失的',
    description: '电饭锅地方地方电饭锅电饭锅',
    index: 0,
    createdAt: '2025-08-21T09:40:48.005Z',
    updatedAt: '2025-08-21T09:40:48.005Z',
    deletedAt: null,
    tenantId: '216429049541559296'
  },
  {
    id: '216854194546541568',
    parentId: '216847218563351552',
    name: '电饭锅电饭锅电饭锅',
    description: '电饭锅电饭锅地方电饭锅电饭锅',
    index: 0,
    createdAt: '2025-08-21T09:41:08.936Z',
    updatedAt: '2025-08-21T09:41:08.936Z',
    deletedAt: null,
    tenantId: '216429049541559296'
  },
  {
    id: '216856947163399168',
    parentId: null,
    name: '发水电费是的',
    description: '发的电饭锅地方个电饭锅电饭锅电饭锅地方',
    index: 0,
    createdAt: '2025-08-21T09:52:05.211Z',
    updatedAt: '2025-08-21T09:52:05.211Z',
    deletedAt: null,
    tenantId: '216429049541559296'
  }
];

const BaseExample = () => {
  return (
    <Space wrap>
      <SelectTree options={options} valueKey="id" labelKey="name" />

      <SelectTree single options={options} valueKey="id" labelKey="name" />

      <SelectTree
        name="tree"
        label="树选择"
        options={[
          {
            value: '1',
            label: '父节点'
          },
          {
            value: '2',
            label: '子节点',
            parentId: '1'
          }
        ]}
      />
    </Space>
  );
};

render(<BaseExample />);

```

- ref
- 展示ref的使用
- _SuperSelect(@kne/current-lib_super-select)[import * as _SuperSelect from "@kne/super-select"],antd(antd),(@kne/current-lib_super-select/dist/index.css)

```jsx
const { default: SuperSelect } = _SuperSelect;
const { Space, Button } = antd;
const { useRef } = React;

const optionList = Array.from({ length: 20 }).map((item, key) => {
  return {
    label: `第${key + 1}项`, value: key + 1, disabled: key === 1
  };
});

const BaseExample = () => {
  const ref = useRef();
  return <Space wrap>
    <SuperSelect options={optionList} ref={ref} />
    <Button onClick={() => {
      ref.current.onOpenChange(true);
    }}>打开弹窗</Button>
  </Space>;
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

