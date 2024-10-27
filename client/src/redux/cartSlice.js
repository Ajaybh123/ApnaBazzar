import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        allCart: [],
    },
    reducers: {
        setAllCart: (state, action) => {
            if (Array.isArray(action.payload)) {
                state.allCart.push(...action.payload);
            } else {
                state.allCart.push(action.payload);
            }
        },
        removeCartItem: (state, action) => {
            state.allCart = state.allCart.filter(item => item._id !== action.payload);
        }, 
    }
})
export const { setAllCart, removeCartItem } = cartSlice.actions
export default cartSlice.reducer