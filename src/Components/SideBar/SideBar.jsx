import { Link, NavLink } from "react-router-dom";
import logo from "../../assets/logo.png";
import { useState } from "react";
const SideBar = () => {
  const [isActive, setActive] = useState(false);

  const handleToggle = () => {
    setActive(!isActive);
  };
  return (
    <>
      {/* small screen dashboard navbar */}
      <div className="flex justify-between md:hidden">
        <div className="navbar bg-base-100">
          <div className="flex-1">
            <Link to="/">
              <div className="flex items-center gap-3">
                <img className="h-10 w-10" src={logo} alt="" />
                <a className="text-lg md:text-xl font-semibold font-niramit">
                  PrimeLab <br />{" "}
                  <span className="text-xs md:text-sm  text-[#47CCC8]">
                    Diagnostic Center
                  </span>
                </a>
              </div>
            </Link>
          </div>
          <div className="flex-none">
            <button onClick={handleToggle} className="btn btn-square btn-ghost">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block w-5 h-5 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
      {/* sidebar */}
      <div
        className={`z-10 md:fixed  overflow-x-hidden w-64 space-y-5 px-2 py-4 transform absolute inset-y-0 left-0 bg-[#2D3663] text-white ${
          isActive && "-translate-x-full"
        } md:translate-x-0 transition duration-200 ease-in-out`}
      >
        <div>
          <div className="w-full flex justify-center items-center mx-auto">
            <Link to="/">
              <div className="flex items-center gap-3">
                <img className="h-10 w-10" src={logo} alt="" />
                <a className=" text-xl font-semibold font-niramit">
                  PrimeLab <br />{" "}
                  <span className="text-sm  text-[#47CCC8]">
                    Diagnostic Center
                  </span>
                </a>
              </div>
            </Link>
          </div>
        </div>
        <div className="flex flex-col">
          <nav>
            <NavLink to="myProfile"
            className={({isActive}) => `flex items-center px-4 py-1 my-1 transition-colors duration-300 transform hover:bg-gray-400 hover:rounded-sm hover:text-[#2D3663] ${isActive ? 'bg-gray-400 rounded-sm text-[#2D3663]':'text-white'} `}>
                <div className="px-4 py-2">My Profile</div>
            </NavLink>
            <NavLink to="myUpcomingAppointments"
            className={({isActive}) => `flex items-center px-4 py-1 my-1 transition-colors duration-300 transform hover:bg-gray-400 hover:rounded-sm hover:text-[#2D3663] ${isActive ? 'bg-gray-400 rounded-sm text-[#2D3663]':'text-white'} `}>
                <div className="px-4 py-2">My Upcoming Appointments</div>
            </NavLink>
            <NavLink to="testResults"
            className={({isActive}) => `flex items-center px-4 py-1 my-1 transition-colors duration-300 transform hover:bg-gray-400 hover:rounded-sm hover:text-[#2D3663] ${isActive ? 'bg-gray-400 rounded-sm text-[#2D3663]':'text-white'} `}>
                <span className="px-4 py-2">Test Results</span>
            </NavLink>

            <NavLink to="statistics"
            className={({isActive}) => `flex items-center px-4 py-1 my-1 transition-colors duration-300 transform hover:bg-gray-400 hover:rounded-sm hover:text-[#2D3663] ${isActive ? 'bg-gray-400 rounded-sm text-[#2D3663]':'text-white'} `}>
                <span className="px-4 py-2">Statistics</span>
            </NavLink>
            <NavLink to="allUsers"
            className={({isActive}) => `flex items-center px-4 py-1 my-1 transition-colors duration-300 transform hover:bg-gray-400 hover:rounded-sm hover:text-[#2D3663] ${isActive ? 'bg-gray-400 rounded-sm text-[#2D3663]':'text-white'} `}>
                <span className="px-4 py-2">All Users</span>
            </NavLink>
            <NavLink to="addTest"
            className={({isActive}) => `flex items-center px-4 py-1 my-1 transition-colors duration-300 transform hover:bg-gray-400 hover:rounded-sm hover:text-[#2D3663] ${isActive ? 'bg-gray-400 rounded-sm text-[#2D3663]':'text-white'} `}>
                <span className="px-4 py-2">Add A Test</span>
            </NavLink>
            <NavLink to="allTests"
            className={({isActive}) => `flex items-center px-4 py-1 my-1 transition-colors duration-300 transform hover:bg-gray-400 hover:rounded-sm hover:text-[#2D3663] ${isActive ? 'bg-gray-400 rounded-sm text-[#2D3663]':'text-white'} `}>
               <span className="px-4 py-2">All Tests</span>
            </NavLink>
            <NavLink to="reservations"
            className={({isActive}) => `flex items-center px-4 py-1 my-1 transition-colors duration-300 transform hover:bg-gray-400 hover:rounded-sm hover:text-[#2D3663] ${isActive ? 'bg-gray-400 rounded-sm text-[#2D3663]':'text-white'} `}>
                <span className="px-4 py-2">Reservations</span>
            </NavLink>
            <NavLink to="addBanners"
            className={({isActive}) => `flex items-center px-4 py-1 my-1 transition-colors duration-300 transform hover:bg-gray-400 hover:rounded-sm hover:text-[#2D3663] ${isActive ? 'bg-gray-400 rounded-sm text-[#2D3663]':'text-white'} `}>
                <span className="px-4 py-2">Add Banners</span>
            </NavLink>
            <NavLink to="allBanners"
            className={({isActive}) => `flex items-center px-4 py-1 my-1 transition-colors duration-300 transform hover:bg-gray-400 hover:rounded-sm hover:text-[#2D3663] ${isActive ? 'bg-gray-400 rounded-sm text-[#2D3663]':'text-white'} `}>
                <span className="px-4 py-2">All Banners</span>
            </NavLink>
          </nav>
        </div> 
      </div>
    </>
  );
};

export default SideBar;
