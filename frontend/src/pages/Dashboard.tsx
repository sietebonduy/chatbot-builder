import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const Dashboard: React.FC = () => {
  const statistics = {
    users: 1200,
    revenue: 24500,
    orders: 675,
    products: 134,
  };

  const chartData = {
    labels: Array.from({ length: 12 }, (_, i) => `Month ${i + 1}`),
    datasets: [
      {
        label: "Revenue",
        data: [1000, 1200, 1400, 1300, 1600, 2000, 2100, 1900, 2200, 2300, 2400, 2500],
        fill: false,
        borderColor: "#3B82F6",
        tension: 0.3,
      },
    ],
  };

  return (
    <div className="w-full min-h-screen bg-gray-100 flex items-center justify-center px-6 py-16">
      <div className="w-full max-w-6xl bg-white p-10 rounded-xl shadow-md">
        <h1 className="text-4xl font-bold mb-6 text-gray-900 text-center">Dashboard</h1>
        <p className="text-center text-gray-600 mb-10">Here’s an overview of your application’s performance.</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          {[
            { title: "Users", value: statistics.users, icon: "👥" },
            { title: "Revenue", value: `$${statistics.revenue}`, icon: "💰" },
            { title: "Orders", value: statistics.orders, icon: "📦" },
            { title: "Products", value: statistics.products, icon: "🛒" },
          ].map((stat, index) => (
            <div key={index} className="bg-gray-50 p-6 rounded-lg border text-center shadow-sm hover:shadow transition">
              <div className="text-3xl mb-2">{stat.icon}</div>
              <div className="text-lg font-medium mb-1">{stat.title}</div>
              <div className="text-2xl font-bold">{stat.value}</div>
            </div>
          ))}
        </div>

        <div className="bg-gray-50 rounded-lg p-6 mb-12 border shadow-sm">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">📈 Revenue Over Time</h2>
          <Line data={chartData} />
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-gray-50 rounded-lg p-6 border shadow-sm">
            <h3 className="text-xl font-semibold mb-4 text-gray-800">🕒 Recent Activity</h3>
            <ul className="space-y-2 text-gray-600">
              {[
                "User 'Denis' added a new product.",
                "Order #4587 was placed by 'John'.",
                "Revenue increased by $200.",
                "Product 'Widget Pro' stock updated.",
              ].map((item, i) => (
                <li key={i}>• {item}</li>
              ))}
            </ul>
          </div>

          <div className="bg-gray-50 rounded-lg p-6 border shadow-sm">
            <h3 className="text-xl font-semibold mb-4 text-gray-800">🔔 Notifications</h3>
            <ul className="space-y-2 text-gray-600">
              {[
                "New comment on your post.",
                "Product 'Smartphone' is back in stock.",
                "Your subscription is about to expire.",
              ].map((item, i) => (
                <li key={i}>• {item}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
