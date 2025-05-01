import React from "react";

const Profile: React.FC = () => {
  return (
    <div className="w-full min-h-screen bg-gray-100 flex items-center justify-center px-6 py-16">
      <div className="w-full max-w-3xl bg-white p-10 rounded-xl shadow-md">
        <h1 className="text-4xl font-bold mb-6 text-gray-900 text-center">Your Profile</h1>
        <p className="text-center text-gray-600 mb-10">Manage your personal information and preferences.</p>

        <form className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
            <input
              type="text"
              defaultValue="John Doe"
              className="w-full px-4 py-2 border rounded-md shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition"
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
};

export default Profile;
