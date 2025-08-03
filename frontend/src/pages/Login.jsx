import React, { useState } from 'react'
import {Link, Navigate} from 'react-router-dom'
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/authContext';

const Login = () => {

    const navigate = useNavigate();
    const {setAuthUser} = useAuth();

    const [userInput, setUserInput] = useState({});
    const [loading, setLoading] = useState(false)


    const handleInput = (e) =>{
        setUserInput({
            ...userInput,
            [e.target.id]: e.target.value
        })
    }
    console.log(userInput);
    

    const handleSubmit =async (e) =>{
        e.preventDefault(); /*stop refreshing the page on submit*/
        setLoading(true)
        try{
            const login = await axios.post('/api/auth/login',userInput);
            const data = login.data;
            if(!data.success === false){
                setLoading(false);
                console.log(data.message);
            }

            toast.success(data.message);

            localStorage.setItem('chatapp',JSON.stringify(data)) /* store user data in local storage means do not to need to login after every refresh */
            setAuthUser(data)

            setLoading(false)
            navigate('/')
        }
        catch(error){
            setLoading(false)
            console.log(error);  
            toast.error(error?.response?.data?.message)
        }
    }


  return (
    <div className='flex flex-col items-center justify-center mx-auto mix-w-full'>
        <div className='w-full p-6 rounded-lg shadow-lg bg-ray-400 bg-clip-padding  background-filter backdrop-blur-lg bg-opacity-0'>
            <h1 className='text-3xl font-bold text-gray-200 text-center'>
                Login <span>FlowChat</span>
            </h1>

                {/* login form  */}
            <form onSubmit={handleSubmit} className='flex flex-col'>
                <div className='p-4'>
                    <label className="text-gray-500 text-xl label-text font-bold" >
                       Email: 
                    </label>
                    <input type="email" onChange={handleInput} id='email' placeholder='enter your email' required className='bg-transparent w-full input input-bordered h-10 mt-1'/>
                </div>

                <div className='p-4 pt-1'>
                    <label className="text-gray-500 text-xl label-text font-bold" >
                       Password: 
                    </label>
                    <input type="password" onChange={handleInput} id='password' placeholder='enter your password' required className='bg-transparent w-full input input-bordered h-10 mt-1'/>
                </div>

                <button type='submit' className='mt-4 self-center w-auto px-2 py-1 bg-gray-900 text-lg text-white rounded-lg hover:text-black hover:bg-gray-200 hover:scale-105'>
                    {loading ? "loading" : "Login"}
                </button>

            </form>

            <div className='pt-2 flex justify-between'>
                <p className='text-[15px] font-semibold text-gray-900'>Don't have an account?</p>
                <Link to = {'/register'} className='text-sm  font-semibold text-gray-200 cursor-pointer hover:text-green-950'>
                               Register Now ✅
                </Link>
                
            </div>

        </div>
    </div>
  )
}

export default Login