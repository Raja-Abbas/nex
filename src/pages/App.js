import React, { useEffect } from "react";
import {
  HashRouter as Router,
  Route,
  Routes,
  useLocation,
  Navigate,
} from "react-router-dom";
import BuildPage from "./BuildPage";
import HomePage from "./HomePage";
import Footer from "../components/common/footer/Footer";
import BrokenPage from "../components/common/404/404";
import "../App.css";
import Navbar from "../components/common/navbar/Navbar";
import DashboardPage from "./DashboardPage";
import DynamicPage from "./Details/[...slug]";
import MarketPlace from "./MarketPlace";
import Refer from "./dashboard/refer";

import { initializeTagManager } from "../gtm/gtm";

function App() {
  const location = useLocation();

  useEffect(() => {
    initializeTagManager();

    if (window.location.pathname === "/marketplace") {
      window.location.replace("/#/marketplace");
    }
  }, []);

  const isDynamicPage = location.pathname.startsWith("/details/");
  const isMarketPlace = location.pathname === "/marketplace";
  const isBuildPlace = location.pathname === "/build";

  const backgroundClass = isMarketPlace
    ? "bg-[#031113] overflow-hidden"
    : isDynamicPage
    ? "bg-[#031113] overflow-y-auto"
    : isBuildPlace
    ? "overflow-hidden background-svg bg-background"
    : "bg-background background-svg overflow-y-auto";

  return (
    <div className="min-h-screen scrollbar max-h-screen flex flex-col">
      <Navbar />
      <div
        className={`relative flex-1 ${backgroundClass} flex justify-center mb-[0px] max-h-[calc(100vh-60px)]`}
      >
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/build" element={<BuildPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="*" element={<BrokenPage />} />
          <Route path="/details/:slug" element={<DynamicPage />} />
          <Route path="/marketplace" element={<MarketPlace />} />
          <Route path="/dashboard/refer-a-friend" element={<Refer />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

function AppWrapper() {
  return (
    <Router basename="/">
      <App />
    </Router>
  );
}

export default AppWrapper;
