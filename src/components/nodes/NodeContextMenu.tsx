// components/NodeContextMenu.tsx
import { useEffect } from "react";
import { NODE_TYPES_DATA } from "../../constants/nodes";

interface NodeContextMenuProps {
    nodeId: string;
    nodeType: string;
    x: number;
    y: number;
    onClose: () => void;
    onAddInput: (nodeId: string) => void;
}

const NodeContextMenu = ({
    nodeId,
    nodeType,
    x,
    y,
    onClose,
    onAddInput,
}: NodeContextMenuProps) => {
    const nodeConfig =
        NODE_TYPES_DATA[nodeType as keyof typeof NODE_TYPES_DATA];

    const handleDelete = () => {
        // deleteElements({ nodes: [{ id: nodeId }] });
        onClose();
    };

    const handleAddInput = () => {
        onAddInput(nodeId);
        onClose();
    };

    useEffect(() => console.log("ljkshsd"), []);

    return (
        <div
            className="absolute bg-surface border border-surface-2 rounded-md shadow-lg z-50"
            style={{
                top: y,
                left: x,
                minWidth: "200px",
            }}
            onClick={(e) => e.stopPropagation()}
        >
            <div className="p-2">
                <button
                    className="w-full text-left px-4 py-2 hover:bg-surface-2 rounded text-on-surface"
                    onClick={handleDelete}
                >
                    Eliminar nodo
                </button>

                {nodeConfig.inputs > 1 && (
                    <button
                        className="w-full text-left px-4 py-2 hover:bg-surface-2 rounded text-on-surface"
                        onClick={handleAddInput}
                    >
                        Añadir entrada
                    </button>
                )}
            </div>
        </div>
    );
};

export default NodeContextMenu;
