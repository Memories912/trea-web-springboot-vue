'use client'

import { useState, useRef, useEffect } from 'react'
import { useT } from '@/i18n'
import gsap from 'gsap'

const categories = [
  'apparel', 'furniture', 'bags-cases', 'beauty', 'toys', 'sports',
  'home-supplies', 'garden-tools', 'electronics', 'pet-supplies', 'mother-kids',
  'hardware', 'office-supplies', 'automotive', 'industrial', 'packaging',
  'outdoors', 'jewelry', 'lighting',
]

interface ContactFormModalProps {
  open: boolean
  onClose: () => void
  defaultPlan?: string
}

export default function ContactFormModal({ open, onClose, defaultPlan = 'Pro Plan' }: ContactFormModalProps) {
  const { t } = useT()
  const [form, setForm] = useState({ name: '', email: '', country: '', phone: '', category: '', plan: defaultPlan, req: '' })
  const [sending, setSending] = useState(false)
  const [toast, setToast] = useState<{ msg: string; type: 'success' | 'error' } | null>(null)
  const overlayRef = useRef<HTMLDivElement>(null)
  const modalRef = useRef<HTMLDivElement>(null)
  const toastRef = useRef<HTMLDivElement>(null)

  const update = (key: string, val: string) => setForm(prev => ({ ...prev, [key]: val }))

  // Modal enter/exit animation
  useEffect(() => {
    if (open && overlayRef.current && modalRef.current) {
      gsap.fromTo(overlayRef.current, { opacity: 0 }, { opacity: 1, duration: 0.25 })
      gsap.fromTo(modalRef.current,
        { opacity: 0, scale: 0.9, y: 30 },
        { opacity: 1, scale: 1, y: 0, duration: 0.45, ease: 'gsapElastic' }
      )
    }
  }, [open])

  // Toast animation
  useEffect(() => {
    if (toast && toastRef.current) {
      gsap.fromTo(toastRef.current, { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 0.3, ease: 'gsapElastic' })
    }
  }, [toast])

  const closeModal = () => {
    if (modalRef.current && overlayRef.current) {
      gsap.to(overlayRef.current, { opacity: 0, duration: 0.2 })
      gsap.to(modalRef.current, {
        opacity: 0, scale: 0.9, y: 30, duration: 0.25, ease: 'gsapHero',
        onComplete: onClose
      })
    } else {
      onClose()
    }
  }

  const submit = () => {
    if (!form.name || !form.email || !form.country) {
      setToast({ msg: t('contact.toastError'), type: 'error' })
      setTimeout(() => setToast(null), 3000)
      return
    }
    setSending(true)
    setTimeout(() => {
      setSending(false)
      setToast({ msg: t('contact.toastSuccess'), type: 'success' })
      setTimeout(() => {
        setToast(null)
        onClose()
        setForm({ name: '', email: '', country: '', phone: '', category: '', plan: defaultPlan, req: '' })
      }, 1500)
    }, 1200)
  }

  const inputClass = 'w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm text-foreground placeholder-gray-400 outline-none focus:border-[#b8860b]/50 transition-colors'
  const labelClass = 'block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wider'

  if (!open) return null

  return (
    <div ref={overlayRef} className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
      onClick={(e) => { if (e.target === e.currentTarget) closeModal() }}>
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />

      {/* Modal */}
      <div ref={modalRef} className="relative glass rounded-2xl p-6 md:p-8 w-full max-w-lg max-h-[90vh] overflow-y-auto border border-gray-200 shadow-2xl">
        {/* Close */}
        <button onClick={closeModal} className="absolute top-4 right-4 w-8 h-8 rounded-xl bg-black/[0.03] hover:bg-black/[0.05] flex items-center justify-center text-gray-500 hover:text-gray-900 transition-all text-sm">
          ✕
        </button>

        {/* Title */}
        <h3 className="text-xl font-bold gradient-text mb-1">{t('contact.title')}</h3>
        <p className="text-xs text-gray-500 mb-6">{t('contact.desc')}</p>

        {/* Form */}
        <div className="grid sm:grid-cols-2 gap-4 mb-4">
          <div>
            <label className={labelClass}>{t('contact.labelName')}</label>
            <input value={form.name} onChange={e => update('name', e.target.value)} className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>{t('contact.labelEmail')}</label>
            <input value={form.email} onChange={e => update('email', e.target.value)} type="email" className={inputClass} />
          </div>
        </div>
        <div className="grid sm:grid-cols-2 gap-4 mb-4">
          <div>
            <label className={labelClass}>{t('contact.labelCountry')}</label>
            <input value={form.country} onChange={e => update('country', e.target.value)} className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>{t('contact.labelPhone')}</label>
            <input value={form.phone} onChange={e => update('phone', e.target.value)} className={inputClass} />
          </div>
        </div>
        <div className="grid sm:grid-cols-2 gap-4 mb-4">
          <div>
            <label className={labelClass}>{t('contact.labelProduct')}</label>
            <select value={form.category} onChange={e => update('category', e.target.value)} className={inputClass + ' text-gray-600'}>
              <option value="" disabled>{t('contact.selectCategory')}</option>
              {categories.map(c => (
                <option key={c} value={c}>{t(`catSelect.${c}`)}</option>
              ))}
              <option value="other">{t('contact.optionOther')}</option>
            </select>
          </div>
          <div>
            <label className={labelClass}>{t('contact.labelPlan')}</label>
            <select value={form.plan} onChange={e => update('plan', e.target.value)} className={inputClass + ' text-gray-600'}>
              <option>{t('contact.optionPro')}</option>
              <option>{t('contact.optionBasic')}</option>
              <option>{t('contact.optionUnsure')}</option>
            </select>
          </div>
        </div>
        <div className="mb-6">
          <label className={labelClass}>{t('contact.labelReq')}</label>
          <textarea value={form.req} onChange={e => update('req', e.target.value)} rows={3} className={inputClass + ' resize-none'} />
        </div>
        <button
          onClick={submit}
          disabled={sending}
          className="w-full py-4 bg-gradient-to-r from-[#b8860b] to-[#9a7209] text-white font-bold rounded-xl text-base hover:shadow-xl hover:shadow-[#b8860b]/20 transition-all disabled:opacity-50"
        >
          {sending ? t('contact.sending') : t('contact.submit')}
        </button>
      </div>

      {/* Toast */}
      {toast && (
        <div ref={toastRef}
          className={`fixed bottom-6 right-6 z-[99999] px-5 py-3 rounded-xl text-sm font-medium shadow-2xl ${
            toast.type === 'success' ? 'bg-emerald-500/90 text-white' : 'bg-red-500/90 text-white'
          }`}
        >
          {toast.msg}
        </div>
      )}
    </div>
  )
}
