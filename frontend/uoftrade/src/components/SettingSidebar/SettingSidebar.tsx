'use client'

import React from "react";
import Link from "next/link";

import SidebarMenuItem from "./SidebarMenuItem";

import '../../types/settingsMenuItem'


const SettingSidebar = ({ highlightIndex }: {highlightIndex: number}) => {

    const menuItems:Array<SettingsMenuItem> = [
        {
            text: 'Profile',
            link: '/profile'
        },
        {
            text: 'View Your Listings',
            link: '/user-listings'
        },
        {
            text: 'Notifications',
            link: '/notifications'
        },
        {
            text: 'Appearance',
            link: '/appearance'
        }
    ]

    return (
        <>
            <div className="flex flex-col justify-between border border-solid border-outline-grey fixed w-full h-full shadow-three max-w-[500px] bg-grey-bg dark:bg-dark">
                <div className="flex-grow pt-10">
                    <h3 className="mb-6 text-center text-2xl font-bold text-black dark:text-white-bg sm:text-3xl">
                        Settings
                    </h3>
                    {menuItems.map((item:SettingsMenuItem, idx:number) => {
                        let highlight:boolean = false;
                        if (highlightIndex === idx){
                            highlight = true;
                        }
                        return <SidebarMenuItem text={item.text} idx={idx} highlight={highlight} link={item.link}/>
                    })}
                </div>
                <div className="flex justify-center py-10">
                    <a
                        href="/signout" // Change this to your sign out URL or function
                        className="text-heading-1 text-xl text-bold hover:underline"
                    >
                        Sign Out
                    </a>
                </div>
            </div>
        </>
    )
}

export default SettingSidebar

