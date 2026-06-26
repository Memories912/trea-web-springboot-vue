export interface Product {
  id: number
  cat: string
  name: string
  nameEn: string
  bg: string
  icon: string
  specs: string[]
  tag?: string
  features: string[]
  desc: string
}

export const categories = ['全部', '电动工具', '小家电', '酒精测试仪', '激光水平仪', '高压清洗机', '潜水泵']

export const products: Product[] = [
  {
    id: 1, cat: '电动工具', name: '无刷电动冲击扳手', nameEn: 'Brushless Impact Wrench',
    bg: 'from-amber-400/20 to-yellow-600/20', icon: '⚡', tag: '🔥',
    specs: ['MOQ: 500台', 'CE/UKCA', '1800W'],
    features: ['无刷电机，寿命更长', '三档扭矩调节', 'LED工作灯', '人体工学手柄'],
    desc: '专业级无刷电动冲击扳手，适用于汽车维修、建筑安装等场景。1800W大功率，三档可调扭矩，配备LED工作灯，操作更便捷。'
  },
  {
    id: 2, cat: '电动工具', name: '充电式角磨机', nameEn: 'Cordless Angle Grinder',
    bg: 'from-blue-400/20 to-indigo-600/20', icon: '🔧',
    specs: ['MOQ: 300台', 'CE/FCC', '20V'],
    features: ['20V锂电池', '无刷电机', '可调速', '安全开关'],
    desc: '20V充电式角磨机，无刷电机高效耐用。可调速设计适配不同材质切割打磨，安全开关保障操作安全。'
  },
  {
    id: 3, cat: '小家电', name: '便携式搅拌杯', nameEn: 'Portable Blender Cup',
    bg: 'from-pink-400/20 to-rose-600/20', icon: '🥤', tag: '✨',
    specs: ['MOQ: 1000台', 'CE/FCC/ROHS', '400ml'],
    features: ['USB充电', 'IPX7防水', '304不锈钢刀头', '一键清洗'],
    desc: '便携式充电搅拌杯，400ml容量。USB充电方便户外使用，IPX7级防水可直接冲洗，304不锈钢刀头安全耐用。'
  },
  {
    id: 4, cat: '小家电', name: '空气炸锅', nameEn: 'Air Fryer',
    bg: 'from-emerald-400/20 to-green-600/20', icon: '🍟',
    specs: ['MOQ: 500台', 'CE/UKCA/GS', '5.5L'],
    features: ['5.5L大容量', '8种预设菜单', '360°热风循环', '不粘涂层内胆'],
    desc: '5.5L大容量空气炸锅，8种预设烹饪菜单一键操作。360°热风循环技术，少油健康烹饪，不粘涂层易于清洁。'
  },
  {
    id: 5, cat: '酒精测试仪', name: '专业酒精测试仪', nameEn: 'Professional Breathalyzer',
    bg: 'from-violet-400/20 to-purple-600/20', icon: '🍷', tag: '✅',
    specs: ['MOQ: 200台', 'CE/FCC/KC', '±0.01%BAC'],
    features: ['电化学传感器', '吹嘴自动检测', 'USB充电', '数据记录'],
    desc: '专业级电化学酒精测试仪，精准度±0.01%BAC。适用于执法、企业、个人使用。吹嘴自动检测，USB充电方便快捷。'
  },
  {
    id: 6, cat: '激光水平仪', name: '绿光激光水平仪', nameEn: 'Green Laser Level',
    bg: 'from-amber-300/20 to-yellow-500/20', icon: '📐', tag: '✨',
    specs: ['MOQ: 300台', 'CE/FCC/UKCA', '±1mm/10m'],
    features: ['绿光技术', '自动安平', '强光可视', 'IP54防护'],
    desc: '高精度绿光激光水平仪，绿光技术比红光可视范围提升4倍。自动安平系统，±1mm/10m精度，适合室内外装修。'
  },
  {
    id: 7, cat: '高压清洗机', name: '高压清洗机', nameEn: 'High Pressure Washer',
    bg: 'from-teal-400/20 to-cyan-600/20', icon: '🚿', tag: '🔥',
    specs: ['MOQ: 200台', 'CE/UKCA/GS', '160bar'],
    features: ['160bar高压', '铜芯电机', '泡沫系统', '自动停机'],
    desc: '160bar高压清洗机，铜芯电机长寿命。配备泡沫系统可配合清洗剂使用，自动停机功能省电安全。'
  },
  {
    id: 8, cat: '潜水泵', name: '不锈钢潜水泵', nameEn: 'Stainless Steel Submersible Pump',
    bg: 'from-indigo-400/20 to-blue-600/20', icon: '💧',
    specs: ['MOQ: 100台', 'CE/UKCA/ROHS', '25m'],
    features: ['全不锈钢外壳', '热保护器', '多重密封', '低噪音'],
    desc: '全304不锈钢潜水泵，耐腐蚀经久耐用。内置热保护器防止过热，多重密封系统确保安全，低噪音设计。'
  },
]

export const productByCategory = (cat: string) =>
  cat === '全部' || !cat ? products : products.filter(p => p.cat === cat)

export const categoryDescription: Record<string, string> = {
  '电动工具': '品质电动工具，覆盖冲击扳手、角磨机等热门品类，CE/UKCA认证，支持OEM定制。',
  '小家电': '厨房小家电一站式采购，空气炸锅、搅拌杯等爆款产品，多国认证齐全。',
  '酒精测试仪': '专业酒精检测设备，电化学传感器方案，CE/FCC/KC认证，出口全球市场。',
  '激光水平仪': '高精度激光测量工具，绿光技术领先，CE/FCC/UKCA认证，适合专业施工。',
  '高压清洗机': '高压清洁设备，160bar以上水压，CE/UKCA/GS认证，家用商用两相宜。',
  '潜水泵': '不锈钢潜水泵，304材质耐腐蚀，CE/UKCA/ROHS认证，适合多种排水场景。',
}
