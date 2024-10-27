import Navbar from '@/partials/Navbar'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Badge } from '@/components/ui/badge'
import { Trash2 } from 'lucide-react'
import { base_url, CART_API_END_POINT } from '@/utils/constant'
import { removeCartItem } from '@/redux/cartSlice'
import axios from 'axios'



function CartPage() {
    const dispatch = useDispatch()
    const { allCart } = useSelector(state => state.cart)
    const { user } = useSelector(state => state.auth)
    const userId = user?._id;
    const cartData = allCart?.filter((cart) => cart.user?._id === userId)

    const DeleteCart = async (_id) => {
        try {
            const response = await axios.delete(`${CART_API_END_POINT}/delete-cart/${_id}`,{withCredentials:true});
            
            if (response.data.success) {
                dispatch(removeCartItem(_id));
                alert("Record deleted successfully");
            } else {
                alert("Failed to delete the record");
            }
        } catch (error) {
            console.error("Error deleting the record:", error);
            alert("Internal Server Error");
        }
    };

    return (
        <div>
            <Navbar />
            <div className='max-w-7xl mx-auto bg-gray-50 border border-gray-200 rounded-md shadow-lg my-10 py-4 px-4'>
                <h1 className='text-xl font-bold'>Cart History</h1>
                <hr className='bg-slate-500 h-1 mt-2' />

                {cartData?.length > 0 ? (
                    cartData.map((cart, index) => (
                        <div key={index} className='border-2 my-5 p-2 rounded-md'>
                            <div className='flex flex-col md:flex-row gap-4'>
                                <img src={`${base_url}/${cart?.product?.pic}`} className='w-32 h-32 object-cover' alt="" />
                                <div className='flex-grow'>
                                    <h1 className='font-bold'>
                                        {cart?.product?.name}
                                        <Badge className='ml-3' variant='ghost'>Brand: {cart?.product?.brand}</Badge>
                                    </h1>
                                    <span>{cart?.product?.description}</span>
                                    <h1 className='font-bold text-sm'>Color/Size: <span className='font-medium'>{cart?.product?.color}/{cart?.product?.size}</span></h1>
                                    <h1 className='font-bold text-sm'>Price: <span className='font-medium'>&#8377; {cart?.product?.price}</span></h1>
                                </div>
                                <Trash2 onClick={()=>DeleteCart(cart?._id)} className='text-red-600 mt-2 md:mt-0 cursor-pointer' />
                            </div>
                        </div>
                    ))
                ) : (
                    <div className='text-gray-600 text-center my-5'>Your cart is empty.</div>
                )}
            </div>

        </div>
    )
}

export default CartPage

