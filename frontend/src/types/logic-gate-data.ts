export interface LogicGateData {
    inputs: number;
    inputIds?: string[];
    outputId?: string;
    onChangeInputs?: (newCount: number) => void;
    canAddInputs?: boolean;
}

interface Path {
    d: string;
    fill?: boolean;
}

export interface SvgSpecifics {
    width: number;
    inputLine: {
        x1: number;
        x2: number;
        margin?: number;
    };
    svg: {
        paths: Path[];
    };
    outputLine: {
        x1: number;
        x2: number;
        margin?: number;
    };
    negated?: boolean;
}
