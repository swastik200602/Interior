import { Outlet } from 'react-router-dom'
import Footer from './Footer'
import Navbar from './Navbar'

function SiteLayout() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  )
}

export default SiteLayout
