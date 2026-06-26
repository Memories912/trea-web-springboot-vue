const fs = require('fs')
const path = '/Users/mac08/Desktop/jingsourcing-next/src/i18n/data.ts'
let data = fs.readFileSync(path, 'utf8')

const networkKeys = {
  zh: `  'network.title': '连接全球',
  'network.desc': '从义乌到全球市场 — 我们的采购网络覆盖50+国家，拥有经过认证的供应商、实时质量控制和无缝物流。',
  'network.stat1': '出口国家',
  'network.stat2': '认证工厂',
  'network.stat3': '已完成项目',
  'network.stat4': '支持语言',
  // ─── About ───`,
  en: `  'network.title': 'Connecting You to the World',
  'network.desc': 'From Yiwu to global markets — our sourcing network spans 50+ countries with verified suppliers, real-time quality control, and seamless logistics.',
  'network.stat1': 'Export Countries',
  'network.stat2': 'Verified Factories',
  'network.stat3': 'Completed Projects',
  'network.stat4': 'Languages Supported',
  // ─── About ───`,
  ja: `  'network.title': '世界とつながる',
  'network.desc': '義烏から世界の市場へ — 50ヶ国以上に広がる調達ネットワーク、認定サプライヤー、リアルタイム品質管理、シームレスな物流。',
  'network.stat1': '輸出先国',
  'network.stat2': '認定工場',
  'network.stat3': '完了プロジェクト',
  'network.stat4': '対応言語',
  // ─── About ───`,
  ko: `  'network.title': '세계를 연결합니다',
  'network.desc': '이우에서 글로벌 시장까지 — 50개국 이상의 조달 네트워크, 검증된 공급업체, 실시간 품질 관리, 원활한 물류.',
  'network.stat1': '수출 국가',
  'network.stat2': '인증 공장',
  'network.stat3': '완료 프로젝트',
  'network.stat4': '지원 언어',
  'contactModal.title': '문의하기',
  'contactModal.desc': '문의사항이 있으시면 언제든지 연락주세요. 원하는 방법을 선택하세요.',
  'contactModal.phone': '전화',
  'contactModal.email': '이메일',
  'contactModal.contactForm': '문의 양식 →',  // ─── About ───`,
}

// Replace zh: after payment.badge line, before About
data = data.replace(
  `  'payment.badge': '付款方式',\n  // ─── About ───`,
  `  'payment.badge': '付款方式',\n${networkKeys.zh}`
)

// Replace en: after contactModal.contactForm, before }
data = data.replace(
  `  'contactModal.contactForm': 'Contact form →',\n}`,
  `  'contactModal.contactForm': 'Contact form →',\n${networkKeys.en}\n}`
)

// Replace ja: after contactModal.contactForm, before }
data = data.replace(
  `  'contactModal.contactForm': 'お問い合わせフォーム →',\n}`,
  `  'contactModal.contactForm': 'お問い合わせフォーム →',\n${networkKeys.ja}\n}`
)

// Replace ko: contactModal area
data = data.replace(
  `  'contactModal.contactForm': '문의 양식 →',  // ─── About ───`,
  `  'contactModal.contactForm': '문의 양식 →',  // ─── About ───`
)
data = data.replace(
  `  'contactModal.email': '이메일',\n  'contactModal.contactForm': '문의 양식 →',`,
  `  'contactModal.email': '이메일',\n${networkKeys.ko.replace("'contactModal.title': '문의하기',", "  'contactModal.title': '문의하기',").replace("'contactModal.desc': '문의사항이 있으시면 언제든지 연락주세요. 원하는 방법을 선택하세요.',", "  'contactModal.desc': '문의사항이 있으시면 언제든지 연락주세요. 원하는 방법을 선택하세요.',").replace("'contactModal.phone': '전화',", "  'contactModal.phone': '전화',").replace("'contactModal.email': '이메일',", "  'contactModal.email': '이메일',").replace("'contactModal.contactForm': '문의 양식 →',  // ─── About ───", "  'contactModal.contactForm': '문의 양식 →',  // ─── About ───")}`
)

// Actually the ko section is tricky because the contactModal keys and About are on adjacent lines.
// Let me use a simpler approach for ko:
data = data.replace(
  `  'contactModal.email': '이메일',\n  'contactModal.contactForm': '문의 양식 →',  // ─── About ───`,
  `  'contactModal.email': '이메일',\n  'network.title': '세계를 연결합니다',\n  'network.desc': '이우에서 글로벌 시장까지 — 50개국 이상의 조달 네트워크, 검증된 공급업체, 실시간 품질 관리, 원활한 물류.',\n  'network.stat1': '수출 국가',\n  'network.stat2': '인증 공장',\n  'network.stat3': '완료 프로젝트',\n  'network.stat4': '지원 언어',\n  'contactModal.title': '문의하기',\n  'contactModal.desc': '문의사항이 있으시면 언제든지 연락주세요. 원하는 방법을 선택하세요.',\n  'contactModal.phone': '전화',\n  'contactModal.email': '이메일',\n  'contactModal.contactForm': '문의 양식 →',  // ─── About ───`
)

fs.writeFileSync(path, data)
console.log('Done!')
