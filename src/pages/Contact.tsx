import { useState, type FormEvent } from 'react'
import { CATEGORIES, FAQ, SHOP, waLink } from '../data'
import { Accordion, Eyebrow, FIELD, PageHero, WRAP, WaButton } from '../components/ui'
import { useStore } from '../store'

const LABEL = 'mb-2 block text-[11px] uppercase tracking-[.22em] text-mute'
type Errors = Partial<Record<'nama' | 'wa', string>>

function CopyRow({ title, lines }: { title: string; lines: string[] }) {
  const { toast } = useStore()
  const copy = async () => {
    try { await navigator.clipboard.writeText(lines.join('\n')); toast(`${title} disalin`) } catch { toast('Tidak bisa menyalin') }
  }
  return (
    <div className="flex items-start justify-between gap-4 border-t border-line py-5 last:border-b md:py-6">
      <div className="min-w-0">
        <Eyebrow>{title}</Eyebrow>
        <p className="mt-2 break-words text-base leading-relaxed md:text-[17px]">{lines.map((l) => <span key={l} className="block">{l}</span>)}</p>
      </div>
      <button onClick={copy} aria-label={`Salin ${title}`} className="flex min-h-11 flex-none items-center gap-2 px-2 text-[11px] uppercase tracking-[.18em] text-brass hover:text-ink">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><rect x="8" y="8" width="12" height="12" rx="1" /><path d="M16 8V5a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h3" /></svg>Salin
      </button>
    </div>
  )
}

