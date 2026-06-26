export interface ServiceDetail {
  slug: string
  icon: string
  title: string
  subtitle: string
  heroTitle: string
  heroDesc: string
  sections: {
    title: string
    items: { icon: string; title: string; desc: string }[]
  }[]
  cta: string
}

export const services: ServiceDetail[] = [
  {
    slug: 'product-photography',
    icon: '📸',
    title: '产品摄影',
    subtitle: 'Photography & Graphic Design',
    heroTitle: '专业产品摄影与平面设计',
    heroDesc: '我们的内部设计团队提供全面的设计解决方案，包括产品图片、视频、Logo、标签、包装等。提交需求后，我们将在24小时内联系您（北京时间 9:00-18:00）。无限次修改，满意为止。',
    sections: [
      {
        title: '服务流程',
        items: [
          { icon: '📝', title: '提交需求', desc: '填写您的设计要求，包括产品类型、拍摄风格、数量等。' },
          { icon: '💬', title: '免费报价', desc: '设计团队根据需求提供免费报价，无隐藏费用。' },
          { icon: '✅', title: '预付启动', desc: '100%预付款后启动设计项目。' },
          { icon: '🔄', title: '无限修改', desc: '无限次免费修改，直到您满意为止。不满意可全额退款。' },
        ]
      },
      {
        title: '服务类型',
        items: [
          { icon: '📷', title: '产品摄影', desc: '白底产品照、带道具/模特生活照、功能展示照，$3/张起。' },
          { icon: '🎥', title: '视频制作', desc: '产品展示视频、功能演示视频、品牌宣传视频定制。' },
          { icon: '🎨', title: '平面设计', desc: '信息图表、Logo设计、标签设计、感谢卡、包装设计。' },
          { icon: '🏷️', title: '品牌视觉', desc: '统一品牌视觉系统，提升产品在电商平台的转化率。' },
        ]
      },
    ],
    cta: '获取设计报价'
  },
  {
    slug: 'custom-packaging',
    icon: '📦',
    title: '定制包装',
    subtitle: 'Private Label & Packaging',
    heroTitle: '定制 Logo 与包装方案',
    heroDesc: 'Custom logos and packaging to help your products stand out, with factory connections at competitive prices. 小批量个性化包装、logo印刷、产品捆绑套装，自有产线承接复杂包装需求。',
    sections: [
      {
        title: 'Logo 定制方案',
        items: [
          { icon: '🔩', title: '塑料/硅胶/橡胶产品', desc: '丝印印刷适用于电路板、硅胶手环、橡胶手机壳等，快速且经济。' },
          { icon: '🪵', title: '木质/金属产品', desc: '激光印刷天然高端质感，适合木制品、工具和五金件。' },
          { icon: '🧵', title: '布料/皮革产品', desc: '丝印或刺绣营造手工质感。皮革可选烫金或压印。' },
          { icon: '💎', title: '高端礼品盒', desc: '优质纸板+高级印刷，可内置EVA/海绵/泡沫/丝绸内衬。' },
        ]
      },
      {
        title: '包装选择',
        items: [
          { icon: '📋', title: '纸板盒', desc: '易于内外定制Logo，经济实惠，适合常规产品。' },
          { icon: '🏷️', title: '吊牌与插页', desc: '为服装、手袋等添加品牌标识的预算友好方式。含感谢卡、贴纸、宣传单等。' },
          { icon: '📦', title: '产品捆绑与重新包装', desc: '多供应商产品整合套装，重新包装以提升品质感。' },
          { icon: '🏭', title: '小批量定制优势', desc: '工厂不愿接小单？我们可协调义乌本地包装供应商，小批量定制无压力。' },
        ]
      },
    ],
    cta: '咨询包装方案'
  },
  {
    slug: 'labels-and-manuals',
    icon: '🏷️',
    title: '标签与说明书',
    subtitle: 'Labels & Manuals',
    heroTitle: '多语言标签与说明书定制',
    heroDesc: '根据目标市场定制多语言标签和说明书，助你快速进入新市场，提升品牌形象。我们支持所有主要语言的翻译与设计，确保符合各国法规要求。',
    sections: [
      {
        title: '标签服务',
        items: [
          { icon: '🏷️', title: '产品标签', desc: '品牌Logo标签、成分标签、警告标签、尺寸标签等。' },
          { icon: '📦', title: '包装标签', desc: '运输标签、条形码标签、FNSKU标签（亚马逊FBA专用）。' },
          { icon: '🌐', title: '多语言支持', desc: '英语、法语、德语、西班牙语、日语、韩语等多语言翻译。' },
          { icon: '✅', title: '合规保障', desc: '确保标签符合目标市场法规要求，如CE、FDA、UKCA等。' },
        ]
      },
      {
        title: '说明书服务',
        items: [
          { icon: '📖', title: '产品说明书', desc: '用户手册、安装指南、快速入门指南的设计与排版。' },
          { icon: '🎨', title: '图文设计', desc: '专业图文排版，爆炸图、流程图、示意图清晰易懂。' },
          { icon: '🖨️', title: '印刷配套', desc: '从设计到印刷一站式服务，多种纸张和工艺可选。' },
          { icon: '🌍', title: '国际版本', desc: '同一产品多国版本的说明书同步制作，统一品牌形象。' },
        ]
      },
    ],
    cta: '咨询标签设计'
  },
  {
    slug: 'full-inspection',
    icon: '🔍',
    title: '1对1全检',
    subtitle: '100% Full Inspection',
    heroTitle: '100% 逐件检验，缺陷率为零',
    heroDesc: '升级到100%逐件检验（Full Inspection），将缺陷率降至0。适合高价值或品质敏感型产品。我们的质检团队逐件检查每个产品，确保只有完美品才能出货。',
    sections: [
      {
        title: '为什么选择全检',
        items: [
          { icon: '🎯', title: '零缺陷目标', desc: '逐件检验，剔除所有有缺陷产品，确保出货品质。' },
          { icon: '💰', title: '高价值保护', desc: '单价较高或品质敏感的产品，全检是最保险的选择。' },
          { icon: '📊', title: 'AQL 2.5标准', desc: '默认按AQL 2.5标准抽检，全检是在此基础上的升级服务。' },
          { icon: '🔧', title: '专业团队', desc: '经验丰富的质检团队，熟悉各类产品的检查标准和常见缺陷。' },
        ]
      },
      {
        title: '服务详情',
        items: [
          { icon: '👁️', title: '100% 逐件检查', desc: '每一件产品都经过人工检查，确保无瑕疵。' },
          { icon: '📝', title: '详细检验报告', desc: '提供每件产品的检查记录和照片，全程可追溯。' },
          { icon: '🔄', title: '次品处理', desc: 'Pro Plan用户可免费更换次品；Basic Plan用户可协商处理。' },
          { icon: '⏱️', title: '灵活安排', desc: '标准费率$5/小时，联系客服获取定制报价。' },
        ]
      },
    ],
    cta: '预约全检服务'
  },
  {
    slug: 'warehousing',
    icon: '🏭',
    title: '仓储与人工',
    subtitle: 'Warehousing & Labor',
    heroTitle: '免费仓储与灵活人工服务',
    heroDesc: 'Pro Plan享2个月、Basic Plan享1个月免费仓储。此外提供标签粘贴、FNSKU贴标、产品维修等人工服务，$5/小时。多城市集货拼柜降低运输成本。',
    sections: [
      {
        title: '仓储服务',
        items: [
          { icon: '🏪', title: '免费仓储期', desc: 'Pro Plan：2个月免费仓储。Basic Plan：1个月免费仓储。' },
          { icon: '📦', title: '货物拼箱', desc: '多城市集货，合并为一个集装箱出货，显著降低运输成本。' },
          { icon: '🏙️', title: '多城市覆盖', desc: '义乌总仓为主，可协调其他主要城市的仓储资源。' },
          { icon: '📋', title: '库存管理', desc: '专业库存管理系统，实时跟踪货物状态。' },
        ]
      },
      {
        title: '人工服务',
        items: [
          { icon: '🏷️', title: '标签粘贴', desc: '产品贴标、价格标签、促销标签等，$5/小时。' },
          { icon: '📋', title: 'FNSKU贴标', desc: '亚马逊FBA专用FNSKU标签粘贴服务，确保符合亚马逊入库要求。' },
          { icon: '🔧', title: '产品维修', desc: '简单产品维修、更换配件，减少退换货损失。' },
          { icon: '📸', title: '产品升级', desc: '产品组合套装、配件安装、品质提升等定制服务。' },
        ]
      },
    ],
    cta: '了解仓储详情'
  },
  {
    slug: 'factory-followup',
    icon: '👷',
    title: '驻厂跟单',
    subtitle: 'Factory Follow-up',
    heroTitle: '专业驻厂跟单，品质进度双重把控',
    heroDesc: '派遣专员驻厂监督生产，实时把控质量与进度。特别适合大批量订单、交期紧迫、或对品质有严格要求的情况。让您无需亲临现场，也能掌握生产全貌。',
    sections: [
      {
        title: '驻厂跟单服务内容',
        items: [
          { icon: '🏭', title: '生产进度监控', desc: '每日汇报生产进度，确保按计划推进，提前预警延期风险。' },
          { icon: '🔍', title: '在线质量控制', desc: '在生产过程中实时检查，及时发现并纠正问题。' },
          { icon: '📸', title: '每日照片/视频汇报', desc: '发送生产现场照片和视频，让您远程掌握实况。' },
          { icon: '📋', title: '出货前检验', desc: '驻厂QC在出货前完成最终检验，确保品质达标。' },
        ]
      },
      {
        title: '适合场景',
        items: [
          { icon: '📦', title: '大批量订单', desc: '订单量大，需要全程监督生产过程。' },
          { icon: '⏰', title: '交期紧迫', desc: '时间紧张，需要有人现场催促和协调。' },
          { icon: '🎯', title: '品质敏感产品', desc: '产品质量直接影响品牌声誉，不容有失。' },
          { icon: '🌍', title: '海外客户验厂', desc: '代客户验厂，出具专业验厂报告。' },
        ]
      },
    ],
    cta: '预约驻厂服务'
  },
]

export const serviceBySlug = (slug: string) => services.find(s => s.slug === slug)
