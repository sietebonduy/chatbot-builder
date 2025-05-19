import React from 'react';
import Node from '../Node';
import type { IApiCallNodeData } from '@/types/flow';

interface ApiCallNodeProps {
  data: IApiCallNodeData;
  selected: boolean;
}

const APICallNode: React.FC<ApiCallNodeProps> = ({ data, selected }) => (
  <Node type="apiCall" data={data} selected={selected} />
);

export default APICallNode;
