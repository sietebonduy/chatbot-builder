import React from 'react';
import Node from '../Node';
import type { IConditionNodeData } from '@/types/flow';

interface ConditionNodeProps {
  data: IConditionNodeData;
  selected: boolean;
}

const ConditionNode: React.FC<ConditionNodeProps> = ({ data, selected }) => (
  <Node type="condition" data={data} selected={selected} />
);

export default ConditionNode;
