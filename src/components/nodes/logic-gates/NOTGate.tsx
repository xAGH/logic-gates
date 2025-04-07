import { NodeProps } from "reactflow";
import { LogicGateData, SvgSpecifics } from "../../../types/logic-gate-data";
import LogicGate from "./LogicGate";

const NOTGate = (data: NodeProps<LogicGateData>) => {
    const svgSpecifics: SvgSpecifics = {
        width: 70,
        viewBox: {
            xStart: -20,
        },
        inputLine: {
            x1: -20,
            x2: 20,
            margin: 7,
        },
        svg: {
            paths: [{ d: "M 1 2 L 1 38 40 20 1 2 Z" }],
        },
        outputLine: {
            x1: 40,
            x2: 70,
        },
        negated: true,
    };
    return <LogicGate nodeProps={data} svgSpecifics={svgSpecifics} />;
};

export default NOTGate;
