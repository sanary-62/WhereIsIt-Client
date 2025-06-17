// src/components/shared/LogoLink.jsx
import React from "react";
import { NavLink } from "react-router-dom";

const LogoLink = () => {
  return (
    <NavLink to="/" className="flex items-center gap-2">
      <img
        src="/src/assets/818-8181280_lost-png-lost-and-found-icon.png" 
        alt="Logo"
        className="h-12 w-12"
      />
      <span className="btn btn-ghost text-xl normal-case">WhereIsIt</span>
    </NavLink>
  );
};

export default LogoLink;
