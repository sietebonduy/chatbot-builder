import React, { useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { ReactFlowProvider } from '@xyflow/react';

import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import SaveIcon from '@mui/icons-material/Save';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import FlowCanvas from "./FlowCanvas";
import NodeSidebar from "./NodeSidebar";
import useUnsavedChangesWarning from '@/hooks/useUnsavedChangesWarning';

import "@xyflow/react/dist/style.css";

const ChatbotBuilder = () => {
  const { t } = useTranslation();
  const { slug } = useParams();
  const navigate = useNavigate();
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
    <ReactFlowProvider>
      <div className="h-full flex bg-gray-50">
        <div className="w-72 border-r border-gray-200 bg-white">
          <NodeSidebar />
        </div>

        <Divider orientation="vertical" flexItem />

        <div className="flex-grow bg-white flex flex-col overflow-hidden min-h-screen">
          <div className="flex justify-start items-center px-6 py-3 border-b border-gray-100 bg-gray-50 gap-3">
            <Button
              onClick={() => navigate(-1)}
              variant="ghost"
              startIcon={<ArrowBackIcon/>}
            >
              Назад
            </Button>

            <Button
              onClick={handleSave}
              variant="primary"
              startIcon={<SaveIcon/>}
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
    </ReactFlowProvider>
  );
};

export default ChatbotBuilder;
