import React from "react";
import LoginLink from "./ModeLink";
import imgLogo from "./logo.svg";
import {
  handleMouseDownPassword,
  handleValidity,
  ChangeFuncType,
  useLocalState,
} from "./controller";
import {
  Box,
  Button,
  FilledInput,
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
} from "@material-ui/core";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import './index.css'

const INPUT_WIDTH_CH = 35;

const SignUpPage: React.FC = () => {
  const {
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
  } = useLocalState();

  const handleInputChange: ChangeFuncType = (inputType) => (event) => {
    const { target } = event;
    if (inputType === "email") setEmail(target.value || "");
    if (inputType === "password") setPassword(target.value || "");
    if (inputType === "displayName") {
      let text = target.value || "";

      const textInput = text
        .toLowerCase()
        .trimStart()
        .split(" ")
        .filter((value) => !!value);

      if (!text) {
        setDisplayName("");
      } else if (textInput.length < 2) {
        setDisplayName(text[0].toUpperCase() + (text.slice(1) || ""));
      } else {
        text = "";

        for (let i = 0; i < 2; i += 1) {
          const word =
            textInput[i][0].toUpperCase() + (textInput[i].slice(1) || "");
          if (i > 0) text += " ";
          text += word;
        }

        setDisplayName(text);
      }
    }
    if (inputType === "passwordConfirm") setConfirmPassword(target.value || "");
    handleValidity(target, setErrorState);
  };

  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleClickShowPasswordConfirm = () =>
    setShowConfirmPassword(!showConfirmPassword);

  const handleSignUp = async (event: React.FormEvent) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      setErrorState((prevState) => ({
        ...prevState,
        "register-password-confirm-input": "Password confirmation failed!",
      }));
      return;
    }
    try {
      //setIsWorking(true);
    } catch (error) {
      setIsWorking(false);
    }
  };

  return (
    <Box className='full-screen-container' gridGap='6ch' height="100vh" display="flex" flexDirection='column' justifyContent="space-between">
      <div className="login-screen-flex-form-wrapper">
        <img className="logo-img-login-page" src={imgLogo} alt="logo" />
        <span className="login-screen-title">Register</span>
        <form className="login-screen-input-form" onSubmit={handleSignUp}>
          <FormControl
            style={{ width: `${INPUT_WIDTH_CH}ch` }}
            variant="filled"
          >
            <InputLabel htmlFor="login-email-input">Email</InputLabel>
            <FilledInput
              inputProps={{ pattern: "^\\S+@\\S+\\.\\S+$" }}
              error={!!errorState["login-email-input"]}
              onChange={handleInputChange("email")}
              value={email}
              id="login-email-input"
              type="text"
              required
            />
            <FormHelperText error>
              {errorState["login-email-input"]}
            </FormHelperText>
          </FormControl>
          <FormControl
            style={{ width: `${INPUT_WIDTH_CH}ch` }}
            variant="filled"
          >
            <InputLabel htmlFor="register-full-name-input">
              Full Name
            </InputLabel>
            <FilledInput
              inputProps={{
                pattern: "^\\s?[A-Za-zА-Яа-я]+\\s[A-Za-zА-Яа-я]+\\s?$",
              }}
              error={!!errorState["register-full-name-input"]}
              onChange={handleInputChange("displayName")}
              value={displayName}
              id="register-full-name-input"
              type="text"
              required
            />
            <FormHelperText error>
              {errorState["register-full-name-input"]}
            </FormHelperText>
          </FormControl>
          <FormControl
            style={{ width: `${INPUT_WIDTH_CH}ch` }}
            variant="filled"
          >
            <InputLabel htmlFor="login-password-input">Password</InputLabel>
            <FilledInput
              inputProps={{ minLength: "12" }}
              error={!!errorState["login-password-input"]}
              onChange={handleInputChange("password")}
              id="login-password-input"
              type={showPassword ? "text" : "password"}
              value={password}
              required
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
            <FormHelperText error>
              {errorState["login-password-input"]}
            </FormHelperText>
          </FormControl>
          <FormControl
            style={{ width: `${INPUT_WIDTH_CH}ch` }}
            variant="filled"
          >
            <InputLabel htmlFor="register-password-confirm-input">
              Password Confirm
            </InputLabel>
            <FilledInput
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPasswordConfirm}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              inputProps={{ minLength: "12" }}
              error={!!errorState["register-password-confirm-input"]}
              onChange={handleInputChange("passwordConfirm")}
              value={confirmPassword}
              id="register-password-confirm-input"
              type={showConfirmPassword ? "text" : "password"}
              required
            />
            <FormHelperText error>
              {errorState["register-password-confirm-input"]}
            </FormHelperText>
          </FormControl>
          <FormControl
            style={{ width: `${INPUT_WIDTH_CH}ch` }}
            variant="filled"
          >
            <Button
              className="login-btn-screen"
              variant="contained"
              type="submit"
              disabled={
                isWorking ||
                !!errorState["login-email-input"] ||
                !!errorState["login-password-input"] ||
                !!errorState["register-full-name-input"] ||
                !!errorState["register-password-confirm-input"] ||
                !email ||
                !password ||
                !confirmPassword ||
                !displayName
              }
            >
              REGISTER
            </Button>
          </FormControl>
        </form>
      </div>
      <div className="auth-options-container">
        <span>Already have account?</span>
        <LoginLink suggestion="LOGIN" />
      </div>
    </Box>
  );
};

export default SignUpPage;
