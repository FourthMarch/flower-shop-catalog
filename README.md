# 🌸 Flower Shop Catalog

Website katalog toko bunga yang elegan dan mewah, dibangun dengan **React, TypeScript, dan Tailwind CSS**. Pelanggan dapat menelusuri koleksi buket, karangan bunga, dan parcel, lalu memesan langsung lewat **WhatsApp**.

> **Status: blueprint / frontend.** Proyek ini baru berupa tampilan (frontend) dengan data contoh. Belum ada backend, database, atau pembayaran. Pemesanan dilakukan dengan membuka WhatsApp berisi pesan otomatis.

Brand contoh yang dipakai: **Lucky Flowershop** (dapat diganti di `src/data.ts`).

## Tampilan

> Tambahkan tangkapan layar ke folder `docs/screenshots/`, lalu pastikan nama file sesuai tabel di bawah.

| Beranda | Katalog |
| :---: | :---: |
| ![Beranda](docs/screenshots/Screenshot(1).png) | ![Katalog](docs/screenshots/Screenshot(2).png) |

| Detail Produk | Tentang Kami |
| :---: | :---: |
| ![Detail Produk](docs/screenshots/Screenshot(3).png) | ![Tentang Kami](docs/screenshots/Screenshot(4).png) |

| Kontak | Tampilan Mobile |
| :---: | :---: |
| ![Kontak](docs/screenshots/Screenshot(5).png) | ![Mobile](docs/screenshots/Screenshot(6).png) |

## Fitur

**Halaman**
- **Beranda:** hero, kategori, produk unggulan, keunggulan toko, dan testimoni pelanggan.
- **Katalog:** pencarian nama, filter kategori dan rentang harga, pengurutan harga, serta pagination.
- **Detail Produk:** galeri foto, harga, deskripsi, spesifikasi, dan tombol pesan via WhatsApp.
- **Tentang Kami:** cerita toko, proses kerja, tim, dan FAQ.
- **Kontak:** info toko, formulir pemesanan dengan validasi, dan lokasi.

**Pengalaman pengguna**
- Animasi pembuka bertema bunga (tangkai tumbuh, kelopak mekar, tirai terbuka), tampil sekali per sesi.
- Responsif untuk ponsel, tablet, dan desktop, termasuk menu hamburger dan panel filter dari bawah di ponsel.
- Favorit produk yang tersimpan di browser (localStorage).
- Tombol WhatsApp melayang, tombol kembali ke atas, dan indikator progres gulir.
- Animasi muncul saat digulir, carousel testimoni yang bisa digeser, dan panel lipat (accordion).
- Menghormati pengaturan *reduce motion* pada perangkat pengguna.

## Teknologi

- [React 18](https://react.dev) + [TypeScript](https://www.typescriptlang.org)
- [Tailwind CSS v4](https://tailwindcss.com)
- [Vite](https://vite.dev)
- [React Router](https://reactrouter.com)
- Font: Bodoni Moda dan Hanken Grotesk (Google Fonts)

## Menjalankan di komputer

Prasyarat: [Node.js](https://nodejs.org) 18 atau lebih baru.

```bash
git clone https://github.com/USERNAME/flower-shop-catalog.git
cd flower-shop-catalog
npm install
npm run dev
```

Buka `http://localhost:5173`. Untuk build produksi: `npm run build`, lalu `npm run preview`.

## Struktur proyek

```
flower-shop-catalog/
├── public/images/        # foto contoh (produk & situs)
├── docs/screenshots/     # tangkapan layar untuk README
└── src/
    ├── components/       # Layout, Loader, ProductCard, Testimonials, UI bersama
    ├── pages/            # Home, Catalog, ProductDetail, About, Contact
    ├── data.ts           # data toko, produk, harga, FAQ, testimoni
    ├── store.tsx         # favorit & notifikasi
    └── index.css         # tema warna, font, dan animasi
```

## Kustomisasi

- **Data toko, produk, harga, nomor WhatsApp:** `src/data.ts`. Harga di file ini hanya contoh.
- **Foto:** foto di `public/images/` adalah ilustrasi contoh buatan sendiri, bukan foto asli. Ganti dengan file bernama sama, atau ubah path di `src/data.ts` (`images` pada produk, `IMG`, `CATEGORIES`, `TESTIMONIALS`, `STEPS`).
- **Warna dan font:** blok `@theme` di `src/index.css`.
- **Animasi pembuka:** `src/components/Loader.tsx`.

## Rencana pengembangan

- [ ] Framework Laravel
- [ ] Menghubungkan data produk ke backend atau CMS
- [ ] Halaman admin untuk mengelola produk
- [ ] Keranjang dan pembayaran online
- [ ] SEO dan metadata per halaman
- [ ] Mode multi-bahasa

## Catatan

Data toko, harga, ulasan, dan nama dalam tanda kurung siku (misalnya `[Nama Pelanggan]`) adalah placeholder dan perlu diganti sebelum website dipublikasikan.
