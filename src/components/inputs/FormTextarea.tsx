"use client";

import type React from "react";
import { useId } from "react";

interface FormTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string;
}

export const FormTextarea = ({ label, error, ...props }: FormTextareaProps) => {
  const id = useId();

  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={id}>{label}</label>
      <textarea
        {...props}
        id={id}
        className={`input resize-none ${
          error ? "border-danger ring-danger" : ""
        }`}
      />
      {error && <p className="form-error">{error}</p>}
    </div>
  );
};
