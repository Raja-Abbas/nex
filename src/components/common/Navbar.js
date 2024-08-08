import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import BuildNavbar from "./BuildNavbar";
import HomeNavbar from "./HomeNavbar";
import DashboardNavbar from "./DashboardPageNavbar";
const Navbar = () => {
  const location = useLocation();
  const [navbarContent, setNavbarContent] = useState(null);

  useEffect(() => {
    if (location.pathname === "/") {
      setNavbarContent(<HomeNavbar />);
    } else if (location.pathname === "/build") {
      setNavbarContent(<BuildNavbar />);
    } else if (location.pathname === "/dashboard/refer-a-friend") {
      setNavbarContent(<DashboardNavbar />);
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
