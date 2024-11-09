import React, { useState } from "react";
import PriceFilter from "./PriceFilter";
import CampusFilter from "./CampusFilter";
import ParentDropDown from "./ParentDropDown";
import SortMenu from "./SortMenu";

const SearchSidebar: React.FC = () => {
    const [isOpen, setIsOpen] = useState(true);
    const [filterByOpen, setFilterByOpen] = useState(true);
    const [priceFilterOpen, setPriceOpen] = useState(true);
    const [campusOpen, setCampusOpen] = useState(true);
    const [sortByOpen, setSortByOpen] = useState(true);
    const [priceSortOpen, setPriceSortOpen] = useState(true);

    const [checkboxes, setCheckboxes] = useState<Record<string, boolean>>({
        utsg: false,
        utm: false,
        utsc: false,
    });

    const toggleSidebar = () => setIsOpen(!isOpen);
    const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = event.target;
        setCheckboxes((prev) => ({ ...prev, [name]: checked }));
    };

    return (
        <div className="flex">
            <div className={`left-0 w-full min-w-[300px] ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                <div className="flex flex-col border border-solid border-gray-300 bg-white shadow-lg h-full">
                    <h3 className="p-5 pl-8 text-[1.65rem] font-bold">Filters</h3>

                    <ParentDropDown isOpen={filterByOpen} onToggle={() => setFilterByOpen(!filterByOpen)} text={"Filter by"}>
                        <PriceFilter isOpen={priceFilterOpen} onToggle={() => setPriceOpen(!priceFilterOpen)} />
                        <CampusFilter isOpen={campusOpen} onToggle={() => setCampusOpen(!campusOpen)} checkboxes={checkboxes} onCheckboxChange={handleCheckboxChange} />
                    </ParentDropDown>

                    <ParentDropDown isOpen={sortByOpen} onToggle={() => setSortByOpen(!sortByOpen)} text={"Sort by"}>
                        <SortMenu isOpen={priceSortOpen} onToggle={() => setPriceSortOpen(!priceSortOpen)} title={"Price"} options={["Lowest to Highest", "Highest to Lowest"]} onSelect={function (): void {
                            throw new Error("Function not implemented.");
                        } } />
                        <SortMenu isOpen={priceSortOpen} onToggle={() => setPriceSortOpen(!priceSortOpen)} title={"Date Listed"} options={["Most Recent", "Least Recent"]} onSelect={function (): void {
                            throw new Error("Function not implemented.");
                        } } />
                    </ParentDropDown>
 
                </div>
            </div>

            <button onClick={toggleSidebar} className="h-12 ml-4 mt-4 px-6 bg-primary text-white">
                {isOpen ? 'Close' : 'Open'}
            </button>
        </div>
    );
};

export default SearchSidebar;
