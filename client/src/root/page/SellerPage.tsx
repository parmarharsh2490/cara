import  { useState } from 'react'
import { Link, Outlet } from 'react-router-dom'

const menuItems = [
  { label: 'Dashboard', path: '/dashboard' },
  { label: 'Add Product', path: '/add-product' },
  { label: 'Orders', path: '/admin/orders' },
  { label: 'Products', path: '/admin-products' },
  { label: 'Payment Wallet', path: '/payment-wallet' },
  { label: 'Analytics', path: '/analytics' },
  { label: 'Setting', path: '/setting' },
];

const SellerPage = () => {
  const [toggle, setToggle] = useState<boolean>(false);
  const [selected, setSelected] = useState("dashboard");

  const toggleButton = () => {
    setToggle(!toggle);
  }

  return (
    <div className='flex'>
      {/* Sidebar */}
      <div
        className={`z-50 h-screen flex-col justify-between bg-slate-100 flex sm:relative absolute top-0 left-0 w-screen sm:w-full sm:max-w-[200px] md:max-w-[230px]  lg:max-w-[250px] max-h-[100%] transform ${
          toggle ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 transition-transform duration-300 ease-in-out`}
      >
        <div>
          <ul className="py-7 px-5 z-50">
          <Link className='flex items-center justify-center mb-2 sm:mb-10' to="/">
                  <img
                    className="sm:min-w-[7rem] w-[6rem] h-8 sm:h-8"
                    src="/logo.png"
                    alt="caralogo"
                  />
                </Link>
          <button
          onClick={toggleButton}
          className="absolute sm:hidden top-2 right-2 text-gray-500 hover:text-gray-700  rounded-full  p-2"
          aria-label="Close sidebar"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
            {menuItems.map((item) => (
              <li key={item.path} className="mb-2">
                <Link
                  to={item.path}
                  className={`block px-4 p-2 my-2 pl-5 text-lg text-black border border-r-0 border-y-0 border-l-4 hover:border-red-800 ${
                    selected === item.label.toLowerCase()
                      ? 'font-semibold border-red-800'
                      : ''
                  }`}
                  onClick={
                    () => {
                      setSelected(item.label.toLowerCase());
                      setToggle(!toggle);
                    }
                  }
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className='flex items-center justify-between py-3 px-5 bg-slate-200 my-2'>
          <img
            src="https://img.freepik.com/free-psd/3d-illustration-human-avatar-profile_23-2150671116.jpg?w=740&amp;t=st=1703837364~exp=1703837964~hmac=33dcc8385818924229394fd67ba929edb782c5eb07ec9f261dfa935f2ae88d53"
            alt="user-image"
            className="w-7 h-7 bg-slate-600 rounded-full overflow-hidden"
          />
          <button className='' ><Link to='/admin/auth/sign-in'>Log out</Link></button>
        </div>
      </div>
      
        <div className="flex flex-col  sm:h-screen w-full border">
  <header className="h-[8vh] flex w-full bg-slate-200">
  <button
            type="button"
            className="text-gray-500 md:hidden hover:text-gray-600 focus:outline-none focus:text-gray-600"
            aria-label="toggle menu"
            onClick={toggleButton}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-7 h-7"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              {
                toggle ? (
                  <path d="M6 18L18 6M6 6l12 12" strokeLinecap="round" strokeLinejoin="round"></path>
                ) : (
                  <path
                    d="M4 8h16M4 16h16"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                )
              }
            </svg>
          </button>
    <h1 className='text-xl  font-semibold text-center p-4 w-full bg-slate-200'>Ecommerce Seller Panel</h1>
  </header>

  <main className="flex-1 overflow-auto bg-slate-100">
    <Outlet />
  </main>
</div>
    </div>
  )
}

export default SellerPage
