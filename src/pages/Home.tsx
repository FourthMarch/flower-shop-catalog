import { useRef, useState, type PointerEvent } from 'react'
import { Link } from 'react-router-dom'
import { CATEGORIES, GRADS, IMG, PRODUCTS, rupiah, type Category } from '../data'
import { Eyebrow, Photo, Reveal, WRAP } from '../components/ui'
import Testimonials from '../components/Testimonials'

const ARROW = <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true"><path d="M4 12h16M14 6l6 6-6 6" /></svg>
const MARQUEE = ['Bunga segar', 'Desain custom', 'Pengiriman tepat waktu', 'Buket', 'Karangan bunga', 'Parcel']
const PERKS = [
  { n: 'i', title: 'Bunga segar', text: 'Dipilih langsung setiap pagi dan dirangkai saat pesanan masuk, agar mekar sempurna di tangan penerima.' },
  { n: 'ii', title: 'Desain custom', text: 'Warna, ukuran, isi parcel, hingga kartu ucapan disesuaikan dengan cerita dan anggaran Anda.' },
  { n: 'iii', title: 'Pengiriman tepat', text: 'Diantar rapi tepat waktu ke lokasi acara, lengkap dengan foto konfirmasi saat tiba.' },
]
const OFFSET = ['', 'md:pl-14', 'md:pl-28']
const TABS: (Category | 'Semua')[] = ['Semua', ...CATEGORIES.map((c) => c.name)]

