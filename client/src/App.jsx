import { createBrowserRouter, RouterProvider } from "react-router-dom"
 import Home from "./userComponent/Home"
import Login from "./Auth/Login";
 import Signup from "./Auth/Signup";
import ProductDetail from "./userComponent/ProductDetail";
import CartPage from "./userComponent/CartPage";
import WishlistPage from "./userComponent/WishlistPage";
import ProductCreate from "./Admin/ProductCreate";
const appRouter = createBrowserRouter([
  {
    path:'/',
    element: <Home />
  },
  {
    path: '/login',
    element: <Login/>
  },
  {
    path: '/signup',
    element: <Signup />
  },
  {
    path: '/product/:_id',
    element: <ProductDetail />
  },
  {
    path: '/cart',
    element: <CartPage />
  },
  {
    path: '/wishlist',
    element: <WishlistPage />
  },
  {
    path: '/createproduct',
    element: <ProductCreate />
  }
])

function App() {

  return (

    <>
      <RouterProvider router={appRouter} />
    </>
  )
}

export default App;

