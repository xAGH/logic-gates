import { useCallback, useEffect, useState } from "react";
import { Node } from "reactflow";

export const useTruthTableButtonVisibility = (
    isShowingCenterButton: boolean,
    nodes: Node[]
) => {
    const [showTruthTableButton, setShowTruthTableButton] = useState(false);

    const checkButtonVisibility = useCallback(() => {
        const hasOutputNodes = nodes.some((node) => node.type === "outputNode");
        const shouldShow = !isShowingCenterButton && hasOutputNodes;
        setShowTruthTableButton(shouldShow);
    }, [nodes, isShowingCenterButton]);

    useEffect(() => {
        checkButtonVisibility();
    }, [nodes, isShowingCenterButton]);

    return { showTruthTableButton };
};
