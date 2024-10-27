import React from 'react'
import GetAllProducts from '@/utils/getProduct';
import { useSelector } from 'react-redux';
import ProductCart from './ProductCart';

export default function ProductCategory() {
  GetAllProducts();
   const { allItems } = useSelector((state) => state.item);

  return (
    <div className='max-w-7xl mx-auto my-10 px-4'>
      <h1 className='text-2xl sm:text-3xl font-bold'>
        <span className='text-[#50E3C2]'>Latest</span> & <span className='text-[#50E3C2]'>Top</span> Products
      </h1>

      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 my-5'>
        {
          allItems?.length <= 0 ? (
            <span>No product Available</span>
          ) : (
            allItems?.slice(0, 8).map((product) => (
            <ProductCart key={product?._id} product={product} />
            ))
          )
        }
      </div>
    </div>

  )
}
