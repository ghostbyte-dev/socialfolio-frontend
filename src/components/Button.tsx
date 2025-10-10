import React from "react";

interface ButtonProps {
  children: string;
  link: string;
}

const Button: React.FC<ButtonProps> = ({ children, link }) => {
  return (
    <a href={link}>
      <button type="button" className="button rounded-xl">
        <span className="relative z-10 transition-colors duration-300 ease-in-out">
          {children}
        </span>
      </button>
    </a>
  );
};

export default Button;
