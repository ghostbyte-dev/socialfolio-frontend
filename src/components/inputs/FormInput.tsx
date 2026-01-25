"use client";

import type React from "react";
import { useId } from "react";

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export const FormInput = ({ label, error, ...props }: FormInputProps) => {
  const id = useId(); // Generates a unique ID for this specific instance

  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={id}>{label}</label>
      <input
        {...props}
        id={id} // Links the input to the label
        className={`input ${error ? "border-danger ring-danger" : ""}`}
      />
      {error && <p className="form-error">{error}</p>}
    </div>
  );
};
