import React from 'react'

import '../App.css'

export default function HeroSection() {

  return (
    <div className='text-center hero-section pt-10 sm:pt-16 lg:pt-20'>
      <span className='px-3 py-2 sm:px-4 sm:py-3 rounded-full bg-gray-100 text-[#ed3a08] text-sm sm:text-base lg:text-lg'>
        Top Brand & Product
      </span>

      <h1 className='text-2xl sm:text-3xl md:text-4xl font-bold my-4 sm:my-6 lg:my-8 text-black'>
        <span className='block sm:inline'>Welcome to ApnaBazzar – Your One-Stop Online Shop</span>
      </h1>


      <p className='text-sm sm:text-base lg:text-lg text-black mb-4 sm:mb-6 lg:mb-8 mx-4 lg:mx-44 md:block hidden'>
      ApnaBazzar is an innovative e-commerce platform designed to bring a seamless shopping experience to users by offering a diverse range of products, including electronics, cosmetics, fashion, and household essentials.
      </p>
    </div>

  )
}
