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
