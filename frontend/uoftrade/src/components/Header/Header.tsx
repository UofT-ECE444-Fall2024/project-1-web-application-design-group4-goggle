import React from "react";

const Header = ({ title = "" }) => {
  return (
    <section className="w-full h-[12.5vh] max-h-[110px] bg-primary flex items-center">
      <div className="container mx-auto px-4 sm:px-8">
        <h1
          className="text-white-bg tracking-widest font-bold"
          style={{ fontSize: 'min(36px, 5vh)' }}
        >
          {title}
        </h1>
      </div>
    </section>
  );
};

export default Header;