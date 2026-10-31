import { useEffect, useState } from 'react'

const PETALS = Array.from({ length: 8 }, (_, i) => i)
const FALLING = [
  { left: '8%', delay: 0, dur: 6.5, size: 14 }, { left: '22%', delay: 1.4, dur: 5.5, size: 10 },
  { left: '35%', delay: 0.6, dur: 7, size: 12 }, { left: '48%', delay: 2.2, dur: 6, size: 9 },
  { left: '61%', delay: 0.9, dur: 5.8, size: 13 }, { left: '74%', delay: 1.9, dur: 6.8, size: 10 },
  { left: '88%', delay: 0.3, dur: 6.2, size: 12 },
]

/** Layar pembuka: tangkai tumbuh, bunga mekar, lalu tirai terbelah. Dipanggil sekali per sesi. */
export default function Loader({ onDone }: { onDone: () => void }) {
  const [leaving, setLeaving] = useState(false)

  useEffect(() => {
    const a = setTimeout(() => setLeaving(true), 2900)
    const b = setTimeout(onDone, 4000)
    return () => { clearTimeout(a); clearTimeout(b) }
  }, [onDone])

  const panel = 'absolute inset-x-0 h-1/2 bg-wine transition-transform duration-[1100ms] ease-[cubic-bezier(.7,0,.2,1)]'

  return (
    <div className="fixed inset-0 z-50 overflow-hidden" role="status" aria-label="Memuat Lucky Flowershop">
      <div className={`${panel} top-0 ${leaving ? '-translate-y-full' : ''}`} />
      <div className={`${panel} bottom-0 ${leaving ? 'translate-y-full' : ''}`} />

      <div className={`relative z-10 flex h-full flex-col items-center justify-center text-paper transition-opacity duration-500 ${leaving ? 'opacity-0' : ''}`}>
        {FALLING.map((f, i) => (
          <span key={i} aria-hidden="true"
            className="absolute -top-6 animate-fall rounded-[60%_40%_60%_40%] bg-linear-to-br from-[#F2D0CF] to-[#B9626F] opacity-70"
            style={{ left: f.left, width: f.size, height: f.size * 1.3, animationDelay: `${f.delay}s`, animationDuration: `${f.dur}s` }} />
        ))}

        <svg viewBox="0 0 200 260" className="h-56 w-44" aria-hidden="true">
          <defs>
            <linearGradient id="petal" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#F2D0CF" />
              <stop offset="1" stopColor="#C8707E" />
            </linearGradient>
          </defs>
          <path d="M100 252 C100 210 96 180 100 118" fill="none" stroke="#D9B46C" strokeWidth="2.5" strokeLinecap="round"
            pathLength={1} strokeDasharray={1} strokeDashoffset={1} className="animate-draw" />
          <g transform="rotate(-28 100 195)"><ellipse cx="78" cy="195" rx="24" ry="8" fill="#76906F" className="animate-leaf" style={{ transformOrigin: '100px 195px', animationDelay: '0.7s' }} /></g>
          <g transform="rotate(28 100 215)"><ellipse cx="122" cy="215" rx="24" ry="8" fill="#76906F" className="animate-leaf" style={{ transformOrigin: '100px 215px', animationDelay: '0.9s' }} /></g>
          {PETALS.map((i) => (
            <g key={i} transform={`rotate(${i * 45} 100 100)`}>
              <ellipse cx="100" cy="64" rx="15" ry="34" fill="url(#petal)" stroke="#D9B46C" strokeWidth="0.6" strokeOpacity="0.5"
                className="animate-bloom" style={{ transformOrigin: '100px 100px', animationDelay: `${1 + i * 0.12}s` }} />
            </g>
          ))}
          <circle cx="100" cy="100" r="14" fill="#D9B46C" className="animate-bloom" style={{ transformOrigin: '100px 100px', animationDelay: '2s' }} />
        </svg>

        <p className="mt-2 animate-rise font-display text-4xl italic" style={{ animationDelay: '1.7s' }}>Lucky Flowershop</p>
        <p className="mt-2 animate-rise text-[11px] uppercase tracking-[.28em] text-gold" style={{ animationDelay: '2.1s' }}>Merangkai keindahan untuk Anda</p>
        <div className="mt-8 h-px w-40 bg-[#4A2A2E]"><div className="h-full origin-left animate-grow bg-gold" /></div>
      </div>
    </div>
  )
}
