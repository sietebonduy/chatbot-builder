import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { index as fetchFlows } from "@/api/repositories/ChatbotFlowRepository";

const ChatbotFlowListPage = () => {
  const [flows, setFlows] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchFlows()
      .then((res) => setFlows(res.data || []))
      .catch((err) => console.error("Ошибка загрузки флоу:", err));
  }, []);

  return (
    <div className="max-w-3xl mx-auto p-8">
      <h1 className="text-2xl font-bold mb-6">Выберите флоу чат-бота</h1>
      <div className="grid gap-4">
        {flows.map((flow) => (
          <div
            key={flow.id}
            className="p-4 bg-white border rounded-lg hover:bg-gray-50 cursor-pointer shadow-sm"
            onClick={() => navigate(`/chatbot_flows/${flow.slug}/edit`)}
          >
            <h2 className="text-lg font-semibold">{flow.name || `Flow #${flow.id}`}</h2>
            <p className="text-sm text-gray-500">{flow.description || "Без описания"}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatbotFlowListPage;
