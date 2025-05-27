import React from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Typography, Divider } from '@mui/material';
import NodeSelector from './NodeSelector';

const NodeSidebar: React.FC = () => {
  const { t } = useTranslation();

  return (
    <Box sx={{ width: 280, borderRight: 1, borderColor: 'divider', overflowY: 'auto', marginTop: '5px' }}>
      <Box p={2}>
        <Typography variant="h6">{t('flow_builder.node_selector.title')}</Typography>
        <Divider sx={{ mb: 2 }} />
        <NodeSelector />
      </Box>
    </Box>
  );
};

export default NodeSidebar;
