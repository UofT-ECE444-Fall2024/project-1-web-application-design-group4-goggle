// CreatePostTextBoxes.tsx
import React from "react";
import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import { useRouter } from "next/navigation";
import TextBox from "../TextBox/TextBox";
import SelectDropdown from "./SelectDropdown";
import { categories } from "@/data/categories";

const CreatePostTextBoxes = ({ 
  onPublish, 
  isEdit=false, 
  titleValue='', 
  priceValue='', 
  descriptionValue='', 
  pickup_locationValue=''}: { 
    isEdit?: boolean; 
    titleValue?: string; 
    priceValue?: string; 
    descriptionValue?: string;
    pickup_locationValue?: string;
    onPublish: (data: CreatePostInputs) => Promise<void> }) => {
  const router = useRouter();
  const methods = useForm<CreatePostInputs>({
    mode: "onSubmit",
  });
  const { register, handleSubmit, setValue, formState: { errors } } = methods;

  const handleFormSubmit: SubmitHandler<CreatePostInputs> = async (data) => {
    await onPublish(data);
    router.push("/home"); // success page
  };
  const buttonText = isEdit ? "Save Changes" : "Publish";

  return (
    <FormProvider {...methods}>
      <div className="w-full">
        <div className="bg-white-bg rounded-3xl px-6 dark:bg-dark w-full">
          <form onSubmit={handleSubmit(handleFormSubmit)} className="w-full">
            <div className="mt-5 flex flex-col gap-2 sm:flex-row w-full">
              <TextBox<CreatePostInputs>
                placeholder="Title"
                name="title"
                register={register}
                errors={errors}
                value={titleValue}
                topText="Title"
                divClassNames="w-full"
                required={true}
              />
              <TextBox<CreatePostInputs>
                placeholder="Price"
                name="price"
                register={register}
                errors={errors}
                value={priceValue}
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
              value={descriptionValue}
              topText="Description"
              textArea={true}
              required={false}
            />

            <div className="flex flex-col gap-2 sm:flex-row w-full">
              {/* Campus Dropdown */}
              <SelectDropdown
                label="Choose Campus"
                topText="Choose Campus"
                name="campus"
                errors={errors}
                register={register}
                required={true}
                menuItems={["UTSG", "UTM", "UTSC"]}
                onSelect={(selected) => setValue("campus", selected, { shouldValidate: true })}
              />
              {/* Category Dropdown */}
              <SelectDropdown
                label="Choose Category"
                topText="Choose Category"
                name="category"
                register={register}
                errors={errors}
                required={true}
                menuItems={categories.map(category => category.name)}
                onSelect={(selected) => setValue("category", selected, { shouldValidate: true })}
              />    
            </div>

            <div className="mt-2 flex flex-col gap-2 sm:flex-row w-full items-end mb-10">
              {/* Location Field */}
              <TextBox<CreatePostInputs>
                placeholder="Location (optional)"
                name="pickup_location"
                register={register}
                errors={errors}
                value={pickup_locationValue}
                topText="Pickup Location"
                divClassNames="w-full"
                required={false}
              />
              {/* Submit Button */}
              <button
                type="submit"
                className="rounded-xl w-full h-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors 
                          text-white-bg bg-primary dark:hover:bg-[#1a1a1a] hover:border-transparent text-l sm:text-base sm:h-12 xs:h-16 xs:mt-5 mt-0"
              >
                {buttonText}
              </button>
            </div>
          </form>
        </div>
      </div>
    </FormProvider>
  );
};

export default CreatePostTextBoxes;
