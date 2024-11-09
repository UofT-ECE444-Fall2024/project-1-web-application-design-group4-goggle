"use client";

import React from "react";
import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import { useRouter } from "next/navigation";
import TextBox from "../TextBox/TextBox";
import "../../types/inputs";
import SelectDropdown from "./SelectDropdown";
import { categories } from "@/data/categories";

const CreatePostTextBoxes = ({ onPublish }: { onPublish: (data: CreatePostInputs) => Promise<void> }) => {
  const router = useRouter();
  const methods = useForm<CreatePostInputs>();
  const { register, handleSubmit, setValue, formState: { errors } } = useForm<CreatePostInputs>();

  const handleFormSubmit: SubmitHandler<CreatePostInputs> = async (data:CreatePostInputs) => {
    await onPublish(data);
    router.push("/home"); // success page
  };

  return (
    <FormProvider {...methods}>
    <div className="w-full">
      <div className="bg-white-bg rounded-3xl px-6 py-10 dark:bg-dark w-full">
        <form onSubmit={handleSubmit(handleFormSubmit)} className="w-full">
        <div className="mt-5 flex flex-col justify-between items-top gap-2 sm:flex-row w-full">
            <TextBox<CreatePostInputs>
              placeholder="Title"
              name="title"
              register={register}
              errors={errors}
              topText="Title"
              divClassNames="w-full"
              required={true}
            />
            <TextBox<CreatePostInputs>
              placeholder="Price"
              name="price"
              register={register}
              errors={errors}
              topText="Price"
              options={{
                pattern: {
                    value: /^(?:[$€£¥])?\s?(\d{1,3}(?:,\d{3})*|\d+)(\.\d{2})?$/,
                    message: "Price field must contain a valid numerical value as a cost."
                }
            }}
              divClassNames="w-full"
              required={true}
            />
          </div>

          <TextBox<CreatePostInputs>
            placeholder="Description (optional)"
            name="description"
            register={register}
            errors={errors}
            topText="Description"
            textArea={true}
            required={false}
          />

          <div className="mt-5 flex flex-col justify-between items-end gap-2 sm:flex-row w-full">
            {/* Campus Dropdown */}
            <SelectDropdown
              label="Choose Campus"
              options={["UTSG", "UTM", "UTSC"]}
              onSelect={(selected) => setValue("campus", selected)}
            />
            <TextBox<CreatePostInputs>
              placeholder="Location (optional)"
              name="pickup_location"
              register={register}
              errors={errors}
              topText="Pickup Location"
              divClassNames="w-full"
              required={false}
            />
            {/* <TextBox<CreatePostInputs>
              placeholder="Category (optional)"
              name="category"
              register={register}
              errors={errors}
              topText="Category"
              divClassNames="w-full"
              required={false}
            /> */}
            {/* Category Dropdown */}
            <SelectDropdown
              label="Choose Category"
              options={categories.map(category => category.name)}
              onSelect={(selected) => setValue("category", selected)}
            />
              
          </div>
          <button
            type="submit"
            className="mt-5 mb-2 rounded-xl w-full h-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors 
                      text-white-bg bg-primary dark:hover:bg-[#1a1a1a] hover:border-transparent text-l sm:text-base sm:h-12"
          >
            Publish
          </button>
        </form>
      </div>
    </div>
    </FormProvider>
  );
};

export default CreatePostTextBoxes;