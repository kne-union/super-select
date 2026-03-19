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
