import React from "react";
import LabelledCheckbox from "../Checkbox/LabelledCheckbox";

interface CampusFilterProps {
    isOpen: boolean;
    onToggle: () => void;
    checkboxes: Record<string, boolean>;
    onCheckboxChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const LocationFilter: React.FC<CampusFilterProps> = ({ isOpen, onToggle, checkboxes, onCheckboxChange }) => (
    <div className="p-3 pl-8 w-full hover:bg-light-grey">
        <button onClick={onToggle} className="flex justify-between w-full text-left">
            Location
            <span>{isOpen ? '▲' : '▼'}</span>
        </button>
        {isOpen && (
            <div className="pl-4 mt-2 space-y-1">
                {["Myhal", "Bahen", "Gerstein", "Robarts", "Sidney Smith", "Medical Science", "Other"].map((name) => (
                    <LabelledCheckbox
                        key={name}
                        label={name}
                        name={name}
                        checked={checkboxes[name]}
                        onChange={onCheckboxChange}
                    />
                ))}
            </div>
        )}
    </div>
);

export default LocationFilter;
