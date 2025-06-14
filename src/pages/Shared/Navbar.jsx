import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext/AuthProvider";

const Navbar = () => {
  const { user, signOutUser } = useContext(AuthContext);
  const handleSignOut = () => {
    signOutUser()
      .then(() => {
        console.log("signed Out user");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const links = (
    <>
  <li>
    <NavLink to="/">Home</NavLink>
  </li>
  <li>
    <NavLink to="/addItems">AddItems</NavLink>
  </li>
</>

  );

  return (
    <div className="navbar bg-base-100 shadow-sm">
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
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-blue-600 rounded-box z-1 mt-3 w-52 p-2 "
          >
            {links}
          </ul>
        </div>
        <div className="gap-0 flex ml-16">
          <img
            src="/src/assets/818-8181280_lost-png-lost-and-found-icon.png"
            alt=""
            className="h-12 w-12"
          />
          <a className="btn btn-ghost text-xl">WhereIsIt</a>
        </div>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 ">{links}</ul>
      </div>
      <div className="navbar-end gap-3 mr-16">
        {user ? (
          <button onClick={handleSignOut} className="btn text-white bg-red-700">
            SignOut
          </button>
        ) : (
          <>
            <NavLink className="btn bg-blue-900 text-white" to="/register">
              Register
            </NavLink>
            <NavLink className="btn bg-blue-900 text-white" to="/login">
              Login
            </NavLink>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
