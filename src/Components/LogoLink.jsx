import React from "react";
import logo from '../../src/assets/logo/Logo.png'

const LogoLink = () => {
  return (
   <div className="flex items-center space-x-3">
  <img src={logo} alt="Logo" className="h-8 w-8 sm:h-12 sm:w-12" />
  <p className="text-blue-900 font-bold text-base sm:text-lg">
    WhereIsIt
  </p>
</div>

  );
};

export default LogoLink;
