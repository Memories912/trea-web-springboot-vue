'use client'

import { useState, useRef, useEffect } from 'react'
import { useT } from '@/i18n'
import { gsap, useGsap, ScrollTrigger, SplitText, CustomBounce, CustomEase, ScrambleTextPlugin, CustomWiggle, Flip, Observer, Physics2DPlugin, Draggable, InertiaPlugin } from '@/lib/gsap'

export default function FloatingActions() {
  const { t } = useT()
  const [chatOpen, setChatOpen] = useState(false)
  const [contactOpen, setContactOpen] = useState<'phone' | 'email' | null>(null)
  const [messages, setMessages] = useState<{ role: 'bot' | 'user', text: string }[]>([
    { role: 'bot', text: t('float.chatIntro') }
  ])
  const [input, setInput] = useState('')
  const chatRef = useRef<HTMLDivElement>(null)
  const popoverRef = useRef<HTMLDivElement>(null)
  const msgContainerRef = useRef<HTMLDivElement>(null)
  const btnGroupRef = useRef<HTMLDivElement>(null)

  const handleSend = () => {
    if (!input.trim()) return
    setMessages(prev => [...prev, { role: 'user', text: input }])
    const q = input
    setInput('')
    setTimeout(() => {
      const answers: Record<string, string> = {
        moq: t('float.chatQuickAsk'),
        交期: t('float.chatQuickAsk'),
        认证: t('float.chatQuickAsk'),
        价格: t('float.chatQuickAsk'),
      }
      const matched = Object.entries(answers).find(([k]) => q.includes(k))
      setMessages(prev => [...prev, {
        role: 'bot',
        text: matched ? matched[1] : t('float.chatFallback')
      }])
    }, 800)
  }

  // Entrance animation for floating buttons using CustomBounce
  useEffect(() => {
    if (btnGroupRef.current) {
      gsap.from('.float-btn', {
        scale: 0,
        opacity: 0,
        stagger: 0.1,
        duration: 0.5,
        ease: 'bounce.out',
      })
    }
  }, [])

  // Chat dialog enter/exit
  useEffect(() => {
    const el = chatRef.current
    if (!el) return
    if (chatOpen) {
      gsap.fromTo(el, { opacity: 0, scale: 0.9, y: 20 }, { opacity: 1, scale: 1, y: 0, duration: 0.4, ease: 'elastic.out(1,0.4)' })
    }
  }, [chatOpen])

  // Contact popover enter/exit
  useEffect(() => {
    const el = popoverRef.current
    if (!el) return
    if (contactOpen) {
      gsap.fromTo(el, { opacity: 0, scale: 0.9, y: 20 }, { opacity: 1, scale: 1, y: 0, duration: 0.4, ease: 'elastic.out(1,0.4)' })
    }
  }, [contactOpen])

  // New message animation
  const prevMsgCount = useRef(0)
  useEffect(() => {
    if (messages.length > prevMsgCount.current && msgContainerRef.current) {
      const newMsg = msgContainerRef.current.lastElementChild
      if (newMsg) {
        gsap.from(newMsg, { opacity: 0, y: 10, duration: 0.3, ease: 'power2.out' })
      }
    }
    prevMsgCount.current = messages.length
  }, [messages])

  const closeChat = () => {
    const el = chatRef.current
    if (el) {
      gsap.to(el, {
        opacity: 0, scale: 0.9, y: 20, duration: 0.25, ease: 'power2.in',
        onComplete: () => setChatOpen(false)
      })
    } else {
      setChatOpen(false)
    }
  }

  const closePopover = () => {
    const el = popoverRef.current
    if (el) {
      gsap.to(el, {
        opacity: 0, scale: 0.9, y: 20, duration: 0.25, ease: 'power2.in',
        onComplete: () => setContactOpen(null)
      })
    } else {
      setContactOpen(null)
    }
  }

  // Physics2DPlugin particle burst on click
  const burstParticles = (btn: HTMLElement) => {
    const r = btn.getBoundingClientRect()
    const cx = r.left + r.width / 2
    const cy = r.top + r.height / 2
    const colors = ['#b8860b', '#d4a017', '#ffd700', '#2c6e6e', '#4a9e9e', '#fff8dc']
    for (let i = 0; i < 30; i++) {
      const d = document.createElement('div')
      d.style.cssText = `position:fixed;pointer-events:none;z-index:9999;width:${3 + Math.random() * 8}px;height:${3 + Math.random() * 8}px;border-radius:50%;background:${colors[i % 6]};left:${cx}px;top:${cy}px`
      document.body.appendChild(d)
      gsap.to(d, {
        physics2D: { velocity: 200 + Math.random() * 400, angle: Math.random() * 360, gravity: 500 },
        opacity: 0,
        scale: 0,
        duration: 1.2 + Math.random(),
        ease: 'none',
        onComplete: () => d.remove(),
      })
    }
  }

  const handleChatClick = () => {
    const el = btnGroupRef.current?.querySelector('.float-btn-chat') as HTMLElement
    if (el) burstParticles(el)
    setChatOpen(true)
  }

  const handlePhoneClick = () => {
    const el = btnGroupRef.current?.querySelector('.float-btn-phone') as HTMLElement
    if (el) burstParticles(el)
    setContactOpen('phone')
  }

  const handleEmailClick = () => {
    const el = btnGroupRef.current?.querySelector('.float-btn-email') as HTMLElement
    if (el) burstParticles(el)
    setContactOpen('email')
  }

  const btnClass = 'float-btn w-11 h-11 rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all cursor-pointer flex items-center justify-center text-lg'

  return (
    <>
      {/* Fixed bottom-right action group — CustomWiggle applied on hover */}
      <div ref={btnGroupRef} className="fixed bottom-6 right-6 z-[999] flex flex-col items-center gap-3">
        <button
          onClick={handleChatClick}
          className={`${btnClass} float-btn-chat bg-gradient-to-br from-[#b8860b] to-[#9a7209]`}
          onMouseEnter={(e) => {
            gsap.to(e.currentTarget, { rotation: -5, duration: 0.1, ease: 'customWiggle', yoyo: true, repeat: 3 })
          }}
        >
          💬
        </button>
        <button
          onClick={handlePhoneClick}
          className={`${btnClass} float-btn-phone bg-gradient-to-br from-[#b8860b] to-[#9a7209]`}
          onMouseEnter={(e) => {
            gsap.to(e.currentTarget, { rotation: -5, duration: 0.1, ease: 'customWiggle', yoyo: true, repeat: 3 })
          }}
        >
          📞
        </button>
        <button
          onClick={handleEmailClick}
          className={`${btnClass} float-btn-email bg-gradient-to-br from-rose-600 to-red-700`}
          onMouseEnter={(e) => {
            gsap.to(e.currentTarget, { rotation: -5, duration: 0.1, ease: 'customWiggle', yoyo: true, repeat: 3 })
          }}
        >
          ✉️
        </button>
      </div>

      {/* Chat Dialog */}
      {chatOpen && (
        <div ref={chatRef} className="fixed bottom-24 right-6 w-[360px] max-w-[calc(100vw-2rem)] z-[999]">
          <div className="glass rounded-2xl overflow-hidden border border-gray-200 shadow-2xl">
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200/50">
              <div className="flex items-center gap-2.5">
                <span className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#b8860b] to-[#9a7209] flex items-center justify-center text-sm">🤖</span>
                <div>
                  <div className="text-sm font-semibold text-foreground">{t('float.chatTitle')}</div>
                  <div className="flex items-center gap-1 text-[10px] text-emerald-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    {t('float.chatOnline')}
                  </div>
                </div>
              </div>
              <button onClick={closeChat} className="w-7 h-7 rounded-lg bg-black/[0.03] hover:bg-black/[0.05] flex items-center justify-center text-gray-500 hover:text-gray-900 transition-all text-sm">
                ✕
              </button>
            </div>

            {/* Messages */}
            <div ref={msgContainerRef} className="h-[320px] overflow-y-auto p-4 space-y-3">
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'gap-2.5'}`}>
                  {m.role === 'bot' && (
                    <span className="w-6 h-6 rounded-lg bg-gradient-to-br from-[#b8860b] to-[#9a7209] flex items-center justify-center text-[10px] flex-shrink-0 mt-1">🤖</span>
                  )}
                  <div className={`max-w-[80%] px-3.5 py-2.5 text-sm leading-relaxed ${
                    m.role === 'user'
                      ? 'bg-gradient-to-r from-[#b8860b] to-[#9a7209] text-white rounded-2xl rounded-tr-sm'
                      : 'glass-light text-gray-600 rounded-2xl rounded-tl-sm'
                  }`}>
                    {m.text}
                  </div>
                </div>
              ))}
            </div>

            {/* Input */}
            <div className="p-3 border-t border-gray-200/50">
              <div className="flex gap-2">
                <input
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && handleSend()}
                  placeholder={t('float.chatPlaceholder')}
                  className="flex-1 bg-white border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm text-foreground placeholder-gray-400 outline-none focus:border-[#b8860b]/50 transition-colors"
                />
                <button
                  onClick={handleSend}
                  className="px-4 py-2.5 bg-gradient-to-r from-[#b8860b] to-[#9a7209] text-white rounded-xl font-semibold text-sm hover:shadow-lg hover:shadow-[#b8860b]/20 transition-all"
                >
                  {t('float.chatSend')}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Phone/Email Popover */}
      {contactOpen && (
        <div ref={popoverRef} className="fixed bottom-24 right-6 z-[999]">
          <div className="glass rounded-2xl p-5 border border-gray-200 shadow-2xl min-w-[240px]">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-semibold text-foreground">
                {contactOpen === 'phone' ? t('float.phoneTitle') : t('float.emailTitle')}
              </span>
              <button onClick={closePopover} className="w-6 h-6 rounded-lg bg-black/[0.03] hover:bg-black/[0.05] flex items-center justify-center text-gray-500 hover:text-gray-900 transition-all text-xs">
                ✕
              </button>
            </div>
            {contactOpen === 'phone' ? (
              <div className="space-y-2">
                <div className="glass-light rounded-xl p-3 flex items-center gap-3">
                  <span className="text-lg">📞</span>
                  <div>
                    <div className="text-[10px] text-gray-500">{t('float.phoneChina')}</div>
                    <div className="text-sm text-foreground font-medium">+86-400-888-9999</div>
                  </div>
                </div>
                <div className="glass-light rounded-xl p-3 flex items-center gap-3">
                  <span className="text-lg">💬</span>
                  <div>
                    <div className="text-[10px] text-gray-500">{t('float.phoneWhatsApp')}</div>
                    <div className="text-sm text-foreground font-medium">+86-138-0000-0000</div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-2">
                <div className="glass-light rounded-xl p-3 flex items-center gap-3">
                  <span className="text-lg">✉️</span>
                  <div>
                    <div className="text-[10px] text-gray-500">{t('float.emailBiz')}</div>
                    <div className="text-sm text-foreground font-medium">info@globaltrade.com</div>
                  </div>
                </div>
                <div className="glass-light rounded-xl p-3 flex items-center gap-3">
                  <span className="text-lg">📋</span>
                  <div>
                    <div className="text-[10px] text-gray-500">{t('float.emailInquiry')}</div>
                    <div className="text-sm text-foreground font-medium">sourcing@globaltrade.com</div>
                  </div>
                </div>
              </div>
            )}
            <button
              onClick={() => {
                const val = contactOpen === 'phone' ? '+86-400-888-9999' : 'info@globaltrade.com'
                navigator.clipboard?.writeText(val)
                closePopover()
              }}
              className="mt-3 w-full py-2.5 bg-gradient-to-r from-[#b8860b] to-[#9a7209] text-white rounded-xl text-sm font-semibold hover:shadow-lg hover:shadow-[#b8860b]/20 transition-all"
            >
              {t(contactOpen === 'phone' ? 'float.copyPhone' : 'float.copyEmail')}
            </button>
          </div>
        </div>
      )}
    </>
  )
}
