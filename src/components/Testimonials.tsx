import { useCallback, useEffect, useRef, useState } from 'react'
import { TESTIMONIALS } from '../data'
import { Eyebrow, Photo } from './ui'
import { prefersReducedMotion } from '../hooks'

export default function Testimonials() {
  const n = TESTIMONIALS.length
  const [i, setI] = useState(0)
  const [paused, setPaused] = useState(false)
  const x0 = useRef<number | null>(null)
  const go = useCallback((d: number) => setI((x) => (x + d + n) % n), [n])

  useEffect(() => {
    if (paused || prefersReducedMotion()) return
    const t = setInterval(() => go(1), 6500)
    return () => clearInterval(t)
  }, [paused, go])

  const t = TESTIMONIALS[i]
  return (
    <div className="flex flex-wrap items-center gap-x-16 gap-y-10"
      onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)} onFocus={() => setPaused(true)} onBlur={() => setPaused(false)}>
      <div className="flex-[1_1_440px] touch-pan-y"
        onPointerDown={(e) => { x0.current = e.clientX }}
        onPointerUp={(e) => {
          if (x0.current === null) return
          const dx = e.clientX - x0.current
          x0.current = null
          if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1)
        }}>
        <Eyebrow>Kata mereka</Eyebrow>
        <div key={i} className="animate-fade">
          <span className="block h-14 font-display text-[110px] italic leading-[.7] text-[#B58E4B] md:h-[70px] md:text-[140px]" aria-hidden="true">“</span>
          <p className="mt-5 min-h-[9rem] font-display text-[clamp(26px,3.2vw,44px)] italic leading-tight md:min-h-[12rem]">{t.quote}</p>
          <p className="mt-6 text-[11px] uppercase tracking-[.28em] text-mute">{t.name} · {t.city}</p>
        </div>
        <div className="mt-8 flex items-center gap-4">
          <button onClick={() => go(-1)} aria-label="Ulasan sebelumnya" className="flex size-11 items-center justify-center rounded-full border border-ink transition-colors hover:bg-ink hover:text-paper">←</button>
          <button onClick={() => go(1)} aria-label="Ulasan berikutnya" className="flex size-11 items-center justify-center rounded-full border border-ink transition-colors hover:bg-ink hover:text-paper">→</button>
          <div className="ml-2 flex">
            {TESTIMONIALS.map((_, k) => (
              <button key={k} onClick={() => setI(k)} aria-label={`Ulasan ${k + 1}`} aria-current={k === i} className="flex size-9 items-center justify-center">
                <span className={`block h-1.5 rounded-full bg-ink transition-all duration-300 ${k === i ? 'w-6' : 'w-1.5 opacity-30'}`} />
              </button>
            ))}
          </div>
        </div>
      </div>
      <div key={`p${i}`} className="relative h-[340px] flex-[1_1_320px] animate-fade md:h-[520px]">
        <Photo label="Foto pesanan pelanggan" gradient={t.g1} image={t.i1} className="absolute left-0 top-0 h-[62%] w-[62%] -rotate-3 border-8 border-white md:border-[10px]" />
        <Photo label="Foto pesanan pelanggan" gradient={t.g2} image={t.i2} className="absolute bottom-0 right-0 h-[56%] w-[58%] rotate-[2.5deg] border-8 border-white md:border-[10px]" />
      </div>
    </div>
  )
}
