import { Edge, Node } from "reactflow";
import { TruthTable } from "../types/truth-table";

export const generateTruthTables = (
    nodes: Node[],
    edges: Edge[]
): TruthTable[] => {
    const outputNodes = nodes.filter((node) => node.type === "outputNode");

    if (outputNodes.length === 0) return [];

    return outputNodes.map((outputNode) => {
        const inputNodes = findInputNodesForOutput(outputNode.id, nodes, edges);

        const inputCombinations = generateAllInputCombinations(
            inputNodes.length
        );

        const truthTable = inputCombinations.map((combination) => {
            const values = new Map<string, boolean>();

            inputNodes.forEach((node, index) => {
                values.set(node.id, combination[index]);
            });

            const outputValue = calculateNodeValue(
                outputNode.id,
                nodes,
                edges,
                values
            );

            const row: { inputs: boolean[]; output: boolean } = {
                inputs: combination,
                output: outputValue,
            };

            return row;
        });

        return {
            outputNodeId: outputNode.id,
            outputNodeName: outputNode.data.label,
            inputNodes: inputNodes.map((node) => node.data?.label || "Entrada"),
            table: truthTable,
        };
    });
};

const findInputNodesForOutput = (
    outputNodeId: string,
    nodes: Node[],
    edges: Edge[]
): Node[] => {
    const visited = new Set<string>();
    const inputNodes: Node[] = [];

    const traverse = (nodeId: string) => {
        if (visited.has(nodeId)) return;
        visited.add(nodeId);

        const node = nodes.find((n) => n.id === nodeId);
        if (!node) return;

        if (node.type === "inputNode") {
            inputNodes.push(node);
            return;
        }

        const incomingEdges = edges.filter((edge) => edge.target === nodeId);
        incomingEdges.forEach((edge) => {
            traverse(edge.source);
        });
    };

    traverse(outputNodeId);
    return inputNodes;
};

const generateAllInputCombinations = (inputCount: number): boolean[][] => {
    const combinations: boolean[][] = [];
    const total = Math.pow(2, inputCount);

    for (let i = 0; i < total; i++) {
        const combination: boolean[] = [];
        for (let j = 0; j < inputCount; j++) {
            combination.push(Boolean((i >> j) & 1));
        }
        combinations.push(combination);
    }

    return combinations;
};

const calculateNodeValue = (
    nodeId: string,
    nodes: Node[],
    edges: Edge[],
    values: Map<string, boolean>
): boolean => {
    if (values.has(nodeId)) {
        return values.get(nodeId)!;
    }

    const node = nodes.find((n) => n.id === nodeId);
    if (!node) return false;

    if (node.type === "inputNode") {
        return values.get(nodeId)!;
    }

    const incomingEdges = edges.filter((edge) => edge.target === nodeId);
    const inputValues = incomingEdges.map((edge) => {
        return calculateNodeValue(edge.source, nodes, edges, values);
    });

    let result: boolean;
    switch (node.type) {
        case "andGate":
            result = inputValues.every((v) => v);
            break;
        case "orGate":
            result = inputValues.some((v) => v);
            break;
        case "notGate":
            result = !inputValues[0];
            break;
        case "nandGate":
            result = !inputValues.every((v) => v);
            break;
        case "norGate":
            result = !inputValues.some((v) => v);
            break;
        case "xorGate":
            result = inputValues.reduce((a, b) => a !== b, false);
            break;
        case "xnorGate":
            result = inputValues.reduce((a, b) => a === b, true);
            break;
        case "outputNode":
            result = inputValues[0];
            break;
        default:
            result = false;
    }

    values.set(nodeId, result);
    return result;
};
