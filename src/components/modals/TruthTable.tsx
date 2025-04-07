// components/TruthTableModal.tsx
import { saveAs } from "file-saver";
import { X } from "lucide-react";
import { useState } from "react";
import { TruthTable } from "../../types/truth-table";

interface TruthTableModalProps {
    tables: TruthTable[];
    onClose: () => void;
}

const TruthTableModal = ({ tables, onClose }: TruthTableModalProps) => {
    const [activeTab, setActiveTab] = useState(0);

    const downloadTable = () => {
        let csvContent = "";

        tables.forEach((table, tableIndex) => {
            csvContent += `Tabla de Verdad - ${table.outputNodeName}\n`;
            csvContent += table.inputNodes.join(",") + ",Salida\n";

            table.table.forEach((row) => {
                const inputs = row.inputs
                    .map((input) => (input ? "1" : "0"))
                    .join(",");
                const output = row.output ? "1" : "0";
                csvContent += `${inputs},${output}\n`;
            });

            if (tableIndex < tables.length - 1) {
                csvContent += "\n\n";
            }
        });

        const blob = new Blob([csvContent], {
            type: "text/csv;charset=utf-8;",
        });
        saveAs(blob, "tablas_de_verdad.csv");
    };

    return (
        <div className="fixed inset-0 backdrop-blur-sm bg-surface/70 flex justify-center items-center z-50 text-on-surface">
            <div className="rounded-lg shadow-xl w-full max-w-4xl max-h-[80vh] overflow-hidden flex flex-col border border-surface-2 bg-surface">
                {/* Header */}
                <div className="flex justify-between items-center p-4 border-b bg-surface border-surface-2">
                    <h2 className="text-xl font-semibold">Tablas de Verdad</h2>
                    <X
                        className="hover:text-error text-error/40 cursor-pointer focus:outline-none size-5"
                        onClick={onClose}
                    ></X>
                </div>

                {/* Tabs */}
                {tables.length > 1 && (
                    <div className="flex gap-2 min-h-[70px] p-4 overflow-x-auto bg-surface">
                        {tables.map((table, index) => (
                            <button
                                key={table.outputNodeId}
                                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors cursor-pointer ${
                                    activeTab === index
                                        ? "shadow-inner"
                                        : "hover:bg-[var(--color-surface)] border border-surface-2]"
                                }`}
                                style={{
                                    backgroundColor:
                                        activeTab === index
                                            ? "var(--color-primary)"
                                            : "var(--color-surface-2)",
                                    color:
                                        activeTab === index
                                            ? "var(--color-on-primary)"
                                            : "var(--color-on-surface)",
                                    borderColor: "var(--color-surface-2)",
                                }}
                                onClick={() => setActiveTab(index)}
                            >
                                {table.outputNodeName}
                            </button>
                        ))}
                    </div>
                )}

                {/* Table */}
                <div className="flex-1 overflow-auto p-4">
                    <div className="overflow-auto">
                        <table className="min-w-full">
                            <thead>
                                <tr className="bg-surface-2">
                                    {tables[activeTab].inputNodes.map(
                                        (input, i) => (
                                            <th
                                                key={i}
                                                className="px-6 py-3 text-center text-xs font-medium uppercase tracking-wider text-on-surface"
                                            >
                                                {input}
                                            </th>
                                        )
                                    )}
                                    <th className="px-6 py-3 text-center text-xs font-medium uppercase tracking-wider text-on-surface">
                                        Salida
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {tables[activeTab].table.map((row, rowIdx) => (
                                    <tr
                                        key={rowIdx}
                                        className={`bg-${
                                            rowIdx % 2 === 0
                                                ? "surface"
                                                : "surface-2"
                                        }`}
                                    >
                                        {row.inputs.map((input, colIdx) => (
                                            <td
                                                key={colIdx}
                                                className="px-6 py-4 whitespace-nowrap text-sm text-center color-surface"
                                            >
                                                {input ? "1" : "0"}
                                            </td>
                                        ))}
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-center text-on-surface">
                                            {row.output ? "1" : "0"}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Footer */}
                <div className="flex justify-end gap-3 p-4 bg-surface">
                    <button
                        onClick={downloadTable}
                        className="cursor-pointer px-4 py-2 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 ring-accent ring-offset-surface-2 bg-primary/70 hover:bg-primary border-accent text-on-primary"
                    >
                        Descargar CSV
                    </button>
                    <button
                        onClick={onClose}
                        className="cursor-pointer border border-error/40 hover:border-error px-4 py-2 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 ring-surface-2 ring-offset-surface-2"
                    >
                        Cerrar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TruthTableModal;
