import React from 'react'
import { Badge } from '../components/ui/badge'
import { useNavigate } from 'react-router-dom'
import { base_url } from '@/utils/constant';


export default function ProductCart({ product }) {
    
    const navigate = useNavigate()
    return (
        <div className='h-80 w-64 rounded-md shadow-xl border border-gray-100 hover:shadow-current flex flex-col'>
        <img
            onClick={() => navigate(`/product/${product?._id}`)}
            src={`${base_url}/${product?.pic}`}
            className='h-56 p-2 w-full object-cover rounded-md cursor-pointer'
            alt="image"
        />
        <div className='mx-4 font-bold flex-grow'>
            <h1 className='text-sm truncate'>{product?.name}</h1>
        </div>
        <div className='flex items-center justify-between gap-2 mx-4 mb-3'>
            <span className='font-semibold'>&#8377; {product?.price}</span>
            <Badge onClick={() => navigate(`/product/${product?._id}`)} className={'bg-yellow-400 px-4 py-2 cursor-pointer'} variant='ghost'>Add To Cart</Badge>
        </div>
    </div>
    
    )
}
