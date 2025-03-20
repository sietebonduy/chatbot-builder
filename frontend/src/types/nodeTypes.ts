import MessageNode from '../components/editor/MessageNode';
import ConditionNode from '../components/editor/ConditionNode';
import ButtonNode from '../components/editor/ButtonNode';

export interface INodeTypes {
  message: typeof MessageNode;
  condition: typeof ConditionNode;
  button: typeof ButtonNode;
}
