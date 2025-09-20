/**
 * AI+应用人才培训平台模拟数据
 */

// AI应用能力提升路径 - 九段高手课程体系数据
export const capabilityData = {
  title: "九段高手课程体系",
  stages: [
    {
      level: "L1",
      name: "AI工具入门",
      capability: "基础工具使用能力",
      courses: [
        { name: "AI基础概念与发展历程", type: "theory" },
        { name: "主流AI工具使用指南", type: "practice" },
        { name: "Prompt基础与应用", type: "practice" }
      ],
      certification: "AI工具应用初级证书",
      color: "#E8F3FF"
    },
    {
      level: "L2",
      name: "数据处理专员",
      capability: "数据收集与预处理能力",
      courses: [
        { name: "数据基础与数据类型", type: "theory" },
        { name: "数据清洗与预处理实践", type: "practice" },
        { name: "数据可视化基础", type: "practice" }
      ],
      certification: "数据处理专员证书",
      color: "#D1E7FF"
    },
    {
      level: "L3",
      name: "智能应用开发",
      capability: "AI应用搭建能力",
      courses: [
        { name: "API接口开发基础", type: "theory" },
        { name: "AI应用集成实践", type: "practice" },
        { name: "低代码AI应用开发", type: "practice" }
      ],
      certification: "AI应用开发初级证书",
      color: "#B9D9FF"
    },
    {
      level: "L4",
      name: "业务分析师",
      capability: "AI赋能业务分析能力",
      courses: [
        { name: "业务流程分析方法", type: "theory" },
        { name: "AI辅助数据分析实践", type: "practice" },
        { name: "业务问题AI解决方案设计", type: "practice" }
      ],
      certification: "AI业务分析中级证书",
      color: "#9BCAFF"
    },
    {
      level: "L5",
      name: "流程优化专家",
      capability: "AI驱动流程优化能力",
      courses: [
        { name: "流程挖掘与优化理论", type: "theory" },
        { name: "RPA与AI结合实践", type: "practice" },
        { name: "业务流程自动化项目实施", type: "practice" }
      ],
      certification: "流程自动化专家证书",
      color: "#7EC0FF"
    },
    {
      level: "L6",
      name: "行业应用架构师",
      capability: "行业AI应用架构设计能力",
      courses: [
        { name: "行业解决方案架构设计", type: "theory" },
        { name: "行业AI应用系统设计", type: "practice" },
        { name: "行业数据治理与应用", type: "practice" }
      ],
      certification: "行业AI架构师证书",
      color: "#66B2FF"
    },
    {
      level: "L7",
      name: "AI产品经理",
      capability: "AI产品设计与管理能力",
      courses: [
        { name: "AI产品设计方法论", type: "theory" },
        { name: "AI产品原型设计实践", type: "practice" },
        { name: "AI产品迭代与优化", type: "practice" }
      ],
      certification: "AI产品经理专业证书",
      color: "#4DA4FF"
    },
    {
      level: "L8",
      name: "AI项目总监",
      capability: "AI项目管理与落地能力",
      courses: [
        { name: "AI项目管理方法论", type: "theory" },
        { name: "AI项目风险管控", type: "theory" },
        { name: "大型AI项目实战演练", type: "practice" }
      ],
      certification: "AI项目管理高级证书",
      color: "#3396FF"
    },
    {
      level: "L9",
      name: "AI战略顾问",
      capability: "企业AI战略规划能力",
      courses: [
        { name: "企业AI转型战略", type: "theory" },
        { name: "AI伦理与治理", type: "theory" },
        { name: "企业AI战略规划实战", type: "practice" }
      ],
      certification: "AI战略规划专家证书",
      color: "#1A88FF"
    }
  ]
};

