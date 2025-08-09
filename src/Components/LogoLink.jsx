import React from "react";
import logo from '../../src/assets/logo/Logo.png'

const LogoLink = () => {
  return (
   <div className='flex'>
            <img src={logo} alt="Logo" className='h-12 w-12' />
            <p className='text-blue-900 font-semibold mt-5 text-lg'>WhereIsIt</p>
        </div>
  );
};

export default LogoLink;
