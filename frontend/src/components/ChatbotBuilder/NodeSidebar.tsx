import React from "react";
import { Box, Typography, Divider } from '@mui/material';
import NodeSelector from './NodeSelector';

const NodeSidebar: React.FC = () => (
  <Box
    sx={{
      height: '100%',
      bgcolor: 'background.paper',
      borderRight: 1,
      borderColor: 'divider',
      overflowY: 'auto'
    }}
  >
    <Box p={2}>
      <Typography variant="h6" gutterBottom>
        Компоненты
      </Typography>
      <Divider sx={{ mb: 2 }} />
      <NodeSelector />
    </Box>
  </Box>
);

export default NodeSidebar;
