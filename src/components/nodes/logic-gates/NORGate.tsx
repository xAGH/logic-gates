import { NodeProps } from "reactflow";
import { LogicGateData, SvgSpecifics } from "../../../types/logic-gate-data";
import LogicGate from "./LogicGate";

const NORGate = (data: NodeProps<LogicGateData>) => {
    const svgSpecifics: SvgSpecifics = {
        width: 70,
        inputLine: {
            x1: 10,
            x2: 20,
        },
        svg: {
            paths: [
                {
                    d: "M 15 1 Q 25 21 15 41 Q 45 41 52.5 21 Q 45 1 15 1 Z",
                },
            ],
        },
        outputLine: {
            x1: 52.5,
            x2: 70,
            margin: 6,
        },
        negated: true,
    };
    return <LogicGate nodeProps={data} svgSpecifics={svgSpecifics} />;
};

export default NORGate;
