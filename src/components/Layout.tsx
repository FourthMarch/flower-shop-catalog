import { useEffect, useState } from 'react'
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom'
import { SHOP, WRAP, WaButton } from './ui'
import { useLockBody, useScrollY } from '../hooks'
import { useStore } from '../store'

const LINKS = [
  { to: '/', label: 'Beranda', end: true }, { to: '/katalog', label: 'Katalog' },
  { to: '/tentang', label: 'Tentang Kami' }, { to: '/kontak', label: 'Kontak' },
]

function NavItem({ to, children, end }: { to: string; children: string; end?: boolean }) {
  return (
    <NavLink to={to} end={end}
      className={({ isActive }) => `py-3 text-xs uppercase tracking-[.24em] transition-colors hover:text-gold ${isActive ? 'text-gold' : ''}`}>
      {children}
    </NavLink>
  )
}

function Logo() {
  return (
    <Link to="/" className="text-center md:px-4">
      <span className="block font-display text-3xl italic md:text-4xl">Lucky</span>
      <span className="block text-[9px] uppercase tracking-[.28em] text-gold">Flowershop</span>
    </Link>
  )
}

const SOCIALS = [
  { label: 'Instagram', d: 'M3 8a5 5 0 0 1 5-5h8a5 5 0 0 1 5 5v8a5 5 0 0 1-5 5H8a5 5 0 0 1-5-5zM12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8z' },
  { label: 'Facebook', d: 'M14 8h3V4h-3a4 4 0 0 0-4 4v3H7v4h3v6h4v-6h3l1-4h-4V8z' },
  { label: 'WhatsApp', d: 'M4 20l1.4-4.2A8 8 0 1 1 8.2 18.6L4 20z' },
]

export default function Layout() {
  const { pathname } = useLocation()
  const y = useScrollY()
  const { favs } = useStore()
  const [open, setOpen] = useState(false)
  useLockBody(open)

  useEffect(() => { window.scrollTo(0, 0); setOpen(false) }, [pathname])
  useEffect(() => {
    if (!open) return
    const k = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false) }
    window.addEventListener('keydown', k)
    return () => window.removeEventListener('keydown', k)
  }, [open])

  return (
    <>
      <header className={`sticky top-0 z-40 bg-wine/95 text-paper backdrop-blur transition-shadow ${y > 40 ? 'shadow-lg shadow-black/20' : ''}`}>
        <div className={`${WRAP} flex items-center justify-between gap-6 border-b border-[#4A2A2E] transition-all duration-300 ${y > 40 ? 'py-2.5' : 'py-4 md:py-6'}`}>
          <nav className="hidden flex-1 gap-8 md:flex" aria-label="Menu utama"><NavItem to="/" end>Beranda</NavItem><NavItem to="/katalog">Katalog</NavItem></nav>
          <Logo />
          <div className="flex flex-1 items-center justify-end gap-1 md:gap-6">
            <nav className="hidden gap-8 md:flex" aria-label="Menu lainnya"><NavItem to="/tentang">Tentang Kami</NavItem><NavItem to="/kontak">Kontak</NavItem></nav>
            <Link to="/katalog?favorit=1" aria-label={`Favorit, ${favs.length} produk`} className="relative flex size-11 items-center justify-center hover:text-gold">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.5A4 4 0 0 1 19 10c0 5.600-7 10-7 10z" /></svg>
              {favs.length > 0 && <span key={favs.length} className="absolute right-1 top-1 flex size-4 animate-pop items-center justify-center rounded-full bg-gold text-[10px] font-medium text-wine">{favs.length}</span>}
            </Link>
            <button onClick={() => setOpen(true)} aria-label="Buka menu" aria-expanded={open} className="flex size-11 items-center justify-center md:hidden">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="M3 7h18M3 12h18M3 17h12" /></svg>
            </button>
          </div>
        </div>
      </header>

      {open && (
        <div className="fixed inset-0 z-[66] flex animate-fade flex-col bg-wine text-paper md:hidden" role="dialog" aria-modal="true" aria-label="Menu">
          <div className={`${WRAP} flex items-center justify-between py-4`}>
            <Logo />
            <button onClick={() => setOpen(false)} aria-label="Tutup menu" className="flex size-11 items-center justify-center text-3xl leading-none">×</button>
          </div>
          <nav className={`${WRAP} flex flex-1 flex-col justify-center`}>
            {LINKS.map((l, i) => (
              <NavLink key={l.to} to={l.to} end={l.end} style={{ animationDelay: `${0.05 + i * 0.07}s` }}
                className={({ isActive }) => `animate-rise border-b border-[#4A2A2E] py-5 font-display text-[40px] italic leading-none ${isActive ? 'text-gold' : ''}`}>
                {l.label}
              </NavLink>
            ))}
          </nav>
          <div className={`${WRAP} pb-8`}>
            <WaButton text="Halo Lucky Flowershop, saya ingin bertanya." label="Chat via WhatsApp" />
            <p className="mt-4 text-center text-sm text-[#B9A39C]">{SHOP.hours.map((h) => `${h.day} ${h.time}`).join(' · ')}</p>
          </div>
        </div>
      )}

      <main key={pathname} className="animate-fade"><Outlet /></main>

      <footer className="mt-20 bg-wine text-[#E6D3CB] md:mt-28">
        <div className={`${WRAP} pb-9 pt-14 md:pt-20`}>
          <div className="grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-4 md:gap-x-12">
            <p className="col-span-2 font-display text-4xl italic leading-[1.1] text-paper md:col-span-1 md:text-[44px]">Mari rangkai<br />momen Anda.</p>
            <div><h2 className="mb-3 text-[11px] uppercase tracking-[.28em] text-gold">Alamat</h2><p className="text-[15px] leading-7">{SHOP.address.map((a) => <span key={a} className="block">{a}</span>)}</p></div>
            <div><h2 className="mb-3 text-[11px] uppercase tracking-[.28em] text-gold">Kontak</h2><p className="break-words text-[15px] leading-7">WhatsApp<br />{SHOP.whatsapp}<br />{SHOP.email}</p></div>
            <div className="col-span-2 md:col-span-1"><h2 className="mb-3 text-[11px] uppercase tracking-[.28em] text-gold">Jam buka</h2><p className="text-[15px] leading-7">{SHOP.hours.map((h) => <span key={h.day} className="block">{h.day} {h.time}</span>)}</p></div>
          </div>
          <div className="mt-12 flex flex-wrap items-center justify-between gap-5 border-t border-[#4A2A2E] pt-7 md:mt-16">
            <span className="text-[13px] text-[#B9A39C]">© {new Date().getFullYear()} {SHOP.name}</span>
            <div className="flex gap-3">
              {SOCIALS.map((s) => (
                <a key={s.label} href="#" aria-label={s.label} className="flex size-11 items-center justify-center rounded-full border border-gold transition-colors hover:bg-gold/15">
                  <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="#D9B46C" strokeWidth="1.4" aria-hidden="true"><path d={s.d} /></svg>
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}
