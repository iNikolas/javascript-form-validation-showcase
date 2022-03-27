import React, { useState } from "react";

interface ErrorStateType {
  "login-email-input": string;
  "login-password-input": string;
  "register-full-name-input"?: string;
  "register-password-confirm-input"?: string;
}

export type ChangeFuncType = (
  inputType: "email" | "password" | "displayName" | "passwordConfirm"
) => (event: React.ChangeEvent<HTMLInputElement>) => void;

export const handleValidity = (
  input: HTMLInputElement,
  setErrorState: React.Dispatch<React.SetStateAction<ErrorStateType>>
): void => {
  if (input.validity.valueMissing)
    return setErrorState((state) => ({
      ...state,
      [input.id]: "This field can not be empty! Please fill it in.",
    }));

  if (input.validity.patternMismatch) {
    if (input.id === "login-email-input")
      return setErrorState((state) => ({
        ...state,
        [input.id]: "Please satisfy correct Email pattern.",
      }));

    if (input.id === "register-full-name-input")
      return setErrorState((state) => ({
        ...state,
        [input.id]:
          "Must consist of two words strictly. Numbers are not allowed.",
      }));

    return setErrorState((state) => ({
      ...state,
      [input.id]: "Incorrect input.",
    }));
  }
  if (input.validity.tooShort)
    return setErrorState((state) => ({
      ...state,
      [input.id]: "Minimum password length is 12 symbols.",
    }));

  return setErrorState((state) => ({
    ...state,
    [input.id]: "",
  }));
};

export const handleMouseDownPassword = (
  event: React.MouseEvent<HTMLButtonElement>
): void => {
  event.preventDefault();
};

interface LocalStateType {
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  setConfirmPassword: React.Dispatch<React.SetStateAction<string>>;
  displayName: string;
  showConfirmPassword: boolean;
  setShowPassword: React.Dispatch<React.SetStateAction<boolean>>;
  setErrorState: (
    value: ((prevState: ErrorStateType) => ErrorStateType) | ErrorStateType
  ) => void;
  setDisplayName: React.Dispatch<React.SetStateAction<string>>;
  setShowConfirmPassword: React.Dispatch<React.SetStateAction<boolean>>;
  password: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  email: string;
  confirmPassword: string;
  isWorking: boolean;
  setIsWorking: React.Dispatch<React.SetStateAction<boolean>>;
  errorState: ErrorStateType;
  showPassword: boolean;
}

export const useLocalState = (): LocalStateType => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isWorking, setIsWorking] = useState(false);
  const [errorState, setErrorState] = useState<ErrorStateType>({
    "login-email-input": "",
    "login-password-input": "",
    "register-full-name-input": "",
    "register-password-confirm-input": "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return {
    email,
    setEmail,
    password,
    setPassword,
    displayName,
    setDisplayName,
    confirmPassword,
    setConfirmPassword,
    isWorking,
    setIsWorking,
    errorState,
    setErrorState,
    showPassword,
    setShowPassword,
    showConfirmPassword,
    setShowConfirmPassword,
  };
};
