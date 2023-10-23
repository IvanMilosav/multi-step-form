import React from "react";
import { Input } from "../ui";
import { FormComponentProps } from "../types";

// This this is the second step of the form that accepts location info
// ZIP code input filed has basic validity checking using regex patterns
export const LocationForm: React.FC<FormComponentProps> = ({
  register,
  setCurrentStep,
  errors,
  isValid,
}) => {
  return (
    <div className="h-full flex flex-col justify-between">
      <div className="flex flex-col w-full gap-y-8">
        {/* Title and subtitle */}
        <div className="flex flex-col">
          <h2 className="text-2xl">Address information</h2>
          <p>The fileds with a * are required</p>
        </div>
        {/* Input fields */}
        <div className="flex flex-col gap-y-2">
          <Input
            placeholder="Address*"
            {...register("address", { required: true })}
            form_error={errors?.address?.type}
          />
          <Input
            placeholder="ZIP code*"
            {...register("zipCode", { required: true, pattern: /^[0-9]+$/ })}
            form_error={errors?.zipCode?.type}
          />
        </div>
      </div>
      {/* Buttons */}
      <div className="flex w-full justify-between py-2">
        <button
          className="bg-green-500 rounded-lg px-4 py-2 hover:bg-green-600"
          onClick={() => setCurrentStep((prev: number) => prev - 1)}
        >
          Back
        </button>
        <button
          disabled={!isValid}
          className="bg-blue-500 rounded-lg px-4 py-2 hover:bg-blue-600 disabled:bg-gray-500 disabled:text-gray-300 disabled:cursor-not-allowed"
          onClick={() => setCurrentStep((prev: number) => prev + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
};
