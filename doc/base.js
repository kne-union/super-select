const { default: SuperSelect } = _SuperSelect;
const { Space } = antd;

const optionList = Array.from({ length: 20 }).map((item, key) => {
  return {
    label: `第${key + 1}项`, value: key + 1
  };
});

const BaseExample = () => {
  return <Space wrap>
    <SuperSelect options={optionList} />
    <SuperSelect single options={optionList} />
    <SuperSelect allowSelectedAll options={optionList} maxLength={10} getSearchCallback={(searchText, item) => {
      return item.label.indexOf(searchText) > -1;
    }} />
    <SuperSelect allowSelectedAll options={optionList} isPopup={false} getSearchCallback={(searchText, item) => {
      return item.label.indexOf(searchText) > -1;
    }} />
    <SuperSelect allowSelectedAll api={{
      data: {}, loader: ({ data }) => {
        const { searchText } = data;
        if (!searchText) {
          return {
            pageData: optionList, totalCount: optionList.length
          };
        }
        const newOptionList = optionList.filter((item) => item.label.indexOf(searchText) > -1);
        return {
          pageData: newOptionList, totalCount: newOptionList.length
        };
      }
    }} isPopup={false} getSearchProps={(searchText) => {
      return { data: { searchText } };
    }} />
  </Space>;
};

render(<BaseExample />);
