import React from "react";
import Input from "../atoms/Input";
import Select from "../atoms/Select";
import { roles } from "../../utils/constants/app.constants";
import {
  FormStyle,
  TitleStyle,
  InputFieldStyle,
  ButtonStyle,
} from "../styles/AuthFormStyles";
import { useForm, SubmitHandler } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import {
  registerSchema,
  loginSchema,
} from "../../data/validation/formValidation";
import Button from "../atoms/Button";
import useAuthentication from "../../hooks/useAuthentication";
// import { login } from "../../services/userAuthServices";

interface formPropsType {
  formType: string;
  formTitle: string;
}

const AuthForm: React.FC<formPropsType> = ({ formType, formTitle }) => {
  const schema = formType === "register" ? registerSchema : loginSchema;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: joiResolver(schema),
  });

  const { loginUser, registerUser } = useAuthentication();

  const onSubmit: SubmitHandler<any> = (data) => {
    if (formType === "login") {
      console.log("Submitted !!", data);
      console.log(data.userEmail);
      loginUser({ email: data.userEmail, password: data.userPassword });
    } else {
      console.log("Registerd !!", data);
      registerUser(data);
    }
  };

  return (
    <FormStyle onSubmit={handleSubmit(onSubmit)}>
      <TitleStyle>{formTitle}</TitleStyle>
      <div>
        {formType === "register" && (
          <>
            <InputFieldStyle>
              <Input
                name="userName"
                handleOnChange={() => {}}
                inputType="text"
                placeholder="Enter your Name"
                labelText="Name"
                htmlFor="userName"
                registerProps={register("userName")}
                error={errors.userName?.message as string | undefined}
              />
            </InputFieldStyle>
            <InputFieldStyle>
              <Input
                name="userEmail"
                handleOnChange={() => {}}
                inputType="text"
                placeholder="example@example.com"
                labelText="Email"
                htmlFor="userEmail"
                registerProps={register("userEmail")}
                error={errors.userEmail?.message as string | undefined}
              />
            </InputFieldStyle>
            <InputFieldStyle>
              <Input
                name="userPassword"
                handleOnChange={() => {}}
                inputType="password"
                placeholder="********"
                labelText="Password"
                htmlFor="userPassword"
                registerProps={register("userPassword")}
                error={errors.userPassword?.message as string | undefined}
              />
            </InputFieldStyle>
            <InputFieldStyle>
              <Select
                options={roles}
                handleOnChange={() => {}}
                name="userRole"
                error={errors.userRole?.message as string | undefined}
                labelText="Role"
                registerProps={register("userRole")}
                htmlFor="userRole"
              />
            </InputFieldStyle>
            <InputFieldStyle>
              <Input
                name="userAge"
                handleOnChange={() => {}}
                inputType="number"
                placeholder="ex. 18"
                labelText="Age"
                htmlFor="userAge"
                registerProps={register("userAge")}
                error={errors.userAge?.message as string | undefined}
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
                placeholder="example@example.com"
                labelText="Email"
                htmlFor="userEmail"
                registerProps={register("userEmail")}
                error={errors.userEmail?.message as string | undefined}
              />
            </InputFieldStyle>
            <InputFieldStyle>
              <Input
                name="userPassword"
                handleOnChange={() => {}}
                inputType="password"
                placeholder="********"
                labelText="Password"
                htmlFor="userPassword"
                registerProps={register("userPassword")}
                error={errors.userPassword?.message as string | undefined}
              />
            </InputFieldStyle>
          </>
        )}
      </div>
      <ButtonStyle>
        <Button
          text={formType === "login" ? "login" : "register"}
          handleOnClick={handleSubmit(onSubmit)}
        />
      </ButtonStyle>
    </FormStyle>
  );
};

export default AuthForm;
