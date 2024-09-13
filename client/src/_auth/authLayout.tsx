import { UserContext } from '../context/index.tsx'
import { useContext } from 'react'
import { Navigate, Outlet } from 'react-router-dom'

const authLayout = () => {
  const { isAuthenticated } = useContext(UserContext)
  return (
    <>
    {
      isAuthenticated ? (
        <Navigate to={'/'}/>
      ) : (
        <>
       <>
       <section className='flex bg-gray-100 absolute flex-1 items-center justify-center h-screen w-screen'>
         <Outlet/>
         <div className='flex shadow-md '>
        <img src='/cat.jpeg' width={512} height={384} className='bg-center hidden md:block bg-no-repeat bg-cover max-w-[384px] max-h-[512px]' alt="signin" />
        </div>
         </section>
        </>
        </>
      )
    }
    </>
  )
}

export default authLayout