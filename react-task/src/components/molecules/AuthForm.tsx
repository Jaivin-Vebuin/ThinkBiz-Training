import React from "react";
import Input from "../atoms/Input";
import Select from "../atoms/Select";
import { roles } from "../../utils/constants/app.constants";
import {
  FormStyle,
  TitleStyle,
  InputFieldStyle,
  ButtonStyle,
  FormRedirectionButton,
} from "../styles/AuthFormStyles";
import { useForm, SubmitHandler } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import {
  registerSchema,
  loginSchema,
} from "../../data/validation/formValidation";
import Button from "../atoms/Button";
import useAuthentication from "../../hooks/useAuthentication";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";

interface formPropsType {
  formType: string;
}

const AuthForm: React.FC<formPropsType> = ({ formType }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { loginUser, registerUser } = useAuthentication();

  const schema = formType === "register" ? registerSchema : loginSchema;
  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields },
  } = useForm({
    resolver: joiResolver(schema),
  });

  const onSubmit: SubmitHandler<any> = (data) => {
    if (formType === "login") {
      loginUser({ email: data.userEmail, password: data.userPassword });
    } else {
      registerUser({
        name: data.userName,
        email: data.userEmail,
        password: data.userPassword,
        role: data.userRole,
        age: parseInt(data.userAge),
      });
    }
  };

  return (
    <>
      <FormStyle onSubmit={handleSubmit(onSubmit)}>
        <TitleStyle>
          {formType === "login" ? t("formTitleLogin") : t("formTitleRegister")}
        </TitleStyle>
        <div>
          {formType === "register" && (
            <>
              <InputFieldStyle>
                <Input
                  name="userName"
                  handleOnChange={() => {}}
                  inputType="text"
                  placeholder={t("namePlaceHolder")}
                  labelText={t("Name")}
                  htmlFor="userName"
                  registerProps={register("userName")}
                  error={
                    touchedFields.userName
                      ? (errors.userName?.message as string)
                      : undefined
                  }
                />
              </InputFieldStyle>
              <InputFieldStyle>
                <Input
                  name="userEmail"
                  handleOnChange={() => {}}
                  inputType="text"
                  placeholder={t("emailPlaceHolder")}
                  labelText={t("Email")}
                  htmlFor="userEmail"
                  registerProps={register("userEmail")}
                  error={
                    touchedFields.userEmail
                      ? (errors.userEmail?.message as string)
                      : undefined
                  }
                />
              </InputFieldStyle>
              <InputFieldStyle>
                <Input
                  name="userPassword"
                  handleOnChange={() => {}}
                  inputType="password"
                  placeholder="********"
                  labelText={t("Password")}
                  htmlFor="userPassword"
                  registerProps={register("userPassword")}
                  error={
                    touchedFields.userPassword
                      ? (errors.userPassword?.message as string)
                      : undefined
                  }
                />
              </InputFieldStyle>
              <InputFieldStyle>
                <Select
                  options={roles}
                  handleOnChange={() => {}}
                  name="userRole"
                  error={
                    touchedFields.userRole
                      ? (errors.userRole?.message as string)
                      : undefined
                  }
                  labelText={t("Role")}
                  registerProps={register("userRole")}
                  htmlFor="userRole"
                />
              </InputFieldStyle>
              <InputFieldStyle>
                <Input
                  name="userAge"
                  handleOnChange={() => {}}
                  inputType="number"
                  placeholder={t("agePlaceHolder")}
                  labelText={t("Age")}
                  htmlFor="userAge"
                  registerProps={register("userAge")}
                  error={
                    touchedFields.userAge
                      ? (errors.userAge?.message as string)
                      : undefined
                  }
                />
              </InputFieldStyle>
            </>
          )}

          {formType === "login" && (
            <>
              <InputFieldStyle>
                <Input
                  name="userEmail"
                  handleOnChange={() => {}}
                  inputType="text"
                  placeholder={t("emailPlaceHolder")}
                  labelText={t("Email")}
                  htmlFor="userEmail"
                  registerProps={register("userEmail")}
                  error={
                    touchedFields.userEmail
                      ? (errors.userEmail?.message as string)
                      : undefined
                  }
                />
              </InputFieldStyle>
              <InputFieldStyle>
                <Input
                  name="userPassword"
                  handleOnChange={() => {}}
                  inputType="password"
                  placeholder="********"
                  labelText={t("Password")}
                  htmlFor="userPassword"
                  registerProps={register("userPassword")}
                  error={
                    touchedFields.userPassword
                      ? (errors.userPassword?.message as string)
                      : undefined
                  }
                />
              </InputFieldStyle>
            </>
          )}
        </div>
        <ButtonStyle>
          <Button
            text={
              formType === "login"
                ? t("loginFormButton")
                : t("registerFormButton")
            }
            handleOnClick={handleSubmit(onSubmit)}
          />
        </ButtonStyle>
      </FormStyle>
      <div
        style={{
          padding: "15px",
          borderRadius: "8px",
          textAlign: "center",
          margin: "20px",
        }}
      >
        {formType === "login" && (
          <>
            {t("forNewUser")}
            <FormRedirectionButton>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  navigate("/register");
                }}
              >
                {t("registerFormButton")}
              </button>
            </FormRedirectionButton>
          </>
        )}

        {formType === "register" && (
          <>
            {t("forRegisteredUser")}
            <FormRedirectionButton>
              <button
                onClick={(event) => {
                  event.preventDefault();
                  navigate("/login");
                }}
              >
                {t("loginFormButton")}
              </button>
            </FormRedirectionButton>
          </>
        )}
      </div>
    </>
  );
};

export default AuthForm;
