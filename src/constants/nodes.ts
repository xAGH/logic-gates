import {
    ANDGate,
    InputNode,
    NANDGate,
    NORGate,
    NOTGate,
    ORGate,
    XNORGate,
    XORGate,
} from "../components/nodes";
import OutputNode from "../components/nodes/OutputNode";
import { LogicGateData } from "../types/logic-gate-data";

const multipleInputs: LogicGateData = {
    inputs: 2,
    canAddInputs: true,
    hasOutput: true,
};

const oneInput: LogicGateData = {
    inputs: 1,
    canAddInputs: false,
    hasOutput: true,
};

export const NODE_TYPES_DATA: { [key: string]: LogicGateData } = {
    andGate: multipleInputs,
    nandGate: multipleInputs,
    orGate: multipleInputs,
    norGate: multipleInputs,
    xorGate: multipleInputs,
    xnorGate: multipleInputs,
    notGate: oneInput,
    inputNode: { ...oneInput, inputs: 0, label: "A" },
    outputNode: { ...oneInput, hasOutput: false },
} as const;

export const NODE_TYPES = {
    andGate: ANDGate,
    nandGate: NANDGate,
    orGate: ORGate,
    norGate: NORGate,
    xorGate: XORGate,
    xnorGate: XNORGate,
    notGate: NOTGate,
    inputNode: InputNode,
    outputNode: OutputNode,
} as const;
