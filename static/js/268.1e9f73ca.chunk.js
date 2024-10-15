"use strict";(self.webpackChunk_kne_components_super_select=self.webpackChunk_kne_components_super_select||[]).push([[268],{30268:(e,t,n)=>{n.r(t),n.d(t,{default:()=>s,manifest:()=>p});var a=n(70639),l=n(55199);const s={SuperSelect:{name:"super-select",summary:'<h1>super-select</h1>\n<h3>\u63cf\u8ff0</h3>\n<p>\u7528\u4e8e\u590d\u6742\u4fe1\u606f\u9009\u62e9.</p>\n<h3>\u5b89\u88c5</h3>\n<pre><code class="language-shell">npm i --save @kne/super-select\n</code></pre>',description:"\u7528\u4e8e\u590d\u6742\u4fe1\u606f\u9009\u62e9.",packageName:"@kne/super-select",api:"<table>\n<thead>\n<tr>\n<th>\u5c5e\u6027\u540d</th>\n<th>\u8bf4\u660e</th>\n<th>\u7c7b\u578b</th>\n<th>\u9ed8\u8ba4\u503c</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td></td>\n<td></td>\n<td></td>\n<td></td>\n</tr>\n</tbody>\n</table>",example:{isFull:!1,className:"super_select_b8606",style:".super_select_b8606 .max-width-150 {\n  max-width: 150px;\n}",list:[{title:"select-input",description:"\u7528\u4e8e\u663e\u793a\u4e00\u4e2a\u9009\u62e9\u6846\uff0c\u53ef\u4ee5\u4e0b\u62c9\u5c55\u5f00\u9009\u9879\u6216\u8005\u4ee5modal\u5c55\u793a\u9009\u9879",code:"const { SelectInput } = _SuperSelect;\nconst { Space, Flex } = antd;\n\nconst BaseExample = () => {\n  return <Flex vertical gap={8}>\n    <Space>\n      <SelectInput />\n      <SelectInput defaultValue={[{ value: 0, label: '\u7b2c\u4e00\u9879' }, { value: 1, label: '\u7b2c\u4e8c\u9879' }]} />\n      <SelectInput defaultValue={[{ value: 'all', label: '\u5168\u9009' }]} />\n      <SelectInput className=\"max-width-150\" defaultValue={Array.from({ length: 10 }).map((value, index) => {\n        return { value: index, label: `\u7b2c${index}\u9879` };\n      })} />\n      <SelectInput defaultValue={[{ value: 0, label: '\u7b2c\u4e00\u9879' }, { value: 1, label: '\u7b2c\u4e8c\u9879' }]} disabled />\n    </Space>\n    <Space>\n      <SelectInput isPopup={false}/>\n    </Space>\n  </Flex>;\n};\n\nrender(<BaseExample />);\n\n",scope:[{name:"_SuperSelect",packageName:"@kne/current-lib_super-select",importStatement:'import * as _SuperSelect from "@kne/super-select"',component:a},{name:"antd",packageName:"antd",component:l}]},{title:"select-list",description:"\u5217\u8868\u9009\u62e9",code:"const { default: SuperSelect } = _SuperSelect;\nconst { Space } = antd;\n\nconst optionList = Array.from({ length: 20 }).map((item, key) => {\n  return {\n    label: `\u7b2c${key + 1}\u9879`, value: key + 1\n  };\n});\n\nconst BaseExample = () => {\n  return <Space wrap>\n    <SuperSelect options={optionList} />\n    <SuperSelect single options={optionList} />\n    <SuperSelect allowSelectedAll options={optionList} maxLength={10} getSearchCallback={(searchText, item) => {\n      return item.label.indexOf(searchText) > -1;\n    }} />\n    <SuperSelect allowSelectedAll options={optionList} isPopup={false} getSearchCallback={(searchText, item) => {\n      return item.label.indexOf(searchText) > -1;\n    }} />\n    <SuperSelect allowSelectedAll api={{\n      data: {}, loader: ({ data }) => {\n        const { searchText } = data;\n        if (!searchText) {\n          return {\n            pageData: optionList, totalCount: optionList.length\n          };\n        }\n        const newOptionList = optionList.filter((item) => item.label.indexOf(searchText) > -1);\n        return {\n          pageData: newOptionList, totalCount: newOptionList.length\n        };\n      }\n    }} isPopup={false} getSearchProps={(searchText) => {\n      return { data: { searchText } };\n    }} />\n  </Space>;\n};\n\nrender(<BaseExample />);\n\n",scope:[{name:"_SuperSelect",packageName:"@kne/current-lib_super-select",importStatement:'import * as _SuperSelect from "@kne/super-select"',component:a},{name:"antd",packageName:"antd",component:l}]}]}}},p={name:"super-select",version:"0.1.0","open-version":!0,"public-url":"/super-select",modules:[{name:"super-select",baseDir:"/home/runner/work/super-select/super-select",description:"\u7528\u4e8e\u590d\u6742\u4fe1\u606f\u9009\u62e9.",packageName:"@kne/super-select"}]}}}]);
//# sourceMappingURL=268.1e9f73ca.chunk.js.map