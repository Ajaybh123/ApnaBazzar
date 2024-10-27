import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Popover, PopoverContent, PopoverTrigger } from '../components/ui/popover'
import { Avatar } from '../components/ui/avatar'
import { LogOut, MenuIcon, ShoppingCart, UserCircle2, X } from 'lucide-react'
import { Button } from '../components/ui/button'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'sonner'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant'
import { setUser } from '@/redux/authSlice'

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [cart, setCart] = useState(0);

    const { user } = useSelector(state => state.auth)
    const userId = user?._id;
    const { allCart } = useSelector(state => state.cart)    

    useEffect(() => {
        const cartData = allCart?.filter((cart) => cart.user?._id === userId)        
        if (cartData)
            setCart(cartData.length)
        else
            setCart(0);

    }, [])

    const dispatch = useDispatch();
    const navigate = useNavigate()

    const logoutUser = async () => {
        try {
            const response = await axios.get(`${USER_API_END_POINT}/logout`, { withCredentials: true });
            if (response.data.success) {
                dispatch(setUser(null));
                navigate("/login")
                toast.success(response.data.message, {
                    style: {
                        backgroundColor: '#34d399',
                    },
                });
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message, {
                style: {
                    backgroundColor: '#c53d3d',
                },
            })
        }
    }

    return (
        <div className="bg-white sticky top-0 w-full z-50">
        <div className="flex items-center justify-between mx-auto px-4 md:px-32 h-16 py-4 bg-gray-100">
            {/* Logo and Search Bar */}
            <div className="flex items-center gap-4 md:gap-60">
                <h1 onClick={() => navigate('/')} className="text-2xl font-bold cursor-pointer">
                    Apna<span className="text-[#50E3C2]">Bazzar</span>
                </h1>
                <div className={`${isOpen ? 'block' : 'hidden'} md:flex items-center`}>
                    <input
                        type="text"
                        placeholder="Search for products..."
                        className="w-full px-4 py-1 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-[#50E3C2] focus:ring-1 focus:ring-[#50E3C2]"
                    />
                    <button className="ml-2 px-4 py-1 bg-[#50E3C2] text-white rounded-lg hover:bg-[#50E3C2] focus:outline-none">
                        Search
                    </button>
                </div>
            </div>

            {/* Cart and User Menu */}
            <div className="flex items-center gap-6">
                {/* Cart Button */}
                <button onClick={() => navigate('/cart')} className="relative flex items-center focus:outline-none rounded-full">
                    <ShoppingCart />
                    <span className="absolute top-0 right-0 -mr-2 bg-red-600 text-white rounded-full px-2 text-xs z-10">{cart}</span>
                </button>

                <div className={`${isOpen ? 'block' : 'hidden'} md:flex items-center gap-6`}>
                    {/* User Menu or Login Button */}
                    {!user ? (
                        <Link to="/login">
                            <Button className="rounded-full hover:bg-[#50E3C2] hover:text-white shadow-gray-400">Login</Button>
                        </Link>
                    ) : (
                        <Popover>
                            <PopoverTrigger className="flex items-center cursor-pointer">
                                <Avatar>
                                    <UserCircle2 size={30} className="mt-1" />
                                </Avatar>
                                <span className="ml-2">{user?.username}</span>
                            </PopoverTrigger>
                            <PopoverContent className="w-60">
                                <div className="flex flex-col w-full">
                                    <Link to="/profile" className="py-2 pl-2 rounded-lg hover:bg-gray-200 cursor-pointer hover:text-[#50E3c2]">View Profile</Link>
                                    <Link to="/cart" className="py-2 pl-2 rounded-lg hover:bg-gray-200 cursor-pointer hover:text-[#50E3c2]">Cart</Link>
                                    <Link to="/wishlist" className="py-2 pl-2 rounded-lg hover:bg-gray-200 cursor-pointer hover:text-[#50E3c2]">Wishlist</Link>
                                </div>
                                <div onClick={logoutUser} className="flex items-center hover:text-[#50E3c2] ml-2 gap-2 mt-2 cursor-pointer">
                                    <LogOut size={20} />
                                    <span>Logout</span>
                                </div>
                            </PopoverContent>
                        </Popover>
                    )}
                </div>

                {/* Hamburger Menu for Mobile */}
                <div className="md:hidden">
                    <button onClick={() => setIsOpen(!isOpen)} className="focus:outline-none">
                        <MenuIcon />
                    </button>
                </div>
            </div>
        </div>

        {/* Side Drawer for Mobile */}
        {isOpen && (
            <div className={`fixed top-0 right-0 h-full bg-gray-100 w-64 p-5 transform ${isOpen ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-300 ease-in-out`}>
                <div className="flex justify-end md:hidden">
                    <button onClick={() => setIsOpen(false)} className="focus:outline-none">
                        <X />
                    </button>
                </div>
                <ul className="flex flex-col font-medium items-start gap-5">
                    {/* Add additional mobile links if needed */}
                    {user && (
                        <>
                            <Link to="/profile" className="py-2 rounded-lg hover:bg-gray-200">View Profile</Link>
                            <Link to="/cart" className="py-2 rounded-lg hover:bg-gray-200">Cart</Link>
                            <Link to="/wishlist" className="py-2 rounded-lg hover:bg-gray-200">Wishlist</Link>
                            <div onClick={logoutUser} className="py-2 rounded-lg hover:bg-gray-200 cursor-pointer">Logout</div>
                        </>
                    )}
                </ul>
            </div>
        )}
    </div>
    )
}

export default Navbar

