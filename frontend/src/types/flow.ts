export interface IBaseNodeData {
  label: string;
  onEdit?: () => void;
  onContextMenu?: (e: React.MouseEvent) => void;
}

export interface IMessageNodeData extends IBaseNodeData {
  text: string;
}

export interface IButtonNodeData extends IBaseNodeData {
  buttons: Array<{
    label: string;
    targetNodeId: string;
  }>;
}

export interface ITextInputNodeData extends IBaseNodeData {
  placeholder: string;
  variableName: string;
}

export interface IConditionNodeData extends IBaseNodeData {
  expression: string;
}

export interface IApiCallNodeData extends IBaseNodeData {
  url: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  body?: string;
}

export interface ITriggerNodeData extends IBaseNodeData {
}

export type INodeData =
  | IMessageNodeData
  | IButtonNodeData
  | ITextInputNodeData
  | IConditionNodeData
  | IApiCallNodeData
  | ITriggerNodeData;
