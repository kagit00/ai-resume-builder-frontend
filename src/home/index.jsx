import Features from '@/components/custom/features';
import Footer from '@/components/custom/footer';
import Header from '@/components/custom/header';
import Hero from '@/components/custom/hero';
import HowItWorks from '@/components/custom/howItWorks';
import Pricing from '@/components/custom/pricing';
import React, { useState } from 'react'




function HomePage() {
  return (
    <div className="bg-black text-white min-h-screen flex flex-col font-sans overflow-x-hidden">
      <Header />
      <Hero />
      <Features/>
      <HowItWorks/>
      <Pricing/>
      <Footer />
    </div>
  )
}

export default HomePage