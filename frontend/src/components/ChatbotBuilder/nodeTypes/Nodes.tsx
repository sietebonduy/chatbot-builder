import React from 'react';
import Node from './Node';

const MessageNode = ({ data, selected }) => {
  return <Node type="message" selected={selected} data={data} />;
};

const UserResponseNode = ({ data, selected }) => {
  return <Node type="userResponse" selected={selected} data={data} />;
};


const ConditionNode = ({ data, selected }) => {
  return (
    <Node
      type="condition"
      selected={selected}
      data={{
        ...data,
        label: data.label || "Condition",
      }}
    />
  );
};

const ButtonNode = ({ data, selected }) => {
  return (
    <Node
      type="button"
      selected={selected}
      data={{
        ...data,
        label: data.label || "Button",
      }}
    />
  );
};

const TextInputNode = ({ data, selected }) => {
  return (
    <Node
      type="textInput"
      selected={selected}
      data={{
        ...data,
        label: data.label || "Input Field",
      }}
    />
  );
};

const APICallNode = ({ data, selected }) => {
  return (
    <Node
      type="apiCall"
      selected={selected}
      data={{
        ...data,
        label: data.label || "API Call",
      }}
    />
  );
};

const TriggerNode = ({ data, selected }) => {
  return (
    <Node
      type="trigger"
      selected={selected}
      data={{
        ...data,
        label: data.label || "Start",
      }}
    />
  );
};

export {
  MessageNode,
  UserResponseNode,
  ConditionNode,
  ButtonNode,
  TextInputNode,
  APICallNode,
  TriggerNode
};