'use client'

import React, { useRef } from "react";
import axios from "axios";
import { useForm, SubmitHandler } from "react-hook-form"
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";

import "../../types/inputs"

import InlineErrorMessage from "../InlineErrorMessage/InlineErrorMessage";


const SignUpForm = () => {

    const router = useRouter();

    const {
        register,
        watch,
        handleSubmit,
        formState: { errors },
      } = useForm<RegistrationInputs>()

    const password = useRef({});
    password.current = watch("password", "");
    
    const onSubmit: SubmitHandler<RegistrationInputs> = async (data:RegistrationInputs) => {
        console.log(data)
        let registered; 

        try {

            const payload:Object = {
                first_name: data.first_name, 
                last_name: data.last_name,
                email: data.email, 
                user_name: data.first_name,
                phone_number: 1231231234,
                password: data.password,
                password_confirmation: data.password
            };

            registered = await axios.post("http://localhost/identity/register", payload);
        }
        catch(e:unknown) {
            console.error(e);
        }
        finally {
            if (registered?.status == 200) {
                router.push('/home');
            }
        }
    }

    return (
        <section className="relative z-10 overflow-hidden pb-16 md:pb-20 lg:pb-28 lg:pt-16">
                <div className="container">
                    <div className="-mx-4 flex flex-wrap">
                        <div className="w-full px-4">
                            <div className="shadow-three mx-auto max-w-[500px] rounded-3xl bg-white-bg px-6 py-10 dark:bg-dark sm:p-[60px]">
                                <div className="flex justify-center">
                                    <Image
                                        src="/images/logo/UTrade_small.svg" 
                                        alt="logo"
                                        width={60}
                                        height={50}
                                        className="my-5"
                                    />
                                </div>
                                <h3 className="mb-3 text-center text-2xl font-bold text-heading-1 dark:text-white-bg sm:text-3xl">
                                    Create an Account
                                </h3>
                                <p className="text-center text-base font-medium text-subheading">
                                    Join a growing community of trusted buyers and sellers!
                                </p>
                                <form onSubmit={handleSubmit(onSubmit)}>
                                    <div className="mt-5 flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
                                        <div className="asterisk">
                                            <input
                                            placeholder="First Name"
                                            className="dark:text-body-color-dark dark:shadow-two w-full rounded-xl border border-outline-grey bg-white px-6 py-3 
                                            text-base text-body-color outline-none transition-all duration-300 dark:border-transparent 
                                            dark:bg-[#2C303B] dark:focus:shadow-none"
                                            {...register("first_name", { required: true })}
                                            />
                                        </div>
                                        
                                        <div className="asterisk">
                                            <input
                                            placeholder="Last Name"
                                            className="dark:text-body-color-dark dark:shadow-two w-full rounded-xl border border-outline-grey bg-white px-6 py-3 
                                            text-base text-body-color outline-none transition-all duration-300 dark:border-transparent 
                                            dark:bg-[#2C303B] dark:focus:shadow-none"
                                            {...register("last_name", { required: true })}
                                            />
                                        </div>                              
                                    </div>
                                    <div className="flex flex-col justify-between sm:flex-row sm:items-center">
                                        {errors.first_name && <InlineErrorMessage/>}
                                        {errors.last_name && <InlineErrorMessage/>}
                                    </div>
                                    <div className="mt-3 asterisk">
                                        <input
                                        placeholder="U of T Email Address"
                                        type="email"
                                        className="dark:text-body-color-dark dark:shadow-two w-full rounded-xl border border-outline-grey bg-white px-6 py-3 
                                        text-base text-body-color outline-none transition-all duration-300 dark:border-transparent 
                                        dark:bg-[#2C303B] dark:focus:shadow-none"
                                        {...register("email", { required: true, pattern: {
                                            value: /^[a-zA-Z0-9._%+-]+@mail\.utoronto\.ca$/i,
                                            message: "Please use a mail.utoronto.ca email address"
                                          } })}
                                        />
                                    </div>
                                    {errors.email && errors.email.type === "required" && <InlineErrorMessage/>}
                                    {errors.email && errors.email.type === "pattern" && <InlineErrorMessage message={errors.email.message}/> }
                                    <div className="mt-7 asterisk">
                                        <input
                                        placeholder="Enter your Password"
                                        type="password"
                                        className="dark:text-body-color-dark dark:shadow-two w-full rounded-xl border border-outline-grey bg-white px-6 py-3 
                                        text-base text-body-color outline-none transition-all duration-300 dark:border-transparent 
                                        dark:bg-[#2C303B] dark:focus:shadow-none"
                                        {...register("password", { required: true, pattern: {
                                            value: /^(?=.*[!@#$&*])(?=.*[0-9]).{8}$/,
                                            message: "Password must be 8 characters long and contain at least a number and special character"
                                          } })}
                                        /> 
                                    </div>
                                    {errors.password && errors.password.type === "required" && <InlineErrorMessage/>}
                                    {errors.password && errors.password.type === "pattern" && <InlineErrorMessage message={errors.password.message}/> }
                                    <div className="mt-3 asterisk">
                                        <input
                                        placeholder="Confirm your Password"
                                        type="password"
                                        className="dark:text-body-color-dark dark:shadow-two w-full rounded-xl border border-outline-grey bg-white px-6 py-3 
                                        text-base text-body-color outline-none transition-all duration-300 dark:border-transparent 
                                        dark:bg-[#2C303B] dark:focus:shadow-none"
                                        {...register("password_confirmation", { required: true, validate: value =>
                                            value === password.current || "The passwords do not match"})}
                                        /> 
                                    </div>
                                    {errors.password_confirmation && errors.password_confirmation.type === "required" && <InlineErrorMessage/>}
                                    {errors.password_confirmation && errors.password_confirmation.type === "validate" && <InlineErrorMessage message={errors.password_confirmation.message} />}
                                <button type="submit" className="mt-5 mb-2 rounded-xl w-full h-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors 
                                text-white-bg bg-primary dark:hover:bg-[#1a1a1a] hover:border-transparent text-l sm:text-base sm:h-12 ">
                                    Create Account
                                </button>
                            </form>
                            <p className="text-center text-base text-xs font-medium text-body-color">
                                Already have an account?{" "}
                                <Link href="/signin" className="text-primary hover:underline">
                                    Sign In
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )

}

export default SignUpForm