export default function Contact() {
  const [f, setF] = useState({ nama: '', wa: '', jenis: CATEGORIES[0].name as string, tgl: '', pesan: '' })
  const [err, setErr] = useState<Errors>({})
  const [sent, setSent] = useState(false)
  const set = (k: keyof typeof f) => (e: { target: { value: string } }) => { setF({ ...f, [k]: e.target.value }); if (k in err) setErr({ ...err, [k]: undefined }) }

  const submit = (e: FormEvent) => {
    e.preventDefault()
    const errors: Errors = {}
    if (f.nama.trim().length < 2) errors.nama = 'Masukkan nama Anda.'
    if (!/^(\+?62|0)8\d{7,12}$/.test(f.wa.replace(/[\s-]/g, ''))) errors.wa = 'Nomor WhatsApp tidak valid. Contoh: 0812 3456 7890.'
    setErr(errors)
    if (Object.keys(errors).length) { document.getElementById(errors.nama ? 'nama' : 'wa')?.focus(); return }
    const text = `Halo ${SHOP.name}, saya ${f.nama} (${f.wa}). Saya ingin memesan ${f.jenis}${f.tgl ? ` untuk tanggal ${f.tgl}` : ''}.\n\n${f.pesan}`
    window.open(waLink(text), '_blank', 'noopener')
    setSent(true)
  }

  return (
    <>
      <PageHero crumb="Beranda / Kontak" title="Hubungi" accent="kami" text="Konsultasikan pesanan Anda. Kami siap membantu memilih rangkaian yang tepat." />

      <section className={`${WRAP} pt-12 md:pt-20`}>
        <div className="flex flex-wrap items-start gap-x-16 gap-y-12">
          <div className="min-w-0 flex-[1_1_360px]">
            <WaButton text="Halo Lucky Flowershop, saya ingin bertanya." label="Chat via WhatsApp" />
            <p className="mb-8 mt-3 text-center text-[13px] text-mute">Respons tercepat untuk pemesanan dan konsultasi.</p>
            <CopyRow title="Alamat toko" lines={SHOP.address} />
            <CopyRow title="Telepon" lines={[SHOP.phone]} />
            <CopyRow title="Email" lines={[SHOP.email]} />
            <div className="border-t border-line py-5 last:border-b md:py-6">
              <Eyebrow>Jam buka</Eyebrow>
              <dl className="mt-2 text-base md:text-[17px]">{SHOP.hours.map((h) => <div key={h.day} className="flex justify-between gap-4 py-0.5"><dt>{h.day}</dt><dd>{h.time}</dd></div>)}</dl>
            </div>
          </div>

          <div className="min-w-0 flex-[1.2_1_440px] border border-ink bg-[#FBF5F0] p-6 md:p-12">
            {sent ? (
              <div className="animate-fade py-8 text-center md:py-12">
                <span className="mx-auto flex size-16 items-center justify-center rounded-full bg-gold text-3xl text-wine">✓</span>
                <h2 className="mt-6 font-display text-4xl italic">Pesan siap dikirim</h2>
                <p className="mx-auto mt-3 max-w-[320px] text-mute">WhatsApp dibuka di tab baru. Tekan kirim di sana untuk menyelesaikan pesanan.</p>
                <button onClick={() => { setSent(false); setF({ nama: '', wa: '', jenis: CATEGORIES[0].name, tgl: '', pesan: '' }) }} className="mt-8 min-h-12 border border-ink px-6 text-xs uppercase tracking-[.2em] transition-colors hover:bg-ink hover:text-paper">Buat pesan baru</button>
              </div>
            ) : (
              <form onSubmit={submit} noValidate>
                <Eyebrow>Formulir pemesanan</Eyebrow>
                <h2 className="mt-3.5 font-display text-[clamp(32px,8vw,48px)] leading-tight md:text-5xl">Kirim <em>pesan</em></h2>
                <div className="mt-8 flex flex-col gap-5 md:mt-9">
                  <div>
                    <label className={LABEL} htmlFor="nama">Nama lengkap</label>
                    <input id="nama" value={f.nama} onChange={set('nama')} autoComplete="name" aria-invalid={!!err.nama} aria-describedby="e-nama" placeholder="Nama Anda" className={`${FIELD} ${err.nama ? 'border-[#9B2335]' : ''}`} />
                    {err.nama && <p id="e-nama" className="mt-1.5 animate-fade text-sm text-[#9B2335]">{err.nama}</p>}
                  </div>
                  <div>
                    <label className={LABEL} htmlFor="wa">Nomor WhatsApp</label>
                    <input id="wa" type="tel" value={f.wa} onChange={set('wa')} autoComplete="tel" aria-invalid={!!err.wa} aria-describedby="e-wa" placeholder="08xx xxxx xxxx" className={`${FIELD} ${err.wa ? 'border-[#9B2335]' : ''}`} />
                    {err.wa && <p id="e-wa" className="mt-1.5 animate-fade text-sm text-[#9B2335]">{err.wa}</p>}
                  </div>
                  <fieldset>
                    <legend className={LABEL}>Jenis pesanan</legend>
                    <div className="flex flex-wrap gap-2">
                      {CATEGORIES.map((c) => (
                        <label key={c.name} className="cursor-pointer border border-ink px-4 py-3 text-sm transition-colors has-checked:bg-ink has-checked:text-paper has-focus-visible:ring-2 has-focus-visible:ring-gold">
                          <input type="radio" name="jenis" className="sr-only" checked={f.jenis === c.name} onChange={() => setF({ ...f, jenis: c.name })} />{c.name}
                        </label>
                      ))}
                    </div>
                  </fieldset>
                  <div>
                    <label className={LABEL} htmlFor="tgl">Tanggal dibutuhkan</label>
                    <input id="tgl" type="date" min={new Date().toISOString().slice(0, 10)} value={f.tgl} onChange={set('tgl')} className={FIELD} />
                  </div>
                  <div>
                    <label className={LABEL} htmlFor="pesan">Pesan</label>
                    <textarea id="pesan" value={f.pesan} onChange={set('pesan')} placeholder="Ceritakan kebutuhan, warna, atau ucapan yang diinginkan"
                      className="min-h-32 w-full resize-y border border-ink bg-transparent px-4 py-3.5 text-base outline-none focus-visible:ring-2 focus-visible:ring-gold" />
                  </div>
                  <button type="submit" className="min-h-14 bg-ink text-xs uppercase tracking-[.24em] text-paper transition-all hover:bg-wine active:scale-[.99]">Kirim lewat WhatsApp</button>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>

      <section className={`${WRAP} pt-20 md:pt-28`}>
        <div className="flex flex-wrap gap-x-16 gap-y-8">
          <div className="flex-[1_1_300px]"><Eyebrow>Pertanyaan umum</Eyebrow><h2 className="mt-4 font-display text-[clamp(34px,8vw,52px)] leading-tight md:text-5xl">Cara <em>memesan</em></h2></div>
          <div className="flex-[2_1_480px]"><Accordion items={FAQ.map((x) => ({ q: x.q, a: x.a }))} /></div>
        </div>
      </section>

      <section className={`${WRAP} pt-20 md:pt-28`}>
        <h2 className="mb-8 font-display text-[clamp(34px,8vw,56px)] leading-tight md:mb-10 md:text-[clamp(34px,4vw,56px)]">Kunjungi <em className="text-brass">toko</em> kami</h2>
        <div className="relative flex h-[320px] items-center justify-center px-6 text-center text-[10px] uppercase tracking-[.2em] md:h-[440px]"
          style={{ background: 'repeating-linear-gradient(45deg,#E5D0C6 0 28px,#EBD9D0 28px 56px)' }}>
          [ Peta lokasi toko: tempel embed Google Maps di sini ]
          <div className="absolute inset-x-4 bottom-4 bg-wine p-5 text-left text-sm normal-case leading-relaxed tracking-normal text-paper md:inset-x-auto md:bottom-8 md:left-8 md:max-w-[280px] md:p-6">
            <span className="mb-1 block font-display text-2xl italic">{SHOP.name}</span>
            {SHOP.address.map((a) => <span key={a} className="block">{a}</span>)}
          </div>
        </div>
      </section>
    </>
  )
}
