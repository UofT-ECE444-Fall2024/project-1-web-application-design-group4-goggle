import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "UofTrade Sign In",
  description: "This is Sign In Page for UofTrade",
  // other metadata
};

const SignInPage = () => {
    return (
        <Image
            src="/images/logo/UTrade_logo.svg" 
            alt="logo"
            width={140}
            height={30}
            className="m-5"
        />
    );
}

export default SignInPage