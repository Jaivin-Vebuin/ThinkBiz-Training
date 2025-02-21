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

function useAuthentication() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const registerUser = async (data: registerDataType) => {
    try {
      
      await registerAPI(data);
      navigate('/login')
      toast.success("Registration successful! Please log in.", {
        position: "top-center",
      });
    } catch (error) {
      if (error instanceof Error) {
        toast.error(`Registration failed: ${error.message}`, {
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
       
        toast.success("Login successful!", { position: "top-center" });
      } else {
        toast.error(`Login failed: ${loginResponse.data.message}`, {
          position: "top-center",
        });
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error(`Login failed: ${error.message}`, {
          position: "top-center",
        });
      }
    }
  };

  return { registerUser, loginUser };
}

export default useAuthentication;
