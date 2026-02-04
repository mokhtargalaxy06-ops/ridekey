import { Route, Routes } from 'react-router-dom'
import { useEffect } from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import Bikes from './pages/Bikes'
import BikeDetails from './pages/BikeDetails'
import About from './pages/About'
import Blog from './pages/Blog'
import Contact from './pages/Contact'
import ScrollToTop from './components/ScrollToTop'
import ScrollUpButton from './components/ScrollUpButton'
import { useI18n } from './i18nContext'

export default function App() {
  const { lang, dir } = useI18n()

  useEffect(() => {
    document.documentElement.lang = lang
    document.documentElement.dir = dir
  }, [lang, dir])

  return (
    <div className="min-h-screen bg-ink text-frost">
      <Header />
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/bikes" element={<Bikes />} />
        <Route path="/bikes/:id" element={<BikeDetails />} />
        <Route path="/about" element={<About />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
      <Footer />
      <ScrollUpButton />
    </div>
  )
}
