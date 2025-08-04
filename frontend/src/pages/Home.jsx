import React from 'react'
import { useAuth } from '../context/authContext'
import MessageContainer from '../components/MessageContainer'
import Sidebar from '../components/Sidebar'
import { useState } from 'react'

const Home = () => {

    const {authUser} = useAuth();
    const [selectedUser, setSelectedUser] = useState(null);
    const [isSidebarVisible, setIsSidebarVisible] = useState(true);

    const handleUserSelect = (user) => {
        setSelectedUser(user);
        setIsSidebarVisible(false);
    }

    const handleShow = () =>{
        setIsSidebarVisible(true);
        setSelectedUser(null)
    }

  return (
    <div className='flex justify-between min-w-full md:min-w-[550px] md:max-w-[65%] px-2 h-[95%] md:h-full rounded-lg shadow-lg shadow-black backdrop-blur-sm bg-transparent bg-clip-padding border border-black bg-opacity-0'>
      {/* sidebar */}
      <div className={`w-full py-2 md:flex ${isSidebarVisible ? '': 'hidden'} `}>
            <Sidebar onSelectedUser={handleUserSelect}/>
      </div>


      {/* message container */}
      <div className={`divider divider-horizontal px-3 md:flex ${isSidebarVisible ? 'block' : 'hidden'}`}></div>
      <div className={`flex-auto bg-transparent ${selectedUser ? '' : 'hidden md:flex'} `}>
        <MessageContainer onBackUser={handleShow}/>
      </div>
    </div>
  )
}

export default Home