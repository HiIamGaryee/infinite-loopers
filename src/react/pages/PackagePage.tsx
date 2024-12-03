import React from "react";
import Packages1 from "../assets/Packages1.png";
import Packages2 from "../assets/Packages2.png";

const PackagePage = () => {
  return (
    <div className="min-h-screen bg-orange-50 p-6 flex flex-col items-center space-y-8 ">
      <h1 className="text-center font-bold text-2xl pt-2">Pacakage</h1>
      {/* Premium Plan */}
      <div className="bg-white w-full max-w-md rounded-xl shadow-lg p-6 fade-in-up">
        <img
          src={Packages2}
          alt="Premium Plan Icon"
          className="w-16 h-16 mx-auto mb-4"
        />
        <h3 className="text-xl font-semibold text-center mb-2">Premium Plan</h3>
        <ul className="text-gray-600 text-sm space-y-1 mb-4">
          <li>✔ 6 Tone</li>
          <li>✔ Unlimited Access</li>
        </ul>
        <div className="text-center text-2xl font-bold mb-4">
          $18 <span className="text-lg font-medium">/mo</span>
        </div>
        <button className="w-full bg-orange-500 text-white py-2 rounded-md hover:bg-orange-600 transition">
          Order Now
        </button>
      </div>

      {/* Starter Plan */}
      <div className="bg-white w-full max-w-md rounded-xl shadow-lg p-6 fade-in-up">
        <img
          src={Packages1}
          alt="Starter Plan Icon"
          className="w-16 h-16 mx-auto mb-4"
        />
        <h3 className="text-xl font-semibold text-center mb-2">Member Plan</h3>
        <ul className="text-gray-600 text-sm space-y-1 mb-4">
          <li>✔ 4 Tone</li>
          <li>✔ Access Up to 500 text per months</li>
        </ul>
        <div className="text-center text-2xl font-bold mb-4">
          $0 <span className="text-lg font-medium">/mo</span>
        </div>
        <button className="w-full bg-purple-500 text-white py-2 rounded-md hover:bg-purple-600 transition">
          Order Now
        </button>
      </div>
    </div>
  );
};

export default PackagePage;
