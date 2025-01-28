import React, { useState } from "react";
import { FaLinkedin, FaGithub, FaCode } from "react-icons/fa";
import { IoIosClose } from "react-icons/io";

const Navbar = () => {
  const [showPopup, setShowPopup] = useState(false);

  const handlePopupToggle = () => {
    setShowPopup(!showPopup);
  };

  return (
    <nav className="bg-gray-100 text-blue-700 p-4 shadow-md">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        {/* Ajackus Company Logo */}
        <a href="/" className="flex items-center">
          <img
            src="https://www.ajackus.com/images/logo-icon-blue.svg"
            alt="Ajackus Logo"
            className="h-10 object-contain"
          />
        </a>

        <button
          onClick={handlePopupToggle}
          className="text-lg font-semibold hover:bg-blue-200 rounded px-4 py-2 transition"
        >
          About Me
        </button>
      </div>

      {/* Social Media Popup */}
      {showPopup && (
        <div className="fixed right-4 mt-2 bg-white shadow-md p-4 rounded-md w-64 z-50">
          <button
            onClick={handlePopupToggle}
            className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
          >
            <IoIosClose size={24} />
          </button>
          <h2 className="text-xl font-bold mb-4 text-center text-blue-700">Connect with Me</h2>
          <div className="flex justify-center space-x-6">
            <a
              href="https://www.linkedin.com/in/anand-goud-8a6009293/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-700 hover:text-blue-900"
            >
              <FaLinkedin size={30} />
            </a>
            <a
              href="https://github.com/Anand95733"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-800 hover:text-black"
            >
              <FaGithub size={30} />
            </a>
            <a
              href="https://leetcode.com/u/goudanand19/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-yellow-500 hover:text-yellow-600"
            >
              <FaCode size={30} />
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
