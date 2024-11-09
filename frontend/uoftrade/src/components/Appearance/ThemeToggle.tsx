"use client";

import React from "react";

interface ThemeToggleProps {
    title: string;
    leftText: string;
    rightText: string;
    state: boolean;
    setState: Function
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ leftText, rightText, title, state, setState }) => {

  return (
      <div className="w-full">
        <h4 className="my-4 text-3xl font-bold text-heading-1 dark:text-white-bg sm:text-2xl">
          {title}
        </h4>
        <div className="mb-8 ml-1 flex md:mb-12 lg:mb-16">
          <span
            onClick={() => setState(true)}
            className={`${
              state
                ? "pointer-events-none text-primary"
                : "text-heading-1 dark:text-white-bg"
            } mr-4 cursor-pointer text-base font-semibold`}
          >
            {leftText}
          </span>
          <div
            onClick={() => setState(!state)}
            className="flex cursor-pointer items-center"
          >
            <div className="relative">
              <div className="h-5 w-14 rounded-full bg-dark-grey shadow-inner"></div>
              <div
                className={`${
                  state ? "" : "translate-x-full"
                } shadow-switch-1 absolute left-0 top-[-4px] flex h-7 w-7 items-center justify-center rounded-full bg-primary transition`}
              >
                <span className="active h-4 w-4 rounded-full bg-white-bg"></span>
              </div>
            </div>
          </div>
          <span
            onClick={() => setState(false)}
            className={`${
              state
                ? "text-heading-1 dark:text-white-bg"
                : "pointer-events-none text-primary"
            } ml-4 cursor-pointer text-base font-semibold`}
          >
            {rightText}
          </span>
        </div>
      </div>
  );
};

export default ThemeToggle;