import { useEffect, useRef, useState, type ReactNode } from 'react'
import { GRADS, SHOP, waLink } from '../data'
import { useStore } from '../store'
import { useLockBody } from '../hooks'

export const WRAP = 'mx-auto w-full max-w-[1280px] px-5 md:px-10'
export const FIELD =
  'h-[50px] w-full min-w-0 border border-ink bg-transparent px-4 text-base outline-none focus-visible:ring-2 focus-visible:ring-gold'

/** Ganti `gradient` dengan `image` (URL foto) saat foto asli sudah tersedia. */
export function Photo({ label, gradient, image, className = '' }: { label?: string; gradient?: string; image?: string; className?: string }) {
  const [failed, setFailed] = useState(false)
  if (image && !failed) return <img src={image} alt={label ?? ''} loading="lazy" onError={() => setFailed(true)} className={`object-cover ${className}`} />
  return (
    <div role="img" aria-label={label} style={{ background: gradient ?? GRADS.rose }}
      className={`flex items-end p-3 text-[10px] uppercase tracking-[.2em] text-ink md:p-4 ${className}`}>
      [ {label ?? 'Foto'} ]
    </div>
  )
}

export function Eyebrow({ children, light = false }: { children: ReactNode; light?: boolean }) {
  return <p className={`text-[11px] uppercase tracking-[.28em] ${light ? 'text-gold' : 'text-brass'}`}>{children}</p>
}

export function Reveal({ children, delay = 0, className = '' }: { children: ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const [on, setOn] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setOn(true); io.disconnect() } }, { threshold: 0.12 })
    io.observe(el)
    return () => io.disconnect()
  }, [])
  return (
    <div ref={ref} style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-700 ease-out ${on ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'} ${className}`}>
      {children}
    </div>
  )
}

export function WhatsAppIcon({ size = 24 }: { size?: number }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="M4 20l1.4-4.2A8 8 0 1 1 8.2 18.6L4 20z" /></svg>
}

export function WaButton({ text, label = 'Pesan via WhatsApp', className = '', compact = false }: { text: string; label?: string; className?: string; compact?: boolean }) {
  return (
    <a href={waLink(text)} target="_blank" rel="noreferrer"
      className={`flex items-center justify-center gap-3 bg-gold font-medium uppercase text-wine transition-all hover:bg-[#e6c783] active:scale-[.98] ${compact ? 'min-h-12 px-4 text-xs tracking-[.14em]' : 'min-h-[60px] px-7 text-[13px] tracking-[.2em]'} ${className}`}>
      <WhatsAppIcon size={compact ? 20 : 24} />{label}
    </a>
  )
}

export function PageHero({ crumb, title, accent, text }: { crumb: string; title: string; accent: string; text: string }) {
  return (
    <section className="bg-wine text-paper">
      <div className={`${WRAP} flex flex-wrap items-end justify-between gap-5 pb-12 pt-8 md:gap-6 md:pb-16 md:pt-12`}>
        <div>
          <p className="mb-4 text-[11px] uppercase tracking-[.28em] text-gold md:mb-5">{crumb}</p>
          <h1 className="animate-rise font-display text-[clamp(48px,11vw,112px)] leading-[.95] tracking-tight">{title} <em className="text-gold">{accent}</em></h1>
        </div>
        <p className="max-w-[340px] text-base font-light leading-relaxed text-[#E6D3CB]">{text}</p>
      </div>
    </section>
  )
}

export function HeartButton({ slug, className = '' }: { slug: string; className?: string }) {
  const { favs, toggleFav } = useStore()
  const on = favs.includes(slug)
  return (
    <button onClick={() => toggleFav(slug)} aria-pressed={on} aria-label={on ? 'Hapus dari favorit' : 'Simpan ke favorit'}
      className={`flex size-11 items-center justify-center rounded-full bg-paper/90 text-ink shadow transition-colors hover:bg-paper ${className}`}>
      <svg key={String(on)} width="20" height="20" viewBox="0 0 24 24" strokeWidth="1.6" stroke="currentColor" fill={on ? '#B9626F' : 'none'} className={on ? 'animate-pop' : ''} aria-hidden="true">
        <path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.5A4 4 0 0 1 19 10c0 5.600-7 10-7 10z" />
      </svg>
    </button>
  )
}

export function Accordion({ items, firstOpen = false }: { items: { q: string; a: ReactNode }[]; firstOpen?: boolean }) {
  const [open, setOpen] = useState<number | null>(firstOpen ? 0 : null)
  return (
    <div className="border-b border-line">
      {items.map((it, i) => (
        <div key={it.q} className="border-t border-line">
          <button onClick={() => setOpen(open === i ? null : i)} aria-expanded={open === i}
            className="flex min-h-14 w-full items-center justify-between gap-4 py-3 text-left font-display text-xl md:text-2xl">
            {it.q}
            <span className={`flex-none text-2xl text-brass transition-transform duration-300 ${open === i ? 'rotate-45' : ''}`} aria-hidden="true">+</span>
          </button>
          <div className={`grid transition-[grid-template-rows] duration-300 ${open === i ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
            <div className="overflow-hidden"><div className="pb-5 text-base leading-relaxed text-[#3F2B28]">{it.a}</div></div>
          </div>
        </div>
      ))}
    </div>
  )
}

export function Sheet({ open, onClose, title, children, footer }: { open: boolean; onClose: () => void; title: string; children: ReactNode; footer?: ReactNode }) {
  useLockBody(open)
  useEffect(() => {
    if (!open) return
    const k = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', k)
    return () => window.removeEventListener('keydown', k)
  }, [open, onClose])
  if (!open) return null
  return (
    <div className="fixed inset-0 z-[65]" role="dialog" aria-modal="true" aria-label={title}>
      <button aria-label="Tutup" onClick={onClose} className="absolute inset-0 animate-fade bg-wine/60" />
      <div className="absolute inset-x-0 bottom-0 flex max-h-[88vh] animate-slide-up flex-col rounded-t-2xl bg-paper">
        <div className="flex items-center justify-between border-b border-line px-5 py-2 pl-6">
          <h2 className="font-display text-2xl italic">{title}</h2>
          <button onClick={onClose} aria-label="Tutup" className="size-11 text-3xl leading-none">×</button>
        </div>
        <div className="overflow-y-auto px-6 py-5">{children}</div>
        {footer && <div className="border-t border-line p-4">{footer}</div>}
      </div>
    </div>
  )
}

export { SHOP }
