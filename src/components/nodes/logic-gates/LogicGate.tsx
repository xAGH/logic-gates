import { Handle, NodeProps, Position } from "reactflow";
import { LogicGateData, SvgSpecifics } from "../../../types/logic-gate-data";

interface LogicGateProps {
    nodeProps: NodeProps<LogicGateData>;
    svgSpecifics: SvgSpecifics;
    children?: React.ReactNode;
}

const LogicGate = ({ nodeProps, svgSpecifics, children }: LogicGateProps) => {
    const data = nodeProps.data;
    const inputCount = data.inputs;
    const outputId = `out_${nodeProps.id}`;
    const inputIds = Array.from(
        { length: inputCount },
        (_, i) => `in_${i}_${nodeProps.id}`
    );
    const gateHeight = 42;
    const spacing = gateHeight / (inputCount + 1);
    const inputPositions = Array.from(
        { length: inputCount },
        (_, i) => spacing * (i + 1)
    );
    const fillColor = "var(--color-on-surface)";
    const xStart = svgSpecifics.viewBox?.xStart ?? 0;
    const xRange = svgSpecifics.width - xStart;
    const handleStyle = {
        background: "var(--color-primary)",
        width: "10px",
        height: "10px",
        border: "2px solid var(--color-surface)",
        borderRadius: "50%",
    };
    const connectorStyle = {
        stroke: "var(--color-surface)",
        strokeWidth: 3,
        strokeLinecap: "round" as const,
    };

    return (
        <>
            {children}
            <div
                style={{ position: "relative", width: "100%", height: "100%" }}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    version="1.1"
                    preserveAspectRatio="none"
                    x="0px"
                    y="0px"
                    width={svgSpecifics.width}
                    height={gateHeight + 2}
                    viewBox={`${xStart} 0 ${xRange} ${gateHeight + 2}`}
                >
                    {inputPositions.map((yPos, index) => (
                        <line
                            key={`input-${index}`}
                            x1={svgSpecifics.inputLine.x1}
                            y1={yPos}
                            x2={svgSpecifics.inputLine.x2}
                            y2={yPos}
                            {...connectorStyle}
                        />
                    ))}

                    {svgSpecifics.svg.paths.map((path, index) => {
                        return (
                            <path
                                key={`path-${index}`}
                                strokeLinejoin="miter"
                                transform="translate(0, 0)"
                                d={path.d}
                                fill={path.fill === false ? "none" : fillColor}
                                {...connectorStyle}
                            />
                        );
                    })}

                    {data.hasOutput && (
                        <line
                            x1={svgSpecifics.outputLine.x1}
                            y1={gateHeight / 2}
                            x2={svgSpecifics.outputLine.x2}
                            y2={gateHeight / 2}
                            {...connectorStyle}
                        />
                    )}

                    {svgSpecifics.negated && (
                        <>
                            <circle
                                cx={svgSpecifics.outputLine.x1 + 5}
                                cy={gateHeight / 2}
                                r="4"
                                fill="var(--color-on-surface)"
                                stroke="var(--color-surface)"
                                strokeWidth="2"
                            />
                            <line
                                x1={svgSpecifics.outputLine.x1 + 13}
                                y1={gateHeight / 2}
                                x2={svgSpecifics.outputLine.x2}
                                y2={gateHeight / 2}
                                {...connectorStyle}
                            />
                        </>
                    )}
                </svg>

                {/* Entradas - Posición dinámica */}
                {inputIds.map((id, index) => {
                    const positionPercent =
                        ((index + 1) * 100) / (inputCount + 1);
                    return (
                        <Handle
                            key={id}
                            type="target"
                            position={Position.Left}
                            id={id}
                            style={{
                                ...handleStyle,
                                top: `${positionPercent}%`,
                                left: `-${
                                    svgSpecifics.inputLine.margin ?? 0
                                }px`,
                            }}
                        />
                    );
                })}

                {/* Salida - Centrada */}
                {data.hasOutput && (
                    <Handle
                        type="source"
                        position={Position.Right}
                        id={outputId}
                        style={{
                            ...handleStyle,
                            top: "50%",
                            right: `-${svgSpecifics.outputLine.margin ?? 0}px`,
                        }}
                    />
                )}
            </div>
        </>
    );
};

export default LogicGate;
