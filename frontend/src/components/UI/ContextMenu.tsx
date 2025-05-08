import React, { useEffect, useState } from 'react';
import { Menu, MenuItem } from '@mui/material';

interface ContextMenuProps {
  anchorEl: null | HTMLElement;
  open: boolean;
  onClose: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

const ContextMenu: React.FC<ContextMenuProps> = ({
                                                   anchorEl,
                                                   open,
                                                   onClose,
                                                   onEdit,
                                                   onDelete,
                                                 }) => {
  const [position, setPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  useEffect(() => {
    if (anchorEl) {
      const rect = anchorEl.getBoundingClientRect();
      setPosition({
        x: rect.left + window.scrollX,  // корректируем для скролла
        y: rect.top + window.scrollY,
      });
    }
  }, [anchorEl]);

  return (
    <Menu
      open={open}
      onClose={onClose}
      anchorReference="anchorPosition"
      anchorPosition={position ? { top: position.y, left: position.x } : undefined}
    >
      <MenuItem onClick={onEdit}>Редактировать</MenuItem>
      <MenuItem onClick={onDelete}>Удалить</MenuItem>
    </Menu>
  );
};

export default ContextMenu;
