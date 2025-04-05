import { Search } from "lucide-react";
import React from "react";

interface SidebarSearchProps {
    searchTerm: string;
    setSearchTerm: (value: string) => void;
}

const SidebarSearch: React.FC<SidebarSearchProps> = ({
    searchTerm,
    setSearchTerm,
}) => {
    return (
        <div className="bg-surface-2 flex items-center gap-2 p-2 rounded-sm mb-4">
            <Search className="w-5 h-5 text-on-surface" />
            <input
                type="text"
                placeholder="Buscar..."
                className="w-full bg-transparent p-1 text-on-surface placeholder-gray-500 focus:outline-none"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
        </div>
    );
};

export default SidebarSearch;
