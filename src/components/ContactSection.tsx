'use client'

import { useState, useRef } from 'react'
import { useT } from '@/i18n'
import { gsap, useGsap, ScrollTrigger, SplitText, CustomBounce, CustomEase, ScrambleTextPlugin, CustomWiggle, Flip, Observer, Physics2DPlugin, Draggable, InertiaPlugin } from '@/lib/gsap'

export default function ContactSection() {
  const { t } = useT()

  const contactInfo = [
    { icon: '✉️', label: t('contact.infoEmail'), value: 'info@globaltrade.com' },
    { icon: '📞', label: t('contact.infoPhone'), value: '+86-400-888-9999' },
    { icon: '💬', label: t('contact.infoWhatsApp'), value: '+86-138-0000-0000' },
    { icon: '📍', label: t('contact.infoAddress'), value: '浙江省义乌市' },
  ]

  const [form, setForm] = useState({ name: '', email: '', country: '', phone: '', product: '', qty: '', plan: 'Pro Plan', req: '' })
  const [sending, setSending] = useState(false)
  const [toast, setToast] = useState<{ msg: string; type: 'success' | 'error' } | null>(null)
  const toastRef = useRef<HTMLDivElement>(null)

  const update = (key: string, val: string) => setForm((prev) => ({ ...prev, [key]: val }))

  const showToast = (msg: string, type: 'success' | 'error') => {
    setToast({ msg, type })
    // Animate toast in with GSAP, out after delay
    requestAnimationFrame(() => {
      const el = toastRef.current
      if (el) {
        gsap.fromTo(el,
          { y: 50, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.3, ease: 'power2.out' }
        )
        gsap.to(el, {
          y: 50,
          opacity: 0,
          duration: 0.3,
          ease: 'power2.in',
          delay: 3,
          onComplete: () => setToast(null),
        })
      } else {
        setTimeout(() => setToast(null), 3000)
      }
    })
  }

  const submit = () => {
    if (!form.name || !form.email || !form.country) {
      showToast(t('contact.toastError'), 'error')
      return
    }
    setSending(true)
    setTimeout(() => {
      setSending(false)
      showToast(t('contact.toastSuccess'), 'success')
      setForm({ name: '', email: '', country: '', phone: '', product: '', qty: '', plan: 'Pro Plan', req: '' })
    }, 1500)
  }

  const containerRef = useGsap(({ gsap }) => {
    // Section reveal
    gsap.from('.contact-form', {
      scrollTrigger: { trigger: '.contact-section', start: 'top 80%' },
      opacity: 0,
      x: -30,
      duration: 0.6,
      ease: 'customEase',
    })

    gsap.from('.contact-info', {
      scrollTrigger: { trigger: '.contact-section', start: 'top 80%' },
      opacity: 0,
      x: 30,
      duration: 0.6,
      ease: 'customEase',
    })
  }, [])

  return (
    <section id="contact" className="contact-section section-padding relative">
      <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-[#2c6e6e]/5 rounded-full blur-[120px]" />
      <div className="section-container relative z-10">
        <div className="grid lg:grid-cols-5 gap-8">
          {/* Form */}
          <div className="contact-form lg:col-span-3 glass rounded-2xl p-8">
            <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest text-[#b8860b] uppercase mb-4">
              <span className="w-6 h-px bg-[#b8860b]/50" />
              {t('contact.section')}
            </div>
            <h2 className="text-3xl font-extrabold text-foreground mb-2">{t('contact.title')}</h2>
            <div className="mb-8 space-y-1">
              <p className="text-xl font-bold gradient-text whitespace-pre-line">{(() => { const s = t('contact.desc').split('\n'); return s[0] })()}</p>
              <p className="text-sm text-gray-500 leading-relaxed whitespace-pre-line">{(() => { const s = t('contact.desc').split('\n').slice(1).join('\n'); return s })()}</p>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wider">{t('contact.labelName')} *</label>
                <input value={form.name} onChange={(e) => update('name', e.target.value)}
                  className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm text-foreground placeholder-gray-400 outline-none focus:border-[#b8860b]/50 transition-colors" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wider">{t('contact.labelEmail')} *</label>
                <input value={form.email} onChange={(e) => update('email', e.target.value)} type="email"
                  className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm text-foreground placeholder-gray-400 outline-none focus:border-[#b8860b]/50 transition-colors" />
              </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wider">{t('contact.labelCountry')} *</label>
                <input value={form.country} onChange={(e) => update('country', e.target.value)}
                  className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm text-foreground placeholder-gray-400 outline-none focus:border-[#b8860b]/50 transition-colors" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wider">{t('contact.labelPhone')}</label>
                <input value={form.phone} onChange={(e) => update('phone', e.target.value)}
                  className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm text-foreground placeholder-gray-400 outline-none focus:border-[#b8860b]/50 transition-colors" />
              </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wider">{t('contact.labelProduct')}</label>
                <select value={form.product} onChange={e => update('product', e.target.value)}
                  className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-600 outline-none focus:border-[#b8860b]/50 transition-colors">
                  <option value="" disabled>{t('contact.selectCategory')}</option>
                  <option value="apparel">{t('catSelect.apparel')}</option>
                  <option value="furniture">{t('catSelect.furniture')}</option>
                  <option value="bags-cases">{t('catSelect.bags-cases')}</option>
                  <option value="beauty">{t('catSelect.beauty')}</option>
                  <option value="toys">{t('catSelect.toys')}</option>
                  <option value="sports">{t('catSelect.sports')}</option>
                  <option value="home-supplies">{t('catSelect.home-supplies')}</option>
                  <option value="garden-tools">{t('catSelect.garden-tools')}</option>
                  <option value="electronics">{t('catSelect.electronics')}</option>
                  <option value="pet-supplies">{t('catSelect.pet-supplies')}</option>
                  <option value="mother-kids">{t('catSelect.mother-kids')}</option>
                  <option value="hardware">{t('catSelect.hardware')}</option>
                  <option value="office-supplies">{t('catSelect.office-supplies')}</option>
                  <option value="automotive">{t('catSelect.automotive')}</option>
                  <option value="industrial">{t('catSelect.industrial')}</option>
                  <option value="packaging">{t('catSelect.packaging')}</option>
                  <option value="outdoors">{t('catSelect.outdoors')}</option>
                  <option value="jewelry">{t('catSelect.jewelry')}</option>
                  <option value="lighting">{t('catSelect.lighting')}</option>
                  <option value="other">{t('contact.optionOther')}</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wider">{t('contact.labelQty')}</label>
                <input value={form.qty} onChange={(e) => update('qty', e.target.value)}
                  className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm text-foreground placeholder-gray-400 outline-none focus:border-[#b8860b]/50 transition-colors" />
              </div>
            </div>
            <div className="mb-6">
              <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wider">{t('contact.labelPlan')}</label>
              <select value={form.plan} onChange={(e) => update('plan', e.target.value)}
                className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-600 outline-none focus:border-[#b8860b]/50 transition-colors">
                <option>{t('contact.optionPro')}</option><option>{t('contact.optionBasic')}</option><option>{t('contact.optionUnsure')}</option>
              </select>
            </div>
            <div className="mb-6">
              <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wider">{t('contact.labelReq')}</label>
              <textarea value={form.req} onChange={(e) => update('req', e.target.value)} rows={3}
                className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm text-foreground placeholder-gray-400 outline-none focus:border-[#b8860b]/50 transition-colors resize-none" />
            </div>
            <button
              onClick={submit}
              disabled={sending}
              className="w-full py-4 bg-gradient-to-r from-[#b8860b] to-[#9a7209] text-white font-bold rounded-xl text-base hover:shadow-xl hover:shadow-[#b8860b]/20 transition-all disabled:opacity-50"
            >
              {sending ? t('contact.sending') : t('contact.submit')}
            </button>
          </div>

          {/* Info */}
          <div className="contact-info lg:col-span-2 space-y-4">
            <div className="glass rounded-2xl p-6">
              <h3 className="text-lg font-bold text-foreground mb-3">{t('contact.storyTitle')}</h3>
              <p className="text-sm text-gray-500 leading-relaxed mb-4">
                {t('contact.storyDesc')}
              </p>
              <div className="flex gap-4 text-xs text-gray-500">
                <span>📅 {t('contact.founded')}</span>
                <span>📍 {t('contact.location')}</span>
              </div>
            </div>

            {contactInfo.map((item, i) => (
              <div key={i} className="glass-card rounded-xl p-4 flex items-center gap-3">
                <span className="text-xl">{item.icon}</span>
                <div>
                  <div className="text-xs text-gray-500">{item.label}</div>
                  <div className="text-sm text-foreground">{item.value}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Toast */}
      {toast && (
        <div
          ref={toastRef}
          className={`fixed bottom-6 right-6 z-50 px-5 py-3 rounded-xl text-sm font-medium shadow-2xl ${
            toast.type === 'success' ? 'bg-emerald-500/90 text-white' : 'bg-red-500/90 text-white'
          }`}
        >
          {toast.msg}
        </div>
      )}
    </section>
  )
}
