import { NodeProps } from "reactflow";
import { LogicGateData, SvgSpecifics } from "../../../types/logic-gate-data";
import LogicGate from "./LogicGate";

const ANDGate = (data: NodeProps<LogicGateData>) => {
    const svgSpecifics: SvgSpecifics = {
        width: 70,
        inputLine: {
            x1: 0,
            x2: 10,
            margin: 6,
        },
        svg: {
            paths: [{ d: "M 10 1 L 28 1 A 16 16 0 1 1 28 41 L 10 41 Z" }],
        },
        outputLine: {
            x1: 48,
            x2: 65,
        },
    };
    return <LogicGate nodeProps={data} svgSpecifics={svgSpecifics} />;
};

export default ANDGate;
