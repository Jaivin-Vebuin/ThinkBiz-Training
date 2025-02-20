import { useDispatch } from "react-redux";
import { loginAPI, registerAPI } from "../services/userAuthServices";
import { setAuthToken } from "../redux/features/slices/auth/authSlice";
import { loginDataType, registerDataType } from "../data/model/types/hooksTypes/useAuthentication";


function useAuthentication() {
  const dispatch = useDispatch();

  const registerUser = async (data: registerDataType) => {
    try {
      const registerResponse = await registerAPI(data);
      // toastify
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      }
    }
  };

  const loginUser = async (data: loginDataType) => {
    try {
      const loginResponse = await loginAPI(data);
      const token = loginResponse.data;
      dispatch(setAuthToken(token));

      // toastify
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      }
    }
  };

  return { registerUser, loginUser };
}

export default useAuthentication;
