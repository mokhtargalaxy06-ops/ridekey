import { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import ScrollUpButton from './components/ScrollUpButton'
import ScrollToTop from './components/ScrollToTop'
import { useI18n } from './i18nContext'
import Home from './pages/Home'
import Bikes from './pages/Bikes'
import Rentals from './pages/Rentals'
import About from './pages/About'
import Blog from './pages/Blog'
import Contact from './pages/Contact'
import BikeDetails from './pages/BikeDetails'
import Rides from './pages/Rides'

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
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/bikes" element={<Bikes />} />
          <Route path="/bikes/:id" element={<BikeDetails />} />
          <Route path="/rentals" element={<Rentals />} />
          <Route path="/rides" element={<Rides />} />
          <Route path="/about" element={<About />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>
      <Footer />
      <ScrollUpButton />
    </div>
  )
}
