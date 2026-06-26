'use client'

import { useState, useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const knowledgeBase = [
  { q: '电动工具MOQ是多少？', a: '电动工具类产品MOQ一般为300-500台。无刷冲击扳手MOQ 500台，角磨机MOQ 300台。首次合作可适当降低起订量。' },
  { q: '酒精测试仪有KC认证吗？', a: '是的，专业酒精测试仪已取得KC（韩国认证），同时具备CE和FCC认证，可正常出口韩国市场。' },
  { q: '高压清洗机交期多久？', a: '标准交期30-35天，包括物料采购15天、生产组装10天、质量检验5天。加急可到25天。' },
  { q: '小家电到韩国运费多少？', a: '按40HQ柜计算到釜山港约$800-1200。空运约$3-5/kg。含电池产品需提供MSDS证书。' },
  { q: '激光水平仪FOB价格是多少？', a: '绿光激光水平仪FOB（深圳/宁波）$18-35/台，取决于精度等级和配件。100台以上享阶梯优惠。' },
]

interface Message {
  role: 'user' | 'assistant'
  content: string
}

export default function AIChat() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)
  const dotsRef = useRef<HTMLDivElement>(null)
  const dotTweenRef = useRef<gsap.core.Tween | null>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  // GSAP ScrollTrigger for section reveal
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title reveal
      gsap.from('.gsap-ai-title', {
        scrollTrigger: { trigger: '.gsap-ai-section', start: 'top 80%' },
        y: 30, opacity: 0, duration: 0.6, ease: 'gsapHero'
      })
      // Chat container reveal
      gsap.from('.gsap-ai-chat', {
        scrollTrigger: { trigger: '.gsap-ai-section', start: 'top 65%' },
        y: 30, opacity: 0, duration: 0.6, delay: 0.2, ease: 'gsapHero'
      })
      // Quick questions reveal
      gsap.from('.gsap-ai-quick', {
        scrollTrigger: { trigger: '.gsap-ai-section', start: 'top 55%' },
        y: 20, opacity: 0, duration: 0.5, delay: 0.35, ease: 'gsapHero'
      })
    })
    return () => ctx.revert()
  }, [])

  // Typing dots animation — CustomWiggle
  useEffect(() => {
    if (isTyping && dotsRef.current) {
      const dots = dotsRef.current.querySelectorAll('span')
      dotTweenRef.current = gsap.to(dots, {
        y: -4, duration: 0.3, ease: 'power1.inOut', stagger: { each: 0.15, repeat: -1, yoyo: true }
      })
    } else {
      dotTweenRef.current?.kill()
    }
    return () => { dotTweenRef.current?.kill() }
  }, [isTyping])

  const findAnswer = (q: string) => {
    const lower = q.toLowerCase()
    for (const item of knowledgeBase) {
      if (lower.includes(item.q.slice(0, 3).toLowerCase())) return item.a
    }
    const keywords: Record<string, number> = { moq: 0, 起订: 0, kc: 1, 认证: 1, 交期: 2, 运费: 3, fob: 4, 价格: 4 }
    for (const [word, idx] of Object.entries(keywords)) {
      if (lower.includes(word) && knowledgeBase[idx]) return knowledgeBase[idx].a
    }
    return null
  }

  const send = () => {
    if (!input.trim()) return
    const userMsg = input.trim()
    setInput('')
    setMessages((prev) => [...prev, { role: 'user', content: userMsg }])
    setIsTyping(true)

    setTimeout(() => {
      const answer = findAnswer(userMsg) || '您好！我是产品知识助手，可以问关于产品MOQ、认证、交期、运费等问题。'
      setMessages((prev) => [...prev, { role: 'assistant', content: answer }])
      setIsTyping(false)
    }, 600 + Math.random() * 400)
  }

  return (
    <section id="ai" className="gsap-ai-section section-padding relative">
      <div className="section-container">
        <div className="gsap-ai-title text-center mb-12">
          <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest text-[#b8860b] uppercase mb-4">
            <span className="w-6 h-px bg-[#b8860b]/50" />
            AI 助手
            <span className="w-6 h-px bg-[#b8860b]/50" />
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold gradient-text mb-4">
            产品知识智能问答
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto">
            基于公司产品资料库，AI 助手可快速回答关于产品规格、认证、交期、报价等问题。
          </p>
        </div>

        {/* ChatGPT-style Chat */}
        <div className="gsap-ai-chat max-w-3xl mx-auto glass rounded-2xl overflow-hidden">
          {/* Header */}
          <div className="flex items-center gap-3 px-5 py-4 border-b border-gray-200/50">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#b8860b] to-[#9a7209] flex items-center justify-center text-sm">
              🤖
            </div>
            <div className="flex-1">
              <div className="text-sm font-semibold text-foreground">产品知识助手</div>
              <div className="flex items-center gap-1.5 text-xs text-emerald-400">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                Online
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="h-[400px] overflow-y-auto p-5 space-y-4">
            {messages.length === 0 && !isTyping && (
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#b8860b] to-[#9a7209] flex items-center justify-center text-sm flex-shrink-0">
                  🤖
                </div>
                <div className="glass-light rounded-2xl rounded-tl-sm px-4 py-3 max-w-[80%]">
                  <p className="text-sm text-gray-600">
                    您好！我是产品知识助手。您可以问关于产品的任何问题，比如MOQ、认证、交期、运费等。
                  </p>
                </div>
              </div>
            )}

            {messages.map((msg, i) => (
              <div key={i} className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                {msg.role === 'assistant' && (
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#b8860b] to-[#9a7209] flex items-center justify-center text-sm flex-shrink-0">
                    🤖
                  </div>
                )}
                <div
                  className={`px-4 py-3 max-w-[80%] ${
                    msg.role === 'user'
                      ? 'bg-gradient-to-r from-[#b8860b] to-[#9a7209] text-white rounded-2xl rounded-tr-sm'
                      : 'glass-light rounded-2xl rounded-tl-sm'
                  }`}
                >
                  <p className={`text-sm ${msg.role === 'user' ? 'font-medium' : 'text-gray-600'}`}>
                    {msg.content}
                  </p>
                </div>
              </div>
            ))}

            {/* Typing indicator — CustomWiggle dots */}
            {isTyping && (
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#b8860b] to-[#9a7209] flex items-center justify-center text-sm flex-shrink-0">
                  🤖
                </div>
                <div className="glass-light rounded-2xl rounded-tl-sm px-4 py-3">
                  <div ref={dotsRef} className="flex gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-gray-400 block" />
                    <span className="w-1.5 h-1.5 rounded-full bg-gray-400 block" />
                    <span className="w-1.5 h-1.5 rounded-full bg-gray-400 block" />
                  </div>
                </div>
              </div>
            )}

            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t border-gray-200/50">
            <div className="flex gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && send()}
                placeholder="输入您的问题..."
                className="flex-1 bg-black/[0.03] border border-gray-200 rounded-xl px-4 py-3 text-sm text-foreground placeholder-gray-400 outline-none focus:border-[#b8860b]/50 transition-colors"
              />
              <button
                onClick={send}
                className="gsap-send-btn px-5 py-3 bg-gradient-to-r from-[#b8860b] to-[#9a7209] text-white rounded-xl font-semibold text-sm hover:shadow-lg hover:shadow-[#b8860b]/20 transition-all"
              >
                发送
              </button>
            </div>
          </div>
        </div>

        {/* Quick Questions */}
        <div className="gsap-ai-quick max-w-3xl mx-auto mt-6">
          <p className="text-xs text-gray-500 mb-3 text-center">快速提问</p>
          <div className="flex flex-wrap justify-center gap-2">
            {knowledgeBase.map((item, i) => (
              <button
                key={i}
                onClick={() => {
                  setMessages((prev) => [...prev, { role: 'user', content: item.q }])
                  setIsTyping(true)
                  setTimeout(() => {
                    setMessages((prev) => [...prev, { role: 'assistant', content: item.a }])
                    setIsTyping(false)
                  }, 600)
                }}
                className="px-3 py-1.5 rounded-xl glass-light text-xs text-gray-500 hover:text-[#b8860b] transition-colors"
              >
                {item.q}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
