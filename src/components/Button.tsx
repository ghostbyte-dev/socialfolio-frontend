import React from "react";

interface ButtonProps {
  children: string;
  link: string;
}

const Button: React.FC<ButtonProps> = ({ children, link }) => {
  return (
    <a href={link}>
      <button className="relative px-4 py-2 text-white bg-primary font-semibold rounded-xl border-none overflow-hidden group">
        <span className="relative z-10 transition-colors text-white duration-300 ease-in-out">
          {children}
        </span>
      </button>
    </a>
  );
};

export default Button;
