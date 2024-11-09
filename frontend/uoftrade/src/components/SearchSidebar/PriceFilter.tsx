import React from "react";

interface PriceFilterProps {
    isOpen: boolean;
    onToggle: () => void;
}

const PriceFilter: React.FC<PriceFilterProps> = ({ isOpen, onToggle }) => (
    <div className="p-3 pl-8 w-full hover:bg-dark-grey">
        <button onClick={onToggle} className="flex justify-between w-full text-left">
            Price
            <span>{isOpen ? '▲' : '▼'}</span>
        </button>
        {isOpen && (
            <div className="flex gap-2 mt-2">
                <input type="text" placeholder="Min" className="border rounded p-1 w-[10rem]" />
                <input type="text" placeholder="Max" className="border rounded p-1 w-[10rem]" />
            </div>
        )}
    </div>
);

export default PriceFilter;
