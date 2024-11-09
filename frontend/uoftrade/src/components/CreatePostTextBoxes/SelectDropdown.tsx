// SelectDropdown.tsx
import React, { useState } from "react";

interface SelectDropdownProps {
  label: string;
  options: string[];
  onSelect: (selectedOption: string) => void;
}

const SelectDropdown: React.FC<SelectDropdownProps> = ({ label, options, onSelect }) => {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const toggleDropdown = () => {
    setDropdownVisible((prev) => !prev);
  };

  const handleOptionSelect = (option: string) => {
    setSelectedOption(option);
    onSelect(option); // Pass selected option to parent component's onSelect handler
    setDropdownVisible(false);
  };

  return (
    <div className="relative inline-block w-full">
      <button
        className="bg-primary border border-black w-full px-4 py-3 rounded-md text-white flex justify-between items-center"
        onClick={toggleDropdown}
      >
        {selectedOption || label}
        <span className="ml-2">&#9660;</span> {/* Dropdown arrow */}
      </button>

      {dropdownVisible && (
        <div className="absolute left-0 z-50 mt-2 bg-white border border-gray-300 rounded-md shadow-lg min-w-full">
          {options.map((option) => (
            <div
              key={option}
              onClick={() => handleOptionSelect(option)}
              className="px-4 py-3 hover:bg-dark-grey cursor-pointer transition-colors duration-200 ease-in-out"
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SelectDropdown;
