import { NodeProps } from "reactflow";
import { LogicGateData, SvgSpecifics } from "../../types/logic-gate-data";
import LogicGate from "./logic-gates/LogicGate";

const InputNode = (nodeProps: NodeProps<LogicGateData>) => {
    const svgSpecifics: SvgSpecifics = {
        width: 70,
        inputLine: {
            x1: 0,
            x2: 10,
            margin: 6,
        },
        svg: {
            paths: [
                {
                    d: "M 10 1 H 50 V 41 H 10 Z",
                },
            ],
        },
        outputLine: {
            x1: 50,
            x2: 65,
        },
    };

    return (
        <LogicGate nodeProps={nodeProps} svgSpecifics={svgSpecifics}>
            <div
                className="absolute z-10 h-full flex justify-center items-center"
                style={{
                    paddingLeft: `${
                        (svgSpecifics.inputLine.margin ?? 0) + 19
                    }px`,

                    paddingBottom: "8px",
                }}
            >
                <span
                    className={`size-5 font-bold pointer-events-none text-surface`}
                >
                    {nodeProps.data.label || "?"}
                </span>
            </div>
        </LogicGate>
    );
};

export default InputNode;
