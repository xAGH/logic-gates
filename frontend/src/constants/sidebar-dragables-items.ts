import { ComponentSection } from "../types/sidebar";

export const SIDEBAR_DRAGGABLE_ITEMS: ComponentSection[] = [
    {
        sectionName: "Compuertas Lógicas",
        items: [
            {
                label: "AND",
                type: "andGate",
            },
            {
                label: "NAND",
                type: "nandGate",
            },
            {
                label: "OR",
                type: "orGate",
            },
            {
                label: "NOR",
                type: "norGate",
            },
            {
                label: "XOR",
                type: "xorGate",
            },
            {
                label: "XNOR",
                type: "xnorGate",
            },
            {
                label: "NOT",
                type: "notGate",
            },
        ],
    },
    {
        sectionName: "Entradas",
        items: [
            {
                label: "Entrada",
                type: "input",
            },
        ],
    },
    {
        sectionName: "Salidas",
        items: [
            {
                label: "Salida",
                type: "ouput",
            },
        ],
    },
];
