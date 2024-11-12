import React from "react";
import LocationFilter from "./LocationFilter";
import PriceFilter from "./PriceFilter";
import ParentDropDown from "./ParentDropDown";
import SortMenu from "./SortMenu";

interface SearchSidebarProps {
    filters: {
        minPrice: number | null;
        maxPrice: number | null;
        location: string[];
    };
    setFilters: React.Dispatch<React.SetStateAction<any>>;
    sort: any;
    setSort: React.Dispatch<React.SetStateAction<any>>;
    onLocationChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onPriceChange: (event: React.ChangeEvent<HTMLInputElement>, field: 'minPrice' | 'maxPrice') => void;
}

const SearchSidebar: React.FC<SearchSidebarProps> = ({
    filters,
    setFilters,
    sort,
    setSort,
    onLocationChange,
    onPriceChange,
}) => {
    const [isOpen, setIsOpen] = React.useState(true);
    const [filterByOpen, setFilterByOpen] = React.useState(true);
    const [priceFilterOpen, setPriceOpen] = React.useState(true);
    const [locationOpen, setLocationOpen] = React.useState(true);
    const [sortByOpen, setSortByOpen] = React.useState(true);
    const [priceSortOpen, setPriceSortOpen] = React.useState(true);
    const [dateSortOpen, setDateSortOpen] = React.useState(true);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="flex">
            <div className={`left-0 min-w-[25rem] max-w-[25rem] ${isOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300`}>
                <div className="flex flex-col border border-solid border-gray-300 bg-white shadow-lg h-full">
                    <h3 className="p-5 pl-8 text-[1.65rem] font-bold">Filters</h3>

                    <ParentDropDown isOpen={filterByOpen} onToggle={() => setFilterByOpen(!filterByOpen)} text="Filter by">
                        <PriceFilter
                            isOpen={priceFilterOpen}
                            onToggle={() => setPriceOpen(!priceFilterOpen)}
                            onPriceChange={onPriceChange}
                            minPrice={filters.minPrice} // Pass the current minPrice from filters
                            maxPrice={filters.maxPrice} // Pass the current maxPrice from filters
                        />
                        <LocationFilter
                            isOpen={locationOpen}
                            onToggle={() => setLocationOpen(!locationOpen)}
                            checkboxes={filters.location.reduce((acc: Record<string, boolean>, loc: string) => {
                                acc[loc] = true;
                                return acc;
                            }, {})}
                            onCheckboxChange={onLocationChange}
                        />
                    </ParentDropDown>

                    <ParentDropDown isOpen={sortByOpen} onToggle={() => setSortByOpen(!sortByOpen)} text="Sort by">
                        <SortMenu
                            isOpen={priceSortOpen}
                            onToggle={() => setPriceSortOpen(!priceSortOpen)}
                            title="Price"
                            options={["Lowest to Highest", "Highest to Lowest"]}
                            onSelect={(value) => setSort((prevSort: any) => ({ ...prevSort, price: value }))}
                            selectedIndex={["Lowest to Highest", "Highest to Lowest"].indexOf(sort.price)}
                        />
                        <SortMenu
                            isOpen={dateSortOpen}
                            onToggle={() => setDateSortOpen(!dateSortOpen)}
                            title="Date Listed"
                            options={["Most Recent", "Least Recent"]}
                            onSelect={(value) => setSort((prevSort: any) => ({ ...prevSort, date: value }))}
                            selectedIndex={["Most Recent", "Least Recent"].indexOf(sort.date)}
                        />
                    </ParentDropDown>
                </div>
            </div>

            {/* Button to open/close sidebar */}
            <button
                className="h-12 ml-4 mt-4 z-40 px-6 bg-primary text-white-bg transition-all duration-300 shadow-three"
                onClick={toggleSidebar}
                style={{ marginLeft: isOpen ? '0' : '-450px' }}
            >
                {isOpen ? (
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                ) : (
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                    </svg>
                )}
            </button>
        </div>
    );
};

export default SearchSidebar;
