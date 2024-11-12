import React from "react";
import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import { useRouter } from "next/navigation";
import TextBox from "../TextBox/TextBox";
import SelectDropdown from "./SelectDropdown";
import { categories } from "@/data/categories";

const CreatePostTextBoxes = ({
  onPublish,
  isEdit = false,
  titleValue = '',
  priceValue = '',
  descriptionValue = '',
  pickup_locationValue = '', // Default empty string if undefined
  categoryValue = '',         // Default empty string if undefined
}: {
  isEdit?: boolean;
  titleValue?: string;
  priceValue?: string;
  descriptionValue?: string;
  pickup_locationValue?: string | null;
  campusValue?: string | null;
  categoryValue?: string | null;
  onPublish: (data: CreatePostInputs) => Promise<void>
}) => {
  const router = useRouter();
  const methods = useForm<CreatePostInputs>({
    mode: "onSubmit",
  });
  const { register, handleSubmit, setValue, formState: { errors } } = methods;

  const handleFormSubmit: SubmitHandler<CreatePostInputs> = async (data) => {
    await onPublish(data);
    router.push("/home"); // Redirect to success page
  };

  const buttonText = isEdit ? "Save Changes" : "Publish";
  const locations = ["Myhal", "Bahen", "Gerstein", "Robarts", "Sidney Smith", "Medical Science", "Other"];

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
                label="Choose Location"
                topText="Choose Location"
                name="location"
                errors={errors}
                register={register}
                required={true}
                options={{
                  validate: value => locations.includes(value as string) || "Not a valid location."
                }}
                selectedItem={pickup_locationValue || ''} // Fallback to empty string
                menuItems={locations}
                onSelect={(selected) => setValue("location", selected, { shouldValidate: true })}
              />
              {/* Category Dropdown */}
              <SelectDropdown
                label="Choose Category"
                topText="Choose Category"
                name="category"
                register={register}
                errors={errors}
                options={{
                  validate: value => categories.some((item) => item.name === (value as string)) || "Not a valid category."
                }}
                required={true}
                selectedItem={categoryValue || ''} // Fallback to empty string
                menuItems={categories.map(category => category.name)}
                onSelect={(selected) => setValue("category", selected, { shouldValidate: true })}
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="rounded-xl w-full h-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors 
                        text-white-bg bg-primary dark:hover:bg-[#1a1a1a] hover:border-transparent text-l sm:text-base sm:h-12 xs:h-16 xs:mt-5 mt-0"
            >
              {buttonText}
            </button>
          </form>
        </div>
      </div>
    </FormProvider>
  );
};

export default CreatePostTextBoxes;
