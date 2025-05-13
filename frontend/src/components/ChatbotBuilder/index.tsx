import React, { useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useTranslation } from 'react-i18next';

import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import SaveIcon from '@mui/icons-material/Save';

import FlowCanvas from "./FlowCanvas";
import NodeSidebar from "./NodeSidebar";
import useUnsavedChangesWarning from '@/hooks/useUnsavedChangesWarning';

import "@xyflow/react/dist/style.css";

const ChatbotBuilder = () => {
  const { t } = useTranslation();
  const { slug } = useParams();
  const canvasRef = useRef();
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  useUnsavedChangesWarning(hasUnsavedChanges);

  const handleSave = () => {
    if (canvasRef.current?.save) {
      canvasRef.current.save();
      setHasUnsavedChanges(false);
    }
  };

  return (
    <div className="h-full flex bg-gray-50">
      {/* Sidebar */}
      <div className="w-72 border-r border-gray-200 bg-white">
        <NodeSidebar />
      </div>

      <Divider orientation="vertical" flexItem />

      <div className="flex-grow bg-white flex flex-col overflow-hidden min-h-screen">
        <div className="flex justify-end items-center p-4 border-b border-gray-200">
          <Button
            onClick={handleSave}
            variant="outlined"
            startIcon={<SaveIcon />}
          >
            {t('flow_builder.buttons.save')}
          </Button>
        </div>

        <div className="flex-grow overflow-hidden">
          <FlowCanvas
            slug={slug}
            ref={canvasRef}
            onChange={() => setHasUnsavedChanges(true)}
          />
        </div>
      </div>
    </div>
  );
};

export default ChatbotBuilder;
