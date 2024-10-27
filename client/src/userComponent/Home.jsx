import React from 'react'
import Navbar from '@/partials/Navbar'
import HeroSection from './HeroSection'
import ProductCategory from './ProductCategory'
import Footer from '@/partials/Footer'

function Home() {
  return (
    <>
      <Navbar/>
      <HeroSection/>
      <ProductCategory/>
      <Footer/>
    </>
  )
}

export default Home
