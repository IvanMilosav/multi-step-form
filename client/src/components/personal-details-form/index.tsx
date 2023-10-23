import React, { useEffect, useState } from "react";
import { Input } from "../ui";
import { FormComponentProps } from "../types";
import { isEmailInUse } from "../../utility/user-helpers";

// This is the first step of the form that accepts personal info
// Name, last name, email and phone inputs filed have basic validity checking using regex patterns
export const PersonalDetailsForm: React.FC<FormComponentProps> = ({
  register,
  setCurrentStep,
  resetField,
  errors,
  isValid,
  watchingEmail,
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
  // State holding the information if current input email is in databsae
  const [emailInUse, setEmailInUse] = useState(false);

  // useEffect called every time email input changes to check if current input email is in databsae
  useEffect(() => {
    if (watchingEmail) {
      isEmailInUse(watchingEmail)
        .then((result) => {
          if (typeof result === "boolean") {
            setEmailInUse(result);
          } else {
            console.error(result.error);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [watchingEmail]);

  return (
    <div className="h-full flex flex-col justify-between">
      <div className="flex flex-col w-full gap-y-8">
        {/* Title and subtitle */}
        <div className="flex flex-col">
          <h2 className="text-2xl">Personal Details Form</h2>
          <p>The fileds with a * are required</p>
        </div>
        {/* Input fields */}
        <div className="flex flex-col gap-y-2">
          <Input
            placeholder="First Name*"
            {...register("firstName", {
              required: true,
              maxLength: 20,
              pattern: /^[A-Za-z\s]+$/,
            })}
            form_error={errors?.firstName?.type}
          />
          <Input
            placeholder="Last Name*"
            {...register("lastName", {
              required: true,
              maxLength: 20,
              pattern: /^[A-Za-z\s]+$/,
            })}
            form_error={errors?.lastName?.type}
          />
          <Input
            placeholder="Email adress*"
            {...register("email", {
              required: true,
              maxLength: 25,
              pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
            })}
            form_error={
              emailInUse ? "emailExists" : null || errors?.email?.type
            }
          />
          <Input
            placeholder="Phone number"
            {...register("phoneNumber", {
              pattern:
                /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{2,6}$/,
              minLength: 8,
            })}
            form_error={errors?.phoneNumber?.type}
          />
        </div>
      </div>
      {/* Buttons */}
      <div className="flex w-full justify-between py-2">
        <button
          className="bg-red-500 rounded-lg px-4 py-2 hover:bg-red-400"
          onClick={() => resetAllFields()}
        >
          Cancel
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
