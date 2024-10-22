import Image from "next/image";
import { Metadata } from "next";
import React from "react";

import "../../types/inputs"

import SignInForm from "@/components/SignInForm/SignInForm";

export const metadata: Metadata = {
  title: "UofTrade Sign In",
  description: "This is Sign In Page for UofTrade",
  // other metadata
};

const SignInPage = () => {

    return (
        <>
            <Image
                src="/images/logo/UTrade_logo.svg" 
                alt="logo"
                width={140}
                height={30}
                className="m-5"
            />
            <SignInForm/>
        </>
    );
}

export default SignInPage