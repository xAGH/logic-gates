import { ComponentSection } from "../types/sidebar";

import andGate from "../assets/andGate.png";
import inputNode from "../assets/inputNode.png";
import nandGate from "../assets/nandGate.png";
import norGate from "../assets/norGate.png";
import notGate from "../assets/notGate.png";
import orGate from "../assets/orGate.png";
import outputNode from "../assets/outputNode.png";
import xnorGate from "../assets/xnorGate.png";
import xorGate from "../assets/xorGate.png";

export const SIDEBAR_DRAGGABLE_ITEMS: ComponentSection[] = [
    {
        sectionName: "Compuertas Lógicas",
        items: [
            {
                label: "AND",
                type: "andGate",
                icon: andGate,
            },
            {
                label: "NAND",
                type: "nandGate",
                icon: nandGate,
            },
            {
                label: "OR",
                type: "orGate",
                icon: orGate,
            },
            {
                label: "NOR",
                type: "norGate",
                icon: norGate,
            },
            {
                label: "XOR",
                type: "xorGate",
                icon: xorGate,
            },
            {
                label: "XNOR",
                type: "xnorGate",
                icon: xnorGate,
            },
            {
                label: "NOT",
                type: "notGate",
                icon: notGate,
            },
        ],
    },
    {
        sectionName: "Entradas",
        items: [
            {
                label: "Estado lógico",
                type: "inputNode",
                icon: inputNode,
            },
        ],
    },
    {
        sectionName: "Salidas",
        items: [
            {
                label: "Salida",
                type: "outputNode",
                icon: outputNode,
            },
        ],
    },
];
