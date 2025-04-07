import "reactflow/dist/style.css";

import { useCallback, useState } from "react";
import ReactFlow, {
    addEdge,
    applyNodeChanges,
    Background,
    BackgroundVariant,
    Connection,
    MiniMap,
    Node,
    NodeChange,
    ReactFlowInstance,
    useEdgesState,
    useNodesState,
} from "reactflow";
import { NODE_TYPES, NODE_TYPES_DATA } from "../constants/nodes";
import FloatButton from "./FitViewButton";

import { useNodeVisibility } from "../hooks/useNodeVisibility";

import { EDGE_TYPES } from "../constants/edges";
import { useTruthTableButtonVisibility } from "../hooks/useTruthTableButtonVisibility";
import { generateTruthTables } from "../logic/generateTruthTable";
import { TruthTable } from "../types/truth-table";
import { updateNodesLabel } from "../utils/updateLogicStateLabel";
import { validateConnection } from "../utils/validateConnection";
import TruthTableModal from "./modals/TruthTable";
import Sidebar from "./sidebar/Sidebar";

const Flow = () => {
    const [nodes, setNodes] = useNodesState([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);
    const [reactFlowInstance, setReactFlowInstance] =
        useState<ReactFlowInstance | null>(null);
    const { showCenterButton, checkIfNodesAreVisible, centerAllNodes } =
        useNodeVisibility(nodes, reactFlowInstance);

    const { showTruthTableButton } = useTruthTableButtonVisibility(
        showCenterButton,
        nodes
    );

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [truthTables, setTruthTables] = useState<TruthTable[]>([]);

    const onConnect = useCallback(
        (connection: Connection) => {
            if (validateConnection(connection, edges, nodes)) {
                const edge = {
                    ...connection,
                    animated: true,
                    id: `${connection.source}-${
                        connection.target
                    }-${Date.now()}`,
                    type: "deletableEdge",
                };
                setEdges((eds) => addEdge(edge, eds));
            }
        },
        [edges, nodes, setEdges]
    );

    const onDragOver = useCallback((event: React.DragEvent) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = "move";
    }, []);

    const onDrop = useCallback(
        (event: React.DragEvent) => {
            event.preventDefault();
            console.log(event.dataTransfer);
            if (!reactFlowInstance) return;

            const reactFlowBounds = event.currentTarget.getBoundingClientRect();
            const type = event.dataTransfer.getData("application/reactflow");
            const position = reactFlowInstance.screenToFlowPosition({
                x: event.clientX - reactFlowBounds.left,
                y: event.clientY - reactFlowBounds.top,
            });

            const newNode: Node = {
                id: `${type}-${Date.now()}`,
                type,
                position,
                data: NODE_TYPES_DATA[type as keyof typeof NODE_TYPES_DATA],
            };

            console.log(newNode);

            setNodes((nds) => nds.concat(newNode));
        },
        [reactFlowInstance, setNodes]
    );

    const onNodeClick = (_: React.MouseEvent, node: any) => {
        reactFlowInstance?.deleteElements({ nodes: [{ id: node.id }] });
    };

    const onNodesChange = useCallback((changes: NodeChange[]) => {
        setNodes((nds) => {
            const updated = applyNodeChanges(changes, nds);
            return updateNodesLabel(updated);
        });
    }, []);

    const generateAndOpenTruthTables = useCallback(() => {
        const tables = generateTruthTables(nodes, edges);
        setTruthTables(tables);
        setIsModalOpen(true);
    }, [nodes, edges]);

    const closeModal = useCallback(() => {
        setIsModalOpen(false);
    }, []);

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
                    onMoveEnd={() => (checkIfNodesAreVisible as () => void)()}
                    onNodeClick={onNodeClick}
                    nodeTypes={NODE_TYPES}
                    edgeTypes={EDGE_TYPES}
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
                        position="top-right"
                        nodeColor={"var(--color-surface)"}
                        maskColor="var(--color-surface)"
                        style={{
                            backgroundColor: "var(--color-background)",
                        }}
                    />
                </ReactFlow>
                {showCenterButton && (
                    <FloatButton
                        label="Volver al contenido"
                        onClick={centerAllNodes as () => void}
                    />
                )}

                {showTruthTableButton && (
                    <FloatButton
                        label="Generar Tablas de Verdad"
                        onClick={generateAndOpenTruthTables as () => void}
                    />
                )}

                {isModalOpen && (
                    <TruthTableModal
                        tables={truthTables}
                        onClose={closeModal}
                    />
                )}
            </div>
        </div>
    );
};

export default function () {
    return <Flow />;
}
