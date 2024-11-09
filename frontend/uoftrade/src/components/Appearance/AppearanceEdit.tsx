"use client";

import React, { useState } from "react";
import { useTheme } from "next-themes";
import ThemeToggle from "./ThemeToggle";

const AppearanceEdit = () => {
  const { theme, setTheme } = useTheme();
  const [ themebool, setThemeBool ] = useState<boolean>(true);

  const switchTheme = (setting:boolean) => {
    setTheme(theme === "dark" ? "light" : "dark")
    setThemeBool(setting);
  }

  return (
    <div className="container flex flex-col justify-around">
      <h3 className="my-12 text-3xl leading-8 mr-8 font-bold text-heading-1 dark:text-white-bg sm:text-xl" style={{fontSize: '2.5rem', lineHeight: '1'}}>
          Appearance
      </h3>
      <ThemeToggle title='Choose Theme' leftText="Light" rightText="Dark" state={themebool} setState={switchTheme}/>
    </div>
  );
};

export default AppearanceEdit;