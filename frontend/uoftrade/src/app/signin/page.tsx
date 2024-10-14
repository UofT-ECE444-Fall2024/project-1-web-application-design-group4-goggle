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
        <>
            <Image
                src="/images/logo/UTrade_logo.svg" 
                alt="logo"
                width={140}
                height={30}
                className="m-5"
            />
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
                                <form>
                                    <div className="my-5 asterisk">
                                        <input
                                        type="email"
                                        name="email"
                                        placeholder="U of T Email Address"
                                        className="dark:text-body-color-dark dark:shadow-two w-full rounded-xl border border-outline-grey bg-white px-6 py-3 
                                        text-base text-body-color outline-none transition-all duration-300 dark:border-transparent 
                                        dark:bg-[#2C303B] dark:focus:shadow-none"
                                        required
                                        />
                                    </div>
                                    <div className="mb-5 asterisk">
                                        <input
                                        type="password"
                                        name="password"
                                        placeholder="Enter your Password"
                                        className="dark:text-body-color-dark dark:shadow-two w-full rounded-xl border border-outline-grey bg-white px-6 py-3 
                                        text-base text-body-color outline-none transition-all duration-300 dark:border-transparent 
                                        dark:bg-[#2C303B] dark:focus:shadow-none"
                                        required
                                        />
                                    </div>
                                    <div className="mb-5 flex flex-col justify-between sm:flex-row sm:items-center">
                                        <div className="mb-4 sm:mb-0">
                                            <label
                                                htmlFor="checkboxLabel"
                                                className="flex cursor-pointer select-none items-center text-sm font-medium text-body-color"
                                            >
                                                <div className="relative">
                                                    <input
                                                        type="checkbox"
                                                        id="checkboxLabel"
                                                        className="sr-only"
                                                    />
                                                    <div className="box mr-4 flex h-5 w-5 rounded border border-outline-grey hover:border-primary border-opacity-20 dark:border-white dark:border-opacity-10">
                                                    </div>
                                                </div>
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
                                <div className="mb-2">
                                    <button className="rounded-xl w-full h-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors 
                                    text-white-bg bg-primary dark:hover:bg-[#1a1a1a] hover:border-transparent text-l sm:text-base sm:h-12 ">
                                    Sign In
                                    </button>
                                </div>
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
    </>
    );
}

export default SignInPage