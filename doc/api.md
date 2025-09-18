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
