export interface TruthTable {
    outputNodeId: string;
    outputNodeName: string;
    inputNodes: string[];
    table: { inputs: boolean[]; output: boolean }[];
}
