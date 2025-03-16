import React, { useContext, useState } from 'react'
import {assets} from '../assets/assets'
import { AdminContext } from '../context/AdminContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { DoctorContext } from '../context/DoctorContext'

const Login = () => {
    const[state, setState] = useState('Admin')

    const[email, setEmail] = useState('')
    const[password, setPassword] = useState('')

    const{setAToken, backendUrl} = useContext(AdminContext)
    const{setDToken} = useContext(DoctorContext)

    const onSubmitHandler = async (e) => {
        e.preventDefault()

        try {
            if (state === "Admin") {
                const {data} = await axios.post(backendUrl + '/api/admin/login', {email, password})
                if(data.success){
                    // console.log(data.token);
                    localStorage.setItem('aToken', data.token)
                    setAToken(data.token)
                }else{
                    toast.error(data.message)
                }
            }else{
                
                const {data} = await axios.post(backendUrl+'/api/doctor/login',{email,password})
                if(data.success){
                    // console.log(data.token);
                    localStorage.setItem('dToken', data.token)
                    setDToken(data.token)
                    console.log(data.token)
                }else{
                    toast.error(data.message)
                }
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

  return (
    <>
        <div className='group flex flex-col items-center justify-center min-h-[80vh] space-y-4'>
            <form onSubmit={onSubmitHandler} className='flex flex-col gap-3 items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-[#5E5E5E] text-sm shadow-lg'>
                <p className='text-2xl font-semibold m-auto mb-4'><span className='text-primary'>{state}</span> Login</p>
                <div className='w-full'>
                    <p>Email</p>
                    <input 
                        onChange={(e) => setEmail(e.target.value)} 
                        value={email} 
                        className='border border-[#DADADA] rounded w-full p-2 mt-1' 
                        type="email" 
                        required
                    />
                </div>
                <div className='w-full'>
                    <p>Password</p>
                    <input 
                        onChange={(e) => setPassword(e.target.value)} 
                        value={password} 
                        className='border border-[#DADADA] rounded w-full p-2 mt-1' 
                        type="password" 
                        required
                    />
                </div>
                <button className='bg-primary text-white w-full py-2 rounded-md text-base mt-3'>Login</button>
                {
                    state === "Admin"
                        ? <p>Doctor login? <span className='text-primary underline cursor-pointer' onClick={() => setState('Doctor')}>Click here</span></p>
                        : <p>Admin login? <span className='text-primary underline cursor-pointer' onClick={() => setState('Admin')}>Click here</span></p>
                }
            </form>

            {/* User Panel Button */}
            <a href="https://propr-health.vercel.app/">
                <button className='py-1 px-3 border text-xs rounded-full cursor-pointer hover:bg-gray-200 transition'>
                    User Panel
                </button>
            </a>
        </div>
    </>
  )
}

export default Login