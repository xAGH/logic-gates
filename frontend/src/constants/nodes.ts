import ANDGate from "../components/logic-gates/ANDGate";
import NANDGate from "../components/logic-gates/NANDGate";
import ORGate from "../components/logic-gates/ORGate";
import XORGate from "../components/logic-gates/XORGate";
import { LogicGateData } from "../types/logic-gate-data";

export const NODE_TYPES = {
    andGate: ANDGate,
    nandGate: NANDGate,
    orGate: ORGate,
    // norGate: "norGate",
    xorGate: XORGate,
    // xnorGate: "xnorGate",
    // notGate: "notGate",
    // input: "input",
    // ouput: "ouput",
};

const commonGateData = {
    inputs: 2,
    canAddInputs: true,
};

export const NODE_TYPES_DATA: { [key: string]: LogicGateData } = {
    andGate: commonGateData,
    nandGate: commonGateData,
    orGate: commonGateData,
    // norGate: "norGate",
    xorGate: commonGateData,
    // xnorGate: "xnorGate",
    // notGate: "notGate",
    // input: "input",
    // ouput: "ouput",
};
