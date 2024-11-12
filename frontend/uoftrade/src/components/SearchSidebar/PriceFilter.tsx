import React from "react";

interface PriceFilterProps {
    isOpen: boolean;
    onToggle: () => void;
    onPriceChange: (event: React.ChangeEvent<HTMLInputElement>, field: 'minPrice' | 'maxPrice') => void;
    minPrice: number | null;
    maxPrice: number | null;
}

const PriceFilter: React.FC<PriceFilterProps> = ({ isOpen, onToggle, onPriceChange, minPrice, maxPrice }) => (
    <div className="p-3 pl-8 w-full hover:bg-light-grey">
        <button onClick={onToggle} className="flex justify-between w-full text-left">
            Price
            <span>{isOpen ? '▲' : '▼'}</span>
        </button>
        {isOpen && (
            <div className="flex gap-2 mt-2">
                <input
                    type="text"
                    placeholder="Min"
                    className="border rounded p-1 w-[10rem]"
                    value={minPrice ?? ''} // Bind to minPrice
                    onChange={(e) => onPriceChange(e, 'minPrice')}
                />
                <input
                    type="text"
                    placeholder="Max"
                    className="border rounded p-1 w-[10rem]"
                    value={maxPrice ?? ''} // Bind to maxPrice
                    onChange={(e) => onPriceChange(e, 'maxPrice')}
                />
            </div>
        )}
    </div>
);

export default PriceFilter;
