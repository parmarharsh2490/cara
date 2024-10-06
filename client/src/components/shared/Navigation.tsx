import {  useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AiOutlineShop } from "react-icons/ai";
import { UserContext } from "../../context/index.tsx";
import AlertDialog from "../ui/AlertDialog";
import { useBecomeSeller } from "../../query/UserQueries.ts";
import { useGetUserCart } from "../../query/CartQueries.ts";
import { useGetUserWishlist } from "../../query/WishlistQueries.ts";
const Navigation = () => {
  const [showAlertDialog,setShowAlertDialog] = useState(false);
  const [searchValue,setSearchValue] = useState<string>("");
  const [toggle,setToggle] = useState<boolean>(false);
  const toggleButton = () => {
    setToggle(!toggle);
  }
  const {data : userCart} = useGetUserCart();
  const {data : userWishlist} = useGetUserWishlist();
  const {user,isAuthenticated} = useContext(UserContext);
  const {mutateAsync : becomeSeller,isPending,isSuccess} = useBecomeSeller()
  const handleBecomeSellerClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if(user.role === "customer"){
      e.preventDefault()
      setShowAlertDialog(true)
    } 
  }
  return (
    <>
      <nav className=" bg-white shadow sticky left-0 top-0 z-50 ">
        <div className=" bg-white sm:w-full  container px-4 py-4 mx-auto">
          <div className="flex flex-col md:flex-row justify-center  w-ful md:items-center">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Link to="/">
                  <img
                    className="sm:min-w-[7rem] w-[6rem] h-8 sm:h-8"
                    src="/logo.png"
                    alt="caralogo"
                  />
                </Link>
                <div className="sm:mx-5 md:mr-0 lg:mr-0 xl:mr-2 2xl:mr-60  bg-white sm:relative absolute duration-500 top-0 -z-10 w-full left-0 px-2 sm:z-50 block ">
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                      <svg
                        className="w-5 h-5 text-gray-400"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path
                          d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></path>
                      </svg>
                    </span>
                    <input
                      type="text"
                      className="w-full xl:w-80 md:w-52  sm:w-full py-2 pl-10  pr-4 text-gray-700 bg-white focus:border-slate-400 focus:outline-none sm:border rounded-md"
                      placeholder="Search"
                      value={searchValue}
                      onChange={(e) => setSearchValue(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              <div className="flex  lg:hidden">
                <div className="sm:ml-6 gap-3 flex md:hidden justify-center items-center">
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    strokeWidth="0"
                    viewBox="0 0 512 512"
                    className="text-[27px] cursor-pointer"
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M456.69 421.39L362.6 327.3a173.81 173.81 0 0034.84-104.58C397.44 126.38 319.06 48 222.72 48S48 126.38 48 222.72s78.38 174.72 174.72 174.72A173.81 173.81 0 00327.3 362.6l94.09 94.09a25 25 0 0035.3-35.3zM97.92 222.72a124.8 124.8 0 11124.8 124.8 124.95 124.95 0 01-124.8-124.8z"></path>
                  </svg>
                  <div className="relative">
                    <Link to="/wishlist">
                      <svg
                        stroke="currentColor"
                        fill="currentColor"
                        strokeWidth="0"
                        viewBox="0 0 512 512"
                        className="text-2xl cursor-pointer"
                        height="1em"
                        width="1em"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M458.4 64.3C400.6 15.7 311.3 23 256 79.3 200.7 23 111.4 15.6 53.6 64.3-21.6 127.6-10.6 230.8 43 285.5l175.4 178.7c10 10.2 23.4 15.9 37.6 15.9 14.3 0 27.6-5.6 37.6-15.8L469 285.6c53.5-54.7 64.7-157.9-10.6-221.3zm-23.6 187.5L259.4 430.5c-2.4 2.4-4.4 2.4-6.8 0L77.2 251.8c-36.5-37.2-43.9-107.6 7.3-150.7 38.9-32.7 98.9-27.8 136.5 10.5l35 35.7 35-35.7c37.8-38.5 97.8-43.2 136.5-10.6 51.1 43.1 43.5 113.9 7.3 150.8z"></path>
                      </svg>
                    </Link>
                    <div className=" p-[6px] h-2 w-2 rounded-full bg-red-500 border-white absolute top-0 -right-1 flex justify-center items-center text-[10px] text-white">
                      0
                    </div>
                  </div>
                  <div className="relative">
                    <Link to="/checkout/cart">
                      <svg
                        stroke="currentColor"
                        fill="none"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-2xl cursor-pointer mr-2"
                        height="1em"
                        width="1em"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <circle cx="9" cy="21" r="1"></circle>
                        <circle cx="20" cy="21" r="1"></circle>
                        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                      </svg>
                    </Link>
                    <div className=" p-[6px] h-2 w-2 rounded-full bg-red-500 border-white absolute top-0 right-1 flex justify-center items-center text-[10px] text-white">
                      0
                    </div>
                  </div>
                </div>
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
                      toggle ? (<path d="M6 18L18 6M6 6l12 12" strokeLinecap="round" strokeLinejoin="round"></path> )
                      : (
                        <path
                          d="M4 8h16M4 16h16"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></path>
                      )
                    }
                  </svg>
                  
                </button>
              </div>
            </div>
<div className={`flex md:items-center md:flex-row`}>
              <div
                className={`flex-col md:flex-row md:items-center bg-white md:bg-transparent py-3 px-4 md:p-0 flex md:relative fixed top-28 md:top-0 left-0 w-full md:w-auto h-screen md:h-auto transform ${
                  toggle ? "translate-x-0" : "-translate-x-full"
                } md:translate-x-0 transition-transform duration-300 ease-in-out`}
              >
                <Link
                  className="my-2 text-sm xl:text-base leading-5 text-gray-700 transition-colors duration-300 transform hover:text-blue-600 hover:underline md:mx-2 lg:mx-4 md:my-1"
                  to="/"
                >
                  Home
                </Link>
                <Link
                  className="my-2 flex gap-1 items-center text-sm xl:text-base leading-5 text-gray-700 transition-colors duration-300 transform hover:text-blue-600 hover:underline md:mx-2 lg:mx-4 md:my-1"
                  to="/dashboard"
                  onClick={(e) => handleBecomeSellerClick(e)}
                >
                 <AiOutlineShop  size={25}/> <span className=" whitespace-nowrap">Become a Seller</span>
                </Link>
                <Link
                  className="my-2 hidden  whitespace-nowrap lg:block text-sm xl:text-base leading-5 text-gray-700 transition-colors duration-300 transform hover:text-blue-600 hover:underline md:mx-2 lg:mx-4 md:my-1"
                  to="/about"
                >
                  About Cara
                </Link>
                <Link
                  className="my-2 whitespace-nowrap text-sm xl:text-base leading-5 text-gray-700 transition-colors duration-300 transform hover:text-blue-600 hover:underline md:mx-2 lg:mx-4 md:my-1"
                  to="/contact"
                >
                  Contact Us
                </Link>
               {!isAuthenticated && <Link
                  className="my-2 text-sm  whitespace-nowrap xl:text-base leading-5 text-gray-700 transition-colors duration-300 transform hover:text-blue-600 hover:underline md:mx-2 lg:mx-4 md:my-1"
                  to="/auth/sign-in"
                >
                  Login
                </Link>}
               {!isAuthenticated &&  <Link
                  className="my-2 hidden  whitespace-nowrap lg:block text-sm xl:text-base leading-5 text-gray-700 transition-colors duration-300 transform hover:text-blue-600 hover:underline md:mx-2 lg:mx-4 md:my-1"
                  to="/auth/sign-up"
                >
                  Sign Up
                </Link>}
              </div>
              <div className="sm:ml-6  gap-4 md:flex justify-center items-center hidden">
                <div className="relative hidden xl:block">
                  <Link to="/wishlist">
                    <svg
                      stroke="currentColor"
                      fill="currentColor"
                      strokeWidth="0"
                      viewBox="0 0 512 512"
                      className="text-2xl cursor-pointer"
                      height="1em"
                      width="1em"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M458.4 64.3C400.6 15.7 311.3 23 256 79.3 200.7 23 111.4 15.6 53.6 64.3-21.6 127.6-10.6 230.8 43 285.5l175.4 178.7c10 10.2 23.4 15.9 37.6 15.9 14.3 0 27.6-5.6 37.6-15.8L469 285.6c53.5-54.7 64.7-157.9-10.6-221.3zm-23.6 187.5L259.4 430.5c-2.4 2.4-4.4 2.4-6.8 0L77.2 251.8c-36.5-37.2-43.9-107.6 7.3-150.7 38.9-32.7 98.9-27.8 136.5 10.5l35 35.7 35-35.7c37.8-38.5 97.8-43.2 136.5-10.6 51.1 43.1 43.5 113.9 7.3 150.8z"></path>
                    </svg>
                  </Link>
                  <div className=" p-[6px] h-2 w-2 rounded-full bg-red-500 border-white absolute top-0 -right-1 flex justify-center items-center text-[10px] text-white">
                  {userWishlist?.length || 0}
                  </div>
                </div>
                <div className="relative">
                  <Link to="/checkout/cart">
                    <svg
                      stroke="currentColor"
                      fill="none"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-2xl cursor-pointer"
                      height="1em"
                      width="1em"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <circle cx="9" cy="21" r="1"></circle>
                      <circle cx="20" cy="21" r="1"></circle>
                      <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                    </svg>
                  </Link>
                  <div className=" p-[6px] h-2 w-2 rounded-full bg-red-500 border-white absolute top-0 -right-1 flex justify-center items-center text-[10px] text-white">
                    {userCart?.length || 0}
                  </div>
                </div>
                <Link to="/profile">
                  <div className="profile hidden sm:block w-7 h-7 bg-slate-600 rounded-full overflow-hidden">
                    <img
                      src="https://img.freepik.com/free-psd/3d-illustration-human-avatar-profile_23-2150671116.jpg?w=740&amp;t=st=1703837364~exp=1703837964~hmac=33dcc8385818924229394fd67ba929edb782c5eb07ec9f261dfa935f2ae88d53"
                      alt="user-image"
                      className=""
                    />
                  </div>
                </Link>
              </div>
            </div>
          </div>
          <div className=" pt-4 my-2  border-t gap-3 overscroll-x-auto sm:scroll-hidden flex justify-center item-center">
            <Link
              className="sm:mx-4 ml-2 text-nowrap text-sm leading-5 text-gray-700 transition-colors duration-300 transform  hover:text-blue-600 dark:hover:text-blue-400 hover:underline md:my-0"
              to="/shopping/tshirt"
            >
              T-shirts
            </Link>
            <Link
              className="sm:mx-4 ml-2 text-sm text-nowrap leading-5 text-gray-700 transition-colors duration-300 transform  hover:text-blue-600 whitespace-nowrap dark:hover:text-blue-400 hover:underline md:my-0"
              to="/shopping/shirt"
            >
              Shirts
            </Link>
            <Link
              className="sm:mx-4 ml-2 text-sm  text-nowrap leading-5 text-gray-700 transition-colors duration-300 transform  hover:text-blue-600 dark:hover:text-blue-400 hover:underline md:my-0"
              to="/shopping/pant"
            >
              Pants
            </Link>
            <Link
              className="sm:mx-4 ml-2 text-sm  text-nowrap leading-5 text-gray-700 transition-colors duration-300 transform  hover:text-blue-600 dark:hover:text-blue-400 hover:underline md:my-0"
              to="/shopping/pant"
            >
              Bottoms
            </Link>
            <Link
              className="sm:mx-4 ml-2 text-sm text-nowrap  leading-5 text-gray-700 transition-colors duration-300 transform  hover:text-blue-600 dark:hover:text-blue-400 hover:underline md:my-0"
              to="/shopping/jacket"
            >
              Jackets
            </Link>
          </div>
        </div>
      </nav>
      { showAlertDialog && <AlertDialog
    title='Become A Seller'
    description='Are you sure you want to become a seller?'
    isPopupVisible={showAlertDialog}
    setIsPopupVisible={setShowAlertDialog}
    submitOnClick={becomeSeller}
    loading={isPending}
    isSuccess={isSuccess}
    navigateUrl={'/dashboard'}
    />}
    </>
  );
};

export default Navigation;
