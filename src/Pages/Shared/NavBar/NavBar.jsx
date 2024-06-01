import { NavLink } from "react-router-dom";
import logo from "../../../assets/logo.png"
const NavBar = () => {
    const navLinks =(
        <>
         <li><NavLink
              className={({ isActive }) =>
                isActive
                  ? "font-semibold text-lg text-[#47CCC8]   "
                  : " font-semibold hover:text-[#47CCC8]   text-lg"
              }
              to="/"
            >
              Home
            </NavLink></li>
         <li><NavLink
              className={({ isActive }) =>
                isActive
                  ? "font-semibold text-lg text-[#47CCC8]   "
                  : " font-semibold hover:text-[#47CCC8]   text-lg"
              }
              to="/tests"
            >
              Tests
            </NavLink></li>
        <li> <NavLink
              className={({ isActive }) =>
                isActive
                  ? "font-semibold text-lg text-[#47CCC8]   "
                  : " font-semibold hover:text-[#47CCC8]   text-lg"
              }
              to="/allTests"
            >
              User Dashboard
            </NavLink></li>
         <li><NavLink
              className={({ isActive }) =>
                isActive
                  ? "font-semibold text-lg text-[#47CCC8]   "
                  : " font-semibold hover:text-[#47CCC8]   text-lg"
              }
              to="/allTests"
            >
              Admin Dashboard
            </NavLink></li>
        </>
    )
  return (
    <div>
      <div className="navbar bg-base-100 lg:px-10 py-5">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="gap-5 menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52 "
            >
             {navLinks}
              
            </ul>
          </div>
          <div className="flex items-center gap-3">
          <img className="h-10 w-10" src={logo} alt="" />
          <a className="text-lg md:text-xl font-semibold font-niramit">PrimeLab <br /> <span className="text-xs md:text-sm  text-[#47CCC8]">
          Diagnostic Center</span></a>
          </div>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="gap-5 menu-horizontal px-1">
            {navLinks}
          </ul>
        </div>
        <div className="navbar-end">
          <a className="btn">Button</a>
        </div>
      </div>
    </div>
  );
};

export default NavBar;