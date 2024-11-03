'use client'

import React from "react";
import Link from "next/link";

const SidebarMenuItem = ({ text, idx, highlight, link }: { text: string, idx: number, highlight:boolean, link:string }) => {
    return (
        <>
            <Link
            key={idx}
            className={`${(highlight) ? 'bg-primary text-white-bg' : 'hover:bg-dark-grey'} py-7 text-subheading border-y border-solid border-outline-grey dark:border-white/[.145] transition-colors flex items-center justify-center dark:hover:bg-[#1a1a1a] hover:border-transparent text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:min-w-44`}
            href={link}
            style={{fontSize: `${(highlight) ? '1.2rem' : '1.05rem'}`}}
            >
                {text}
            </Link>
        </>
    )
}

export default SidebarMenuItem
