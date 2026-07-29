import { Outlet } from 'react-router-dom'
import Footer from './Footer'
import Navbar from './Navbar'
import { lazy, Suspense } from 'react'

const DesignChatbot = lazy(() => import('../chatbot/DesignChatbot'))

function SiteLayout() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <Outlet />
      <Footer />
      <Suspense fallback={null}><DesignChatbot /></Suspense>
    </div>
  )
}

export default SiteLayout
