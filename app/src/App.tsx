import { Routes, Route } from 'react-router-dom'
import { Suspense, lazy } from 'react'
import { ScrollRevealProvider } from '@/hooks/useScrollReveal'
import EmberMatrixBackground from '@/components/EmberMatrixBackground'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { Toaster } from '@/components/ui/sonner'

const Home = lazy(() => import('@/pages/Home'))
const ProductDetail = lazy(() => import('@/pages/ProductDetail'))
const Cart = lazy(() => import('@/pages/Cart'))
const Checkout = lazy(() => import('@/pages/Checkout'))
const About = lazy(() => import('@/pages/About'))
const Contacts = lazy(() => import('@/pages/Contacts'))
const Blog = lazy(() => import('@/pages/Blog'))
const BlogPost = lazy(() => import('@/pages/BlogPost'))

export default function App() {
  return (
    <div className="relative min-h-screen" style={{ backgroundColor: 'var(--charcoal)' }}>
      <EmberMatrixBackground />
      <div className="relative z-10">
        <Header />
        <ScrollRevealProvider>
          <Suspense fallback={
            <div className="flex items-center justify-center min-h-screen">
              <div className="w-12 h-12 border-4 border-[var(--flame-orange)] border-t-transparent rounded-full animate-spin" />
            </div>
          }>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/product/:slug" element={<ProductDetail />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/about" element={<About />} />
              <Route path="/contacts" element={<Contacts />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:slug" element={<BlogPost />} />
            </Routes>
          </Suspense>
        </ScrollRevealProvider>
        <Footer />
        <Toaster />
      </div>
    </div>
  )
}
