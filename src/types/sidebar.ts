export interface DraggableItem {
    label: string;
    type: string;
    icon: any;
}

export interface ComponentSection {
    sectionName: string;
    items: DraggableItem[];
}