export default function Home() {
  // Jika loader tampil, tunda animasi hero sampai tirai terbuka.
  const [base] = useState(() => (sessionStorage.getItem('lucky-loaded') ? 0 : 3.3))
  const d = (n: number) => ({ animationDelay: `${base + n}s` })
  const hero = useRef<HTMLElement>(null)
  const [tab, setTab] = useState<Category | 'Semua'>('Semua')
  const [hover, setHover] = useState(0)

  const onMove = (e: PointerEvent) => {
    const el = hero.current
    if (!el || e.pointerType !== 'mouse') return
    const r = el.getBoundingClientRect()
    el.style.setProperty('--mx', String(((e.clientX - r.left) / r.width) * 2 - 1))
    el.style.setProperty('--my', String(((e.clientY - r.top) / r.height) * 2 - 1))
  }

  const items = PRODUCTS.filter((p) => tab === 'Semua' || p.category === tab).slice(0, 4)
  const cur = items[Math.min(hover, items.length - 1)]

  return (
    <>
      {/* HERO */}
      <section ref={hero} onPointerMove={onMove} className="overflow-hidden bg-wine text-paper">
        <div className={`${WRAP} flex flex-wrap items-end gap-10 pb-14 pt-8 md:gap-12 md:pb-24 md:pt-14`}>
          <div className="relative z-10 flex-[1_1_440px]">
            <p className="mb-6 animate-rise text-[11px] uppercase tracking-[.28em] text-gold" style={d(0)}>Florist premium, Mojokerto</p>
            <h1 className="animate-rise font-display text-[clamp(52px,12vw,128px)] leading-[.92] tracking-tight md:text-[clamp(56px,8.4vw,128px)]" style={d(0.1)}>
              Bunga<br />yang <em className="text-gold">berbicara</em><br />lebih dulu.
            </h1>
            <p className="my-7 max-w-[420px] animate-rise text-base font-light leading-relaxed text-[#E6D3CB] md:my-9 md:text-[17px]" style={d(0.25)}>
              Buket, karangan bunga, dan parcel yang dirangkai tangan satu per satu, untuk setiap ucapan yang ingin Anda sampaikan.
            </p>
            <Link to="/katalog" style={d(0.4)} className="inline-flex min-h-12 animate-rise items-center gap-4 border border-gold py-1.5 pl-6 pr-1.5 text-xs uppercase tracking-[.24em] transition-colors hover:bg-gold/10 active:scale-[.98]">
              Lihat Katalog
              <span className="flex size-11 items-center justify-center rounded-full bg-gold text-wine">{ARROW}</span>
            </Link>
          </div>
          <div className="relative flex-[1_1_380px] animate-fade" style={d(0.3)}>
            <div className="transition-transform duration-300 ease-out" style={{ transform: 'translate3d(calc(var(--mx,0)*-14px),calc(var(--my,0)*-14px),0)' }}>
              <Photo label="Karangan bunga utama" image={IMG.hero} gradient={GRADS.hero} className="h-[380px] w-full md:h-[600px]" />
            </div>
            <div className="absolute -bottom-5 -left-1 flex size-28 flex-col items-center justify-center rounded-full bg-gold text-center text-wine transition-transform duration-300 ease-out md:-bottom-10 md:-left-12 md:size-40"
              style={{ transform: 'translate3d(calc(var(--mx,0)*18px),calc(var(--my,0)*18px),0)' }}>
              <span className="font-display text-3xl italic leading-none md:text-4xl">100%</span>
              <span className="mt-1 text-[8px] uppercase tracking-[.24em] md:text-[9px]">Bunga segar<br />pilihan</span>
            </div>
          </div>
        </div>
      </section>

      {/* MARQUEE */}
      <div className="overflow-hidden bg-gold py-3.5 text-wine" aria-hidden="true">
        <div className="flex w-max animate-marquee hover:[animation-play-state:paused]">
          {[0, 1].map((k) => (
            <div key={k} className="flex flex-none items-center">
              {MARQUEE.map((m) => <span key={m + k} className="px-6 font-display text-xl italic md:text-2xl">{m}<span className="ml-12 text-base not-italic">✿</span></span>)}
            </div>
          ))}
        </div>
      </div>

      {/* KATEGORI */}
      <section className={`${WRAP} pt-20 md:pt-32`}>
        <Reveal className="mb-8 flex flex-wrap items-end justify-between gap-4 md:mb-12">
          <h2 className="max-w-[620px] font-display text-[clamp(36px,9vw,76px)] leading-none md:text-[clamp(40px,5.4vw,76px)]">
            Tiga cara <em className="text-brass">menyapa</em> orang tersayang
          </h2>
          <p className="max-w-[300px] text-[15px] leading-relaxed text-mute">Pilih bentuk yang paling sesuai, lalu kami rangkai sesuai suasana hati Anda.</p>
        </Reveal>
        <div className="no-scrollbar -mx-5 flex snap-x snap-mandatory gap-3 overflow-x-auto px-5 pb-2 lg:mx-0 lg:grid lg:grid-cols-[1.2fr_1fr] lg:grid-rows-2 lg:gap-5 lg:overflow-visible lg:px-0 lg:pb-0">
          {CATEGORIES.map((c, i) => (
            <Link key={c.name} to={`/katalog?kategori=${encodeURIComponent(c.name)}`}
              className={`group relative block w-[78%] flex-none snap-start overflow-hidden sm:w-[52%] lg:w-auto ${i === 0 ? 'min-h-[420px] lg:row-span-2 lg:min-h-[640px]' : 'min-h-[420px] lg:min-h-[300px]'}`}>
              <Photo label={c.name} image={c.image} gradient={c.gradient} className="absolute inset-0 transition-transform duration-700 group-hover:scale-105" />
              <span className="absolute left-5 top-4 font-display text-5xl italic leading-none text-paper md:text-6xl">0{i + 1}</span>
              <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-wine/85 to-transparent p-6 text-paper md:p-7">
                <h3 className={`font-display italic ${i === 0 ? 'text-4xl md:text-[44px]' : 'text-4xl'}`}>{c.name}</h3>
                <p className="mt-1.5 text-sm font-light">{c.blurb}</p>
                <span className="mt-3 inline-flex items-center gap-2 text-[11px] uppercase tracking-[.22em] text-gold transition-all group-hover:gap-4">Jelajahi {ARROW}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* PRODUK UNGGULAN */}
      <section className={`${WRAP} pt-20 md:pt-32`}>
        <div className="flex flex-wrap items-start gap-x-16 gap-y-10">
          <Reveal className="relative flex-[1_1_380px]">
            <div key={cur.slug} className="animate-fade">
              <Photo label={cur.name} gradient={cur.gradient} image={cur.images?.[0]} className="h-[360px] w-full md:h-[620px]" />
            </div>
            <Link to={`/produk/${cur.slug}`} className="absolute -right-0 bottom-6 bg-wine px-6 py-5 text-paper transition-colors hover:bg-ink md:-right-7 md:bottom-9 md:px-7 md:py-6">
              <p className="text-[10px] uppercase tracking-[.28em] text-gold">{cur.category}</p>
              <p className="mt-1.5 font-display text-2xl italic md:text-[28px]">{cur.name}</p>
            </Link>
          </Reveal>
          <div className="min-w-0 flex-[1_1_420px] md:pt-3">
            <Eyebrow>Pilihan favorit</Eyebrow>
            <h2 className="mb-6 mt-4 font-display text-[clamp(36px,8vw,64px)] leading-tight md:text-[clamp(38px,4.6vw,64px)]">Produk <em>unggulan</em> kami</h2>
            <div role="group" aria-label="Filter kategori" className="no-scrollbar -mx-5 mb-4 flex gap-2 overflow-x-auto px-5 md:mx-0 md:px-0">
              {TABS.map((t) => (
                <button key={t} onClick={() => { setTab(t); setHover(0) }} aria-pressed={tab === t}
                  className={`min-h-11 flex-none border px-4 text-xs uppercase tracking-[.18em] transition-colors ${tab === t ? 'border-ink bg-ink text-paper' : 'border-line hover:border-ink'}`}>{t}</button>
              ))}
            </div>
            <ul className="border-b border-line">
              {items.map((p, i) => (
                <li key={p.slug} onMouseEnter={() => setHover(i)} onFocus={() => setHover(i)}>
                  <Link to={`/produk/${p.slug}`} className="group flex items-center gap-4 border-t border-line py-5 md:gap-6 md:py-6">
                    <span className={`w-10 font-display text-3xl italic transition-colors md:w-12 md:text-[34px] ${cur.slug === p.slug ? 'text-brass' : 'text-line'}`}>0{i + 1}</span>
                    <div className="min-w-0 flex-1">
                      <h3 className="font-display text-2xl leading-tight transition-transform duration-300 group-hover:translate-x-1 md:text-[28px]">{p.name}</h3>
                      <p className="mt-1.5 text-[10px] uppercase tracking-[.24em] text-mute">{p.category} · {rupiah(p.price)}</p>
                    </div>
                    <span className="flex size-11 flex-none items-center justify-center rounded-full border border-ink transition-colors group-hover:bg-ink group-hover:text-paper">{ARROW}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* KEUNGGULAN */}
      <section className="mt-20 bg-blush md:mt-32">
        <div className={`${WRAP} flex flex-wrap gap-10 pb-20 pt-20 md:gap-16 md:pb-28 md:pt-28`}>
          <div className="flex-[1_1_340px]">
            <Eyebrow>Janji kami</Eyebrow>
            <h2 className="mt-4 font-display text-[clamp(36px,8vw,64px)] leading-tight md:text-[clamp(38px,4.6vw,64px)]">Dirangkai dengan <em>sepenuh hati</em></h2>
          </div>
          <div className="flex-[2_1_520px]">
            {PERKS.map((p, i) => (
              <Reveal key={p.n} delay={i * 120} className={`flex gap-5 border-t border-[#B79A8C] py-7 md:gap-8 md:py-8 ${OFFSET[i]}`}>
                <span className="w-14 flex-none font-display text-5xl italic leading-[.9] text-brass md:w-[90px] md:text-7xl">{p.n}</span>
                <div>
                  <h3 className="font-display text-3xl md:text-[32px]">{p.title}</h3>
                  <p className="mt-2 max-w-[460px] text-base leading-relaxed text-[#3F2B28]">{p.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONI */}
      <section className={`${WRAP} pt-20 md:pt-32`}><Testimonials /></section>
    </>
  )
}
