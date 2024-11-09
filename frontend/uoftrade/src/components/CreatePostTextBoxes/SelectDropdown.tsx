import React, { useState } from "react";
import InlineErrorMessage from "../InlineErrorMessage/InlineErrorMessage";
import { FieldErrors, FieldValues, Path, RegisterOptions, UseFormRegister } from "react-hook-form";

interface SelectDropdownProps<T extends FieldValues> {
  label: string;
  menuItems: string[];
  topText?: string;
  register?: UseFormRegister<T>;
  options?: RegisterOptions<T>;
  required?: boolean;
  name: Path<T>; // The name of the field to link to form validation
  errors?: FieldErrors<T>; // Validation errors from react-hook-form
  onSelect: (selectedOption: string) => void;
}

const SelectDropdown = <T extends FieldValues>({
  label,
  menuItems,
  topText,
  name,
  errors,
  register,
  options,
  required,
  onSelect,
}: SelectDropdownProps<T>) => {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const error = errors?.[name];

  const toggleDropdown = () => {
    setDropdownVisible((prev) => !prev);
  };

  const handleOptionSelect = (option: string) => {
    setSelectedOption(option);
    onSelect(option); // Trigger validation on selection
    setDropdownVisible(false);
  };

  return (
    <div className="relative inline-block w-full">
      {topText && <span className="text-xs text-heading-1">{topText}</span>}
      <button
        className="bg-light-grey border border-black px-4 py-3 flex justify-between items-center rounded-xl w-full h-full border-black/[.08] dark:border-white/[.145] transition-colors text-heading-1 hover:bg-dark-grey hover:border-transparent text-l font-medium sm:h-12"
        onClick={toggleDropdown}
        {...(register ? register(name, { required, ...options }) : { name })}
      >
        {selectedOption || label}
        <span className="ml-2">&#9660;</span> {/* Dropdown arrow */}
      </button>

      {dropdownVisible && (
        <div className="absolute left-0 z-50 mt-2 bg-white border border-dark-grey rounded-md shadow-lg min-w-full">
          {menuItems.map((item) => (
            <div
              key={item}
              onClick={() => handleOptionSelect(item)}
              className="px-4 py-3 hover:bg-dark-grey cursor-pointer transition-colors duration-200 ease-in-out"
            >
              {item}
            </div>
          ))}
        </div>
      )}
      

      {/* Inline error message for validation */}
      {error && (
        <div className="mt-1">
          <InlineErrorMessage message={error.message as string || "This field is required"} />
        </div>
      )}
    </div>
  );
};

export default SelectDropdown;
