
# super-select


### 描述

用于复杂信息选择.


### 安装

```shell
npm i --save @kne/super-select
```

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
    label: `第${key + 1}项`, value: key + 1, disabled: key === 1
  };
});

const BaseExample = () => {
  return <Space wrap>
    <SuperSelect options={optionList} suffix={<Button type="text">预览</Button>}
                 prefix={<Button type="text">查看</Button>} />
    <SuperSelect single options={[...optionList, {
      value: 'other', label: '超长label项超长label项超长label项超长label项超长label项超长label项超长label项超长label项'
    }]} />
    <SuperSelect allowSelectedAll options={optionList} maxLength={10} getSearchCallback={({ searchText }, item) => {
      return !searchText || item.label.indexOf(searchText) > -1;
    }} />
    <SuperSelect allowSelectedAll options={optionList} isPopup={false} getSearchCallback={({ searchText }, item) => {
      return !searchText || item.label.indexOf(searchText) > -1;
    }} />
    <SuperSelect api={{
      data: {}, loader: ({ data }) => {
        const { searchText } = data.searchProps;
        if (!searchText) {
          return {
            pageData: optionList, totalCount: optionList.length
          };
        }
        const newOptionList = optionList.filter((item) => !searchText || item.label.indexOf(searchText) > -1);
        return {
          pageData: newOptionList, totalCount: newOptionList.length
        };
      }
    }} isPopup={false} getSearchProps={({ searchText }) => {
      return { searchText };
    }} />

    <SuperSelect options={optionList} inputRender={({ value }) => {
      return <Button type="link">编辑</Button>;
    }} />
  </Space>;
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
    <SelectTableList options={optionList} columns={columns} valueKey="id" />
    <SelectTableList single options={optionList} columns={columns} valueKey="id" />
    <SelectTableList allowSelectedAll options={optionList} columns={columns} valueKey="id" />
    <SelectTableList options={optionList} columns={columns} isPopup={false} valueKey="id" />
    <SelectTableList allowSelectedAll options={optionList} columns={columns} isPopup={false} valueKey="id" />
    <SelectTableList single options={optionList} columns={columns} isPopup={false} valueKey="id" />
  </Space>;
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

| 属性名 | 说明 | 类型 | 默认值 |
|-----|----|----|-----|
|     |    |    |     |

