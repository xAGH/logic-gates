export interface LogicGateData {
    inputs: number;
    hasOutput: boolean;
    canAddInputs: boolean;
    onChangeInputs?: (newCount: number) => void;
    label?: string;
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
    viewBox?: {
        xStart?: number;
    };
}
