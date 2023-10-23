import {
  FieldErrors,
  UseFormRegister,
  UseFormResetField,
} from "react-hook-form";

export type FormComponentProps = {
  register: UseFormRegister<FormInputs>;
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
  resetField?: UseFormResetField<FormInputs>;
  watchingEmail?: string;
  errors?: FieldErrors<FormInputs>;
  isValid?: boolean;
};

export type FormInputs = {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  address: string;
  zipCode: string;
};
export type ServerResponse =
  | {
      message: string;
    }
  | {
      error: string;
    };
