import { useCallback, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Loader from './components/Loader'
import Layout from './components/Layout'
import Floating from './components/Floating'
import { StoreProvider } from './store'
import Home from './pages/Home'
import Catalog from './pages/Catalog'
import ProductDetail from './pages/ProductDetail'
import About from './pages/About'
import Contact from './pages/Contact'

const KEY = 'lucky-loaded'

export default function App() {
  // Animasi pembuka hanya tampil sekali per sesi browser.
  const [loading, setLoading] = useState(() => !sessionStorage.getItem(KEY))
  const done = useCallback(() => { sessionStorage.setItem(KEY, '1'); setLoading(false) }, [])

  return (
    <StoreProvider>
      {loading && <Loader onDone={done} />}
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="katalog" element={<Catalog />} />
          <Route path="produk/:slug" element={<ProductDetail />} />
          <Route path="tentang" element={<About />} />
          <Route path="kontak" element={<Contact />} />
          <Route path="*" element={<p className="p-20 text-center">Halaman tidak ditemukan.</p>} />
        </Route>
      </Routes>
      <Floating />
    </StoreProvider>
  )
}
