import Hero from '@/components/custom/Home/Hero/Hero.jsx'
import Features from '@/components/custom/Home/Features/Features.jsx'
import HowItWorks from '@/components/custom/Home/HowItWorks/HowItWorks.jsx'
import Footer from '@/components/custom/Home/Footer/Footer.jsx'
import Pricing from '@/components/custom/Home/Pricing/Pricing.jsx'
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import GlobalHeader from '@/components/custom/Home/Header/GlobalHeader'
import SampleResume from '@/components/custom/Home/SampleResume/SampleResume'
import SandboxNotificationBadge from '@/components/custom/Home/SandboxNotificationBadge'
import { checkServerStatus } from '@/services/ApiService'

export default function Home() {
const navigate = useNavigate();
  useEffect(() => {
    checkServerHeartbeat()
  }, []);

  const getStarted = () => {
    navigate('/auth/sign-in')
  }

  const checkServerHeartbeat = async () => {
    await checkServerStatus();
  } 

  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-gray-100">
      <SandboxNotificationBadge/>
      <GlobalHeader />
      <main className="flex-1">
        <Hero />
        <Features />
        <HowItWorks />
        <SampleResume/>
         <Pricing />
        <section className="w-full py-20 md:py-32">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center space-y-8 text-center">
              <div className="space-y-4 max-w-3xl">
                <h2 className="text-5xl font-thin tracking-tighter sm:text-6xl md:text-7xl text-gray-100">
                  Ready to Build Your Perfect Resume?
                </h2>
                <p className="mx-auto max-w-[600px] text-gray-300 text-xl">
                  Join thousands of job seekers who have successfully landed their dream jobs with our AI-powered resume builder.
                </p>
              </div>
              <Button className="bg-blue-600 text-white rounded-full hover:bg-blue-700 shadow-md hover:shadow-lg transform hover:translate-y-[-2px]" onClick={() => getStarted()}>
                Get Started Now <ChevronRight className="ml-2 h-5 w-5 inline" />
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}