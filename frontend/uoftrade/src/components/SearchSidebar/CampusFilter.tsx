import React from "react";
import LabelledCheckbox from "../Checkbox/LabelledCheckbox";

interface CampusFilterProps {
    isOpen: boolean;
    onToggle: () => void;
    checkboxes: Record<string, boolean>;
    onCheckboxChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const CampusFilter: React.FC<CampusFilterProps> = ({ isOpen, onToggle, checkboxes, onCheckboxChange }) => (
    <div className="p-3 pl-8 w-full hover:bg-dark-grey">
        <button onClick={onToggle} className="flex justify-between w-full text-left">
            Campus
            <span>{isOpen ? '▲' : '▼'}</span>
        </button>
        {isOpen && (
            <div className="pl-4 mt-2 space-y-1">
                {["utsg", "utm", "utsc"].map((name) => (
                    <LabelledCheckbox
                        key={name}
                        label={`${name.toUpperCase()} - ${name === "utsg" ? "St. George" : name === "utm" ? "Mississauga" : "Scarborough"}`}
                        name={name}
                        checked={checkboxes[name]}
                        onChange={onCheckboxChange}
                    />
                ))}
            </div>
        )}
    </div>
);

export default CampusFilter;
