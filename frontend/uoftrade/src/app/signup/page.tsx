import Image from "next/image";
import { Metadata } from "next";
import "../../styles/input.css";

import SignUpForm from "@/components/SignUpForm/SignUpForm";

export const metadata: Metadata = {
  title: "UofTrade Sign Up",
  description: "This is Sign Up Page for UofTrade",
  // other metadata
};

const SignUpPage = () => {
    return (
        <>
            <Image
                src="/images/logo/UTrade_logo.svg" 
                alt="logo"
                width={140}
                height={30}
                className="m-5"
            />
            <SignUpForm/>
        </>
    );
}

export default SignUpPage