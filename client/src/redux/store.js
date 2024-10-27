import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import cartSlice from "./cartSlice";
import wishlistSlice from './wishlistSlice';
import itemSlice from "./itemSlice";

import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
}

const rootReducer = combineReducers({
  auth: authSlice,
  cart: cartSlice,
  item:itemSlice,
  wishlist: wishlistSlice,
})
const persistedReducer = persistReducer(persistConfig, rootReducer)


const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})

export default store





// import { createSlice } from "@reduxjs/toolkit";

//  const productSlice = createSlice({
//      name: "product",
//    initialState: {
//        allProduct: [],
//        singleProduct: "",
//    },
//        reducers: {
//        setAllProduct: (state, action) => {
//          state.allProduct = action.payload
//      },
//       setSingleProduct: (state, action) => {
//            state.singleProduct = action.payload
//        }
//    }
//  })

// export const { setAllProduct, setSingleProduct } = productSlice.actions
//  export default productSlice.reducer