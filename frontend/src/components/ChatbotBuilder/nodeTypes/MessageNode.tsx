import React from 'react';
import Node from '../Node';
import type { IMessageNodeData } from '@/types/flow';

interface MessageNodeProps {
  data: IMessageNodeData;
  selected: boolean;
}

const MessageNode: React.FC<MessageNodeProps> = ({ data, selected }) => (
  <Node type="message" data={data} selected={selected} />
);

export default MessageNode;