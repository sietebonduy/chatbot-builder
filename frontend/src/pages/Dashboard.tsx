import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
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
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
      },
    ],
  };

  return (
    <div className="flex flex-col bg-gray-100 px-36 py-16 overflow-hidden">
      <div className="flex-1 space-y-6 overflow-auto">
        <div className="text-3xl font-semibold mb-6">Overview</div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {[
            {title: "Users", value: statistics.users, icon: "👥", color: "bg-indigo-600"},
            {title: "Revenue", value: `$${statistics.revenue}`, icon: "💰", color: "bg-green-600"},
            {title: "Orders", value: statistics.orders, icon: "📦", color: "bg-yellow-600"},
            {title: "Products", value: statistics.products, icon: "🛒", color: "bg-purple-600"},
          ].map((stat, index) => (
            <div
              key={index}
              className={`p-6 rounded-lg shadow-md flex items-center justify-between ${stat.color}`}
            >
              <div className="text-white">
                <div className="text-xl font-bold">{stat.title}</div>
                <div className="text-3xl">{stat.value}</div>
              </div>
              <div className="text-4xl text-white">{stat.icon}</div>
            </div>
          ))}
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="text-xl font-semibold mb-4">Sales Over Time</div>
          <div className="h-64 p-4 rounded-lg">
            <Line data={chartData}/>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="text-xl font-semibold mb-4">Recent Activity</div>
          <ul className="space-y-4">
            {[
              "User 'Denis' added a new product.",
              "Order #4587 was placed by 'John'.",
              "Revenue increased by $200 in the last hour.",
              "Product 'Widget Pro' stock updated.",
            ].map((activity, index) => (
              <li key={index} className="text-gray-600">
                {activity}
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="text-xl font-semibold mb-4">Notifications</div>
          <ul className="space-y-4">
            {[
              "New comment on your post.",
              "Product 'Smartphone' is back in stock.",
              "Your subscription is about to expire.",
            ].map((notification, index) => (
              <li key={index} className="text-gray-600">
                {notification}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
