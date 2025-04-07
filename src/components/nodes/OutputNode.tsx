import { NodeProps } from "reactflow";
import { LogicGateData, SvgSpecifics } from "../../types/logic-gate-data";
import LogicGate from "./logic-gates/LogicGate";

const OutputNode = (nodeProps: NodeProps<LogicGateData>) => {
    const svgSpecifics: SvgSpecifics = {
        width: 100,
        inputLine: {
            x1: 0,
            x2: 15,
            margin: 6,
        },
        svg: {
            paths: [
                {
                    d: "M 15 1 H 85 V 41 H 15 Z",
                },
            ],
        },
        outputLine: {
            x1: 85,
            x2: 100,
        },
    };

    return (
        <LogicGate nodeProps={nodeProps} svgSpecifics={svgSpecifics}>
            <div
                className="absolute z-10 h-full flex justify-center items-center"
                style={{
                    paddingLeft: `${
                        (svgSpecifics.inputLine.margin ?? 0) + 20
                    }px`,

                    paddingBottom: "8px",
                }}
            >
                <span
                    className={`size-5 font-bold pointer-events-none text-surface w-full`}
                >
                    {nodeProps.data.label}
                </span>
            </div>
        </LogicGate>
    );
};

export default OutputNode;
