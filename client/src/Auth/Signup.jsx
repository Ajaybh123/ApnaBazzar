import React, { useEffect, useState } from 'react'
import { Label } from '../components/ui/label'
import { Input } from '../components/ui/input'
import { Button } from '../components/ui/button'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import axios from 'axios'
import { Loader2 } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import { setUser } from '@/redux/authSlice'
import authImage from '../assets/signup.gif'
import { USER_API_END_POINT } from '@/utils/constant'


export default function Signup() {

    const [loading, setLoading] = useState(false)
    const [input, setInput] = useState({
        username: "",
        email: "",
        password: "",
    })

    const navigate = useNavigate();
    const { user } = useSelector(state => state.auth)
    const dispatch = useDispatch()

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value })
    }

    const postData = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${USER_API_END_POINT}/register`, input, {
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true
            });

            if (response.data.success) {
                dispatch(setUser(response.data.user));
                navigate('/login');
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
            });
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (user) {
            navigate('/')
        }
    }, [])
    return (
        <div className='grid grid-cols-1 md:grid-cols-2'>
            <div style={{
                backgroundImage: `url(${authImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                height: '100vh',
                width: '100%',
            }}>
            </div>
            <div className='flex items-center justify-center bg-[#f8dfca]'>

                <form onSubmit={postData} className='border border-gray-200 rounded-md p-4 my-10 shadow-2xl bg-white mx-4 max-w-sm z-50 absolute'>
                    <div className='text-center mb-2'>
                        <h1 className='text-2xl font-bold'>Apna<span className='text-[#50E3C2]'>Bazzar</span></h1>
                    </div>
                    <h3 className='text-lg mb-5 text-center'>Create Your Accout</h3>
                    <div className='my-2'>
                        <Label>User Name</Label>
                        <Input type="text" name="username" value={input.username} onChange={changeEventHandler} placeholder="Enter Username" />
                    </div>
                    <div className='my-2'>
                        <Label>Email</Label>
                        <Input type="email" name="email" value={input.email} onChange={changeEventHandler} placeholder="Enter Email" />
                    </div>
                    <div className='my-2'>
                        <Label>Password</Label>
                        <Input type="password" name="password" value={input.password} onChange={changeEventHandler} placeholder="Enter Password" />
                    </div>
                    {
                        loading ? <Button className="w-full my-4"><Loader2 className='mr-2 h-4 w-4 animate-spin' />Please wait</Button> :
                            <Button type="submit" className="w-full my-4 bg-[#50E3C2]">Sign-Up</Button>
                    }
                    <span>Already have an account?<Link className='text-[#50E3C2]' to="/login">Login</Link></span>
                </form>

            </div>
        </div>
    )
}


