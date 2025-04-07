import { Node } from "reactflow";
import { getLetterByIndex } from "./getLetterByIndex";

export const updateNodesLabel = (nodes: Node[]): Node[] => {
    let inputNodes = nodes.filter((n) => n.type?.includes("inputNode"));
    let outputNodes = nodes.filter((n) => n.type?.includes("outputNode"));

    return nodes.map((node) => {
        if (inputNodes.includes(node)) {
            const index = inputNodes.indexOf(node);
            return {
                ...node,
                data: {
                    ...node.data,
                    label: getLetterByIndex(index),
                },
            };
        } else if (outputNodes.includes(node)) {
            const index = outputNodes.indexOf(node);
            return {
                ...node,
                data: {
                    ...node.data,
                    label: `OUT-${index + 1}`,
                },
            };
        }
        return node;
    });
};
