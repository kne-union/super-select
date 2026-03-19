const { SelectCascader } = _SuperSelect;
const { Space, Button, Flex, Divider, Tag, Switch, message } = antd;
const { useState, useRef } = React;

// 中国地区数据
const regionData = [
  {
    id: 'beijing',
    name: '北京市',
    children: [
      { id: 'haidian', name: '海淀区' },
      { id: 'chaoyang', name: '朝阳区' },
      { id: 'dongcheng', name: '东城区' },
      { id: 'xicheng', name: '西城区' }
    ]
  },
  {
    id: 'shanghai',
    name: '上海市',
    children: [
      { id: 'pudong', name: '浦东新区' },
      { id: 'huangpu', name: '黄浦区' },
      { id: 'jingan', name: '静安区' },
      { id: 'xuhui', name: '徐汇区' }
    ]
  },
  {
    id: 'guangdong',
    name: '广东省',
    children: [
      {
        id: 'guangzhou',
        name: '广州市',
        children: [
          { id: 'tianhe', name: '天河区' },
          { id: 'yuexiu', name: '越秀区' },
          { id: 'panyu', name: '番禺区' }
        ]
      },
      {
        id: 'shenzhen',
        name: '深圳市',
        children: [
          { id: 'nanshan', name: '南山区' },
          { id: 'futian', name: '福田区' },
          { id: 'luohu', name: '罗湖区' }
        ]
      },
      { id: 'dongguan', name: '东莞市' }
    ]
  },
  {
    id: 'zhejiang',
    name: '浙江省',
    children: [
      {
        id: 'hangzhou',
        name: '杭州市',
        children: [
          { id: 'xihu', name: '西湖区' },
          { id: 'binjiang', name: '滨江区' }
        ]
      },
      {
        id: 'ningbo',
        name: '宁波市',
        children: [
          { id: 'haishu', name: '海曙区' },
          { id: 'yinzhou', name: '鄞州区' }
        ]
      }
    ]
  },
  {
    id: 'jiangsu',
    name: '江苏省',
    children: [
      {
        id: 'nanjing',
        name: '南京市',
        children: [
          { id: 'xuanwu', name: '玄武区' },
          { id: 'qinhuai', name: '秦淮区' }
        ]
      },
      {
        id: 'suzhou',
        name: '苏州市',
        children: [
          { id: 'gusu', name: '姑苏区' },
          { id: 'industrial', name: '工业园区' }
        ]
      }
    ]
  }
];

// 组织架构数据
const organizationData = [
  {
    id: 'tech',
    name: '技术研发中心',
    code: 'TECH',
    children: [
      {
        id: 'tech-fe',
        name: '前端开发组',
        code: 'FE',
        children: [
          { id: 'fe-react', name: 'React 团队', code: 'REACT' },
          { id: 'fe-vue', name: 'Vue 团队', code: 'VUE' }
        ]
      },
      {
        id: 'tech-be',
        name: '后端开发组',
        code: 'BE',
        children: [
          { id: 'be-java', name: 'Java 团队', code: 'JAVA' },
          { id: 'be-go', name: 'Go 团队', code: 'GO' }
        ]
      },
      { id: 'tech-qa', name: '质量保障组', code: 'QA' }
    ]
  },
  {
    id: 'product',
    name: '产品设计中心',
    code: 'PRODUCT',
    children: [
      { id: 'product-design', name: 'UI设计组', code: 'DESIGN' },
      { id: 'product-pm', name: '产品经理组', code: 'PM' }
    ]
  },
  {
    id: 'operation',
    name: '运营中心',
    code: 'OP',
    children: [
      { id: 'op-marketing', name: '市场营销组', code: 'MARKETING' },
      { id: 'op-cs', name: '客户服务组', code: 'CS' }
    ]
  }
];

