import React, { useRef } from "react";
import { useParams } from "react-router-dom";

import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import SaveIcon from '@mui/icons-material/Save';

import FlowCanvas from "./FlowCanvas";
import NodeSidebar from "./NodeSidebar";

import "@xyflow/react/dist/style.css";

const ChatbotBuilder = () => {
  const { slug } = useParams();
  const canvasRef = useRef();

  const handleSave = () => {
    if (canvasRef.current?.save) {
      canvasRef.current.save();
    }
  };

  return (
    <div className="h-screen flex flex-row bg-gray-50">
      <NodeSidebar/>

      <Divider orientation="vertical" variant="middle" flexItem/>

      <div className="flex-grow bg-white p-4 overflow-hidden">
        <div className="w-full pb-3 px-3 m-auto flex justify-end">
          <Button onClick={handleSave} variant="outlined" startIcon={<SaveIcon/>}>Save</Button>
        </div>

        <FlowCanvas slug={slug} ref={canvasRef}/>
      </div>
    </div>
  );
};

export default ChatbotBuilder;
