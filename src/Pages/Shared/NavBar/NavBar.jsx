import { Link, NavLink } from "react-router-dom";
import logo from "../../../assets/logo.png";
import useAuth from "../../../Hooks/useAuth";
import useAdmin from "../../../Hooks/useAdmin";
import useStatus from "../../../Hooks/useStatus";
const NavBar = () => {
  const [isAdmin]=useAdmin()
  const  [status] = useStatus()
 
  const { user, logOut } = useAuth();
  const handleLogOut = () => {
    logOut()
      .then(() => {})
      .catch((error) => console.log(error));
  };
  const navLinks = (
    <>
      <li>
        <NavLink
          className={({ isActive }) =>
            isActive
              ? "font-semibold text-lg text-[#47CCC8]   "
              : " font-semibold hover:text-[#47CCC8] transition hover:text-xl   text-lg"
          }
          to="/"
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          className={({ isActive }) =>
            isActive
              ? "font-semibold text-lg text-[#47CCC8]   "
              : " font-semibold hover:text-[#47CCC8] transition hover:text-xl   text-lg"
          }
          to="/allTests"
        >
          Tests
        </NavLink>
      </li>
      <li>
        <NavLink
          className={({ isActive }) =>
            isActive
              ? "font-semibold text-lg text-[#47CCC8]   "
              : " font-semibold hover:text-[#47CCC8] transition hover:text-xl   text-lg"
          }
          to="/aboutUs"
        >
          About Us
        </NavLink>
      </li>
      {user && status !== 'blocked' && (<>{isAdmin  ? (<> <li>
        <NavLink
          className={({ isActive }) =>
            isActive
              ? "font-semibold text-lg text-[#47CCC8]   "
              : " font-semibold hover:text-[#47CCC8] transition hover:text-xl   text-lg"
          }
          to="/dashboard/statistics"
        >
          Admin Dashboard
        </NavLink>
      </li></>):(<><li>
      {" "}
      <NavLink
        className={({ isActive }) =>
          isActive
            ? "font-semibold text-lg text-[#47CCC8]   "
            : " font-semibold hover:text-[#47CCC8] transition hover:text-xl  text-lg"
        }
        to="/dashboard/myProfile"
      >
        User Dashboard
      </NavLink>
    </li></>)}</>)}
      
     
    </>
  );
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
          <Link to="/">
          <div className="flex items-center gap-3">
            <img className="h-10 w-10" src={logo} alt="" />
            <a className="text-lg md:text-xl font-semibold font-niramit">
              PrimeLab <br />{" "}
              <span className="text-xs md:text-sm  text-[#47CCC8]">
                Diagnostic Center
              </span>
            </a>
          </div></Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="gap-5 menu-horizontal px-1">{navLinks}</ul>
        </div>
        <div className="navbar-end">
          {user ? (
            <>
              <div className="dropdown dropdown-end">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-ghost btn-circle avatar tooltip hover:tooltip-open tooltip-left "
                  data-tip={user?.displayName || "no name available"}
                >
                  <div className="w-10 rounded-full ">
                    <img
                      alt="Tailwind CSS Navbar component"
                      src={
                        user?.photoURL ||
                        "https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                      }
                    />
                  </div>
                </div>
                <ul
                  tabIndex={0}
                  className="mt-3 z-[10] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-60  text-lg"
                >
                  <li>
                    <a>{user?.email || "email not found"}</a>
                  </li>

                  <li className="text-[#3A516E]">
                    <button onClick={handleLogOut}>Logout</button>
                  </li>
                </ul>
              </div>
            </>
          ) : (
            <>
              <Link to="/login">
                <button
                  className="btn rounded-full px-6  dark:bg-[#47CCC8] dark:text-gray-50
            hover:text-[#2d3663] hover:bg-gray-50 lg:mr-2"
                >
                  Log in
                </button>
              </Link>
              <Link to="/signup">
                <button
                  className="btn rounded-full px-6 hidden md:inline-block dark:bg-[#47CCC8] dark:text-gray-50
            hover:text-[#2d3663] hover:bg-gray-50"
                >
                  Sign up
                </button>
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default NavBar;
