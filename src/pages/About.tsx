import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Accordion, Eyebrow, PageHero, Photo, Reveal, WRAP, WaButton } from '../components/ui'
import { FAQ, GRADS, IMG, STEPS } from '../data'

const TEAM = [GRADS.rose, GRADS.gold, GRADS.sage]

export default function About() {
  const [s, setS] = useState(0)
  const step = STEPS[s]

  return (
    <>
      <PageHero crumb="Beranda / Tentang Kami" title="Tentang" accent="Lucky" text="Florist dan parcel butik di Mojokerto, merangkai bunga dengan sepenuh hati." />

      <section className={`${WRAP} pt-16 md:pt-28`}>
        <div className="flex flex-wrap items-center gap-x-20 gap-y-12">
          <Reveal className="relative flex-[1_1_380px]">
            <Photo label="Studio Lucky Flowershop" image={IMG.about} gradient={GRADS.hero} className="relative z-10 h-[420px] w-full md:h-[640px]" />
            <div className="absolute -bottom-6 -right-6 hidden h-[55%] w-[55%] border border-[#B58E4B] md:block" />
          </Reveal>
          <Reveal delay={120} className="flex-[1_1_420px]">
            <Eyebrow>Cerita kami</Eyebrow>
            <h2 className="mt-4 font-display text-[clamp(34px,8vw,60px)] leading-tight md:text-[clamp(36px,4.4vw,60px)]">Bunga adalah cara paling <em>indah</em> untuk berkata.</h2>
            <p className="mt-7 text-base leading-[1.85] text-[#3F2B28] md:text-[17px]">Lucky Flowershop berdiri di Mojokerto pada [TAHUN], berawal dari keyakinan sederhana bahwa setiap ucapan layak disampaikan dengan indah.</p>
            <p className="mt-4 text-base leading-[1.85] text-[#3F2B28] md:text-[17px]">Kami merangkai buket, karangan bunga, dan parcel satu per satu, menggunakan bunga segar pilihan dan sentuhan tangan yang teliti. [Ceritakan filosofi dan latar belakang toko di sini.]</p>
            <p className="mt-8 font-display text-[26px] italic text-brass">[Nama Pemilik]</p>
            <p className="mt-1.5 text-[10px] uppercase tracking-[.28em] text-mute">Pendiri</p>
          </Reveal>
        </div>
      </section>

      {/* PROSES: tab interaktif */}
      <section className="mt-20 bg-blush md:mt-32">
        <div className={`${WRAP} pb-20 pt-16 md:pb-28 md:pt-24`}>
          <Eyebrow>Proses kami</Eyebrow>
          <h2 className="mt-4 max-w-[640px] font-display text-[clamp(34px,8vw,60px)] leading-tight md:text-[clamp(36px,4.4vw,60px)]">Dari pilihan bunga hingga <em>sampai di tangan</em></h2>
          <div className="mt-10 grid gap-8 md:mt-14 lg:grid-cols-[340px_1fr] lg:gap-14">
            <div role="tablist" aria-label="Langkah proses" className="grid grid-cols-4 gap-2 lg:grid-cols-1 lg:gap-0">
              {STEPS.map((st, i) => (
                <button key={st.t} role="tab" aria-selected={s === i} onClick={() => setS(i)}
                  className={`border-t-2 px-1 pt-3 text-left transition-colors lg:flex lg:items-baseline lg:gap-5 lg:border-t lg:py-5 ${s === i ? 'border-ink' : 'border-[#B79A8C] hover:border-ink'}`}>
                  <span className={`block font-display text-3xl italic transition-colors lg:text-5xl ${s === i ? 'text-brass' : 'text-[#B79A8C]'}`}>0{i + 1}</span>
                  <span className={`mt-1 block text-[11px] uppercase tracking-[.16em] lg:mt-0 lg:text-xl lg:normal-case lg:tracking-normal lg:font-display ${s === i ? 'font-medium' : 'text-mute'}`}>{st.t}</span>
                </button>
              ))}
            </div>
            <div key={s} role="tabpanel" className="grid animate-fade items-center gap-6 md:grid-cols-2 md:gap-10">
              <Photo label={`Proses ${step.t.toLowerCase()}`} image={step.img} gradient={step.g} className="h-[260px] w-full md:h-[380px]" />
              <div>
                <h3 className="font-display text-4xl">{step.t}</h3>
                <p className="mt-4 text-base leading-[1.8] text-[#3F2B28]">{step.d}</p>
                <button onClick={() => setS((s + 1) % STEPS.length)} className="mt-6 inline-flex min-h-11 items-center gap-2 border-b border-ink text-xs uppercase tracking-[.2em]">
                  Langkah berikutnya →
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TIM */}
      <section className={`${WRAP} pt-20 md:pt-32`}>
        <Reveal className="mb-10 flex flex-wrap items-end justify-between gap-4 md:mb-14">
          <h2 className="font-display text-[clamp(34px,8vw,60px)] leading-tight md:text-[clamp(36px,4.4vw,60px)]">Tangan di balik <em className="text-brass">rangkaian</em></h2>
          <p className="max-w-[300px] text-[15px] leading-relaxed text-mute">Tim florist kami yang merangkai setiap pesanan dengan teliti.</p>
        </Reveal>
        <div className="no-scrollbar -mx-5 flex snap-x snap-mandatory items-start gap-4 overflow-x-auto px-5 md:mx-0 md:gap-7 md:overflow-visible md:px-0">
          {TEAM.map((g, i) => (
            <div key={i} className={`group w-[72%] flex-none snap-start sm:w-[45%] md:w-auto md:flex-1 ${i === 1 ? 'md:mt-12' : ''}`}>
              <div className="overflow-hidden"><Photo label="Anggota tim" image={IMG.team[i]} gradient={g} className="h-[380px] w-full transition-transform duration-700 group-hover:scale-105 md:h-[420px]" /></div>
              <h3 className="mt-4 font-display text-[26px]">[Nama]</h3>
              <p className="mt-1.5 text-[10px] uppercase tracking-[.28em] text-brass">[Peran]</p>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className={`${WRAP} pt-20 md:pt-32`}>
        <div className="flex flex-wrap gap-x-16 gap-y-8">
          <div className="flex-[1_1_300px]"><Eyebrow>Pertanyaan umum</Eyebrow><h2 className="mt-4 font-display text-[clamp(34px,8vw,52px)] leading-tight md:text-5xl">Sebelum <em>memesan</em></h2></div>
          <div className="flex-[2_1_480px]"><Accordion items={FAQ.map((f) => ({ q: f.q, a: f.a }))} /></div>
        </div>
      </section>

      <section className="mt-20 bg-wine text-center text-paper md:mt-32">
        <div className={`${WRAP} py-20 md:py-24`}>
          <p className="mb-5 text-[11px] uppercase tracking-[.28em] text-gold">Punya momen istimewa?</p>
          <h2 className="mx-auto max-w-[760px] font-display text-[clamp(38px,10vw,72px)] leading-none">Ceritakan, kami <em className="text-gold">rangkai</em>.</h2>
          <div className="mx-auto mt-10 flex max-w-[520px] flex-col gap-3 sm:flex-row sm:justify-center">
            <WaButton text="Halo Lucky Flowershop, saya ingin berkonsultasi tentang pesanan." className="sm:min-w-[260px]" />
            <Link to="/katalog" className="flex min-h-[60px] items-center justify-center border border-gold px-7 text-[13px] uppercase tracking-[.2em] transition-colors hover:bg-gold/10">Lihat Katalog</Link>
          </div>
        </div>
      </section>
    </>
  )
}
