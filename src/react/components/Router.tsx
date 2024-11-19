import React from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import BurgerMenu from "../components/BurgerMenu";
import ProfilePage from "../assets/ProfilePage";
import AboutUsPage from "../assets/AboutUsPage";
import SettingsPage from "../assets/SettingsPage";
import HomePage from "../assets/HomePage";

const AppRouter = () => {
  return (
    <Router>
      <BurgerMenu />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/about-us" element={<AboutUsPage />} />
        <Route path="/settings" element={<SettingsPage />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
