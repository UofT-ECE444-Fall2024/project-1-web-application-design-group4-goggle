import React from "react";
import { UseFormRegister, RegisterOptions, FieldValues, Path } from "react-hook-form";

interface TextBoxProps<T extends FieldValues> {
  placeholder: string;
  name: Path<T>;
  register?: UseFormRegister<T>;
  options?: RegisterOptions<T>;
  type?: string;
  required?: boolean;
  className?: string;
  divClassNames?: string;
  inputClassNames?: string;
}

const TextBox = <T extends FieldValues>({
  placeholder,
  name,
  register,
  options,
  type="text",
  required = true,
  divClassNames = "",
  inputClassNames = "",
}: TextBoxProps<T>) => {
  return (
    <div className={`${divClassNames} ${required ? "asterisk" : ""}`}>
        <input
        placeholder={placeholder}
        type={type}
        className={`dark:text-body-color-dark dark:shadow-two w-full rounded-xl border border-outline-grey bg-white px-6 py-3 
                    text-base text-body-color outline-none transition-all duration-300 dark:border-transparent 
                    dark:bg-[#2C303B] dark:focus:shadow-none ${inputClassNames}`}
        {...(register ? register(name, { required, ...options }) : { name })}
        />
    </div>
  );
};

export default TextBox;
