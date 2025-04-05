export interface DraggableItem {
    label: string;
    type: string;
}

export interface ComponentSection {
    sectionName: string;
    items: DraggableItem[];
}
