'use client'

import React from "react";
import Link from "next/link";
import Image from "next/image";
import TextBox from "../TextBox/TextBox";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form"
import { LoginInputs } from "@/types/inputs";

const SignInForm = () => {

    const router = useRouter();
    const {
        register,
        handleSubmit,
        setError,
        formState: { errors },
      } = useForm<LoginInputs>()
    
    const onSubmit: SubmitHandler<LoginInputs> = async (data) => {
        try {

            const payload = {
                email: data.email, 
                password: data.password
            };

            const api = axios.create({
                baseURL: process.env.NEXT_PUBLIC_API_URL,  // Use environment variable
                headers: { 'Content-Type': 'application/json' },
              });
            const response = await api.post('identity/login', payload);
      
            if (response.status === 200 ) {
              // Successfully signed in, handle redirection or show success message
              console.log("Signed in successfully!");
              const token = response.data.token;
                if (token) {
                    localStorage.setItem("token", token);
                }
                router.push('/home');
            }
          } catch (error: any) {
            // Handle server-side errors (invalid credentials)
            if (error.response) {
              // Server responded with an error
              if (error.response.status === 400) {
                setError("email", { type: "manual", message: error.response.data.message });; 
              } 
              else if (error.response.status === 401) {
                const errorDetail = error.response.data?.detail || "The email or password is incorrect. Please try again.";
                setError("email", { type: "manual", message: errorDetail });
              }else {
                setError("email", { type: "manual", message: "An unexpected error occurred. Please try again." });
              }
            } else {
              // No response from server
              setError("email", { type: "manual", message: "Error during sign-in. Please try again." });
            }
          }
        };

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
                            <h3 className="mb-3 text-center text-2xl font-bold text-black dark:text-white-bg sm:text-3xl">
                                Welcome Back!
                            </h3>
                            <p className="text-center text-base font-medium text-body-color">
                                Sign in to manage your listings and discover new deals.
                            </p>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <TextBox<LoginInputs>
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
                                        divClassNames={"mt-5"}
                                        errors={errors}
                                        topText="Email"
                                    />
                                <TextBox<LoginInputs>
                                    placeholder="Enter your Password"
                                    type="password"
                                    name="password"
                                    register={register}
                                    divClassNames="mt-5"
                                    errors={errors}
                                    topText="Password"
                                />
                                <div className="my-5 flex flex-col justify-between sm:flex-row sm:items-center">
                                    <div className="mb-4 sm:mb-0">
                                        <label
                                            htmlFor="checkboxLabel"
                                            className="flex cursor-pointer select-none items-center text-sm font-medium text-body-color"
                                        >
                                            <input
                                                className="relative box mr-4 flex h-5 w-5 rounded border border-outline-grey hover:border-primary border-opacity-20 dark:border-white dark:border-opacity-10"
                                                type="checkbox"
                                                {...register("signedin")}
                                            />
                                            Keep me signed in
                                        </label>
                                    </div>
                                    <div>
                                        <Link
                                            href="/"
                                            className="text-sm font-medium text-primary hover:underline"
                                        >
                                            Forgot Password?
                                        </Link>
                                    </div>
                                </div>
                            <button type="submit" className="mb-2 rounded-xl w-full h-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors 
                            text-white-bg bg-primary dark:hover:bg-[#1a1a1a] hover:border-transparent text-l sm:text-base sm:h-12 ">
                                Sign In
                            </button>
                        </form>
                        <p className="text-center text-base text-xs font-medium text-body-color">
                            Don’t have an account?{" "}
                            <Link href="/signup" className="text-primary hover:underline">
                                Sign up
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </section>
    )

}

export default SignInForm

