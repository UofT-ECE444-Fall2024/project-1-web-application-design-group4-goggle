'use client'

import React, { useRef } from "react";
import axios from "axios";
import { useForm, SubmitHandler } from "react-hook-form"
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import TextBox from "../TextBox/TextBox";
import { RegistrationInputs } from "@/types/inputs";

const SignUpForm = () => {
    const router = useRouter();

    const {
        register,
        watch,
        handleSubmit,
        setError,
        formState: { errors },
      } = useForm<RegistrationInputs>()

    const password = useRef({});
    password.current = watch("password", "");
    
    const onSubmit: SubmitHandler<RegistrationInputs> = async (data:RegistrationInputs) => {
        let registered; 
        try {

            const payload = {
                first_name: data.first_name, 
                last_name: data.last_name,
                email: data.email, 
                user_name: data.user_name,
                phone_number: "",
                password: data.password,
                password_confirmation: data.password_confirmation
            };
 
            registered = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}identity/register`, payload, {
                headers: { 'Content-Type': 'application/json' }
              });
            const token = registered.data?.token;
            if (token) {
                localStorage.setItem("token", token);
            }
            const currentUser = registered.data?.user_name;
            if (currentUser) {
                localStorage.setItem("currentUser", currentUser);
            }

            console.log(registered.status);
        }
        catch(e:unknown) {
            
            if (axios.isAxiosError(e) && e.response && e.response.status === 400) {
                const errorDetail = e.response.data?.detail || "Email already in use. Please Login or use a different email.";
                setError("email", { type: "manual", message: errorDetail });
            } else {
                console.error(e);
                setError("email", { type: "manual", message: "An unexpected error occurred. Please try again." });
            }
        }
        finally {
            if (registered?.status === 201) {
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
                                    <div className="mt-5 flex flex-col justify-between items-top gap-5 sm:flex-row">
                                        <TextBox<RegistrationInputs>
                                            placeholder="First Name"
                                            name="first_name"
                                            register={register}
                                            errors={errors}
                                            topText="First Name"
                                        />
                                        <TextBox<RegistrationInputs>
                                            placeholder="Last Name"
                                            name="last_name"
                                            register={register}
                                            errors={errors}
                                            topText="Last Name"
                                        />                             
                                    </div>
                                    <TextBox<RegistrationInputs>
                                        placeholder="Username"
                                        type="text"
                                        name="user_name"
                                        register={register}
                                        options={{
                                            pattern: {
                                                value: /^[a-zA-Z0-9_]+$/,
                                                message: "Username can only contain letters, numbers, and underscores"
                                                } 
                                            }}
                                        divClassNames={"mt-3"}
                                        errors={errors}
                                        topText="Username"
                                    />
                                    <TextBox<RegistrationInputs>
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
                                    <TextBox<RegistrationInputs>
                                        placeholder="Enter your Password"
                                        type="password"
                                        name="password"
                                        register={register}
                                        options={{
                                            pattern: {
                                                value: /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[ -\/:-@[-`{-~])[a-zA-Z\d -\/:-@[-`{-~]{8,}$/,
                                                message: "Password must be atleast 8 characters long and contain at least a letter, a number and a special character"
                                            }
                                        }}
                                        divClassNames={"mt-3"}
                                        errors={errors}
                                        topText="Password"
                                    />
                                    <TextBox<RegistrationInputs>
                                        placeholder="Confirm your Password"
                                        type="password"
                                        name="password_confirmation"
                                        register={register}
                                        options={{
                                            validate: (value: any) => 
                                                value === password.current || "The passwords do not match"
                                        }}
                                        divClassNames={"mt-3"}
                                        errors={errors}
                                        topText="Password Confirmation"
                                    />
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

