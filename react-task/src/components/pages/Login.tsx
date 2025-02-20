import { useSelector } from "react-redux";
import AuthForm from "../molecules/AuthForm";
import { RootState } from "../../redux/store/store";

const Login = () => {
    const token = useSelector((state:RootState)=>state.auth.token)
    console.log(token)
  return (
    <>
      <AuthForm formType="login" formTitle="login" />
    </>
  );
};

export default Login;
