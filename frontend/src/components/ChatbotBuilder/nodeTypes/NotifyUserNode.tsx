import React from 'react';
import Node from './Node';
import type { INotifyUserNodeData } from '@/types/flow';

interface NotifyUserNodeProps {
  data: INotifyUserNodeData;
  selected: boolean;
}

const NotifyUserNode: React.FC<NotifyUserNodeProps> = ({ data, selected }) => (
  <Node type="notifyUser" data={data} selected={selected} />
);

export default NotifyUserNode;
