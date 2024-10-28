import React from 'react'
import Navbar from '@/partials/Navbar'
import { useDispatch, useSelector } from 'react-redux'
import { Badge } from '@/components/ui/badge'
import { ShoppingBag, Trash2 } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { base_url, WISHLIST_API_END_POINT } from '@/utils/constant'
import axios from 'axios'
import { removeWishlistItem } from '@/redux/wishlistSlice'

function WishlistPage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { allwishlist } = useSelector(state => state.wishlist)
    const { user } = useSelector(state => state.auth)
    const userId = user?._id;
    const wishlistData = allwishlist?.filter((wishlist) => wishlist.user?._id === userId)

    const DeleteWishlist = async (_id) => {
        try {
            const response = await axios.delete(`${WISHLIST_API_END_POINT}/delete-wishlist/${_id}`,{withCredentials:true});
            
            if (response.data.success) {
                dispatch(removeWishlistItem(_id));
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
                <h1 className='text-xl font-bold'>Wishlist History</h1>
                <hr className='bg-slate-500 h-1 mt-2' />

                {wishlistData?.length > 0 ? (
                    wishlistData.map((wishlist, index) => (
                        <div key={index} className='border-2 my-5 p-2 rounded-md'>
                            <div className='flex flex-col md:flex-row gap-4'>
                                <img src={`${base_url}/${wishlist?.product?.pic}`} className='w-32 h-32 object-cover' alt="" />
                                <div className='flex-grow'>
                                    <h1 className='font-bold'>
                                        {wishlist?.product?.name}
                                        <Badge className='ml-3' variant='ghost'>Brand: {wishlist?.product?.brand}</Badge>
                                    </h1>
                                    <span>{wishlist?.product?.description}</span>
                                    <h1 className='font-bold text-sm'>
                                        Color/Size: <span className='font-medium'>{wishlist?.product?.color}/{wishlist?.product?.size}</span>
                                    </h1>
                                    <h1 className='font-bold text-sm'>
                                        Price: <span className='font-medium'>&#8377; {wishlist?.product?.price}</span>
                                    </h1>
                                </div>
                                <div className='flex gap-3 justify-between'>
                                    <ShoppingBag
                                        onClick={() => navigate(`/product/${wishlist?.product?._id}`)}
                                        className='text-blue-600 cursor-pointer'
                                    />
                                    <Trash2 onClick={()=>DeleteWishlist(wishlist?._id)} className='text-red-600 cursor-pointer' />
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <>
                    <div className='flex flex-col items-center justify-between'>
                    <div className='text-gray-600  my-5'>Your wishlist is empty.</div>
                    <Link to='/'  className='border-2 px-4 py-2 rounded-md bg-slate-900 text-white'>Shop Now</Link>
                    </div>
                    </>
                )}
            </div>

        </div>
    )
}

export default WishlistPage

