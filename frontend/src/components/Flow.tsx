import "reactflow/dist/style.css";

import { useCallback, useEffect, useState } from "react";
import ReactFlow, {
    addEdge,
    Background,
    BackgroundVariant,
    Connection,
    MiniMap,
    Node,
    ReactFlowInstance,
    useEdgesState,
    useNodesState,
} from "reactflow";
import { NODE_TYPES, NODE_TYPES_DATA } from "../constants/nodes";
import FitViewButton from "./FitViewButton";
import Sidebar from "./sidebar/Sidebar";

const Flow = () => {
    const [nodes, setNodes, onNodesChange] = useNodesState([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);
    const [reactFlowInstance, setReactFlowInstance] =
        useState<ReactFlowInstance | null>(null);
    const [showCenterButton, setShowCenterButton] = useState(false);

    const onConnect = useCallback(
        (connection: Connection) => setEdges((eds) => addEdge(connection, eds)),
        [setEdges]
    );

    const onDragOver = useCallback((event: React.DragEvent) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = "move";
    }, []);

    const onDrop = useCallback(
        (event: React.DragEvent) => {
            event.preventDefault();

            if (!reactFlowInstance) return;

            const reactFlowBounds = event.currentTarget.getBoundingClientRect();
            const type = event.dataTransfer.getData("application/reactflow");
            const position = reactFlowInstance.project({
                x: event.clientX - reactFlowBounds.left,
                y: event.clientY - reactFlowBounds.top,
            });

            const newNode: Node = {
                id: `${type}-${Date.now()}`,
                type,
                position,
                data: NODE_TYPES_DATA[type as keyof typeof NODE_TYPES_DATA],
            };

            setNodes((nds) => nds.concat(newNode));
        },
        [reactFlowInstance, setNodes]
    );

    const checkIfNodesAreVisible = useCallback(() => {
        if (!reactFlowInstance) return;

        const viewport = reactFlowInstance.getViewport();
        const bounds = document
            .querySelector(".react-flow__viewport")
            ?.getBoundingClientRect();

        if (!bounds) return;

        const padding = 50;
        const viewLeft = -viewport.x / viewport.zoom - padding;
        const viewTop = -viewport.y / viewport.zoom - padding;
        const viewRight = viewLeft + bounds.width / viewport.zoom + 2 * padding;
        const viewBottom =
            viewTop + bounds.height / viewport.zoom + 2 * padding;

        const isAnyNodeVisible = nodes.some((node) => {
            const { x, y } = node.position;
            return (
                x >= viewLeft &&
                x <= viewRight &&
                y >= viewTop &&
                y <= viewBottom
            );
        });

        setShowCenterButton(!isAnyNodeVisible);
    }, [nodes, reactFlowInstance]);

    useEffect(() => {
        checkIfNodesAreVisible();
    }, [nodes, reactFlowInstance]);

    // useEffect(() => {
    //     if (reactFlowInstance) {
    //         reactFlowInstance.fitView({ duration: 0 });
    //     }
    // }, [reactFlowInstance]);

    return (
        <div style={{ display: "flex", height: "100vh" }}>
            <Sidebar />
            <div style={{ flexGrow: 1 }}>
                <ReactFlow
                    defaultViewport={{ x: 0, y: 0, zoom: 2 }}
                    className="bg-background"
                    nodes={nodes}
                    edges={edges}
                    onNodesChange={onNodesChange}
                    onEdgesChange={onEdgesChange}
                    onConnect={onConnect}
                    onInit={setReactFlowInstance}
                    onDrop={onDrop}
                    onDragOver={onDragOver}
                    onMoveEnd={checkIfNodesAreVisible}
                    nodeTypes={NODE_TYPES}
                >
                    <Background
                        color="var(--color-surface)"
                        variant={BackgroundVariant.Dots}
                        gap={30}
                        size={3}
                    />
                    <MiniMap
                        pannable
                        zoomable
                        nodeColor={"var(--color-surface)"}
                        maskColor="var(--color-surface)"
                        style={{
                            backgroundColor: "var(--color-background)",
                        }}
                    />
                </ReactFlow>
                {showCenterButton && nodes.length > 0 && (
                    <FitViewButton
                        onClick={() => {
                            reactFlowInstance?.fitView({ duration: 1000 });
                            setShowCenterButton(false);
                        }}
                    />
                )}
            </div>
        </div>
    );
};

export default function () {
    return <Flow />;
}
