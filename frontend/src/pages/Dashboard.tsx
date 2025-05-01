import { useEffect, useState } from "react";
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
  const [statistics, setStatistics] = useState({
    users: 1200,
    revenue: 24500,
    orders: 675,
    products: 134,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setStatistics((prev) => ({
        users: prev.users + Math.floor(Math.random() * 10),
        revenue: prev.revenue + Math.floor(Math.random() * 500),
        orders: prev.orders + Math.floor(Math.random() * 5),
        products: prev.products + Math.floor(Math.random() * 2),
      }));
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  const chartData = {
    labels: Array.from({ length: 12 }, (_, i) => `Month ${i + 1}`),
    datasets: [
      {
        label: "Revenue",
        data: Array.from({ length: 12 }, () => Math.floor(Math.random() * 1000)),
        fill: false,
        borderColor: "#6B7280", // muted gray
        tension: 0.3,
      },
    ],
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-blue-200 to-blue-400 flex items-center justify-center px-6 py-20">
      <div className="w-full max-w-5xl bg-white/20 backdrop-blur-sm text-gray-800 p-10 rounded-2xl shadow-xl">
        <h1 className="text-4xl font-bold mb-10 text-center text-gray-800">Overview</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          {[
            { title: "Users", value: statistics.users, icon: "👥" },
            { title: "Revenue", value: `$${statistics.revenue}`, icon: "💰" },
            { title: "Orders", value: statistics.orders, icon: "📦" },
            { title: "Products", value: statistics.products, icon: "🛒" },
          ].map((stat, index) => (
            <div
              key={index}
              className="bg-white/30 p-6 rounded-xl text-center shadow-md hover:bg-white/40 transition-all"
            >
              <div className="text-4xl mb-2">{stat.icon}</div>
              <div className="text-lg font-semibold">{stat.title}</div>
              <div className="text-2xl font-bold">{stat.value}</div>
            </div>
          ))}
        </div>

        <div className="bg-white/30 rounded-xl p-6 mb-12 shadow-md">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">📈 Sales Over Time</h2>
          <div className="bg-white/10 rounded-lg p-4">
            <Line data={chartData} />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white/30 rounded-xl p-6 shadow-md">
            <h3 className="text-xl font-semibold mb-4 text-gray-800">🕒 Recent Activity</h3>
            <ul className="space-y-2 text-gray-600">
              {[
                "User 'Denis' added a new product.",
                "Order #4587 was placed by 'John'.",
                "Revenue increased by $200 in the last hour.",
                "Product 'Widget Pro' stock updated.",
              ].map((item, i) => (
                <li key={i}>• {item}</li>
              ))}
            </ul>
          </div>

          <div className="bg-white/30 rounded-xl p-6 shadow-md">
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
