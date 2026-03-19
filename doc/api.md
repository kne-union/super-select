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
