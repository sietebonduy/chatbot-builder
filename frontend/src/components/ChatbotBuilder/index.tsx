import React from "react";
import Divider from "@mui/material/Divider";

import FlowCanvas from "./FlowCanvas";
import NodeSidebar from "./NodeSidebar";

import "@xyflow/react/dist/style.css";

const ChatbotBuilder = () => {
  return (
    <div className="h-screen flex flex-row bg-gray-50">
      <NodeSidebar />

      <Divider orientation="vertical" variant="middle" flexItem />

      <div className="flex-grow bg-white p-4 overflow-hidden">
        <FlowCanvas />
      </div>
    </div>
  );
};

export default ChatbotBuilder;
