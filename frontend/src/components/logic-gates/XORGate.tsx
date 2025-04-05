import { NodeProps } from "reactflow";
import { LogicGateData, SvgSpecifics } from "../../types/logic-gate-data";
import LogicGate from "./LogicGate";

const XORGate = ({ data }: NodeProps<LogicGateData>) => {
    const svgSpecifics: SvgSpecifics = {
        width: 60,
        inputLine: {
            x1: 0,
            x2: 10,
            margin: 10,
        },
        svg: {
            paths: [
                { d: "M 1 1 Q 12 21 1 41", fill: false },
                {
                    d: "M 5 1 Q 17 21 5 41 Q 37 41 43.5 21 Q 37 1 5 1 Z",
                },
            ],
        },
        outputLine: {
            x1: 45,
            x2: 60,
            margin: 6,
        },
    };
    return <LogicGate data={data} svgSpecifics={svgSpecifics} />;
};

export default XORGate;
