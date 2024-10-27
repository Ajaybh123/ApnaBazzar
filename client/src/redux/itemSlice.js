import { createSlice } from "@reduxjs/toolkit"
const itemSlice = createSlice({
    name:"item",
    initialState: {
        allItems:[],
        singleItem:"",
    },
    reducers: {
        setAllItem: (state,action) =>{
            state.allItems = action.payload
        },
        setSingleItem: (state,action) => {
            state.singleItem = action.payload
        }
    }
})

export const {setAllItem,setSingleItem} = itemSlice.actions
export default itemSlice.reducer;