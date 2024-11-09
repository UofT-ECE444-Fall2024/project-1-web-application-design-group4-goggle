import React from "react";
import { Checkbox } from "@mui/material";

interface CheckboxWithLabelProps {
  label: string;
  name: string;
  checked: boolean;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  checkboxSize?: number; // Optional size for the checkbox
  labelSize?: string;    // Optional font size for the label
}

const LabelledCheckbox: React.FC<CheckboxWithLabelProps> = ({
  label,
  name,
  checked,
  onChange,
  checkboxSize = 28,    // Default size for checkbox (in pixels)
  labelSize = "1.14rem",   // Default font size for label
}) => {
  return (
    <div className="w-auto ml-8 flex items-center">
      <Checkbox
        name={name}
        checked={checked}
        onChange={onChange}
        sx={{ width: checkboxSize, height: checkboxSize }}
        style={{
          color: "#28047a",
          transform: `scale(${checkboxSize / 24})`, // Scale the checkbox based on the provided size
        }}
      />
      <label
        htmlFor={name}
        className="ml-6 text-subheading font-medium leading-8"
        style={{ fontSize: labelSize }}
      >
        {label}
      </label>
    </div>
  );
};

export default LabelledCheckbox;