// 场景应用落地路径数据
export const applicationData = {
  title: "三级场景穿透式学习体系",
  levels: [
    {
      name: "通用AI应用层",
      description: "适用于各行业的通用AI应用能力",
      scenarios: [
        {
          name: "智能办公自动化",
          applications: [
            "文档智能处理与分析",
            "智能会议与纪要生成",
            "多语言实时翻译",
            "邮件与日程智能管理"
          ],
          caseStudies: [
            { name: "某大型企业办公效率提升40%案例", industry: "综合" }
          ]
        },
        {
          name: "数据分析与决策",
          applications: [
            "数据可视化与报告生成",
            "预测分析基础应用",
            "业务指标监控与预警",
            "智能决策辅助系统"
          ],
          caseStudies: [
            { name: "零售企业销售预测准确率提升案例", industry: "零售" }
          ]
        },
        {
          name: "内容创作与营销",
          applications: [
            "营销文案智能生成",
            "图像与视频内容创作",
            "社交媒体智能运营",
            "用户画像与精准营销"
          ],
          caseStudies: [
            { name: "某品牌内容营销ROI提升案例", industry: "营销" }
          ]
        }
      ]
    },
    {
      name: "行业垂直应用层",
      description: "针对特定行业的专业AI应用能力",
      scenarios: [
        {
          name: "制造业AI应用",
          applications: [
            "预测性维护与设备健康管理",
            "质量检测与缺陷识别",
            "供应链优化与智能调度",
            "生产流程自动化与优化"
          ],
          caseStudies: [
            { name: "某汽车制造商质检效率提升案例", industry: "制造" }
          ]
        },
        {
          name: "医疗健康AI应用",
          applications: [
            "医学影像辅助诊断",
            "患者风险评估与预测",
            "个性化治疗方案辅助",
            "医疗资源智能调度"
          ],
          caseStudies: [
            { name: "某医院诊断准确率提升案例", industry: "医疗" }
          ]
        },
        {
          name: "金融服务AI应用",
          applications: [
            "智能风控与欺诈检测",
            "个性化理财推荐",
            "智能投顾基础应用",
            "客户服务与智能问答"
          ],
          caseStudies: [
            { name: "某银行风险识别效率提升案例", industry: "金融" }
          ]
        }
      ]
    },
    {
      name: "企业定制应用层",
      description: "针对企业特定需求的定制化AI解决方案",
      scenarios: [
        {
          name: "需求调研与分析",
          applications: [
            "企业AI就绪度评估",
            "业务痛点识别与分析",
            "AI应用场景优先级排序",
            "ROI预测与资源规划"
          ],
          caseStudies: [
            { name: "某制造企业AI转型规划案例", industry: "制造" }
          ]
        },
        {
          name: "方案设计与实施",
          applications: [
            "定制化AI解决方案设计",
            "数据采集与治理方案",
            "系统集成与接口开发",
            "用户培训与变更管理"
          ],
          caseStudies: [
            { name: "某零售企业全渠道AI解决方案案例", industry: "零售" }
          ]
        },
        {
          name: "落地陪跑与优化",
          applications: [
            "AI模型部署与监控",
            "性能优化与迭代升级",
            "效果评估与持续改进",
            "AI应用扩展与创新"
          ],
          caseStudies: [
            { name: "某科技企业AI系统持续优化案例", industry: "科技" }
          ]
        }
      ]
    }
  ]
};

// 组织升级赋能路径数据
export const organizationData = {
  title: "组织激活产品体系",
  products: [
    {
      category: "主题讲座",
      items: [
        {
          name: "企业AI转型战略与路径",
          description: "帮助企业制定清晰的AI转型战略和实施路径",
          duration: "半天",
          targetAudience: "企业高管、战略规划人员",
          format: "线下+线上直播"
        },
        {
          name: "AI伦理与合规管理",
          description: "解读AI应用的伦理规范与合规要求",
          duration: "半天",
          targetAudience: "法务、合规、数据安全人员",
          format: "线下+线上直播"
        },
        {
          name: "AI人才培养与组织变革",
          description: "构建企业AI人才梯队与组织能力",
          duration: "1天",
          targetAudience: "HR总监、部门经理",
          format: "工作坊形式"
        }
      ]
    },
    {
      category: "共学活动",
      items: [
        {
          name: "AI创新工作坊",
          description: "针对企业实际问题的AI创新解决方案共创",
          duration: "2天",
          targetAudience: "业务骨干、技术团队",
          format: "实战工作坊"
        },
        {
          name: "行业AI私董会",
          description: "同行业企业AI应用经验交流与问题研讨",
          duration: "季度一次，每次1天",
          targetAudience: "企业高管、数字化负责人",
          format: "封闭研讨"
        },
        {
          name: "AI应用案例研学",
          description: "走访优秀AI应用企业，实地学习成功经验",
          duration: "1-2天/次",
          targetAudience: "业务与技术负责人",
          format: "企业参访+座谈"
        }
      ]
    },
    {
      category: "赛事体系",
      items: [
        {
          name: "企业AI应用大赛",
          description: "内部AI应用创新比赛，发掘优秀解决方案",
          duration: "2个月（含培训、辅导、评审）",
          targetAudience: "企业全体员工",
          format: "团队竞赛"
        },
        {
          name: "行业AI创新案例征集",
          description: "征集并评选行业内优秀AI应用案例",
          duration: "季度评选",
          targetAudience: "行业内企业",
          format: "案例申报+专家评审"
        },
        {
          name: "AI技能挑战赛",
          description: "针对特定AI技能的竞技比赛",
          duration: "1个月",
          targetAudience: "技术人员",
          format: "个人/团队竞赛"
        }
      ]
    }
  ]
};

