import React from "react";
import { getMessageString } from "../../utility/message-formatter";

export const Input = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement> & {
    form_error?: string | undefined;
    label?: string | undefined;
  }
>((props, ref) => (
  <div className="flex flex-col">
    <input
      {...props}
      ref={ref}
      className={`bg-gray-100 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
        props.form_error ? "bg-red-200" : ""
      } `}
    />
    {props.form_error ? (
      <p className="text-red-500 text-start text-xs mt-1 h-4">
        {getMessageString(props.form_error)}
      </p>
    ) : (
      <p className="h-4 mt-1"></p>
    )}
  </div>
));
