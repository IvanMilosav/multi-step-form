import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import {
  LocationForm,
  PersonalDetailsForm,
  SubmitForm,
  ConfirmedPage,
} from "./components";
import { FormInputs } from "./components/types";
import { postFormDataToServer } from "./utility/user-helpers";

import "./styles/App.css";

function App() {
  const [currentStep, setCurrentStep] = React.useState(0);
  const [serverSubmitError, setServerSubmitError] = React.useState(false);

  // Form handling using react-hook-form
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    resetField,
    watch,
    getValues,
  } = useForm<FormInputs>({ mode: "all" });

  // Watch for changes to the 'email' field
  const watchingEmail = watch("email");

  // Form submission handler
  const onSubmit: SubmitHandler<FormInputs> = (data) => {
    try {
      postFormDataToServer(data);
      setServerSubmitError(false);
      setCurrentStep(3);
    } catch (errors) {
      console.error(errors);
      setServerSubmitError(true);
    }
  };

  return (
    <div className="flex w-full h-full items-center justify-center text-gray-900">
      <div className="md:w-[500px] h-[550px] md:h-[550px] bg-gray-100 rounded-lg px-8 py-8 max-w-full">
        {/* Render the appropriate form step based on the currentStep.
             There are 4 steps in the form, and we display the relevant form component
             according to the current step: Personal Details, Location Details, Submission and Confirmation. */}
        {currentStep === 0 && (
          <PersonalDetailsForm
            register={register}
            setCurrentStep={setCurrentStep}
            resetField={resetField}
            errors={errors}
            isValid={isValid}
            watchingEmail={watchingEmail}
          />
        )}
        {currentStep === 1 && (
          <LocationForm
            register={register}
            setCurrentStep={setCurrentStep}
            resetField={resetField}
            errors={errors}
            isValid={isValid}
          />
        )}
        {currentStep === 2 && (
          <SubmitForm
            handleSubmit={handleSubmit}
            onSubmit={onSubmit}
            setCurrentStep={setCurrentStep}
            errors={errors}
            isValid
            getValues={getValues}
            serverSubmitError={serverSubmitError}
          />
        )}
        {currentStep === 3 && (
          <ConfirmedPage
            setCurrentStep={setCurrentStep}
            resetField={resetField}
          />
        )}
      </div>
    </div>
  );
}

export default App;