// 证书与认证中心数据
export const certificateData = {
  types: [
    {
      category: "课程结业证书",
      description: "完成特定课程后获得的结业证明",
      certificates: [
        { name: "AI基础应用课程结业证", requirements: "完成L1阶段全部课程" },
        { name: "数据处理与分析课程结业证", requirements: "完成L2阶段全部课程" },
        { name: "AI应用开发课程结业证", requirements: "完成L3阶段全部课程" },
        { name: "AI高级应用课程结业证", requirements: "完成L4-L5阶段全部课程" },
        { name: "AI战略与管理课程结业证", requirements: "完成L6-L9阶段全部课程" }
      ]
    },
    {
      category: "技能等级证书",
      description: "证明持有者具备特定AI技能水平",
      certificates: [
        { name: "AI应用工程师（初级）", requirements: "通过L1-L3阶段考核" },
        { name: "AI应用工程师（中级）", requirements: "通过L1-L5阶段考核" },
        { name: "AI应用工程师（高级）", requirements: "通过L1-L7阶段考核" },
        { name: "AI战略规划师", requirements: "通过全部9个阶段考核+项目答辩" }
      ]
    },
    {
      category: "行业专项证书",
      description: "针对特定行业的AI应用能力认证",
      certificates: [
        { name: "制造业AI应用专家", requirements: "完成制造业专项课程+实操项目" },
        { name: "医疗健康AI应用专家", requirements: "完成医疗健康专项课程+实操项目" },
        { name: "金融AI应用专家", requirements: "完成金融专项课程+实操项目" },
        { name: "零售AI应用专家", requirements: "完成零售专项课程+实操项目" }
      ]
    }
  ]
};

// 信任背书数据
export const trustData = {
  partners: [
    { name: "中国人工智能产业协会", type: "industry" },
    { name: "国家信息技术人才培训基地", type: "government" },
    { name: "中国数字化转型联盟", type: "industry" },
    { name: "AI创新研究院", type: "academic" },
    { name: "全球AI教育联盟", type: "international" }
  ],
  experts: [
    { name: "张明教授", title: "AI领域知名学者", affiliation: "清华大学" },
    { name: "李华博士", title: "AI企业创始人", affiliation: "某头部AI公司" },
    { name: "王芳女士", title: "数字化转型专家", affiliation: "某咨询公司" },
    { name: "赵强博士", title: "AI伦理研究专家", affiliation: "中国科学院" }
  ],
  successStories: [
    { 
      name: "某制造企业AI转型案例", 
      description: "通过系统化培训，企业AI应用能力显著提升，生产效率提高35%",
      videoUrl: "#"
    },
    { 
      name: "某金融机构AI人才培养案例", 
      description: "建立完整AI人才梯队，成功落地10+AI应用项目",
      videoUrl: "#"
    },
    { 
      name: "某地方政府AI人才发展计划", 
      description: "联合实施区域AI人才培养计划，培养AI专业人才2000+",
      videoUrl: "#"
    }
  ]
};