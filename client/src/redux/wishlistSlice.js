import { createSlice } from "@reduxjs/toolkit";

const wishlistSlice = createSlice({
    name: "wishlist",
    initialState: {
        allwishlist: [],
    },
    reducers: {
       
        setAllWishlist: (state, action) => {
            if (Array.isArray(action.payload)) {
                state.allwishlist.push(...action.payload);
            } else {
                state.allwishlist.push(action.payload);
            }
        },
        removeWishlistItem: (state, action) => {
            state.allwishlist = state.allwishlist.filter(item => item._id !== action.payload);
        }, 
       
    }
})
export const { setAllWishlist, removeWishlistItem } = wishlistSlice.actions
export default wishlistSlice.reducer