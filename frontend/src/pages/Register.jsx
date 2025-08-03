import axios from 'axios'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useAuth } from '../context/authContext'

const Register = () => {

    const navigate = useNavigate();
    const {setAuthUser} = useAuth()

    const [loading, setLoading] = useState(false)
    const [inputData, setInputData] = useState({})



    const handleInput =(e)=>{
        setInputData({
            ...inputData, [e.target.id]:e.target.value
        })

    }
console.log(inputData);

    const handleSubmit =async (e)=>{
        e.preventDefault()
        setLoading(true)
        if(inputData.password !== inputData.confirmpassword){
            setLoading(false)
            return toast.error("Password does not match")
        }
        try{
            const register = await axios.post('/api/auth/register', inputData);
            const data = register.data;
            if(data.success === false){
                setLoading(false);
                toast.error(data.message);
                console.log(data.message); 
            }
            toast.success(data?.message)

            localStorage.setItem('chatapp',JSON.stringify(data)) 
            setAuthUser(data);

            setLoading(false);

            navigate('/login')
        }
        catch(error){
            setLoading(false)
            console.log(error);  
            toast.error(error?.response?.data?.message)
        }
    }

    const selectGender = (selectGender) => {
        setInputData((prev)=>({
            ...prev, gender:selectGender === inputData.gender ? '' : selectGender
        }))
    }


    return (
        <div className='flex flex-col items-center justify-center mix-w-full mx-auto'>
            <div className='w-full p-6 rounded-lg shadow-lg bg-gray-400 bg-clip-padding backdrop-blur-lg bg-opacity-0'>
                <h1 className='text-3xl font-bold text-gray-200 text-center'>
                    Register <span>FlowChat</span>
                </h1>

                <form onSubmit={handleSubmit} className='flex flex-col'>
                    <div className='p-4 '>
                        <label className="text-gray-500 text-xl label-text font-bold" >
                            Full Name:
                        </label>
                        <input type="text" onChange={handleInput} id='fullname' placeholder='enter your full name' required className='bg-transparent w-full input input-bordered h-10 mt-1' />
                    </div>

                    <div className='p-4 pt-1'>
                        <label className="text-gray-500 text-xl label-text font-bold" >
                            username:
                        </label>
                        <input type="text" onChange={handleInput} id='username' placeholder='enter your username' required className='bg-transparent w-full input input-bordered h-10 mt-1' />
                    </div>

                    <div className='p-4 pt-1'>
                        <label className="text-gray-500 text-xl label-text font-bold" >
                            Email:
                        </label>
                        <input type="email" onChange={handleInput} id='email' placeholder='enter your email' required className='bg-transparent w-full input input-bordered h-10 mt-1' />
                    </div>

                    <div className='p-4 pt-1'>
                        <label className="text-gray-500 text-xl label-text font-bold" >
                            Password:
                        </label>
                        <input type="password" onChange={handleInput} id='password' placeholder='enter your password' required className='bg-transparent w-full input input-bordered h-10 mt-1' />
                    </div>

                    <div className='p-4 pt-1'>
                        <label className="text-gray-500 text-xl label-text font-bold" >
                           Confirm Password:
                        </label>
                        <input type="text" onChange={handleInput} id='confirmpassword' placeholder='enter confirm password' required className='bg-transparent w-full input input-bordered h-10 mt-1' />
                    </div>

                    <div id='gender' className='flex items-center gap-7 p-4'>
                        <label className='cursor-pointer label flex gap-2'>
                            <span className='label-text font-semibold text-gray-950'>male</span>
                            <input onChange={()=>selectGender('male')} checked={inputData.gender === 'male'} type="checkbox" className='checkbox checkbox-info' />
                        </label>

                        <label className='cursor-pointer label flex gap-2'>
                            <span className='label-text font-semibold text-gray-950'>female</span>
                            <input onChange={()=>selectGender('female')} checked={inputData.gender === 'female'}   type="checkbox" className='checkbox checkbox-info' />
                        </label>
                    </div>

                    <button type='submit' className='mt-4 self-center w-auto px-2 py-1 bg-gray-900 text-lg text-white rounded-lg hover:text-black hover:bg-gray-200 hover:scale-105'>
                        {loading ? "loading" : "Register"}
                    </button>

                </form>
                

                <div className='pt-2 flex justify-between'>
                    <p className='text-[15px] font-semibold text-gray-900'>Already have an account?</p>
                    <Link to={'/register'} className='text-sm  font-semibold text-gray-200 cursor-pointer hover:text-green-950'>
                        Login Now ✅
                    </Link>
                </div>


            </div>
        </div>
    )
}

export default Register