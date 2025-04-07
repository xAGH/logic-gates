import { useCallback, useEffect, useState } from "react";
import { Node, ReactFlowInstance } from "reactflow";

export const useNodeVisibility = (
    nodes: Node[],
    reactFlowInstance: ReactFlowInstance | null
) => {
    const [showCenterButton, setShowCenterButton] = useState(false);

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

        const isAnyNodeVisible = nodes.some(
            ({ position: { x, y } }) =>
                x >= viewLeft &&
                x <= viewRight &&
                y >= viewTop &&
                y <= viewBottom
        );

        setShowCenterButton(!isAnyNodeVisible && nodes.length != 0);
    }, [nodes, reactFlowInstance]);

    const centerAllNodes = useCallback(() => {
        reactFlowInstance?.fitView({ duration: 1000 });
        setShowCenterButton(false);
    }, [reactFlowInstance]);

    useEffect(() => {
        checkIfNodesAreVisible();
    }, [checkIfNodesAreVisible]);

    return { showCenterButton, checkIfNodesAreVisible, centerAllNodes };
};
