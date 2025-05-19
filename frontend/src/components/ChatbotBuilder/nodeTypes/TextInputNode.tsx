import React from 'react';
import Node from './Node';
import type { ITextInputNodeData } from '@/types/flow';

interface TextInputNodeProps {
  data: ITextInputNodeData;
  selected: boolean;
}

const TextInputNode: React.FC<TextInputNodeProps> = ({ data, selected }) => (
  <Node type="textInput" data={data} selected={selected} />
);

export default TextInputNode;
