import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import BuildNavbar from "./BuildNavbar";
import HomeNavbar from "./HomeNavbar";
import DashboardNavbar from "./DashboardPageNavbar";
import DetailsNavbar from "./DetailsSlugNavbar";
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
    } else if (location.pathname.startsWith("/details/")) {
      setNavbarContent(<DetailsNavbar />);
    }else if (location.pathname.startsWith("/marketplace")) {
      setNavbarContent(<DetailsNavbar />);
    } else {
      setNavbarContent(<BuildNavbar />);
    }
  }, [location.pathname]);

  return (
    <div className="bg-background z-[1000]">
      {navbarContent}
    </div>
  );
};

export default Navbar;
