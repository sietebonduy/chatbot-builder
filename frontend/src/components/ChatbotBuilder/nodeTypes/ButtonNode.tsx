import React from 'react';
import Node from '../Node';
import type { IButtonNodeData } from '@/types/flow';

interface ButtonNodeProps {
  data: IButtonNodeData;
  selected: boolean;
}

const ButtonNode: React.FC<ButtonNodeProps> = ({ data, selected }) => (
  <Node type="button" data={data} selected={selected} />
);

export default ButtonNode;
