import React from "react";
import { FieldValues, UseFormRegister, FieldError, FieldErrors, Path } from "react-hook-form";
import InlineErrorMessage from "../InlineErrorMessage/InlineErrorMessage"; // Ensure this import is correct

interface TextBoxProps<T extends FieldValues> {
  placeholder: string;
  name: Path<T>;
  register: UseFormRegister<T>;
  errors: FieldErrors<T>;  // Update this to FieldErrors<T> instead of Record<string, FieldError | undefined>
  topText?: string;
  value?: string;
  type?: string;
  divClassNames?: string;
  required?: boolean;
  options?: object; // For additional validation rules like pattern
  textArea?: boolean;
  inputClassNames?: string;
}

function TextBox<T extends FieldValues>({
  placeholder,
  name,
  register,
  errors,
  topText="",
  type="text",
  value,
  divClassNames,
  required=true,
  options,
  textArea,
  inputClassNames=""
}: TextBoxProps<T>) {
  return (
    <div className={`mb-0 leading-none ${divClassNames}`}>
      <label htmlFor={name} className="text-xs text-heading-1">{topText}</label>
      
      {textArea ? (
        <textarea
          {...register(name, { required, ...options })}
          placeholder={placeholder}
          defaultValue={value}
          className={`dark:text-body-color-dark dark:shadow-two w-full rounded-xl border border-outline-grey bg-white px-6 py-3 
                        text-base text-body-color outline-none transition-all duration-300 dark:border-transparent 
                        dark:bg-[#2C303B] dark:focus:shadow-none ${inputClassNames}`}
        />
      ) : (
        <input
          type={type}
          {...register(name, { required, ...options })}
          placeholder={placeholder}
          defaultValue={value}
          className={`dark:text-body-color-dark dark:shadow-two w-full rounded-xl border border-outline-grey bg-white px-6 py-3 
                        text-base text-body-color outline-none transition-all duration-300 dark:border-transparent 
                        dark:bg-[#2C303B] dark:focus:shadow-none ${inputClassNames}`}
        />
      )}

      {/* Check for error messages and display them */}
      {errors[name] && (
        <InlineErrorMessage message={errors[name]?.message as string} />
      )}
    </div>
  );
}

export default TextBox;
