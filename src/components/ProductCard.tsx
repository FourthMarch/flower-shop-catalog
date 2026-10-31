import { Link } from 'react-router-dom'
import { HeartButton, Photo } from './ui'
import { rupiah, type Product } from '../data'

export default function ProductCard({ p }: { p: Product }) {
  return (
    <article className="group">
      <div className="relative overflow-hidden">
        <Link to={`/produk/${p.slug}`} className="block" aria-label={`Lihat ${p.name}`}>
          <Photo label="Foto produk" gradient={p.gradient} image={p.images?.[0]} className="aspect-[4/5] w-full transition-transform duration-700 group-hover:scale-105" />
        </Link>
        <HeartButton slug={p.slug} className="absolute right-2.5 top-2.5" />
        <span aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 translate-y-full bg-wine/90 py-3 text-center text-[11px] uppercase tracking-[.22em] text-paper transition-transform duration-300 group-hover:translate-y-0 max-md:hidden">
          Lihat detail
        </span>
      </div>
      <p className="mb-1 mt-3.5 text-[10px] uppercase tracking-[.24em] text-brass md:mt-4">{p.category}</p>
      <h3 className="font-display text-lg leading-tight md:text-[23px]"><Link to={`/produk/${p.slug}`}>{p.name}</Link></h3>
      <div className="mt-3 flex items-center justify-between gap-2 border-t border-line pt-3">
        <strong className="text-sm font-medium md:text-[15px]">{rupiah(p.price)}</strong>
        <Link to={`/produk/${p.slug}`} className="hidden min-h-11 items-center border border-ink px-4 text-[11px] uppercase tracking-[.22em] transition-colors hover:bg-ink hover:text-paper min-[520px]:inline-flex">Detail</Link>
      </div>
    </article>
  )
}

export function ProductSkeleton() {
  return (
    <div aria-hidden="true">
      <div className="aspect-[4/5] animate-shimmer bg-linear-to-r from-blush via-paper to-blush bg-[length:200%_100%]" />
      <div className="mt-4 h-3 w-1/3 bg-blush" />
      <div className="mt-3 h-5 w-3/4 bg-blush" />
      <div className="mt-4 h-4 w-1/2 bg-blush" />
    </div>
  )
}
