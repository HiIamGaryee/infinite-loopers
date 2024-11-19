import React from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import BurgerMenu from "../components/BurgerMenu";
import ProfilePage from "../pages/ProfilePage";
import AboutUsPage from "../pages/AboutUsPage";
import SettingsPage from "../pages/SettingsPage";
import HomePage from "../pages/HomePage";
import PackagePage from "../pages/PackagePage";

const AppRouter = () => {
  return (
    <Router>
      <BurgerMenu />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/about-us" element={<AboutUsPage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/package" element={<PackagePage />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
