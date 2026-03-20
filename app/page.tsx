import Navbar from '@/components/ui/Navbar'
import Hero from '@/components/sections/Hero'
import BurgerStory from '@/components/sections/BurgerStory'
import BobaStory from '@/components/sections/BobaStory'
import OurStory from '@/components/sections/OurStory'
import Menu from '@/components/sections/Menu'
import Hours from '@/components/sections/Hours'
import Contact from '@/components/sections/Contact'
import Footer from '@/components/sections/Footer'

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <BurgerStory />
        <BobaStory />
        <OurStory />
        <Menu />
        <Hours />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
