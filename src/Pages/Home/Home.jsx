import GlobalHeader from '@/components/custom/Home/Header/GlobalHeader.jsx'
import Hero from '@/components/custom/Home/Hero/Hero.jsx'
import Features from '@/components/custom/Home/Features/Features.jsx'
import HowItWorks from '@/components/custom/Home/HowItWorks/HowItWorks.jsx'
import Footer from '@/components/custom/Home/Footer/Footer.jsx'
import Pricing from '@/components/custom/Home/Pricing/Pricing.jsx'

function Home() {
  return (
    <div className="bg-black text-white min-h-screen flex flex-col font-sans overflow-x-hidden">
      <GlobalHeader />
      <Hero />
      <Features/>
      <HowItWorks/>
      <Pricing/>
      <Footer />
    </div>
  )
}

export default Home