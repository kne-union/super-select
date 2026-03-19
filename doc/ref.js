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
