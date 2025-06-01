import React from 'react';
import Node from './Node';
import type { IFinishNodeData } from '@/types/flow';

interface FinishNodeProps {
  data: IFinishNodeData;
  selected: boolean;
}

const FinishNode: React.FC<FinishNodeProps> = ({ data, selected }) => (
  <Node type="finish" data={data} selected={selected} />
);

export default FinishNode;
