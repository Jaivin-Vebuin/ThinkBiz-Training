import AuthForm from "../molecules/AuthForm";
import LanguageSelector from "../molecules/LanguageSelector";
import {
  LanguageSelectorWrapper,
  LoginWrapper,
} from "../styles/AuthFormStyles";

const Login = () => {
  return (
    <LoginWrapper>
      <LanguageSelectorWrapper>
        <LanguageSelector />
      </LanguageSelectorWrapper>
      <AuthForm formType="login" />
    </LoginWrapper>
  );
};

export default Login;
