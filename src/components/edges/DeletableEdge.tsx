import { X } from "lucide-react";
import {
    EdgeLabelRenderer,
    EdgeProps,
    getBezierPath,
    useReactFlow,
} from "reactflow";

const DeletableEdge = (props: EdgeProps) => {
    const {
        id,
        sourceX,
        sourceY,
        targetX,
        targetY,
        sourcePosition,
        targetPosition,
        style = {},
        markerEnd,
    } = props;

    const [edgePath, labelX, labelY] = getBezierPath({
        sourceX,
        sourceY,
        targetX,
        targetY,
        sourcePosition,
        targetPosition,
    });

    const { setEdges } = useReactFlow();

    return (
        <>
            <path
                id={id}
                style={style}
                className="react-flow__edge-path"
                d={edgePath}
                markerEnd={markerEnd}
                stroke="var(--color-primary)"
                strokeWidth={2.5}
                fill="none"
            />
            <EdgeLabelRenderer>
                <div
                    style={{
                        position: "absolute",
                        transform: `translate(-50%, -50%) translate(${labelX}px, ${labelY}px)`,
                        pointerEvents: "all",
                        cursor: "pointer",
                        background: "var(--color-surface)",
                        borderRadius: "50%",
                        padding: "2px",
                    }}
                    onClick={() =>
                        setEdges((eds) => eds.filter((edge) => edge.id !== id))
                    }
                >
                    <X size={10} color="var(--color-error)" />
                </div>
            </EdgeLabelRenderer>
        </>
    );
};

export default DeletableEdge;
