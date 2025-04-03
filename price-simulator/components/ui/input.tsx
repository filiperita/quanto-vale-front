import { ChangeEvent } from "react";

interface InputProps {
  type?: string;
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  className?: string;
}

export function Input({ type = "text", value, onChange, className = "" }: InputProps) {
  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      className={`border border-gray-300 rounded-md p-2 w-full ${className}`}
    />
  );
}

  