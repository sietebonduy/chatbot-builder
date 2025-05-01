import React from "react";

const Settings: React.FC = () => {
  return (
    <div className="w-full min-h-screen bg-gray-100 flex items-center justify-center px-6 py-16">
      <div className="w-full max-w-4xl bg-white p-10 rounded-xl shadow-md">
        <h1 className="text-4xl font-bold mb-6 text-gray-900 text-center">Settings</h1>
        <p className="text-center text-gray-600 mb-10">Manage your application preferences and security settings.</p>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">⚙️ General</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Language</label>
              <select className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-400">
                <option>English</option>
                <option>Русский</option>
                <option>Español</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Timezone</label>
              <select className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-400">
                <option>GMT +0</option>
                <option>GMT +3 (Moscow)</option>
                <option>GMT -5 (New York)</option>
              </select>
            </div>
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">🔒 Security</h2>
          <div className="space-y-4">
            <button className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-4 rounded-md transition">
              Change Password
            </button>
            <button className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-4 rounded-md transition">
              Enable Two-Factor Authentication
            </button>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">🔔 Notifications</h2>
          <div className="space-y-4">
            <label className="flex items-center space-x-3">
              <input type="checkbox" defaultChecked className="form-checkbox h-5 w-5 text-blue-600" />
              <span className="text-gray-700">Email alerts for activity</span>
            </label>
            <label className="flex items-center space-x-3">
              <input type="checkbox" className="form-checkbox h-5 w-5 text-blue-600" />
              <span className="text-gray-700">Product updates</span>
            </label>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Settings;
