import { useDispatch } from "react-redux";
import { loginAPI, registerAPI } from "../services/userAuthServices";
import { setAuthToken } from "../redux/features/slices/auth/authSlice";
import {
  loginDataType,
  registerDataType,
} from "../data/model/types/hooksTypes/useAuthentication";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router";
import { useTranslation } from "react-i18next";

function useAuthentication() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {t} = useTranslation();

  const registerUser = async (data: registerDataType) => {
    try {
      
      await registerAPI(data);
      navigate('/login')
      toast.success(t("registrationToastSuccess"), {
        position: "top-center",
      });
    } catch (error) {
      if (error instanceof Error) {
        toast.error(`${t("registrationToastError")}: ${error.message}`, {
          position: "top-center",
        });
      }
    }
  };

  const loginUser = async (data: loginDataType) => {
    try {
   
      const loginResponse = await loginAPI(data);
      const token = loginResponse.data;
      dispatch(setAuthToken(token));
      if (loginResponse.status === 200) {
       
        toast.success(t("loginToastSuccess"), { position: "top-center" });
      } else {
        toast.error(`${t("loginToastError")}: ${loginResponse.data.message}`, {
          position: "top-center",
        });
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error(`${t("loginToastError")}: ${error.message}`, {
          position: "top-center",
        });
      }
    }
  };

  return { registerUser, loginUser };
}

export default useAuthentication;
