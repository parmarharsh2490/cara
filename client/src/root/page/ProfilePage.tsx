import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Footer from '../../components/shared/Footer';
import Navigation from '../../components/shared/Navigation';
import ProfileSideBar from './ProfileSideBar';

const ProfileComponent: React.FC = () => {
  // const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // const toggleSidebar = () => {
  //   setIsSidebarOpen(!isSidebarOpen);
  // };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  return (
    <>
      <Navigation />
      <div className="flex flex-col sm:flex-row gap-7">
        {/* <div className={`${isSidebarOpen ? 'w-full ' : 'w-0'} transition-all duration-300`}> */}
          <ProfileSideBar  />
        {/* </div> */}
          <Outlet />
      </div>
      <Footer />
    </>
  );
};

export default ProfileComponent;