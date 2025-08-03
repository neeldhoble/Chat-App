import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { FaSearch } from 'react-icons/fa'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/authContext'
import { IoArrowBackSharp } from 'react-icons/io5'
import { BiLogOut } from 'react-icons/bi'
import userConversation from '../Zustands/userConversation'
import { useSocketContext } from '../context/socketContext'

const Sidebar = ({ onSelectedUser }) => {

    const navigate = useNavigate()
    const { authUser, setAuthUser } = useAuth()
    const [searchInput, setSearchInput] = useState('')
    const [searchUser, setSearchUser] = useState([]);
    const [chatUser, setChatUser] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [newMessageUsers, setNewMessageUsers] = useState([]);
    const { messages, selectedConversation, setSelectedConversation } = userConversation();
    const { onlineUser, socket } = useSocketContext()

    const nowOnline = chatUser.map((user) => (user._id))

    const isOnline = nowOnline.map(userId => onlineUser.includes(userId))

    // const talkedwith = chatUser.map((user) => (user._id))

    useEffect(() => {
        socket?.on("newMessage", (newMessage) => {
            setNewMessageUsers(newMessage)
        })
        return () => socket?.off("newMessage");
    }, [socket, messages])

    //show the friend to chat 
    useEffect(() => {
        const chatUserHandler = async () => {
            setLoading(true)
            try {
                const chatter = await axios.get(`/api/user/currentFriends`);
                const data = chatter.data;
                if (data.success === false) {
                    setLoading(false);
                    console.log(data.message);
                }
                setLoading(false);
                setChatUser(data);
            }
            catch (e) {
                setLoading(false)
                console.log(e);

            }
        }
        chatUserHandler()
    }, [])
    console.log(chatUser);


    //search user
    const handleSearchSubmit = async (e) => {
        e.preventDefault();
        setLoading(true)
        try {
            const search = await axios.get(`/api/user/search?search=${searchInput}`)
            const data = search.data;
            if (data.success === false) {
                setLoading(false);
                console.log(data.message);
            }
            setLoading(false)
            if (data.loading === 0) {
                toast.message("user not found");
            }
            else {
                setSearchUser(data);
                console.log(e);

            }
        }
        catch (e) {
            setLoading(false)
        }
    }

    //show search user
    const handleUserClick = (user) => {
        onSelectedUser(user);
        setSelectedConversation(user);
        setSelectedUser(user._id);
        setNewMessageUsers('')
    }

    // back to default
    const goBack = () => {
        setSearchUser([]);
        setSearchInput('')
    }

    //logout function
    const logout = async () => {
        const confirmLogout = window.prompt("type username to logout")
        if (confirmLogout === authUser.username) {
            setLoading(true)
            try {
                const logoutUser = await axios.post(`/api/auth/logout`);
                const data = logoutUser.data;
                if (data?.success === false) {
                    console.log(data?.message);
                }
                toast.info(data?.message);
                localStorage.removeItem('chatapp')
                setAuthUser(null);
                setLoading(false);
                navigate('/login');
            }
            catch (e) {
                setLoading(false)
                console.log(e);
            }
        }
        else {
            toast.info("Logout Unsuccessful")
        }
    }

    // console.log(searchUser);

    return (
        <div className='h-full w-auto px-1'>
            <div className='flex justify-between gap-2'>
                <form onSubmit={handleSearchSubmit} action="" className='w-auto flex items-center justify-between bg-white rounded-full'>
                    <input type='text' value={searchInput} onChange={(e) => setSearchInput(e.target.value)} placeholder='search' className='bg-transparent px-4 w-auto outline-none rounded-full text-black' />
                    <button className='btn btn-circle bg-sky-700 hover:bg-gray-950'>
                        <FaSearch />
                    </button>
                </form>
                <img src={authUser?.profile} alt="profile" onClick={() => navigate(`/profile/${authUser?._id}`)} className='self-center h-12 w-12 hover:scale-110 cursor-pointer' />
            </div>
            <div className='divider px-3'></div>
            {searchUser?.length > 0 ? (
                <>
                    <div className='min-h-[70%] max-h-[80%] m overflow-y-auto scrollbar'>
                        <div className='w-auto'>
                            {searchUser.map((user, index) => (

                                <div key={user._id}>
                                    <div onClick={() => handleUserClick(user)} className={`flex gap-3 items-center rounded p-2 py-1 cursor-pointer ${selectedUser === user?._id ? 'bg-sky-500' : ''}`}>
                                        <div className={`avatar ${isOnline[index] ? 'online' : ''}`} >
                                            <div className='rounded-full w-12 h-12'>
                                                <img src={user.profile} alt="profile" />
                                            </div>
                                        </div>
                                        <div className='flex flex-col flex-1'>
                                            <p className='font-bold text-gray-950'>{user.username}</p>
                                        </div>
                                        <div>
                                            <div className='rounded-full bg-green-700 text-sm text-white px-[4px]'>
                                                +1
                                            </div>
                                        </div>
                                    </div>
                                    <div className='divider divide-solid px-3 h-[1px]'></div>
                                </div>
                            )
                            )}
                        </div>
                    </div>
                    <div className='mt-auto px-1 py-1 flex'>
                        <button onClick={goBack} className='bg-white rounded-full px-2 py-1 self-center'>
                            <IoArrowBackSharp size={25} className='text-black' />
                        </button>
                    </div>
                </>
            ) : (
                <>
                    <div className='min-h-[70%] max-h-[80%] m overflow-y-auto scrollbar'>
                        <div className='w-auto'>

                            {chatUser.length === 0 ? (
                                <>
                                    <div className='font-bold items-center flex flex-col text-xl text-yellow-500'>
                                        <h1>Why are you alone</h1>
                                    </div>
                                </>
                            ) : (
                                <>
                                    {chatUser.map((user, index) => (
                                        <div key={user._id}>
                                            <div onClick={() => handleUserClick(user)} className={`flex gap-3 items-center rounded p-2 py-1 cursor-pointer ${selectedUser === user?._id ? 'bg-sky-500' : ''}`}>
                                                <div className={`avatar ${isOnline[index] ? 'online' : ''}`}>
                                                    <div className='rounded-full w-12 h-12'>
                                                        <img src={user.profile} alt="profile" />
                                                    </div>
                                                </div>

                                                <div className='flex flex-col flex-1'>
                                                    <p className='font-bold text-gray-950'>{user.username}</p>
                                                </div>
                                                <div>
                                                    { newMessageUsers.recieverId === authUser._id && newMessageUsers.senderId === user._id ? 
                                                    <div className='rounded-full bg-green-700 text-sm text-white px-[4px]'>+1</div> : <></>
                                                    }
                                                    </div>
                                            </div>
                                            <div className='divider divide-solid px-3 h-[1px]'></div>
                                        </div>
                                    )
                                    )}
                                </>
                            )}
                        </div>
                    </div>
                    <div className='mx-auto px-1 py-1 flex items-center gap-2'>
                        <button onClick={logout} className='bg-red-700 p-3 hover:bg-red-400 text-white rounded-full'>
                            <BiLogOut />
                        </button>
                        <p>Logout</p>
                    </div>

                </>
            )}
        </div>
    )
}

export default Sidebar;