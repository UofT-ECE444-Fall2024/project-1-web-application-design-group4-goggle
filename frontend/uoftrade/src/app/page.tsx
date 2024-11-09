import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <Image
          className="self-center"
          src="/images/logo/UTrade_logo.svg"
          alt="logo"
          width={180}
          height={38}
        />
        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <Link
            className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center gap-2 hover:text-white-bg hover:bg-primary dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
            href="/signin"
          >
            <Image
              className=""
              src="/images/logo/UTrade_logo.svg"
              alt="logo"
              width={20}
              height={20}
            />
            Sign In
          </Link>
          <Link
            className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:text-white-bg hover:bg-primary dark:hover:bg-[#1a1a1a] hover:border-transparent text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:min-w-44"
            href="/signup"
          >
            Sign Up
          </Link>
        </div>
      </main>
      
    </div>
  );
}
