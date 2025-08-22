const { SelectTree } = _SuperSelect;
const { Space, Button } = antd;

const options = [
  {
    id: '216822533465310208',
    parentId: '216822162877580288',
    name: '点点滴滴',
    description: '点点滴滴',
    index: 0,
    createdAt: '2025-08-21T07:35:20.346Z',
    updatedAt: '2025-08-21T07:35:20.346Z',
    deletedAt: null,
    tenantId: '216429049541559296'
  },
  {
    id: '216827588281107456',
    parentId: '216822162877580288',
    name: '都是发的身份',
    description: '水电费是的水电费水电费',
    index: 0,
    createdAt: '2025-08-21T07:55:25.508Z',
    updatedAt: '2025-08-21T07:55:25.508Z',
    deletedAt: null,
    tenantId: '216429049541559296'
  },
  {
    id: '216820469385397248',
    parentId: null,
    name: '水电费水电费是11111',
    description: '水电费水电费是的撒地方水电费水电费水电费水电费水电费水电费水电费水电费水电费水电费水电费水电费水电费的身份',
    index: 0,
    createdAt: '2025-08-21T07:27:08.230Z',
    updatedAt: '2025-08-21T08:16:50.232Z',
    deletedAt: null,
    tenantId: '216429049541559296'
  },
  {
    id: '216838887668974592',
    parentId: '216822162877580288',
    name: '水电费水电费',
    description: '电饭锅梵蒂冈电饭锅',
    index: 0,
    createdAt: '2025-08-21T08:40:19.491Z',
    updatedAt: '2025-08-21T08:40:19.491Z',
    deletedAt: null,
    tenantId: '216429049541559296'
  },
  {
    id: '216838908569191424',
    parentId: '216822162877580288',
    name: '电饭锅电饭锅',
    description: '电饭锅电饭锅电饭锅电饭锅电饭锅',
    index: 0,
    createdAt: '2025-08-21T08:40:24.475Z',
    updatedAt: '2025-08-21T08:40:24.475Z',
    deletedAt: null,
    tenantId: '216429049541559296'
  },
  {
    id: '216838930408932352',
    parentId: '216822162877580288',
    name: '规范化风格化',
    description: '风格化风格化风格化风格化风格化',
    index: 0,
    createdAt: '2025-08-21T08:40:29.682Z',
    updatedAt: '2025-08-21T08:40:29.682Z',
    deletedAt: null,
    tenantId: '216429049541559296'
  },
  {
    id: '216843395140682752',
    parentId: null,
    name: '水电费的身份',
    description: '水电费是的的身份',
    index: 0,
    createdAt: '2025-08-21T08:58:14.156Z',
    updatedAt: '2025-08-21T08:58:14.156Z',
    deletedAt: null,
    tenantId: '216429049541559296'
  },
  {
    id: '216844313588401152',
    parentId: '216843395140682752',
    name: '水电费水电费',
    description: '身份是的水电费水电费',
    index: 0,
    createdAt: '2025-08-21T09:01:53.132Z',
    updatedAt: '2025-08-21T09:01:53.132Z',
    deletedAt: null,
    tenantId: '216429049541559296'
  },
  {
    id: '216844336053093376',
    parentId: '216843395140682752',
    name: '水电费水电费',
    description: '水电费水电费水电费水电费水电费',
    index: 0,
    createdAt: '2025-08-21T09:01:58.488Z',
    updatedAt: '2025-08-21T09:01:58.488Z',
    deletedAt: null,
    tenantId: '216429049541559296'
  },
  {
    id: '216844365669073920',
    parentId: '216844313588401152',
    name: '水电费水电费',
    description: '水电费水电费水电费水电费发大水',
    index: 0,
    createdAt: '2025-08-21T09:02:05.548Z',
    updatedAt: '2025-08-21T09:02:05.548Z',
    deletedAt: null,
    tenantId: '216429049541559296'
  },
  {
    id: '216844381611623424',
    parentId: '216844336053093376',
    name: '的身份水电费是的',
    description: null,
    index: 0,
    createdAt: '2025-08-21T09:02:09.349Z',
    updatedAt: '2025-08-21T09:02:09.349Z',
    deletedAt: null,
    tenantId: '216429049541559296'
  },
  {
    id: '216844403434587136',
    parentId: '216843395140682752',
    name: '水电费水电费水电费是的',
    description: null,
    index: 0,
    createdAt: '2025-08-21T09:02:14.553Z',
    updatedAt: '2025-08-21T09:02:14.553Z',
    deletedAt: null,
    tenantId: '216429049541559296'
  },
  {
    id: '216822162877580288',
    parentId: '216820469385397248',
    name: '水电费是的',
    description: '水电费水电费的身份水电费11111',
    index: 0,
    createdAt: '2025-08-21T07:33:51.990Z',
    updatedAt: '2025-08-21T09:09:38.933Z',
    deletedAt: null,
    tenantId: '216429049541559296'
  },
  {
    id: '216847218563351552',
    parentId: null,
    name: '水电费是的',
    description: '的身份是的的身份水电费',
    index: 0,
    createdAt: '2025-08-21T09:13:25.732Z',
    updatedAt: '2025-08-21T09:13:25.732Z',
    deletedAt: null,
    tenantId: '216429049541559296'
  },
  {
    id: '216854106755564544',
    parentId: '216847218563351552',
    name: '让是非得失的',
    description: '电饭锅地方地方电饭锅电饭锅',
    index: 0,
    createdAt: '2025-08-21T09:40:48.005Z',
    updatedAt: '2025-08-21T09:40:48.005Z',
    deletedAt: null,
    tenantId: '216429049541559296'
  },
  {
    id: '216854194546541568',
    parentId: '216847218563351552',
    name: '电饭锅电饭锅电饭锅',
    description: '电饭锅电饭锅地方电饭锅电饭锅',
    index: 0,
    createdAt: '2025-08-21T09:41:08.936Z',
    updatedAt: '2025-08-21T09:41:08.936Z',
    deletedAt: null,
    tenantId: '216429049541559296'
  },
  {
    id: '216856947163399168',
    parentId: null,
    name: '发水电费是的',
    description: '发的电饭锅地方个电饭锅电饭锅电饭锅地方',
    index: 0,
    createdAt: '2025-08-21T09:52:05.211Z',
    updatedAt: '2025-08-21T09:52:05.211Z',
    deletedAt: null,
    tenantId: '216429049541559296'
  }
];

const BaseExample = () => {
  return (
    <Space wrap>
      <SelectTree options={options} valueKey="id" labelKey="name" />

      <SelectTree single options={options} valueKey="id" labelKey="name" />

      <SelectTree
        name="tree"
        label="树选择"
        options={[
          {
            value: '1',
            label: '父节点'
          },
          {
            value: '2',
            label: '子节点',
            parentId: '1'
          }
        ]}
      />
    </Space>
  );
};

render(<BaseExample />);
