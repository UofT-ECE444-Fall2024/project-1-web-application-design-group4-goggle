import React from "react";
import { FieldValues, UseFormRegister, FieldError, Path } from "react-hook-form";
import InlineErrorMessage from "../InlineErrorMessage/InlineErrorMessage";

interface TextBoxProps<T extends FieldValues> {
  placeholder: string;
  name: Path<T>;
  register: UseFormRegister<T>;
  errors: Record<string, FieldError | undefined>;
  topText: string;
  value?: string;
  divClassNames?: string;
  required: boolean;
  options?: object; // For additional validation rules like pattern
  textArea?: boolean;
  inputClassNames?: string;
}

function TextBox<T extends FieldValues>({
  placeholder,
  name,
  register,
  errors,
  topText,
  value,
  divClassNames,
  required,
  options,
  textArea,
  inputClassNames= '',
}: TextBoxProps<T>) {
  const error = errors?.[name];
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
          type="text"
          {...register(name, { required, ...options })}
          placeholder={placeholder}
          defaultValue={value}
          className={`dark:text-body-color-dark dark:shadow-two w-full rounded-xl border border-outline-grey bg-white px-6 py-3 
                        text-base text-body-color outline-none transition-all duration-300 dark:border-transparent 
                        dark:bg-[#2C303B] dark:focus:shadow-none ${inputClassNames}`}
        />
      )}

      {required && <span className={`asterisk`}></span>}
        {error && (
          <div>
            {error.type === "required" && <InlineErrorMessage message="This field is required" />}
            {error.type === "pattern" && <InlineErrorMessage message={error.message as string} />}
            {error.type === "validate" && <InlineErrorMessage message={error.message as string} />}
            {error.type === "manual" && <InlineErrorMessage message={error.message as string} />}
          </div>
        )}
    </div>
  );
}

export default TextBox;
