export type Category = 'Buket' | 'Karangan Bunga' | 'Parcel'

export interface Product {
  slug: string
  name: string
  category: Category
  /** Harga dalam rupiah. NILAI CONTOH, ganti dengan harga asli. */
  price: number
  description: string
  gradient: string
  /** Foto produk. Foto pertama jadi foto sampul di kartu & katalog. */
  images?: string[]
}

export const SHOP = {
  name: 'Lucky Flowershop',
  whatsapp: '62XXXXXXXXXX', // ganti dengan nomor WhatsApp, format 62...
  phone: '[Nomor telepon]',
  email: '[Alamat email]',
  address: ['[Alamat lengkap toko]', '[Kota, Provinsi]'],
  hours: [
    { day: 'Senin – Sabtu', time: '[Jam buka]' },
    { day: 'Minggu', time: '[Jam buka]' },
  ],
}

export const waLink = (text: string) =>
  `https://wa.me/${SHOP.whatsapp}?text=${encodeURIComponent(text)}`

export const rupiah = (n: number) =>
  new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(n)

export const GRADS = {
  rose: 'linear-gradient(170deg,#F2D0CF,#B9626F 70%,#6B1F33)',
  gold: 'linear-gradient(170deg,#EBDDB8,#B58E4B 70%,#5B4220)',
  sage: 'linear-gradient(170deg,#DCE2D2,#76906F 70%,#2F4631)',
  blush: 'linear-gradient(170deg,#F6E3DA,#D08E86 70%,#7C3340)',
  moss: 'linear-gradient(170deg,#E6E0CC,#A4A079 70%,#4A4A2C)',
  sand: 'linear-gradient(170deg,#EADFD0,#B79A78 70%,#5A4129)',
  lilac: 'linear-gradient(170deg,#E7DCEB,#9C7DA8 70%,#41274D)',
  ivory: 'linear-gradient(170deg,#F0E8E4,#C8BDB6 70%,#6A5C58)',
  amber: 'linear-gradient(170deg,#F4D9B8,#D98C4F 70%,#7A3A17)',
  hero: 'radial-gradient(ellipse at 30% 30%,#F4CFC9 0,#C8707E 32%,#6B1F33 68%,#2A0D16 100%)',
  peony: 'radial-gradient(ellipse at 60% 35%,#F7E3D8 0,#D8A08F 35%,#8E3F4C 75%,#3C1420 100%)',
}

export const CATEGORIES: { name: Category; blurb: string; gradient: string; image: string }[] = [
  { name: 'Buket', blurb: 'Genggaman kecil yang berkesan.', gradient: GRADS.rose, image: '/images/site/category-buket.jpg' },
  { name: 'Karangan Bunga', blurb: 'Papan & standing flower untuk hari besar.', gradient: GRADS.gold, image: '/images/site/category-karangan.jpg' },
  { name: 'Parcel', blurb: 'Bunga, hadiah, dan cerita dalam satu kotak.', gradient: GRADS.sage, image: '/images/site/category-parcel.jpg' },
]

const desc = 'Dirangkai tangan pada hari pemesanan dengan bunga segar pilihan. Warna dan isi dapat disesuaikan, tergantung ketersediaan. [Ganti dengan deskripsi produk.]'

