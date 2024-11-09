import React from "react";

interface SortMenuProps {
    isOpen: boolean;
    title: string;
    options: string[];
    onToggle: () => void;
    onSelect: (selectedOption: string) => void;
    selectedIndex: number;
}

const SortMenu: React.FC<SortMenuProps> = ({
    isOpen,
    onToggle,
    onSelect,
    title,
    options,
    selectedIndex,
}) => (
    <div className="p-3 pl-8 w-full hover:bg-dark-grey">
        <button onClick={onToggle} className="flex justify-between w-full text-left">
            {title}
            <span>{isOpen ? '▲' : '▼'}</span>
        </button>
        {isOpen && (
            <div className="pl-4">
                <div className="my-2">
                    {options.map((label, index) => (
                        <button
                            key={index}
                            onClick={() => onSelect(label)} // Pass the selected option label
                            className={`block mt-1 text-sm ${
                                selectedIndex === index ? "underline" : ""
                            }`}
                        >
                            {label}
                        </button>
                    ))}
                </div>
            </div>
        )}
    </div>
);

export default SortMenu;
