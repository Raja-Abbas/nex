import React from "react";
import Logo from "../../assets/images/logo.png";

const HomeNavbar = () => {
  return (
    <div className="bg-background border-b border-line-color">
      <div className="px-2 max-md:px-0 container mx-auto flex justify-between items-center py-[22.5px]">
        <a className="" href="/">
          <img className="max-sm:ml-[10px] w-[106px] h-[19px]" src={Logo} alt="Logo"/>
        </a>
        <div className="flex gap-6 items-center">
          <p className="font-normal text-xl text-dark-blue hidden sm:block">Currently in private beta, invite-only. </p>
          <p className="max-sm:mr-[10px] font-normal text-xl text-description-color cursor-pointer">Login</p>
        </div>
      </div>
    </div>
  );
};

export default HomeNavbar;
