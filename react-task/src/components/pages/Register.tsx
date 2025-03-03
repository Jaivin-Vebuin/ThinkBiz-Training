import AuthForm from "../molecules/AuthForm";
import LanguageSelector from "../molecules/LanguageSelector";
import {
  LanguageSelectorWrapper,
  RegisterWrapper,
} from "../styles/AuthFormStyles";

const Register = () => {
  return (
    <RegisterWrapper>
      <LanguageSelectorWrapper>
        <LanguageSelector />
      </LanguageSelectorWrapper>
      <AuthForm formType="register" />
    </RegisterWrapper>
  );
};

export default Register;