import { useEffect, useMemo, useRef, useState, type ReactNode } from 'react'
import { useSearchParams } from 'react-router-dom'
import ProductCard, { ProductSkeleton } from '../components/ProductCard'
import { FIELD, PageHero, Sheet, WRAP } from '../components/ui'
import { CATEGORIES, PRODUCTS, rupiah, type Category } from '../data'
import { useStore } from '../store'

const PER_PAGE = 6
type Sort = 'relevan' | 'termurah' | 'termahal'
type Filter = Category | 'Semua'
const FILTERS: Filter[] = ['Semua', ...CATEGORIES.map((c) => c.name)]
const PRICES = [
  { label: 'Semua harga', min: '', max: '' },
  { label: '< Rp 500 rb', min: '', max: '499999' },
  { label: 'Rp 500 rb – 1 jt', min: '500000', max: '1000000' },
  { label: '> Rp 1 jt', min: '1000001', max: '' },
]

const pageList = (cur: number, n: number): (number | '…')[] => {
  if (n <= 5) return Array.from({ length: n }, (_, i) => i + 1)
  const a = [...new Set([1, n, cur - 1, cur, cur + 1])].filter((x) => x >= 1 && x <= n).sort((x, y) => x - y)
  const out: (number | '…')[] = []
  a.forEach((x, i) => { if (i && x - a[i - 1] > 1) out.push('…'); out.push(x) })
  return out
}

