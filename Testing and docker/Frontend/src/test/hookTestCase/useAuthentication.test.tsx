import "@testing-library/jest-dom";
import { renderHook, act } from "@testing-library/react";
import useAuthentication from "../../hooks/useAuthentication";
import { loginAPI, registerAPI } from "../../services/userAuthServices";
import { setAuthToken } from "../../redux/features/slices/auth/authSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";

jest.mock("react-redux", () => ({
  useDispatch: jest.fn(),
}));

jest.mock("react-router", () => ({
  useNavigate: jest.fn(),
}));

jest.mock("react-toastify", () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));

// jest.mock("react-i18next", () => ({
//   useTranslation: () => ({
//     t: (key: string) => key,
//   }),
// }));

jest.mock("../../services/userAuthServices", () => ({
  loginAPI: jest.fn(),
  registerAPI: jest.fn(),
}));

describe("useAuthentication", () => {
  let dispatchMock: jest.Mock;
  let navigateMock: jest.Mock;

  beforeEach(() => {
    dispatchMock = jest.fn();
    (useDispatch as unknown as jest.Mock).mockReturnValue(dispatchMock);

    navigateMock = jest.fn();
    (useNavigate as jest.Mock).mockReturnValue(navigateMock);

    jest.clearAllMocks();
  });

  test("should call registerAPI and show success toast on successful registration", async () => {
    (registerAPI as jest.Mock).mockResolvedValue({});

    const { result } = renderHook(() => useAuthentication());

    await act(async () => {
      await result.current.registerUser({
        name: "test",
        email: "test@example.com",
        password: "pass1234",
        role: "admin",
        age: 20,
      });
    });

    expect(registerAPI).toHaveBeenCalledWith({
      name: "test",
      email: "test@example.com",
      password: "pass1234",
      role: "admin",
      age: 20,
    });
    expect(navigateMock).toHaveBeenCalledWith("/login");
    expect(toast.success).toHaveBeenCalledWith("registrationToastSuccess", {
      position: "top-center",
    });
  });

  test("should show error toast on registration failure", async () => {
    (registerAPI as jest.Mock).mockRejectedValue(
      new Error("Registration failed")
    );

    const { result } = renderHook(() => useAuthentication());

    await act(async () => {
      await result.current.registerUser({
        name: "test",
        email: "test@example.com",
        password: "pass1234",
        role: "admin",
        age: 0,
      });
    });

    expect(registerAPI).toHaveBeenCalledWith({
      name: "test",
      email: "test@example.com",
      password: "pass1234",
      role: "admin",
      age: 0,
    });
    expect(toast.error).toHaveBeenCalledWith(
      "registrationToastError: Registration failed",
      {
        position: "top-center",
      }
    );
  });

  test("should call loginAPI, dispatch setAuthToken, and show success toast on successful login", async () => {
    (loginAPI as jest.Mock).mockResolvedValue({
      data: { message: "Authentication Successful.", token: "test-token" },
      status: 200,
    });

    const { result } = renderHook(() => useAuthentication());

    await act(async () => {
      await result.current.loginUser({
        email: "testuser",
        password: "password",
      });
    });

    expect(loginAPI).toHaveBeenCalledWith({
      email: "testuser",
      password: "password",
    });
    expect(dispatchMock).toHaveBeenCalledWith(
      setAuthToken({ message: "Authentication Successful.", token: "test-token" })
    );
    expect(toast.success).toHaveBeenCalledWith("loginToastSuccess", {
      position: "top-center",
    });
  });

  test("should show error toast on login failure", async () => {
    (loginAPI as jest.Mock).mockRejectedValue(new Error("Login failed"));

    const { result } = renderHook(() => useAuthentication());

    await act(async () => {
      await result.current.loginUser({
        email: "testuser",
        password: "password",
      });
    });

    expect(loginAPI).toHaveBeenCalledWith({
      email: "testuser",
      password: "password",
    });
    expect(toast.error).toHaveBeenCalledWith("loginToastError: Login failed", {
      position: "top-center",
    });
  });
});
