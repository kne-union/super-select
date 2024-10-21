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
