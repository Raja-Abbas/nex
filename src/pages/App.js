import React from "react";
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import BuildPage from "./BuildPage";
import HomePage from "./HomePage";
import Footer from "../components/common/Footer";
import BrokenPage from "../components/common/404";
import '../App.css';
import Navbar from "../components/common/Navbar";
import DashboardPage from "./DashboardPage";
import DynamicPage from "./Details/[...slug]";
import MarketPlace from "./MarketPlace";
import Refer from "./dashboard/refer";
function App() {
  const location = useLocation();
  const isDynamicPage = location.pathname.startsWith("/details/");
  const isMarketPlace = location.pathname === "/marketplace";
  const backgroundClass = isMarketPlace
    ? "bg-[#031113] overflow-hidden"
    : isDynamicPage
    ? "bg-[#031113] overflow-y-auto"
    : "bg-background background-svg overflow-y-auto";
  return (
    <div className="min-h-screen scrollbar max-h-screen flex flex-col">
      <Navbar />
      <div className={`relative flex-1 ${backgroundClass} flex justify-center`}>
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
    <Router>
      <App />
    </Router>
  );
}

export default AppWrapper;
