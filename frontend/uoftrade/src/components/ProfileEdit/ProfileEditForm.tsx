'use client'

import React from "react";
import { useForm, SubmitHandler } from "react-hook-form"
import TextBox from "../TextBox/TextBox";

import "../../types/inputs"

const ProfileEditForm = () => {

    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm<ProfileEditInputs>()
    
    const onSubmit: SubmitHandler<ProfileEditInputs> = async (data:ProfileEditInputs) => {
        console.log(data)
        let changeUserInfo; 

        try {

            const payload:Object = {
                first_name: data.first_name, 
                last_name: data.last_name,
                email: data.email, 
                // user_name: data.first_name,
                // phone_number: data.phone_number,
            };
        }
        catch(e:unknown) {
            console.error(e);
        }
    }

    return (
        <div className="container">
            <h3 className="mb-3 text-center text-2xl font-bold text-heading-1 dark:text-white-bg">
                Edit Profile Information
            </h3>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mt-5 flex flex-col justify-between items-top gap-5 sm:flex-row">
                    <TextBox<ProfileEditInputs>
                        placeholder="First Name"
                        name="first_name"
                        register={register}
                        errors={errors}
                        topText="First Name"
                        divClassNames="flex-grow"
                    />
                    <TextBox<ProfileEditInputs>
                        placeholder="Last Name"
                        name="last_name"
                        register={register}
                        errors={errors}
                        topText="Last Name"
                        divClassNames="flex-grow"
                    />                             
                </div>
                <TextBox<ProfileEditInputs>
                    placeholder="UofT Email Address"
                    type="email"
                    name="email"
                    register={register}
                    options={{
                        pattern: {
                            value: /^[a-zA-Z0-9._%+-]+@([a-zA-Z0-9-]+\.)*utoronto\.ca$/i,
                            message: "Please use a UofT email address containing 'utoronto.ca'"
                            } 
                        }}
                    divClassNames={"mt-3"}
                    errors={errors}
                    topText="Email"
                />
                <button type="submit" className="mt-5 mb-2 rounded-xl w-2/5 h-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors 
                text-white-bg bg-primary dark:hover:bg-[#1a1a1a] hover:border-transparent text-l sm:text-base sm:h-12 ">
                    Save Changes
                </button>
            </form>
        </div>
    )

}

export default ProfileEditForm

