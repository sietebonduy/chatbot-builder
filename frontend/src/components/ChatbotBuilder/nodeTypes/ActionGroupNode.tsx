import React from 'react';
import { Box, Paper, Typography, IconButton, Divider } from '@mui/material';
import { FaTrash, FaPlus } from 'react-icons/fa';

export interface Action {
  id: string;
  type: 'message' | 'button' | 'apiCall' | 'media';
  data: any;
}

export interface ActionGroupNodeProps {
  data: {
    actions: Action[];
    onContextMenu: (e: React.MouseEvent, actionId?: string, mode?: 'add' | 'edit') => void;
  };
}

const ActionGroupNode: React.FC<ActionGroupNodeProps> = ({ data }) => {
  return (
    <Paper
      onContextMenu={(e) => data.onContextMenu(e)}
      sx={{
        p: 1,
        minWidth: 220,
        bgcolor: '#fafafa',
        border: '1px solid #ccc',
      }}
      elevation={0}
    >
      <Typography variant="subtitle2">Группа действий</Typography>
      <Divider sx={{ my: 1 }} />
      <Box>
        {data.actions.map((act, idx) => (
          <Paper
            key={act.id}
            sx={{
              p: 1,
              mb: 1,
              border: '1px dashed #bbb',
              position: 'relative',
            }}
            variant="outlined"
          >
            <Typography variant="caption">{`${idx + 1}. ${act.type}`}</Typography>
            <IconButton
              size="small"
              sx={{ position: 'absolute', top: 4, right: 4 }}
              onClick={(e) => data.onContextMenu(e, act.id, 'edit')}
            >
              <FaPlus fontSize={10} />
            </IconButton>
            <IconButton
              size="small"
              sx={{ position: 'absolute', top: 4, right: 28 }}
              onClick={(e) => data.onContextMenu(e, act.id, 'add')}
            >
              <FaTrash fontSize={10} />
            </IconButton>
          </Paper>
        ))}
      </Box>
      <IconButton
        size="small"
        onClick={(e) => data.onContextMenu(e, undefined, 'add')}
      >
        <FaPlus />
      </IconButton>

      <Handle type="target" position={Position.Top} style={{ background: '#555' }} />
      <Handle
        type="source"
        position={Position.Bottom}
        style={{ background: '#555' }}
      />
    </Paper>
  );
};

export default ActionGroupNode;
