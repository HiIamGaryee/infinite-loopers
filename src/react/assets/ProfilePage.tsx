import React from "react";

const ProfilePage = () => {
  return (
    <div className="min-h-screen text-black p-6">
      <div className="flex items-center mb-6">
        <div className="bg-gray-600 rounded-full w-16 h-16 flex items-center justify-center text-xl font-bold">
          T
        </div>

        <div className="ml-4">
          <h2 className="text-2xl font-semibold">Tai Gar Yee</h2>
          <p className="text-sm text-black">Admin</p>
        </div>
      </div>

      {/* Profile Details */}
      <div className="bg-gray-300 rounded-lg shadow-md p-4 mb-4">
        <div className="flex justify-between items-center border-b border-gray-700 pb-2">
          <p className="text-sm text-black">Username</p>
          <p className="text-base text-white font-semibold">User ABC</p>
        </div>
        <div className="flex justify-between items-center border-b border-gray-700 py-2">
          <p className="text-sm text-black">Role</p>
          <p className="text-base text-white font-semibold">Admin</p>
        </div>
        <div className="flex justify-between items-center border-b border-gray-700 py-2">
          <p className="text-sm text-black">Package</p>
          <p className="text-base text-white font-semibold">Member</p>
        </div>
        <div className="flex justify-between items-center pt-2">
          <p className="text-sm text-black">Email</p>
          <p className="text-base text-white font-semibold">xxx@gmail.com</p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-6">
        <button className="w-full bg-red-500 text-black py-2 rounded-lg shadow-md hover:bg-red-600 transition">
          Remove Account
        </button>
      </div>
    </div>
  );
};

export default ProfilePage;
