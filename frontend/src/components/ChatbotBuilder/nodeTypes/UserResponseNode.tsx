import React from 'react';
import Node from '../Node';
import type { IBaseNodeData } from '@/types/flow';

interface UserResponseNodeProps {
  data: IBaseNodeData;
  selected: boolean;
}

const UserResponseNode: React.FC<UserResponseNodeProps> = ({ data, selected }) => (
  <Node type="userResponse" data={data} selected={selected} />
);

export default UserResponseNode;
