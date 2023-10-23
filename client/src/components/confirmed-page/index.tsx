import React from "react";
import { FormComponentProps } from "../types";

// This step is displayed when the form has been successfully submitted, offers adding new users and returing to the first step
export const ConfirmedPage: React.FC<Omit<FormComponentProps, "register">> = ({
  setCurrentStep,
  resetField,
}) => {
  // Function to reset all the fields
  // TODO move to utility
  const resetAllFields = () => {
    if (resetField !== undefined) {
      resetField("firstName");
      resetField("lastName");
      resetField("email");
      resetField("phoneNumber");
      resetField("zipCode");
      resetField("address");
    }
  };

  // Function that resets all the fields and returns to form to the first step
  const returnToStart = () => {
    resetAllFields();
    setCurrentStep(0);
  };

  return (
    <div className=" flex flex-col w-full h-full justify-center items-center">
      {/* Title and button */}
      <h2 className="text-2xl mb-3">New user successfully added!</h2>
      <button
        className="bg-green-500 rounded-lg px-4 py-2 hover:bg-green-600"
        onClick={returnToStart}
      >
        Add more users
      </button>
    </div>
  );
};
