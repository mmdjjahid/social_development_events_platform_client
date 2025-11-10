import React, { useContext } from "react";
import { Link, NavLink, useNavigate } from "react-router";
import avatar from "../assets/Avatar.png"
import { AuthContext } from "../Context/CreateContext";

const NavBar = () => {
    const {user,logOut, setUser, loading} = useContext(AuthContext)
    const navigate = useNavigate();

  const handleLogout = async () => {
    await logOut();
    setUser("");
    navigate("/");
  };
    console.log(user)
  const links = (
    <>
      <li>
        <NavLink>Upcoming Events</NavLink>
      </li>
    </>
  );
  return (
    <div className="z-10 bg-base-100 shadow-sm ">
      <nav className="navbar w-11/12 mx-auto my-0">
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
                {" "}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />{" "}
              </svg>
            </div>
            <ul
              tabIndex="-1"
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              {links}
            </ul>
          </div>
          <Link to={"/"} className="btn btn-ghost text-xl">Social Events</Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{links}</ul>
        </div>
        <div className="navbar-end gap-3">
            {loading ? <span className="loading loading-spinner loading-xl"></span>:
            user ?
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img
                  alt="Tailwind CSS Navbar component"
                  src={user.photoURL ? user.photoURL : avatar}
                  title={user.displayName}
                />
              </div>
            </div>
            <ul
              tabIndex="-1"
              className=" menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
              
            >
              
              <li>
                <Link to={"/createEvent"}>Create Event</Link>
              </li>
              <li>
                <Link>Manage Events</Link>
              </li>
              <li>
                <Link>Joined Events</Link>
              </li>
              <li>
                <button onClick={handleLogout}>Logout</button>
              </li>
            </ul>
          </div>
          :
          <Link to={"/login"} className="btn-primary">Login</Link>
}        </div>
      </nav>
    </div>
  );
};

export default NavBar;
