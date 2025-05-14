import React, { useRef, useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import { ReactFlowProvider } from '@xyflow/react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import SaveIcon from '@mui/icons-material/Save';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Box from '@mui/material/Box';

import FlowCanvas, { FlowCanvasHandle } from "./FlowCanvas";
import NodeSidebar from "./NodeSidebar";
import useUnsavedChangesWarning from '@/hooks/useUnsavedChangesWarning';

import "@xyflow/react/dist/style.css";

const ChatbotBuilder: React.FC = () => {
  const { t } = useTranslation();
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  const canvasRef = useRef<FlowCanvasHandle>(null);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (hasUnsavedChanges) {
        e.preventDefault();
        e.returnValue = '';
      }
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [hasUnsavedChanges]);

  useUnsavedChangesWarning(hasUnsavedChanges);

  const handleSave = () => {
    if (canvasRef.current) {
      canvasRef.current.save();
      setHasUnsavedChanges(false);
    }
  };

  const handleBack = () => {
    if (hasUnsavedChanges) {
      const confirmLeave = window.confirm(t('flow_builder.leave_confirm'));
      if (!confirmLeave) return;
    }
    navigate(-1);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <ReactFlowProvider>
        <Box display="flex" height="100vh" bgcolor="background.default">
          {/* Sidebar */}
          <Box width={280} borderRight={1} borderColor="divider" bgcolor="background.paper">
            <NodeSidebar />
          </Box>

          <Divider orientation="vertical" />

          <Box flexGrow={1} display="flex" flexDirection="column">
            <Box display="flex" alignItems="center" px={2} py={1} borderBottom={1} borderColor="divider" bgcolor="background.paper">
              <Button
                onClick={handleBack}
                variant="text"
                startIcon={<ArrowBackIcon />}
              >
                {t('common.back')}
              </Button>
              <Box flexGrow={1} />
              <Button
                onClick={handleSave}
                variant="contained"
                color="primary"
                startIcon={<SaveIcon />}
                disabled={!hasUnsavedChanges}
              >
                {t('flow_builder.buttons.save')}
              </Button>
            </Box>

            <Box flexGrow={1} position="relative">
              <FlowCanvas
                slug={slug!}
                ref={canvasRef}
                onChange={() => setHasUnsavedChanges(true)}
              />
            </Box>
          </Box>
        </Box>
      </ReactFlowProvider>
    </DndProvider>
  );
};

export default ChatbotBuilder;
