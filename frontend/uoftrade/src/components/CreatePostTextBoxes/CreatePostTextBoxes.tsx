"use client";

import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/navigation";
import TextBox from "../TextBox/TextBox";
import "../../types/inputs";

const CreatePostTextBoxes = ({ onPublish }: { onPublish: (data: CreatePostInputs) => Promise<void> }) => {
  const router = useRouter();
  const { register, handleSubmit, formState: { errors } } = useForm<CreatePostInputs>();

  const handleFormSubmit: SubmitHandler<CreatePostInputs> = async (data) => {
    await onPublish(data);
    router.push("/home");
  };

  return (
    <div className="w-full">
      <div className="bg-white-bg rounded-3xl px-6 py-10 dark:bg-dark w-full">
        <form onChange={handleSubmit(handleFormSubmit)} className="w-full">
        <div className="mt-5 flex flex-col justify-between items-top gap-2 sm:flex-row w-full">
            <TextBox<CreatePostInputs>
              placeholder="Title"
              name="title"
              register={register}
              errors={errors}
              topText="Title"
              divClassNames="w-full"
            />
            <TextBox<CreatePostInputs>
              placeholder="Price"
              name="price"
              register={register}
              errors={errors}
              topText="Price"
              divClassNames="w-full"
            />
          </div>

          <TextBox<CreatePostInputs>
            placeholder="Description"
            name="description"
            register={register}
            errors={errors}
            topText="Description"
            textArea={true}
            required={false}
          />

          <div className="mt-5 flex flex-col justify-between items-top gap-2 sm:flex-row w-full">
            <TextBox<CreatePostInputs>
              placeholder="Location"
              name="pickup_location"
              register={register}
              errors={errors}
              topText="Pickup Location"
              divClassNames="w-full"
              required={false}
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
  );
};

export default CreatePostTextBoxes;
