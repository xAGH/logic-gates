import { DraggableItem } from "../../types/sidebar";

export interface DragableItemProps {
    item: DraggableItem;
}

const DragableItem = ({ item }: DragableItemProps) => {
    return (
        <div className="space-y-3">
            <div
                key={item.type}
                className="p-3 bg-surface-2/50 rounded-lg cursor-grab hover:bg-surface-2 active:cursor-grabbing flex flex-col justify-center items-center gap-2"
                draggable
                onDragStart={(e: React.DragEvent) => {
                    e.dataTransfer.setData("application/reactflow", item.type);
                    e.dataTransfer.effectAllowed = "move";
                }}
            >
                <img src={item.icon} alt={item.label} className="w-20" />
                <span className="capitalize font-medium text-on-primary select-none">
                    {item.label}
                </span>
            </div>
        </div>
    );
};

export default DragableItem;
