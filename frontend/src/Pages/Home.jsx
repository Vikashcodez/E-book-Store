import React from 'react'
import HeroSection from '../components/Hero'
import SalesTimerRibbon from '../components/Ribon'
import BookStoreSection from '../components/amazonbooks'
import EbookStoreSection from '../components/ebooks'

const Home = () => {
  return (
    <>
      <HeroSection />
      <SalesTimerRibbon />
      <BookStoreSection />
      <EbookStoreSection />
    </>
  )
}

export default Home