const { SelectInput } = _SuperSelect;
const { Flex, Tag } = antd;
const { useState } = React;

// 超多选项测试示例（100项）
const ManyOptionsExample = () => {
  const manyOptions = Array.from({ length: 100 }, (_, i) => ({
    value: `user_${i + 1}`,
    label: `用户${i + 1}`
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
      value: `item_${i + 1}`,
      label: `选项${i + 1}`
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
