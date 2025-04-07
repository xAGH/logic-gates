import { Connection, Edge, Node } from "reactflow";
import { NODE_TYPES_DATA } from "../constants/nodes";

export const validateConnection = (
    connection: Connection,
    edges: Edge[],
    nodes: Node[]
): boolean => {
    const sourceNode = nodes.find((n) => n.id === connection.source);
    const targetNode = nodes.find((n) => n.id === connection.target);

    if (!sourceNode || !targetNode) return false;

    const targetConfig =
        NODE_TYPES_DATA[targetNode.type as keyof typeof NODE_TYPES_DATA];

    const sourceOutputs = edges.filter(
        (edge) => edge.source === sourceNode.id
    ).length;
    const targetInputs = edges.filter(
        (edge) => edge.target === targetNode.id
    ).length;

    const sourceHasAvailableOutputs = sourceOutputs < 1;
    const targetHasAvailableInputs = targetInputs < targetConfig.inputs;

    return sourceHasAvailableOutputs && targetHasAvailableInputs;
};