export default function Catalog() {
  const [params] = useSearchParams()
  const fromUrl = params.get('kategori') as Filter | null
  const { favs } = useStore()

  const [q, setQ] = useState('')
  const [cat, setCat] = useState<Filter>(fromUrl && FILTERS.includes(fromUrl) ? fromUrl : 'Semua')
  const [min, setMin] = useState('')
  const [max, setMax] = useState('')
  const [sort, setSort] = useState<Sort>('relevan')
  const [onlyFav, setOnlyFav] = useState(params.get('favorit') === '1')
  const [page, setPage] = useState(1)
  const [sheet, setSheet] = useState(false)
  const [busy, setBusy] = useState(false)
  const gridRef = useRef<HTMLDivElement>(null)
  const first = useRef(true)

  // Skeleton singkat saat filter berubah, memberi umpan balik bahwa daftar diperbarui.
  useEffect(() => {
    if (first.current) { first.current = false; return }
    setBusy(true)
    const t = setTimeout(() => setBusy(false), 320)
    return () => clearTimeout(t)
  }, [cat, min, max, sort, onlyFav])

  const list = useMemo(() => {
    const term = q.trim().toLowerCase()
    const r = PRODUCTS.filter((p) =>
      p.name.toLowerCase().includes(term) &&
      (cat === 'Semua' || p.category === cat) &&
      (!min || p.price >= Number(min)) && (!max || p.price <= Number(max)) &&
      (!onlyFav || favs.includes(p.slug)))
    if (sort === 'termurah') return [...r].sort((a, b) => a.price - b.price)
    if (sort === 'termahal') return [...r].sort((a, b) => b.price - a.price)
    return r
  }, [q, cat, min, max, sort, onlyFav, favs])

  const pages = Math.max(1, Math.ceil(list.length / PER_PAGE))
  const cur = Math.min(page, pages)
  const shown = list.slice((cur - 1) * PER_PAGE, cur * PER_PAGE)
  const upd = (fn: () => void) => { fn(); setPage(1) }
  const reset = () => upd(() => { setQ(''); setCat('Semua'); setMin(''); setMax(''); setSort('relevan'); setOnlyFav(false) })
  const goPage = (n: number) => { setPage(n); gridRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }) }

  const chips: { label: string; clear: () => void }[] = []
  if (q) chips.push({ label: `“${q}”`, clear: () => upd(() => setQ('')) })
  if (cat !== 'Semua') chips.push({ label: cat, clear: () => upd(() => setCat('Semua')) })
  if (min || max) chips.push({ label: `${min ? rupiah(Number(min)) : '…'} – ${max ? rupiah(Number(max)) : '…'}`, clear: () => upd(() => { setMin(''); setMax('') }) })
  if (onlyFav) chips.push({ label: 'Favorit saja', clear: () => upd(() => setOnlyFav(false)) })
  const filterCount = chips.length - (q ? 1 : 0)

  const renderFilters = (id: string): ReactNode => (
    <>
      <fieldset>
        <legend className="mb-3 text-[11px] font-medium uppercase tracking-[.26em] text-brass">Kategori</legend>
        {FILTERS.map((f) => (
          <label key={f} className="flex min-h-11 cursor-pointer items-center gap-3 text-base">
            <input type="radio" name={`kat-${id}`} checked={cat === f} onChange={() => upd(() => setCat(f))} className="size-[18px] accent-ink" />{f}
          </label>
        ))}
      </fieldset>
      <div className="mt-7 border-t border-line pt-6">
        <p className="mb-3 text-[11px] font-medium uppercase tracking-[.26em] text-brass">Rentang harga</p>
        <div className="mb-4 flex flex-wrap gap-2">
          {PRICES.map((p) => (
            <button key={p.label} onClick={() => upd(() => { setMin(p.min); setMax(p.max) })} aria-pressed={min === p.min && max === p.max}
              className={`min-h-10 border px-3 text-[13px] transition-colors ${min === p.min && max === p.max ? 'border-ink bg-ink text-paper' : 'border-line hover:border-ink'}`}>{p.label}</button>
          ))}
        </div>
        <div className="flex items-center gap-2.5">
          <label className="sr-only" htmlFor={`min-${id}`}>Harga minimum</label>
          <input id={`min-${id}`} inputMode="numeric" value={min} onChange={(e) => upd(() => setMin(e.target.value.replace(/\D/g, '')))} placeholder="Rp min" className={FIELD} />
          <span className="text-brass">–</span>
          <label className="sr-only" htmlFor={`max-${id}`}>Harga maksimum</label>
          <input id={`max-${id}`} inputMode="numeric" value={max} onChange={(e) => upd(() => setMax(e.target.value.replace(/\D/g, '')))} placeholder="Rp maks" className={FIELD} />
        </div>
      </div>
      <label className="mt-6 flex min-h-11 cursor-pointer items-center gap-3 border-t border-line pt-5 text-base">
        <input type="checkbox" checked={onlyFav} onChange={(e) => upd(() => setOnlyFav(e.target.checked))} className="size-[18px] accent-ink" />
        Hanya favorit ({favs.length})
      </label>
    </>
  )

  return (
    <>
      <PageHero crumb="Beranda / Katalog" title="Seluruh" accent="koleksi" text="Temukan buket, karangan bunga, dan parcel yang paling pas untuk momen Anda." />

      <section className={`${WRAP} pt-7 md:pt-10`}>
        <div className="flex flex-wrap items-center gap-3 border-b border-ink pb-5 md:gap-x-6 md:pb-7">
          <div className="flex h-12 flex-[1_1_100%] items-center gap-3 border border-ink pl-4 md:flex-[2_1_320px]">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><circle cx="11" cy="11" r="7" /><path d="M20 20l-4-4" /></svg>
            <label htmlFor="cari" className="sr-only">Cari nama produk</label>
            <input id="cari" type="search" value={q} onChange={(e) => upd(() => setQ(e.target.value))} placeholder="Cari nama produk, mis. peony"
              className="h-full min-w-0 flex-1 bg-transparent text-base outline-none" />
          </div>
          <button onClick={() => setSheet(true)} className="flex min-h-12 items-center gap-2 border border-ink px-4 text-xs uppercase tracking-[.18em] lg:hidden">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="M4 7h10M18 7h2M4 17h2M10 17h10M14 5v4M6 15v4" /></svg>
            Filter{filterCount > 0 && <span className="flex size-5 items-center justify-center rounded-full bg-ink text-[11px] text-paper">{filterCount}</span>}
          </button>
          <p className="order-last basis-full text-sm text-mute md:order-none md:flex-[1_1_200px] md:basis-auto" aria-live="polite">Menampilkan {shown.length} dari {list.length} produk</p>
          <div className="flex flex-1 items-center gap-3 md:flex-[0_1_260px]">
            <label htmlFor="urut" className="hidden whitespace-nowrap text-[10px] uppercase tracking-[.28em] md:block">Urutkan</label>
            <select id="urut" value={sort} onChange={(e) => upd(() => setSort(e.target.value as Sort))} className={FIELD}>
              <option value="relevan">Paling relevan</option>
              <option value="termurah">Harga termurah</option>
              <option value="termahal">Harga termahal</option>
            </select>
          </div>
        </div>

        {chips.length > 0 && (
          <div className="flex flex-wrap items-center gap-2 pt-4">
            {chips.map((c) => (
              <button key={c.label} onClick={c.clear} aria-label={`Hapus filter ${c.label}`} className="flex min-h-9 animate-pop items-center gap-2 bg-blush px-3 text-[13px] transition-colors hover:bg-line">
                {c.label}<span aria-hidden="true">×</span>
              </button>
            ))}
            <button onClick={reset} className="min-h-9 px-2 text-[13px] text-mute underline">Hapus semua</button>
          </div>
        )}

        <div className="flex items-start gap-12 pt-7 md:pt-9">
          <aside className="hidden w-[250px] flex-none lg:sticky lg:top-28 lg:block">{renderFilters('d')}</aside>

          <div ref={gridRef} className="min-w-0 flex-1 scroll-mt-28">
            {busy ? (
              <div className="grid grid-cols-2 gap-x-3 gap-y-8 md:grid-cols-3 md:gap-x-6 lg:grid-cols-2 xl:grid-cols-3">
                {Array.from({ length: PER_PAGE }, (_, i) => <ProductSkeleton key={i} />)}
              </div>
            ) : shown.length === 0 ? (
              <div className="border border-line p-10 text-center md:p-14">
                <p className="font-display text-3xl italic">Produk tidak ditemukan</p>
                <p className="mt-3 text-mute">Ubah kata kunci atau filter, lalu coba lagi.</p>
                <button onClick={reset} className="mt-6 min-h-12 bg-ink px-6 text-xs uppercase tracking-[.2em] text-paper">Hapus semua filter</button>
              </div>
            ) : (
              <div className="grid animate-fade grid-cols-2 gap-x-3 gap-y-8 md:grid-cols-3 md:gap-x-6 lg:grid-cols-2 xl:grid-cols-3">
                {shown.map((p) => <ProductCard key={p.slug} p={p} />)}
              </div>
            )}

            {pages > 1 && !busy && (
              <nav aria-label="Halaman" className="mt-12 flex flex-wrap items-center justify-center gap-2 border-t border-ink pt-7 md:gap-3">
                <PageBtn label="Sebelumnya" disabled={cur === 1} onClick={() => goPage(cur - 1)}>←</PageBtn>
                {pageList(cur, pages).map((n, i) => n === '…'
                  ? <span key={`e${i}`} className="px-1 text-mute">…</span>
                  : <PageBtn key={n} label={`Halaman ${n}`} active={n === cur} onClick={() => goPage(n)}>{n}</PageBtn>)}
                <PageBtn label="Berikutnya" disabled={cur === pages} onClick={() => goPage(cur + 1)}>→</PageBtn>
              </nav>
            )}
          </div>
        </div>
      </section>

      <Sheet open={sheet} onClose={() => setSheet(false)} title="Filter produk"
        footer={
          <div className="flex gap-3">
            <button onClick={reset} className="min-h-12 flex-1 border border-ink text-xs uppercase tracking-[.18em]">Atur ulang</button>
            <button onClick={() => setSheet(false)} className="min-h-12 flex-[2] bg-ink text-xs uppercase tracking-[.18em] text-paper">Tampilkan {list.length} produk</button>
          </div>
        }>
        {renderFilters('m')}
      </Sheet>
    </>
  )
}

function PageBtn({ children, label, active, disabled, onClick }: { children: string | number; label: string; active?: boolean; disabled?: boolean; onClick: () => void }) {
  return (
    <button aria-label={label} aria-current={active ? 'page' : undefined} disabled={disabled} onClick={onClick}
      className={`flex size-11 items-center justify-center rounded-full border border-ink text-[15px] transition-colors disabled:opacity-30 ${active ? 'bg-ink text-paper' : 'hover:bg-blush'}`}>
      {children}
    </button>
  )
}
