import { Suspense, lazy, useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import ScrollUpButton from './components/ScrollUpButton'
import ScrollToTop from './components/ScrollToTop'
import {
  LocalBusinessJsonLd,
  RentalServiceJsonLd,
  SeoFaqJsonLd,
  WebsiteJsonLd,
} from './components/JsonLd'
import { useI18n } from './i18nContext'

const Home = lazy(() => import('./pages/Home'))
const Bikes = lazy(() => import('./pages/Bikes'))
const Rentals = lazy(() => import('./pages/Rentals'))
const About = lazy(() => import('./pages/About'))
const Blog = lazy(() => import('./pages/Blog'))
const BlogPost = lazy(() => import('./pages/BlogPost'))
const Contact = lazy(() => import('./pages/Contact'))
const BikeDetails = lazy(() => import('./pages/BikeDetails'))
const Rides = lazy(() => import('./pages/Rides'))
const Dashboard = lazy(() => import('./pages/Dashboard'))

export default function App() {
  const { lang, dir } = useI18n()

  useEffect(() => {
    document.documentElement.lang = lang
    document.documentElement.dir = dir
  }, [lang, dir])

  return (
    <div className="min-h-screen bg-ink text-frost">
      <LocalBusinessJsonLd />
      <WebsiteJsonLd />
      <RentalServiceJsonLd />
      <SeoFaqJsonLd />
      <Header />
      <ScrollToTop />
      <main>
        <Suspense
          fallback={
            <div className="mx-auto max-w-6xl px-6 pb-24 pt-32 text-sm text-slate-300">
              Loading RideKey...
            </div>
          }
        >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/bikes" element={<Bikes />} />
            <Route path="/bikes/:id" element={<BikeDetails />} />
            <Route path="/rentals" element={<Rentals />} />
            <Route path="/rides" element={<Rides />} />
            <Route path="/about" element={<About />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:id" element={<BlogPost />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
      <ScrollUpButton />
    </div>
  )
}
