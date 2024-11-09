'use client'

import React, { useState } from "react";

const SearchSidebar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [filterByOpen, setFilterByOpen] = useState(false);
    const [priceOpen, setPriceOpen] = useState(false);
    const [campusOpen, setCampusOpen] = useState(false);
    const [sortByOpen, setSortByOpen] = useState(false);

    const toggleSidebar = () => setIsOpen(!isOpen);
    const toggleFilterBy = () => setFilterByOpen(!filterByOpen);
    const togglePrice = () => setPriceOpen(!priceOpen);
    const toggleCampus = () => setCampusOpen(!campusOpen);
    const toggleSortBy = () => setSortByOpen(!sortByOpen);

    return (
        <div className="flex">
            {/* Sidebar */}
            <div
                className={`left-0 w-full h-full min-w-[300px] transition-transform duration-300 transform z-40 ${
                    isOpen ? 'translate-x-0' : '-translate-x-full'
                }`}
            >
                <div className="flex flex-col border border-solid border-gray-300 bg-white shadow-lg p-4 h-full">
                    <h3 className="mb-4 text-2xl font-bold">Filters</h3>
                    
                    {/* Filter by Dropdown */}
                    <div className="mb-4">
                        <button onClick={toggleFilterBy} className="flex justify-between w-full text-left font-medium text-lg">
                            Filter by
                            <span>{filterByOpen ? '▲' : '▼'}</span>
                        </button>
                        {filterByOpen && (
                            <div className="pl-4">
                                {/* Price Dropdown */}
                                <div className="my-2">
                                    <button onClick={togglePrice} className="flex justify-between w-full text-left">
                                        Price
                                        <span>{priceOpen ? '▲' : '▼'}</span>
                                    </button>
                                    {priceOpen && (
                                        <div className="flex gap-2 mt-2">
                                            <input type="text" placeholder="Min" className="border rounded p-1 w-1/2"/>
                                            <input type="text" placeholder="Max" className="border rounded p-1 w-1/2"/>
                                        </div>
                                    )}
                                </div>

                                {/* Campus Dropdown */}
                                <div className="my-2">
                                    <button onClick={toggleCampus} className="flex justify-between w-full text-left">
                                        Campus
                                        <span>{campusOpen ? '▲' : '▼'}</span>
                                    </button>
                                    {campusOpen && (
                                        <div className="pl-4 mt-2 space-y-2">
                                            <label className="flex items-center">
                                                <input type="checkbox" className="mr-2" />
                                                UTSG - St. George
                                            </label>
                                            <label className="flex items-center">
                                                <input type="checkbox" className="mr-2" />
                                                UTM - Mississauga
                                            </label>
                                            <label className="flex items-center">
                                                <input type="checkbox" className="mr-2" />
                                                UTSC - Scarborough
                                            </label>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Sort by Dropdown */}
                    <div className="mb-4">
                        <button onClick={toggleSortBy} className="flex justify-between w-full text-left font-medium text-lg">
                            Sort by
                            <span>{sortByOpen ? '▲' : '▼'}</span>
                        </button>
                        {sortByOpen && (
                            <div className="pl-4">
                                {/* Sort by Price */}
                                <div className="my-2">
                                    <p className="font-semibold">Price</p>
                                    <a href="#" className="block mt-1 text-sm">Lowest to Highest</a>
                                    <a href="#" className="block text-sm">Highest to Lowest</a>
                                </div>
                                
                                {/* Sort by Date Listed */}
                                <div className="my-2">
                                    <p className="font-semibold">Date Listed</p>
                                    <a href="#" className="block mt-1 text-sm">Most Recent</a>
                                    <a href="#" className="block text-sm">Least Recent</a>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Button to open/close sidebar */}
            <button 
                className="h-12 ml-4 mt-4 px-6 bg-primary text-white transition-all duration-300 shadow-lg" 
                onClick={toggleSidebar}
                style={{ marginLeft: isOpen ? '0' : '-300px' }}
            >
                {isOpen ? 'Close' : 'Open'}
            </button>
        </div>
    );
}

export default SearchSidebar;
