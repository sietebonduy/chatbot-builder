import React from 'react';
import Node from '../Node';
import type { ITriggerNodeData } from '@/types/flow';

interface TriggerNodeProps {
  data: ITriggerNodeData;
  selected: boolean;
}

const TriggerNode: React.FC<TriggerNodeProps> = ({ data, selected }) => (
  <Node type="trigger" data={data} selected={selected} />
);

export default TriggerNode;
