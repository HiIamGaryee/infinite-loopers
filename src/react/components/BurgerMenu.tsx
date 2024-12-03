import React, { useState } from "react";
import {
  IconMenu2,
  IconUser,
  IconInfoCircle,
  IconSettings,
  IconArrowBack,
  IconHome,
  IconGift,
} from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";

const BurgerMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  // Define navigation links as an array
  const navLinks = [
    {
      label: "Home",
      icon: <IconHome className="mr-4" />,
      path: "/",
    },
    // {
    //   label: "Profile",
    //   icon: <IconUser className="mr-4" />,
    //   path: "/profile",
    // },
    {
      label: "About Us",
      icon: <IconInfoCircle className="mr-4" />,
      path: "/about-us",
    },
    {
      label: "Packages",
      icon: <IconGift className="mr-4" />,
      path: "/package",
    },
    {
      label: "Features",
      icon: <IconSettings className="mr-4" />,
      path: "/settings",
    },
  ];

  return (
    <>
      {/* Burger Icon */}
      <button
        className="fixed top-4 left-4 bg-gray-800 text-white p-2 rounded-md shadow-md"
        onClick={toggleSidebar}
      >
        <IconMenu2 size={24} />
      </button>

      <div
        className={`fixed top-0 left-0 h-full z-50 bg-black text-white w-64 transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out shadow-lg`}
      >
        <div className="p-4 flex items-center">
          <IconArrowBack
            size={24}
            className="cursor-pointer"
            onClick={handleClose}
          />
          <h2 className="ml-4 text-xl font-bold">Navigation</h2>
        </div>
        <div className="mt-6">
          {navLinks.map((link, index) => (
            <div
              key={index}
              className="p-4 hover:bg-gray-700 cursor-pointer flex items-center"
              onClick={() => {
                navigate(link.path); // Navigate to the specified path
                handleClose(); // Close the sidebar
              }}
            >
              {link.icon}
              {link.label}
            </div>
          ))}
        </div>
      </div>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={handleClose}
        />
      )}
    </>
  );
};

export default BurgerMenu;