export const PRODUCTS: Product[] = [
  { slug: 'royal-peony-bouquet', name: 'Royal Peony Bouquet', category: 'Buket', price: 350000, gradient: GRADS.peony, images: ['/images/products/royal-peony-bouquet-1.jpg', '/images/products/royal-peony-bouquet-2.jpg'],
    description: 'Buket peony merah muda lembut berpadu daun hijau segar, dibungkus kertas pilihan dan diikat pita satin. Pilihan elegan untuk ulang tahun, anniversary, atau ucapan terima kasih.' },
  { slug: 'golden-congratulation', name: 'Golden Congratulation', category: 'Karangan Bunga', price: 1200000, gradient: GRADS.gold, images: ['/images/products/golden-congratulation-1.jpg', '/images/products/golden-congratulation-2.jpg'], description: desc },
  { slug: 'hamper-lucky', name: 'Hamper Lucky', category: 'Parcel', price: 650000, gradient: GRADS.sage, images: ['/images/products/hamper-lucky-1.jpg', '/images/products/hamper-lucky-2.jpg'], description: desc },
  { slug: 'rose-blanc-bouquet', name: 'Rose Blanc Bouquet', category: 'Buket', price: 450000, gradient: GRADS.blush, images: ['/images/products/rose-blanc-bouquet-1.jpg', '/images/products/rose-blanc-bouquet-2.jpg'], description: desc },
  { slug: 'emerald-grace-stand', name: 'Emerald Grace Stand', category: 'Karangan Bunga', price: 1500000, gradient: GRADS.moss, images: ['/images/products/emerald-grace-stand-1.jpg', '/images/products/emerald-grace-stand-2.jpg'], description: desc },
  { slug: 'gift-box-blossom', name: 'Gift Box Blossom', category: 'Parcel', price: 550000, gradient: GRADS.sand, images: ['/images/products/gift-box-blossom-1.jpg', '/images/products/gift-box-blossom-2.jpg'], description: desc },
  { slug: 'lavender-reverie', name: 'Lavender Reverie', category: 'Buket', price: 400000, gradient: GRADS.lilac, images: ['/images/products/lavender-reverie-1.jpg', '/images/products/lavender-reverie-2.jpg'], description: desc },
  { slug: 'ivory-condolence', name: 'Ivory Condolence', category: 'Karangan Bunga', price: 1100000, gradient: GRADS.ivory, images: ['/images/products/ivory-condolence-1.jpg', '/images/products/ivory-condolence-2.jpg'], description: desc },
  { slug: 'sunrise-tulip', name: 'Sunrise Tulip', category: 'Buket', price: 380000, gradient: GRADS.amber, images: ['/images/products/sunrise-tulip-1.jpg', '/images/products/sunrise-tulip-2.jpg'], description: desc },
]

export const TESTIMONIALS = [
  { quote: '[Ulasan pelanggan tentang kualitas bunga yang segar dan rangkaian yang rapi.]', name: '[Nama Pelanggan]', city: '[Kota]', g1: GRADS.rose, g2: GRADS.gold, i1: '/images/site/testi-1a.jpg', i2: '/images/site/testi-1b.jpg' },
  { quote: '[Ulasan pelanggan tentang desain custom yang sesuai permintaan.]', name: '[Nama Pelanggan]', city: '[Kota]', g1: GRADS.sage, g2: GRADS.lilac, i1: '/images/site/testi-2a.jpg', i2: '/images/site/testi-2b.jpg' },
  { quote: '[Ulasan pelanggan tentang pengiriman yang tepat waktu dan pelayanan ramah.]', name: '[Nama Pelanggan]', city: '[Kota]', g1: GRADS.amber, g2: GRADS.blush, i1: '/images/site/testi-3a.jpg', i2: '/images/site/testi-3b.jpg' },
]

export const STEPS = [
  { t: 'Memilih', d: 'Bunga dipilih langsung setiap pagi dari pemasok terpercaya. Hanya kuntum terbaik yang masuk ke rangkaian Anda.', g: GRADS.sage, img: '/images/site/step-1.jpg' },
  { t: 'Merangkai', d: 'Florist kami merangkai tangan sesuai desain dan permintaan Anda, dari warna hingga ukuran.', g: GRADS.rose, img: '/images/site/step-2.jpg' },
  { t: 'Mengemas', d: 'Rangkaian dikemas rapi dengan kertas, pita, dan kartu ucapan yang Anda tulis.', g: GRADS.gold, img: '/images/site/step-3.jpg' },
  { t: 'Mengantar', d: 'Diantar tepat waktu ke lokasi acara, lengkap dengan foto konfirmasi saat bunga tiba.', g: GRADS.lilac, img: '/images/site/step-4.jpg' },
]

export const FAQ = [
  { q: 'Berapa lama pemesanan harus dilakukan sebelum acara?', a: '[Isi dengan lead time pemesanan, mis. minimal H-1 untuk buket dan H-2 untuk karangan bunga.]' },
  { q: 'Apakah warna dan isi rangkaian bisa disesuaikan?', a: 'Bisa. Ceritakan warna dan suasana yang Anda inginkan, kami sesuaikan dengan ketersediaan bunga.' },
  { q: 'Bagaimana area dan biaya pengiriman?', a: '[Isi dengan area jangkauan dan tarif pengiriman.]' },
  { q: 'Bagaimana cara pembayaran?', a: '[Isi dengan metode pembayaran, mis. transfer bank atau e-wallet.]' },
]

/** Foto situs (hero, tentang kami, tim). Ganti dengan foto asli Anda. */
export const IMG = {
  hero: '/images/site/hero.jpg',
  about: '/images/site/about.jpg',
  team: ['/images/site/team-1.jpg', '/images/site/team-2.jpg', '/images/site/team-3.jpg'],
}
