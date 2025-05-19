import React from 'react';
import { Box, Typography, Divider } from '@mui/material';
import NodeSelector from './NodeSelector';
const NodeSidebar: React.FC = () => (
  <Box sx={{ width:280, borderRight:1, borderColor:'divider', overflowY:'auto', marginTop:'5px' }}>
    <Box p={2}><Typography variant="h6">Компоненты</Typography><Divider sx={{ mb:2 }} /><NodeSelector /></Box>
  </Box>
);
export default NodeSidebar;
