import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { waLink } from '../data'
import { useScrollY } from '../hooks'
import { WhatsAppIcon } from './ui'

export default function Floating() {
  const { pathname } = useLocation()
  const y = useScrollY()
  const [pct, setPct] = useState(0)
  useEffect(() => {
    const h = document.documentElement.scrollHeight - window.innerHeight
    setPct(h > 0 ? Math.min(100, (y / h) * 100) : 0)
  }, [y, pathname])
  const detail = pathname.startsWith('/produk') // di halaman detail, mobile memakai bar bawah

  return (
    <>
      <div className="fixed inset-x-0 top-0 z-[70] h-0.5" aria-hidden="true"><div className="h-full bg-gold transition-[width] duration-100" style={{ width: `${pct}%` }} /></div>
      <div className={`fixed bottom-5 right-4 z-40 flex flex-col items-end gap-3 md:right-6 ${detail ? 'max-md:hidden' : ''}`}>
        {y > 700 && (
          <button aria-label="Kembali ke atas" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex size-11 animate-pop items-center justify-center rounded-full border border-ink bg-paper shadow-lg">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true"><path d="M12 20V4M6 10l6-6 6 6" /></svg>
          </button>
        )}
        <a href={waLink('Halo Lucky Flowershop, saya ingin bertanya.')} target="_blank" rel="noreferrer" aria-label="Chat via WhatsApp"
          className="flex size-14 items-center justify-center rounded-full bg-gold text-wine shadow-lg transition-transform hover:scale-105 active:scale-95">
          <WhatsAppIcon size={26} />
        </a>
      </div>
    </>
  )
}