// 商品分类数据
const categoryData = [
  {
    id: 'electronics',
    name: '电子产品',
    children: [
      {
        id: 'phone',
        name: '手机',
        children: [
          { id: 'iphone', name: 'iPhone' },
          { id: 'android', name: '安卓手机' }
        ]
      },
      {
        id: 'computer',
        name: '电脑',
        children: [
          { id: 'laptop', name: '笔记本' },
          { id: 'desktop', name: '台式机' }
        ]
      }
    ]
  },
  {
    id: 'clothing',
    name: '服装',
    children: [
      {
        id: 'mens',
        name: '男装',
        children: [
          { id: 'mens-shirt', name: '衬衫' },
          { id: 'mens-pants', name: '裤子' }
        ]
      },
      {
        id: 'womens',
        name: '女装',
        children: [
          { id: 'womens-dress', name: '连衣裙' },
          { id: 'womens-blouse', name: '上衣' }
        ]
      }
    ]
  }
];

// 超长文字测试数据
const longTextData = [
  {
    id: 'dept-1',
    name: '人工智能与机器学习应用技术研发中心',
    children: [
      {
        id: 'dept-1-1',
        name: '自然语言处理与智能对话系统研发组',
        children: [
          { id: 'dept-1-1-1', name: '大语言模型训练与优化专项小组' },
          { id: 'dept-1-1-2', name: '智能客服机器人产品研发团队' },
          { id: 'dept-1-1-3', name: '多语言机器翻译引擎研发组' },
          { id: 'dept-1-1-4', name: '知识图谱构建与智能问答系统研发小组' },
          { id: 'dept-1-1-5', name: '文本挖掘与情感分析技术研发团队' }
        ]
      },
      {
        id: 'dept-1-2',
        name: '计算机视觉与图像识别技术研发组',
        children: [
          { id: 'dept-1-2-1', name: '工业质检视觉检测算法研发小组' },
          { id: 'dept-1-2-2', name: '人脸识别与活体检测技术研发团队' },
          { id: 'dept-1-2-3', name: '医疗影像AI辅助诊断研发组' },
          { id: 'dept-1-2-4', name: '自动驾驶视觉感知算法研发小组' },
          { id: 'dept-1-2-5', name: '视频内容理解与智能分析研发团队' }
        ]
      },
      {
        id: 'dept-1-3',
        name: '语音识别与合成技术研发小组',
        children: [
          { id: 'dept-1-3-1', name: '端到端语音识别引擎研发团队' },
          { id: 'dept-1-3-2', name: '多风格语音合成与情感表达研发组' }
        ]
      },
      {
        id: 'dept-1-4',
        name: '强化学习与决策智能研发组',
        children: [
          { id: 'dept-1-4-1', name: '智能博弈与游戏AI研发团队' },
          { id: 'dept-1-4-2', name: '机器人控制与路径规划算法研发组' }
        ]
      }
    ]
  },
  {
    id: 'dept-2',
    name: '云计算与大数据平台技术中心',
    children: [
      {
        id: 'dept-2-1',
        name: '分布式存储与计算架构研发组',
        children: [
          { id: 'dept-2-1-1', name: '高可用分布式数据库内核研发团队' },
          { id: 'dept-2-1-2', name: '云原生容器编排与调度系统研发组' },
          { id: 'dept-2-1-3', name: '对象存储与分布式文件系统研发小组' },
          { id: 'dept-2-1-4', name: '微服务架构与服务网格技术研发团队' }
        ]
      },
      {
        id: 'dept-2-2',
        name: '数据中台与数据治理解决方案团队',
        children: [
          { id: 'dept-2-2-1', name: '企业级数据仓库建模与ETL开发组' },
          { id: 'dept-2-2-2', name: '实时数据流处理与计算引擎研发组' },
          { id: 'dept-2-2-3', name: '数据资产管理与元数据管理研发小组' },
          { id: 'dept-2-2-4', name: '数据质量监控与异常检测系统研发团队' }
        ]
      },
      {
        id: 'dept-2-3',
        name: '云安全与合规性保障研发组',
        children: [
          { id: 'dept-2-3-1', name: '云原生安全架构与容器安全研发团队' },
          { id: 'dept-2-3-2', name: '数据加密与密钥管理系统研发组' }
        ]
      }
    ]
  },
  {
    id: 'dept-3',
    name: '网络安全与隐私保护技术中心',
    children: [
      {
        id: 'dept-3-1',
        name: '网络攻防与安全应急响应团队',
        children: [
          { id: 'dept-3-1-1', name: '威胁情报分析与安全态势感知研发组' },
          { id: 'dept-3-1-2', name: '零信任安全架构与企业安全网关研发组' },
          { id: 'dept-3-1-3', name: '漏洞挖掘与渗透测试技术研发小组' },
          { id: 'dept-3-1-4', name: '安全编排自动化与响应(SOAR)平台研发团队' }
        ]
      },
      {
        id: 'dept-3-2',
        name: '数据隐私计算与联邦学习研发小组',
        children: [
          { id: 'dept-3-2-1', name: '多方安全计算与隐私求交技术研发团队' },
          { id: 'dept-3-2-2', name: '联邦学习平台与隐私保护机器学习研发组' }
        ]
      }
    ]
  },
  {
    id: 'dept-4',
    name: '智能硬件与物联网技术研发中心',
    children: [
      {
        id: 'dept-4-1',
        name: '嵌入式系统与边缘计算研发组',
        children: [
          { id: 'dept-4-1-1', name: '物联网设备固件与操作系统研发团队' },
          { id: 'dept-4-1-2', name: '边缘AI推理与模型优化部署研发小组' },
          { id: 'dept-4-1-3', name: '工业物联网网关与协议转换研发组' }
        ]
      },
      {
        id: 'dept-4-2',
        name: '智能传感器与MEMS技术研发团队',
        children: [
          { id: 'dept-4-2-1', name: '多模态传感器融合算法研发小组' },
          { id: 'dept-4-2-2', name: '环境感知与智能检测传感器研发组' }
        ]
      },
      {
        id: 'dept-4-3',
        name: '智能家居与消费电子解决方案团队',
        children: [
          { id: 'dept-4-3-1', name: '智能音箱与语音交互产品研发小组' },
          { id: 'dept-4-3-2', name: '智能穿戴设备与健康监测研发团队' },
          { id: 'dept-4-3-3', name: '智能家居控制中枢与生态系统研发组' }
        ]
      }
    ]
  },
  {
    id: 'dept-5',
    name: '企业数字化转型与咨询服务事业部',
    children: [
      {
        id: 'dept-5-1',
        name: '行业解决方案与数字化咨询团队',
        children: [
          { id: 'dept-5-1-1', name: '金融行业数字化解决方案与实施团队' },
          { id: 'dept-5-1-2', name: '制造业智能制造与工业互联网咨询组' },
          { id: 'dept-5-1-3', name: '医疗健康行业数字化转型解决方案团队' },
          { id: 'dept-5-1-4', name: '零售电商与新零售数字化咨询研发组' }
        ]
      },
      {
        id: 'dept-5-2',
        name: '项目交付与技术支持服务团队',
        children: [
          { id: 'dept-5-2-1', name: '企业级系统架构设计与集成实施小组' },
          { id: 'dept-5-2-2', name: '客户成功与售后技术支持服务团队' }
        ]
      }
    ]
  }
];

