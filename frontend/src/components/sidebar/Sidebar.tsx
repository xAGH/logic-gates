import { useEffect, useRef, useState } from "react";
import { SIDEBAR_DRAGGABLE_ITEMS } from "../../constants/sidebar-dragables-items";
import DragableItem from "./DragableItem";
import SidebarSearch from "./SidebarSearch";

const Sidebar = () => {
    const [sidebarWidth, setSidebarWidth] = useState<number>(250);
    const [isResizing, setIsResizing] = useState<boolean>(false);
    const [searchTerm, setSearchTerm] = useState<string>("");

    const sidebarRef = useRef<HTMLDivElement>(null);
    const startXRef = useRef<number>(0);
    const startWidthRef = useRef<number>(0);

    const startResizing = (e: React.MouseEvent) => {
        setIsResizing(true);
        startXRef.current = e.clientX;
        startWidthRef.current = sidebarWidth;
        document.body.style.cursor = "col-resize";
        document.body.style.userSelect = "none";
    };

    const stopResizing = () => {
        if (isResizing) {
            setIsResizing(false);
            document.body.style.cursor = "";
            document.body.style.userSelect = "";
        }
    };

    const resize = (e: MouseEvent) => {
        if (isResizing && sidebarRef.current) {
            const deltaX = e.clientX - startXRef.current;
            const newWidth = startWidthRef.current + deltaX;
            setSidebarWidth(Math.max(200, Math.min(newWidth, 500)));
        }
    };

    useEffect(() => {
        window.addEventListener("mousemove", resize);
        window.addEventListener("mouseup", stopResizing);

        return () => {
            window.removeEventListener("mousemove", resize);
            window.removeEventListener("mouseup", stopResizing);
        };
    }, [isResizing]);

    const filteredItems = SIDEBAR_DRAGGABLE_ITEMS.map((section) => ({
        ...section,
        items: section.items.filter((item) =>
            item.label.toLowerCase().includes(searchTerm.toLowerCase())
        ),
    })).filter((section) => section.items.length > 0);

    return (
        <aside
            ref={sidebarRef}
            className={`shadow-md relative transition-[width] duration-100 bg-surface ${
                isResizing ? "transition-none" : ""
            }`}
            style={{ width: `${sidebarWidth}px` }}
        >
            <div className="h-full overflow-y-auto p-4">
                <SidebarSearch
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                />

                {filteredItems.map((item) => (
                    <div key={item.sectionName}>
                        <h2 className="text-lg font-semibold mb-2 text-on-surface select-none">
                            {item.sectionName}
                        </h2>

                        <div className="space-y-3 mb-6">
                            {item.items.map((component) => (
                                <DragableItem
                                    key={component.type}
                                    item={component}
                                />
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            <div
                className={`absolute right-0 top-0 bottom-0 hover:w-2 hover:bg-surface-2 bg-surface-2
                    cursor-col-resize transition-all duration-150 ${
                        isResizing ? "w-2" : "w-1.5"
                    }`}
                onMouseDown={startResizing}
                title="Redimensionar sidebar"
            />
        </aside>
    );
};

export default Sidebar;
