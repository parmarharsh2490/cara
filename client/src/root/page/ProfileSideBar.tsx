import React, { useState } from 'react';
import { Link } from 'react-router-dom';

interface MenuItem {
  label: string;
  path: string;
}

const menuItems: MenuItem[] = [
  { label: 'Profile', path: '/profile' },
  { label: 'Wishlist', path: '/wishlist' },
  { label: 'Address', path: '/address' },
  { label: 'Orders', path: '/orders' },
];

const ProfileSideBar: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const [selected, setSelected] = useState("profile");

  const toggleSidebar = () => setIsOpen(!isOpen);

  const handleMenuClick = (label: string) => {
    setSelected(label.toLowerCase());
    if (window.innerWidth < 640) { 
      setIsOpen(false);
    }
  };

  return (
    <div className="relative border borde-black z-50 bg-white w-full sm:max-w-[25%] sm:min-w-[25%] lg:max-w-[20%] lg:min-w-[20%] xl:min-w-[15%] xl:max-w-[15%]">

      {!isOpen && (
        <button
          onClick={toggleSidebar}
          className="absolute sm:hidden left-0 top-0 text-black p-2 rounded-full transition-all"
        >
          <svg className='' stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 384 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
            <path d="M365.52 209.85L59.22 67.01c-16.06-7.49-35.15-.54-42.64 15.52L3.01 111.61c-7.49 16.06-.54 35.15 15.52 42.64L236.96 256.1 18.49 357.99C2.47 365.46-4.46 384.5 3.01 400.52l13.52 29C24 445.54 43.04 452.47 59.06 445l306.47-142.91a32.003 32.003 0 0 0 18.48-29v-34.23c-.01-12.45-7.21-23.76-18.49-29.01z"></path>
          </svg>
        </button>
      )}
      <nav className={`bg-slate-50 absolute  sm:relative top-0 transition-all h-full w-full sm:flex items-center justify-center sm:h-[520px] text-black duration-300 ease-in-out transform ${isOpen ? 'translate-x-0 h-screen ' : '-translate-x-full'}`}>
        <ul className="py-14 px-5 z-50  ">
          {menuItems.map((item) => (
            <li key={item.path} className="mb-2">
              <Link
                to={item.path}
                className={`block px-4 p-2 my-2 pl-5 text-lg text-black border border-r-0 border-y-0 border-l-4 hover:border-red-800 ${
                  selected === item.label.toLowerCase()
                    ? 'font-semibold border-red-800'
                    : ''
                }`}
                onClick={() => handleMenuClick(item.label)}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
        <button
          onClick={toggleSidebar}
          className="absolute sm:hidden top-2 right-2 text-gray-500 hover:text-gray-700  rounded-full  p-2"
          aria-label="Close sidebar"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </nav>
    </div>
  );
};

export default ProfileSideBar;