import { useEffect, useState } from 'react';
import Header from '../../components/header.jsx';
import {useSelector} from 'react-redux'
import UserAPI from '../../../api/userApi'
export default function TestUser() {
      const user1 = useSelector((state) =>state.auth.login.currentUser);
      const [realtimeUser, setRealtimeUser] = useState({});

      const fetchUser = async () => {
        try{
          const res = await UserAPI.getUser(user1.token, user1.userInfo.id);
          setRealtimeUser(res.data)
          console.log('res', res.data)
        }
        catch (error){
          console.log("error in fetchUser", error)
        }
      }
      useEffect(() => {
        fetchUser();
        
      },[])
      return(
      <div className='w-screen h-screen  '>
        <Header/>
        <h1>Test User</h1>
        <h2>Local</h2>
        <p>Token</p>
        <p>{user1.token}</p>
        <p>User information</p>
        <p>{user1.userInfo.fullname}</p>

        <h2>Realtime User</h2>

        <p>User information</p>
        <p>{realtimeUser.fullName}</p>


      </div>
     
      )
}