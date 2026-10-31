import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from 'react'

interface Store { favs: string[]; toggleFav: (slug: string) => void; toast: (text: string) => void }
const Ctx = createContext<Store | null>(null)

export function useStore() {
  const c = useContext(Ctx)
  if (!c) throw new Error('StoreProvider belum dipasang')
  return c
}

export function StoreProvider({ children }: { children: ReactNode }) {
  const [favs, setFavs] = useState<string[]>(() => {
    try { return JSON.parse(localStorage.getItem('lucky-favs') ?? '[]') } catch { return [] }
  })
  const [toasts, setToasts] = useState<{ id: number; text: string }[]>([])

  useEffect(() => { try { localStorage.setItem('lucky-favs', JSON.stringify(favs)) } catch { /* abaikan */ } }, [favs])

  const toast = useCallback((text: string) => {
    const id = Date.now() + Math.random()
    setToasts((t) => [...t, { id, text }])
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 2400)
  }, [])

  const toggleFav = useCallback((slug: string) => {
    const on = favs.includes(slug)
    setFavs(on ? favs.filter((x) => x !== slug) : [...favs, slug])
    toast(on ? 'Dihapus dari favorit' : 'Disimpan ke favorit')
  }, [favs, toast])

  return (
    <Ctx.Provider value={{ favs, toggleFav, toast }}>
      {children}
      <div aria-live="polite" className="pointer-events-none fixed inset-x-0 bottom-24 z-[80] flex flex-col items-center gap-2 px-4 md:bottom-8">
        {toasts.map((t) => (
          <div key={t.id} className="animate-rise bg-wine px-5 py-3 text-sm text-paper shadow-lg">{t.text}</div>
        ))}
      </div>
    </Ctx.Provider>
  )
}
