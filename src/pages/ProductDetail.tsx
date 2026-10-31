import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Photo, WRAP, WaButton } from '../components/ui'
import { GRADS, PRODUCTS, rupiah } from '../data'

type Shot = { image?: string; gradient?: string }

export default function ProductDetail() {
  const { slug } = useParams()
  const p = PRODUCTS.find((x) => x.slug === slug)
  const [active, setActive] = useState(0)

  if (!p) {
    return (
      <section className={`${WRAP} py-32 text-center`}>
        <h1 className="font-display text-4xl italic">Produk tidak ditemukan</h1>
        <Link to="/katalog" className="mt-6 inline-block underline">Kembali ke katalog</Link>
      </section>
    )
  }

  // Pakai foto asli jika ada (p.images), jika belum tampilkan placeholder.
  const shots: Shot[] = p.images?.length
    ? p.images.map((image) => ({ image }))
    : [p.gradient, GRADS.rose, GRADS.gold, GRADS.sage].map((gradient) => ({ gradient }))

  const specs = [
    ['Ukuran', '[Ukuran produk]'],
    ['Isi rangkaian', '[Jenis dan jumlah bunga]'],
    ['Kartu ucapan', 'Gratis, sesuai pesan Anda'],
    ['Pemesanan', '[Lead time pemesanan]'],
  ]

  return (
    <section className={`${WRAP} pt-6 md:pt-9`}>
      <p className="mb-6 text-[13px] text-mute md:mb-9">
        <Link to="/katalog" className="underline">Katalog</Link> / <Link to={`/katalog?kategori=${encodeURIComponent(p.category)}`} className="underline">{p.category}</Link> / {p.name}
      </p>

      <div className="flex flex-wrap items-start gap-x-16 gap-y-10">
        <div className="min-w-0 flex-[1.1_1_440px]">
          <div key={active} className="animate-fade">
            <Photo label="Foto utama produk" {...shots[active]} className="h-[420px] w-full md:h-[640px]" />
          </div>
          {shots.length > 1 && (
            <div className="mt-3 flex gap-2 md:gap-3">
              {shots.map((s, i) => (
                <button key={i} onClick={() => setActive(i)} aria-label={`Foto ${i + 1}`} aria-pressed={active === i}
                  className={`h-20 min-w-0 flex-1 overflow-hidden border transition-colors md:h-24 ${active === i ? 'border-ink' : 'border-transparent hover:border-line'}`}>
                  {s.image
                    ? <img src={s.image} alt="" className="size-full object-cover" />
                    : <span className="block size-full" style={{ background: s.gradient }} />}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="min-w-0 flex-[1_1_400px]">
          <p className="mb-4 text-[11px] uppercase tracking-[.28em] text-brass">{p.category}</p>
          <h1 className="font-display text-[clamp(40px,9vw,72px)] leading-none tracking-tight md:text-[clamp(44px,5vw,72px)]">{p.name}</h1>
          <p className="mt-6 font-display text-3xl italic text-brass md:mt-7 md:text-4xl">{rupiah(p.price)}</p>
          <p className="mt-7 text-base leading-[1.8] text-[#3F2B28] md:mt-8 md:text-[17px]">{p.description}</p>

          <dl className="mb-9 mt-8 border-b border-line md:mb-10 md:mt-9">
            {specs.map(([k, v]) => (
              <div key={k} className="flex justify-between gap-5 border-t border-line py-3.5 text-[15px]">
                <dt className="text-mute">{k}</dt><dd className="text-right">{v}</dd>
              </div>
            ))}
          </dl>

          <WaButton text={`Halo Lucky Flowershop, saya ingin memesan ${p.name} (${rupiah(p.price)}).`} />
          <p className="mt-3.5 text-center text-[13px] leading-relaxed text-mute">Anda akan diarahkan ke WhatsApp dengan pesan otomatis berisi nama produk ini.</p>

          <ul className="mt-8 space-y-3 bg-blush px-6 py-6 text-[15px] md:mt-9 md:px-7">
            <li>◆&nbsp; Bunga segar, dirangkai saat dipesan</li>
            <li>◆&nbsp; Desain dapat disesuaikan permintaan</li>
            <li>◆&nbsp; Pengiriman tepat waktu dengan foto konfirmasi</li>
          </ul>
        </div>
      </div>
    </section>
  )
}
