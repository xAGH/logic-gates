import { DraggableItem } from "../../types/sidebar";

export interface DragableItemProps {
    item: DraggableItem;
}

const DragableItem = ({ item }: DragableItemProps) => {
    return (
        <div className="space-y-3">
            <div
                key={item.type}
                className="p-3 bg-primary rounded-lg cursor-grab hover:bg-accent active:cursor-grabbing "
                draggable
                onDragStart={(e: React.DragEvent) => {
                    e.dataTransfer.setData("application/reactflow", item.type);
                    e.dataTransfer.effectAllowed = "move";
                }}
            >
                <span className="capitalize font-medium text-on-primary select-none">
                    {item.label}
                </span>
            </div>
        </div>
    );
};

export default DragableItem;
