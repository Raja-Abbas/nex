// components/Navbar.js
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import BuildNavbar from "./BuildNavbar";
import HomeNavbar from "./HomeNavbar";

const Navbar = () => {
  const location = useLocation();
  const [navbarContent, setNavbarContent] = useState(null);

  useEffect(() => {
    if (location.pathname === "/") {
      setNavbarContent(<HomeNavbar />);
    } else {
      setNavbarContent(<BuildNavbar />);
    }
  }, [location.pathname]);

  return (
    <div className="bg-background z-[100]">
      {navbarContent}
    </div>
  );
};

export default Navbar;
