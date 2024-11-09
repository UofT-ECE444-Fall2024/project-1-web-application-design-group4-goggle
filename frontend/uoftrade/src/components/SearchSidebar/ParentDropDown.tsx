import React from "react";

interface ParentDropDownProps {
    isOpen: boolean;
    text: string
    onToggle: () => void;
    children: React.ReactNode;
}

const ParentDropDown: React.FC<ParentDropDownProps> = ({ isOpen, onToggle, text, children }) => (
    <div className="">
        <button onClick={onToggle} className={`w-full bg-primary text-white-bg hover:text-heading-1 hover:bg-dark-grey py-7 border-outline-grey dark:border-white/[.145] transition-colors flex items-center justify-between dark:hover:bg-[#1a1a1a] hover:border-transparent text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:min-w-44`}>
            <span className="text-xl font-bold">{text}</span>
            <span>{isOpen ? '▲' : '▼'}</span>
        </button>
        {isOpen && <div className="w-full">{children}</div>}
    </div>
);

export default ParentDropDown;