// 基础级联选择
const BasicExample = ({ isPopup }) => {
  const [value, setValue] = useState([]);
  return (
    <Flex vertical gap={8}>
      <span>地区多选（父子关联）：</span>
      <SelectCascader
        options={regionData}
        value={value}
        onChange={setValue}
        isPopup={isPopup}
        valueKey="id"
        labelKey="name"
        placeholder="请选择地区"
        menuItemWidth={160}
        style={{ width: 320 }}
      />
      {value.length > 0 && (
        <Flex wrap gap={4}>
          {value.map(item => (
            <Tag key={item.id} color="blue">{item.name}</Tag>
          ))}
        </Flex>
      )}
    </Flex>
  );
};

// 单选模式
const SingleExample = ({ isPopup }) => {
  const [value, setValue] = useState(null);
  return (
    <Flex vertical gap={8}>
      <span>地区单选：</span>
      <SelectCascader
        single
        options={regionData}
        value={value}
        onChange={setValue}
        isPopup={isPopup}
        valueKey="id"
        labelKey="name"
        placeholder="请选择地区"
        menuItemWidth={160}
        style={{ width: 320 }}
      />
      {value && <Tag color="green">已选：{value.name}</Tag>}
    </Flex>
  );
};

// 只选末级
const OnlyLastLevelExample = ({ isPopup }) => {
  const [value, setValue] = useState([]);

  return (
    <Flex vertical gap={8}>
      <span>只允许选择末级节点：</span>
      <SelectCascader
        options={organizationData}
        value={value}
        onChange={setValue}
        isPopup={isPopup}
        valueKey="id"
        labelKey="name"
        onlyAllowLastLevel
        placeholder="请选择团队"
        menuItemWidth={180}
        style={{ width: 360 }}
      />
      {value.length > 0 && (
        <div>
          已选团队：{value.map(item => item.name).join('、')}
        </div>
      )}
    </Flex>
  );
};

