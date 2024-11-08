'use client'

import React from "react";
import { Checkbox } from "@mui/material";


interface CheckboxWithLabelProps {
  label: string; // Label text next to the checkbox
  name: string;  // Name for the checkbox (used for tracking state)
  checked: boolean; // Whether the checkbox is checked or not
  onChange: React.ChangeEventHandler<HTMLInputElement>; // Event handler for change
}

const LabelledCheckbox: React.FC<CheckboxWithLabelProps> = ({ label, name, checked, onChange }) => {
  // Define the large size for the checkbox (MUI checkbox size = 30px)
  const checkboxSize = 80;

  return (
    <div className="w-auto flex items-center">
      <Checkbox
        name={name}
        checked={checked}
        onChange={onChange}
        sx={{ width: checkboxSize, height: checkboxSize }} // Adjusting the MUI checkbox size to large
        style ={{
            color: "#28047a",
            transform: "scale(1.3)",
        }}
      />
      <label htmlFor={name} className="ml-6 text-subheading text-2xl">{label}</label> {/* Apply large text size */}
    </div>
  );
};

export default LabelledCheckbox;

