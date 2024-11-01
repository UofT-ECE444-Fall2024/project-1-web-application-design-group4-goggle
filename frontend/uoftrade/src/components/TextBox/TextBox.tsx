import React from "react";
import { UseFormRegister, RegisterOptions, FieldValues, Path, FieldErrors } from "react-hook-form";
import InlineErrorMessage from "../InlineErrorMessage/InlineErrorMessage";
  
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
  errors?: FieldErrors<T>; // Adding errors as a prop
  topText?: string; // Text of the name above the TextBox
}

const TextBox = <T extends FieldValues>({
  placeholder,
  name,
  register,
  options,
  type = "text",
  required = true,
  divClassNames = "",
  inputClassNames = "",
  errors,
  topText= "",
}: TextBoxProps<T>) => {
  // Check if there's an error for the field using "name" as the key
  const error = errors?.[name];
  
  return (
    <div className={`mb-0 leading-none ${divClassNames}`}>
        {topText && <span className="text-xs text-heading-1">{topText}</span>}
        <div className="flex flex-col relative">
                <input
                    placeholder={placeholder}
                    type={type}
                    className={`dark:text-body-color-dark dark:shadow-two w-full rounded-xl border border-outline-grey bg-white px-6 py-3 
                                text-base text-body-color outline-none transition-all duration-300 dark:border-transparent 
                                dark:bg-[#2C303B] dark:focus:shadow-none ${inputClassNames}`}
                    {...(register ? register(name, { required, ...options }) : { name })}
                />
                {required && <span className="asterisk"></span>}
            {error && (
                <div>
                {error.type === "required" && <InlineErrorMessage message="This field is required" />}
                {error.type === "pattern" && <InlineErrorMessage message={error.message as string} />}
                {error.type === "validate" && <InlineErrorMessage message={error.message as string} />}
                {/* Add more error types as needed */}
                </div>
            )}
        </div>
    </div>
  );
};

export default TextBox;
