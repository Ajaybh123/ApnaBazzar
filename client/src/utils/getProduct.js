import { setAllItem } from '@/redux/itemSlice'
import { PRODUCT_API_END_POINT } from '@/utils/constant'
import axios from 'axios'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

export default function GetAllProducts() {
    const dispatch = useDispatch()
    useEffect(() => {
        const fetchAllProduct = async () => {
            try {
                const response = await axios.get(`${PRODUCT_API_END_POINT}/get-all-product`, { withCredentials: true })
                if (response.data.success) {
                    dispatch(setAllItem(response.data.product))
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchAllProduct();
    }, [])
}
