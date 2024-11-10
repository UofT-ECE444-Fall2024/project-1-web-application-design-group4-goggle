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
    const [dateSortOpen, setDateSortOpen] = useState(true);

    const [checkboxes, setCheckboxes] = useState<Record<string, boolean>>({
        utsg: true,
        utm: false,
        utsc: false,
    });

    const [selectedPriceSort, setSelectedPriceSort] = useState("Lowest to Highest");
    const [selectedDateSort, setSelectedDateSort] = useState("Most Recent");
    const priceSortOptions = ["Lowest to Highest", "Highest to Lowest"];
    const dateSortOptions = ["Most Recent", "Least Recent"];

    const toggleSidebar = () => setIsOpen(!isOpen);
    const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = event.target;
        setCheckboxes((prev) => ({ ...prev, [name]: checked }));
    };

    const handlePriceSortSelect = (selectedOption: string) => {
        setSelectedPriceSort(selectedOption);
    };

    const handleDateSortSelect = (selectedOption: string) => {
        setSelectedDateSort(selectedOption);
    };

    return (
        <div className="flex">
            <div
                className={`left-0 min-w-[25rem] max-w-[25rem] ${isOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300`}
            >
                <div className="flex flex-col border border-solid border-gray-300 bg-white shadow-lg h-full">
                    <h3 className="p-5 pl-8 text-[1.65rem] font-bold">Filters</h3>

                    <ParentDropDown isOpen={filterByOpen} onToggle={() => setFilterByOpen(!filterByOpen)} text={"Filter by"}>
                        <PriceFilter isOpen={priceFilterOpen} onToggle={() => setPriceOpen(!priceFilterOpen)} />
                        <CampusFilter isOpen={campusOpen} onToggle={() => setCampusOpen(!campusOpen)} checkboxes={checkboxes} onCheckboxChange={handleCheckboxChange} />
                    </ParentDropDown>

                    <ParentDropDown isOpen={sortByOpen} onToggle={() => setSortByOpen(!sortByOpen)} text={"Sort by"}>
                        <SortMenu
                            isOpen={priceSortOpen}
                            onToggle={() => setPriceSortOpen(!priceSortOpen)}
                            title={"Price"}
                            options={priceSortOptions}
                            onSelect={handlePriceSortSelect}
                            selectedIndex={priceSortOptions.indexOf(selectedPriceSort)}
                        />
                        <SortMenu
                            isOpen={dateSortOpen}
                            onToggle={() => setDateSortOpen(!dateSortOpen)}
                            title={"Date Listed"}
                            options={dateSortOptions}
                            onSelect={handleDateSortSelect}
                            selectedIndex={dateSortOptions.indexOf(selectedDateSort)}
                        />
                    </ParentDropDown>
                </div>
            </div>

           <button 
                className="h-12 ml-4 mt-4 z-40 px-6 bg-primary text-white-bg transition-all duration-300 shadow-three" 
                onClick={toggleSidebar}
                style={{ marginLeft: isOpen ? '0' : '-25rem' }} // Adjust position based on sidebar state
            >
                {/* Toggle icon based on isOpen state */}
                {isOpen ? (
                <svg
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12" />
                </svg>
                ) : (
                <svg
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16m-7 6h7" />
                </svg>
                )}
            </button>
        </div>
    );
};

export default SearchSidebar;
