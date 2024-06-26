import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import BuildPage from "./BuildPage";
import HomePage from "./HomePage";
import Footer from "../components/common/Footer"; 
import BrokenPage from "../components/common/404";
import '../App.css';
import Navbar from "../components/common/Navbar";
import DashboardPage from "./DashboardPage";


function App() {
  return (
    <Router>
      <div className="min-h-screen max-h-screen flex flex-col">
      <Navbar/>
      <Routes>
      </Routes>
        <div className="relative flex-1 overflow-y-auto scrollbar bg-background background-svg flex justify-center">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/build" element={<BuildPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="*" element={<BrokenPage />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
