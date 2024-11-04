'use client'

import React, { useState } from "react";

import SidebarMenuItem from "./SidebarMenuItem";

import '../../types/settingsMenuItem'


const SettingSidebar = ({ highlightIndex }: {highlightIndex: number}) => {

    const [isOpen, setIsOpen] = useState(false);
    const toggleSidebar = () => {
        setIsOpen(!isOpen); // Toggle the sidebar's open state
    };

    const menuItems: Array<SettingsMenuItem> = [
        { text: 'Profile', link: '/profile' },
        { text: 'View Your Listings', link: '/user-listings' },
        { text: 'Notifications', link: '/notifications' },
        { text: 'Appearance', link: '/appearance' },
    ];

    return (
    <>
        <div className="flex">
            {/* Sidebar */}
            <div
                className={`fixed top-0 left-0 w-full h-full transition-transform duration-300 transform z-10 ${
                    isOpen ? 'translate-x-0' : '-translate-x-full'
                }`}
            >
                <div className="flex flex-col justify-between border border-solid border-outline-grey h-full shadow-three max-w-[500px] bg-grey-bg dark:bg-dark">
                    <div className="flex-grow pt-10">
                        <h3 className="mb-6 text-center text-2xl font-bold text-black dark:text-white-bg sm:text-3xl">
                            Settings
                        </h3>
                        {menuItems.map((item: SettingsMenuItem, idx: number) => {
                            let highlight: boolean = highlightIndex === idx;
                            return (
                                <SidebarMenuItem 
                                    key={idx}
                                    text={item.text} 
                                    idx={idx} 
                                    highlight={highlight} 
                                    link={item.link} 
                                />
                            );
                        })}
                    </div>
                    <div className="flex justify-center py-10">
                        <a
                            href="/signout" // Change this to your sign out URL or function
                            className="text-heading-1 text-xl font-bold hover:underline"
                        >
                            Sign Out
                        </a>
                    </div>
                </div>
            </div>

            {/* Button to open/close sidebar */}
            <button 
                className="h-12 ml-4 mt-4 z-50 px-6 bg-primary text-white-bg transition-all duration-300 shadow-three" 
                onClick={toggleSidebar}
                style={{ marginLeft: isOpen ? '500px' : '0' }} // Adjust position based on sidebar state
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
    </>
    )
}

export default SettingSidebar
