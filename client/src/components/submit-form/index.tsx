import React from "react";
import {
  SubmitHandler,
  UseFormGetValues,
  UseFormHandleSubmit,
} from "react-hook-form";
import { FormInputs, FormComponentProps } from "../types";

// This is the third step of the for where previous inputs are displayed and form is submitted
export const SubmitForm: React.FC<
  Omit<FormComponentProps, "register"> & {
    handleSubmit: UseFormHandleSubmit<FormInputs, undefined>;
    onSubmit: SubmitHandler<FormInputs>;
    getValues: UseFormGetValues<FormInputs>;
    serverSubmitError: boolean;
  }
> = ({
  setCurrentStep,
  handleSubmit,
  onSubmit,
  getValues,
  serverSubmitError,
}) => {
  // Get all values from previous inputs
  const allValues = getValues();

  // Nicely format all values from previous inputs
  const allValuesFormatted = (
    <div className="flex flex-col  justify-center items-center w-full ">
      <div className="flex flex-col items-start ">
        <p className="text-lg">
          First name: <span className="font-bold">{allValues.firstName}</span>
        </p>
        <p className="text-lg">
          Last name: <span className="font-bold">{allValues.lastName}</span>
        </p>
        <p className="text-lg">
          Email: <span className="font-bold">{allValues.email}</span>
        </p>
        <p className="text-lg">
          Phone number:
          <span className="font-bold">
            {allValues.phoneNumber ? allValues.phoneNumber : "Not provided"}
          </span>
        </p>
        <p className="text-lg">
          Address: <span className="font-bold">{allValues.address}</span>
        </p>
        <p className="text-lg">
          ZIP code: <span className="font-bold">{allValues.zipCode}</span>
        </p>
      </div>
    </div>
  );

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="h-full flex flex-col justify-between"
    >
      {/* Title and subtitle */}
      <div className="flex flex-col">
        <h2 className="text-2xl">Confirmation page</h2>
        <p>If your data is accurate,proceed with the submission.</p>
      </div>
      {/* Display all values from previous inputs*/}
      {allValuesFormatted}
      {/* Error displayed if there is problem submitting the form */}
      {serverSubmitError ? (
        <p className="text-red">Error submitting form</p>
      ) : null}
      {/* Buttons */}
      <div className="flex w-full justify-between py-2">
        <button
          className="bg-green-500 rounded-lg px-4 py-2 hover:bg-green-600"
          onClick={() => setCurrentStep((prev: number) => prev - 1)}
        >
          Back
        </button>
        <button
          className="bg-blue-500 rounded-lg px-4 py-2 hover:bg-blue-600 disabled:bg-gray-500 disabled:text-gray-300 disabled:cursor-not-allowed"
          type="submit"
        >
          Submit
        </button>
      </div>
    </form>
  );
};
