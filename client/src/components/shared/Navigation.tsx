import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../context/index.tsx";
import { useBecomeSeller } from "../../query/user.queries.ts";
import { useGetUserCart } from "../../query/cart.queries.ts";
import { useGetUserWishlistCount } from "@/query/wishlist.queries.ts";
import AlertDialog from "../ui/AlertDialog.tsx";
// const AlertDialog = React.lazy(() => import("../ui/AlertDialog"))
const Navigation = () => {
  const [showAlertDialog, setShowAlertDialog] = useState(false);
  const [showSearchInput, setShowSearchInput] = useState(false);
  const [searchValue, setSearchValue] = useState<string>("");
  const navigate = useNavigate();
  const handleSearchValueSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    navigate(`/shopping/${searchValue}`);
  };
  const [toggle, setToggle] = useState<boolean>(false);
  const toggleButton = () => {
    setToggle(!toggle);
  };
  const { data: userCart } = useGetUserCart();
  const { data: userWishlistCount } = useGetUserWishlistCount();
  const { user, isAuthenticated } = useContext(UserContext);
  const { mutate: becomeSeller, isPending, isSuccess } = useBecomeSeller();
  const handleBecomeSellerClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (!isAuthenticated) {
      navigate("/auth/sign-in");
    } else if (user.role === "customer") {
      setShowAlertDialog(true);
    } else {
      navigate("/admin/dashboard");
    }
  };
  return (
    <>
      <nav className=" bg-white shadow sticky left-0 top-0 z-50 ">
        <div className=" bg-white sm:w-full  container px-4 py-4 mx-auto">
          <div className="flex flex-col md:flex-row justify-center  w-ful md:items-center">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Link to="/">
                  <img
                    // loading="eager"
                    className="sm:min-w-[7rem] w-[6rem] h-8 sm:h-8"
                    src="/logo.png"
                    alt="Sara-Ecommerce Logo"
                    // fetchPriority="high"
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
                    <form className="w-full" onSubmit={handleSearchValueSubmit}>
                      <input
                        type="text"
                        className="w-full xl:w-80 md:w-52  sm:w-full py-2 pl-10  pr-4 text-gray-700 bg-white focus:border-slate-400 focus:outline-none sm:border rounded-md"
                        placeholder="Search"
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}
                      />
                    </form>
                  </div>
                </div>
              </div>
              <div className="flex  lg:hidden">
                <div className="sm:ml-6 gap-3 flex md:hidden justify-center items-center">
                  <svg
                    onClick={() => setShowSearchInput(!showSearchInput)}
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
                    <Link aria-label="Go To Wishlist" to="/wishlist">
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
                      {userWishlistCount || 0}
                    </div>
                  </div>
                  <div className="relative">
                    <Link aria-label="Go To Cart" to="/checkout/cart">
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
                      {userCart?.length || 0}
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
                    {toggle ? (
                      <path
                        d="M6 18L18 6M6 6l12 12"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></path>
                    ) : (
                      <path
                        d="M4 8h16M4 16h16"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></path>
                    )}
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
                  aria-label="Go To Home"
                  className="my-2 text-sm xl:text-base leading-5 text-gray-700 transition-colors duration-300 transform hover:text-blue-600 hover:underline md:mx-2 lg:mx-4 md:my-1"
                  to="/"
                >
                  Home
                </Link>
                <Link
                  className="my-2 whitespace-nowrap flex gap-1 items-center text-sm xl:text-base leading-5 text-gray-700 transition-colors duration-300 transform hover:text-blue-600 hover:underline md:mx-2 lg:mx-4 md:my-1"
                  to="/dashboard"
                  aria-label="Become A Seller"
                  onClick={(e) => handleBecomeSellerClick(e)}
                >
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    strokeWidth="0"
                    viewBox="0 0 1024 1024"
                    height="25"
                    width="25"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M882 272.1V144c0-17.7-14.3-32-32-32H174c-17.7 0-32 14.3-32 32v128.1c-16.7 1-30 14.9-30 31.9v131.7a177 177 0 0 0 14.4 70.4c4.3 10.2 9.6 19.8 15.6 28.9v345c0 17.6 14.3 32 32 32h676c17.7 0 32-14.3 32-32V535a175 175 0 0 0 15.6-28.9c9.5-22.3 14.4-46 14.4-70.4V304c0-17-13.3-30.9-30-31.9zM214 184h596v88H214v-88zm362 656.1H448V736h128v104.1zm234 0H640V704c0-17.7-14.3-32-32-32H416c-17.7 0-32 14.3-32 32v136.1H214V597.9c2.9 1.4 5.9 2.8 9 4 22.3 9.4 46 14.1 70.4 14.1s48-4.7 70.4-14.1c13.8-5.8 26.8-13.2 38.7-22.1.2-.1.4-.1.6 0a180.4 180.4 0 0 0 38.7 22.1c22.3 9.4 46 14.1 70.4 14.1 24.4 0 48-4.7 70.4-14.1 13.8-5.8 26.8-13.2 38.7-22.1.2-.1.4-.1.6 0a180.4 180.4 0 0 0 38.7 22.1c22.3 9.4 46 14.1 70.4 14.1 24.4 0 48-4.7 70.4-14.1 3-1.3 6-2.6 9-4v242.2zm30-404.4c0 59.8-49 108.3-109.3 108.3-40.8 0-76.4-22.1-95.2-54.9-2.9-5-8.1-8.1-13.9-8.1h-.6c-5.7 0-11 3.1-13.9 8.1A109.24 109.24 0 0 1 512 544c-40.7 0-76.2-22-95-54.7-3-5.1-8.4-8.3-14.3-8.3s-11.4 3.2-14.3 8.3a109.63 109.63 0 0 1-95.1 54.7C233 544 184 495.5 184 435.7v-91.2c0-.3.2-.5.5-.5h655c.3 0 .5.2.5.5v91.2z"></path>
                  </svg>{" "}
                  <span className="">Become a Seller</span>
                </Link>
                <Link
                  aria-label="Go To About Section"
                  className="my-2  whitespace-nowrap hidden xl:block text-sm xl:text-base leading-5 text-gray-700 transition-colors duration-300 transform hover:text-blue-600 hover:underline md:mx-2 lg:mx-4 md:my-1"
                  to="/about"
                >
                  About Sara-Ecommerce
                </Link>
                <Link
                  aria-label="Go To Contact Section"
                  className="my-2 whitespace-nowrap text-sm xl:text-base leading-5 text-gray-700 transition-colors duration-300 transform hover:text-blue-600 hover:underline md:mx-2 lg:mx-4 md:my-1"
                  to="/contact"
                >
                  Contact Us
                </Link>
                <Link
                  aria-label="Go To Blog Section"
                  className="my-2 whitespace-nowrap text-sm xl:text-base leading-5 text-gray-700 transition-colors duration-300 transform hover:text-blue-600 hover:underline md:mx-2 lg:mx-4 md:my-1"
                  to="/blog"
                >
                  Blog
                </Link>
                <Link
                  aria-label="Go To Profile Section"
                  className="my-2 md:hidden whitespace-nowrap text-sm xl:text-base leading-5 text-gray-700 transition-colors duration-300 transform hover:text-blue-600 hover:underline md:mx-2 lg:mx-4 md:my-1"
                  to="/profile"
                >
                  Profile
                </Link>
                
                {!isAuthenticated && (
                  <Link
                    aria-label="Go To Login Page"
                    className="my-2 text-sm  whitespace-nowrap xl:text-base leading-5 text-gray-700 transition-colors duration-300 transform hover:text-blue-600 hover:underline md:mx-2 lg:mx-4 md:my-1"
                    to="/auth/sign-in"
                  >
                    Login
                  </Link>
                )}
              </div>
              <div className="sm:ml-6  gap-4 md:flex justify-center items-center hidden">
                <div className="relative hidden lg:block">
                  <Link aria-label="Go To Wishlist" to="/wishlist">
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
                    {userWishlistCount || 0}
                  </div>
                </div>
                <div className="relative">
                  <Link aria-label="Go To Cart" to="/checkout/cart">
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
                <Link aria-label="Go To Profile Section" to="/profile">
                  <div className="profile hidden sm:block w-7 h-7 bg-slate-600 rounded-full overflow-hidden">
                    <img
                      loading="eager"
                      src="/profile.avif"
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
              aria-label="Go To Shopping Tshirt"
              className="sm:mx-4 ml-2 text-nowrap text-sm leading-5 text-gray-700 transition-colors duration-300 transform  hover:text-blue-600 dark:hover:text-blue-400 hover:underline md:my-0"
              to="/shopping/tshirt"
            >
              T-shirts
            </Link>
            <Link
              aria-label="Go To Shopping Shirt"
              className="sm:mx-4 ml-2 text-sm text-nowrap leading-5 text-gray-700 transition-colors duration-300 transform  hover:text-blue-600 whitespace-nowrap dark:hover:text-blue-400 hover:underline md:my-0"
              to="/shopping/shirt"
            >
              Shirts
            </Link>
            <Link
              aria-label="Go To Shopping Pant"
              className="sm:mx-4 ml-2 text-sm  text-nowrap leading-5 text-gray-700 transition-colors duration-300 transform  hover:text-blue-600 dark:hover:text-blue-400 hover:underline md:my-0"
              to="/shopping/pant"
            >
              Pants
            </Link>
            <Link
              aria-label="Go To Shopping Bottoms"
              className="sm:mx-4 ml-2 text-sm  text-nowrap leading-5 text-gray-700 transition-colors duration-300 transform  hover:text-blue-600 dark:hover:text-blue-400 hover:underline md:my-0"
              to="/shopping/bottom"
            >
              Bottoms
            </Link>
            <Link
              aria-label="Go To Shopping Jacket"
              className="sm:mx-4 ml-2 text-sm text-nowrap  leading-5 text-gray-700 transition-colors duration-300 transform  hover:text-blue-600 dark:hover:text-blue-400 hover:underline md:my-0"
              to="/shopping/jacket"
            >
              Jackets
            </Link>
          </div>
          <div
            className={`bg-white sm:hidden absolute  top-full -z-10 w-full left-0 sm:z-50 ${
              !showSearchInput && "hidden"
            }`}
          >
            <div className="relative border border-gray-300">
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
                className="w-full sm:w-full py-2 pl-10 pr-4 text-gray-700 bg-white focus:border-slate-100 focus:outline-none sm:border rounded-md"
                placeholder="Search"
                value={searchValue}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    navigate(`/shopping/${searchValue}`);
                  }
                }}
                onChange={(e) => setSearchValue(e.target.value)}
              />
            </div>
          </div>
        </div>
      </nav>
      {showAlertDialog && (
        <AlertDialog
          title="Become A Seller"
          description="Are you sure you want to become a seller?"
          isPopupVisible={showAlertDialog}
          setIsPopupVisible={setShowAlertDialog}
          submitOnClick={becomeSeller}
          loading={isPending}
          isSuccess={isSuccess}
          navigateUrl={"/admin/dashboard"}
        />
      )}
    </>
  );
};

export default Navigation;