// 数量限制
const MaxLimitExample = ({ isPopup }) => {
  const [value, setValue] = useState([]);

  return (
    <Flex vertical gap={8}>
      <span>最多选择 3 项：</span>
      <SelectCascader
        options={regionData}
        value={value}
        onChange={setValue}
        isPopup={isPopup}
        valueKey="id"
        labelKey="name"
        maxLength={3}
        placeholder="请选择地区（最多3项）"
        menuItemWidth={160}
        style={{ width: 320 }}
      />
      <Tag color={value.length >= 3 ? 'red' : 'blue'}>
        已选择 {value.length}/3 项
      </Tag>
    </Flex>
  );
};

// 带搜索功能
const SearchExample = ({ isPopup }) => {
  const [value, setValue] = useState([]);

  return (
    <Flex vertical gap={8}>
      <span>带搜索功能：</span>
      <SelectCascader
        options={regionData}
        value={value}
        onChange={setValue}
        isPopup={isPopup}
        valueKey="id"
        labelKey="name"
        onSearch={(searchText, { mapping }) => {
          return Array.from(mapping.values()).filter(item => 
            item.name.toLowerCase().includes(searchText.toLowerCase())
          );
        }}
        searchPlaceholder="搜索地区名称"
        placeholder="搜索并选择地区"
        menuItemWidth={160}
        style={{ width: 360 }}
      />
    </Flex>
  );
};

// 商品分类选择
const CategoryExample = ({ isPopup }) => {
  const [value, setValue] = useState([]);

  return (
    <Flex vertical gap={8}>
      <span>商品分类选择：</span>
      <SelectCascader
        options={categoryData}
        value={value}
        onChange={setValue}
        isPopup={isPopup}
        valueKey="id"
        labelKey="name"
        placeholder="请选择商品分类"
        menuItemWidth={160}
        style={{ width: 320 }}
      />
      {value.length > 0 && (
        <div>
          已选分类：{value.map(item => item.name).join(' > ')}
        </div>
      )}
    </Flex>
  );
};

// 超长文字测试
const LongTextExample = ({ isPopup }) => {
  const [value, setValue] = useState([]);

  return (
    <Flex vertical gap={8}>
      <span>超长文字省略测试（部门选择）：</span>
      <SelectCascader
        options={longTextData}
        value={value}
        onChange={setValue}
        isPopup={isPopup}
        valueKey="id"
        labelKey="name"
        placeholder="请选择部门"
        menuItemWidth={200}
        style={{ width: 400 }}
      />
      {value.length > 0 && (
        <Flex wrap gap={4}>
          {value.map(item => (
            <Tag key={item.id} color="purple" style={{ maxWidth: 200, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {item.name}
            </Tag>
          ))}
        </Flex>
      )}
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
      <SingleExample isPopup={isPopup} />
      <Divider />
      <OnlyLastLevelExample isPopup={isPopup} />
      <Divider />
      <MaxLimitExample isPopup={isPopup} />
      <Divider />
      <SearchExample isPopup={isPopup} />
      <Divider />
      <CategoryExample isPopup={isPopup} />
      <Divider />
      <LongTextExample isPopup={isPopup} />
    </Flex>
  );
};

render(<BaseExample />);
