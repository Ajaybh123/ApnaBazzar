import React, { useEffect } from 'react'
import Navbar from '@/partials/Navbar'
import { Badge } from '@/components/ui/badge'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import { base_url, CART_API_END_POINT, PRODUCT_API_END_POINT, WISHLIST_API_END_POINT } from '@/utils/constant'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'sonner'
import { setAllCart } from '@/redux/cartSlice'
import { setAllWishlist } from '@/redux/wishlistSlice'
import { setSingleItem } from '@/redux/itemSlice'




export default function ProductDetail() {
    const { _id } = useParams()
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { singleItem } = useSelector(state => state.item)
    const { user } = useSelector(state => state.auth)

    const AddToCart = async () => {
        try {
            const UserId = user?._id;
            const ProductId = singleItem?._id;
            const response = await axios.post(`${CART_API_END_POINT}/create-cart`, { user: UserId, product: ProductId }, {
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true
            });

            if (response.data.success) {
                dispatch(setAllCart(response.data.cart));
                navigate('/cart');
                toast.success(response.data.message, {
                    style: {
                        backgroundColor: '#34d399',
                    },
                });
            }
        } catch (error) {
            toast.error(error.response?.data?.message, {
                style: {
                    backgroundColor: '#c53d3d',
                },
            })
        }
    }

    const AddToWishlist = async () => {
        try {
            const UserId = user?._id;
            const ProductId = singleItem?._id;
            const response = await axios.post(`${WISHLIST_API_END_POINT}/create-wishlist`, { user: UserId, product: ProductId }, {
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true
            });

            if (response.data.success) {
                dispatch(setAllWishlist(response.data.wishlist));
                navigate('/wishlist');
                toast.success(response.data.message, {
                    style: {
                        backgroundColor: '#34d399',
                    },
                });
            }
        } catch (error) {
            toast.error(error.response?.data?.message, {
                style: {
                    backgroundColor: '#c53d3d',
                },
            })
        }
    }

    useEffect(() => {
        const fetchSingleProduct = async () => {
            try {
                const response = await axios.get(`${PRODUCT_API_END_POINT}/get-single-product/${_id}`, { withCredentials: true });
                if (response.data.success) {
                    dispatch(setSingleItem(response.data.product));
                }
            } catch (error) {
                console.log('Error fetching single product:', error);
            }
        };
        fetchSingleProduct();
    }, [_id, dispatch]);

    return (
        <div>
            <Navbar />
            <div className='flex flex-col md:flex-row gap-10 max-w-7xl mx-auto bg-gray-50 border border-gray-200 rounded-md shadow-lg my-10 p-8'>
    <div className='flex justify-center md:justify-start'>
        <img src={`${base_url}/${singleItem?.pic}`} className='w-80 h-auto' alt="" /> {/* Use h-auto to maintain aspect ratio */}
    </div>
    <div className='flex flex-col'>
        <h1 className='font-bold text-xl'>
            {singleItem?.name}
            <span className='pl-4 font-medium text-gray-800'>
                <Badge className='ml-8' variant='ghost'>Brand: {singleItem?.brand}</Badge>
            </span>
        </h1>
        <h1 className='font-bold my-1'>Main Category: <span className='pl-4 font-medium text-gray-800'>{singleItem?.maincategory}</span></h1>
        <h1 className='font-bold my-1'>Subcategory: <span className='pl-4 font-medium text-gray-800'>{singleItem?.subcategory}</span></h1>
        <h1 className='font-bold my-1'>Color/Size: <span className='pl-4 font-medium text-gray-800'>{singleItem?.color}/{singleItem?.size}</span></h1>
        <h1 className='font-bold my-1'>Stock: <span className='pl-4 font-medium text-gray-800'>{singleItem?.stock ? "Yes" : "No"}</span></h1>
        <h1 className='font-bold my-1'>Stock Quantity: <span className='pl-4 font-medium text-gray-800'>{singleItem?.stockQuantity} left</span></h1>
        <h1 className='font-bold my-1'>Description: <span className='pl-4 font-medium text-gray-800'>{singleItem?.description}</span></h1>
        <h1 className='font-bold my-1'>Price: <span className='pl-4 font-medium text-gray-800'>&#8377; {singleItem?.price}</span></h1>
        <div className='flex gap-4 mt-4 flex-wrap'>
            <Badge onClick={() => AddToWishlist()} className={'bg-green-400 px-4 py-2 cursor-pointer font-bold'} variant='ghost'>Add To Wishlist</Badge>
            <Badge onClick={() => AddToCart()} className={'bg-yellow-400 px-4 py-2 cursor-pointer font-bold'} variant='ghost'>Add To Cart</Badge>
        </div>
    </div>
</div>

        </div>
    )
}
