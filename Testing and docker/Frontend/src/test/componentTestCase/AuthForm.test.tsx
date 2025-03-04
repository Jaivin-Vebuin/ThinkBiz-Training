import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import { useNavigate } from "react-router";
import AuthForm from "../../components/molecules/AuthForm";
import useAuthentication from "../../hooks/useAuthentication";

jest.mock("react-router", () => ({
  useNavigate: jest.fn(),
}));

jest.mock("react-redux", () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(() => ({})),
}));

// jest.mock("react-i18next", () => ({
//   useTranslation: () => ({ t: (key: string) => key }),
// }));

jest.mock("../../hooks/useAuthentication", () => ({
  __esModule: true,
  default: jest.fn(() => ({
    loginUser: jest.fn(),
    registerUser: jest.fn(),
  })),
}));

let mockNavigate: jest.Mock;
describe("Auth Form", () => {
  beforeEach(() => {
    mockNavigate = jest.fn();
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);
    (useAuthentication as jest.Mock).mockReturnValue({
      loginUser: jest.fn(),
      registerUser: jest.fn(),
    });
    jest.clearAllMocks();
  });

  test("matches snapshot for register form", () => {
    const { asFragment } = render(<AuthForm formType="register" />);
    expect(asFragment()).toMatchSnapshot();
  });

  test("matches snapshot for login form", () => {
    const { asFragment } = render(<AuthForm formType="login" />);
    expect(asFragment()).toMatchSnapshot();
  });
  test("renders login form by default and redirects to dashboard on login", async () => {
    const mockLoginUser = jest.fn();
    (useAuthentication as jest.Mock).mockReturnValue({
      loginUser: mockLoginUser,
      registerUser: jest.fn(),
    });

    render(<AuthForm formType="login" />);

    expect(screen.getByRole("heading", { name: /login/i })).toBeInTheDocument();

    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const loginSubmitButton = screen.getByRole("button", { name: /login/i });

    await userEvent.type(emailInput, "test@example.com");
    await userEvent.type(passwordInput, "password123");

    await userEvent.click(loginSubmitButton);

    expect(mockLoginUser).toHaveBeenCalledWith({
      email: "test@example.com",
      password: "password123",
    });
  });

  test("navigates to register form when clicking register button", async () => {
    render(<AuthForm formType="login" />);

    expect(screen.getByRole("heading", { name: /login/i })).toBeInTheDocument();

    const registerNavButton = screen.getByRole("button", { name: /register/i });
    await userEvent.click(registerNavButton);

    expect(mockNavigate).toHaveBeenCalledWith("/register");
  });

  test("renders register form, allows submission, and redirects to login", async () => {

    const mockRegisterUser = jest.fn();
    (useAuthentication as jest.Mock).mockReturnValue({
      loginUser: jest.fn(),
      registerUser: mockRegisterUser,
    });

    render(<AuthForm formType="register" />);

    expect(
      screen.getByRole("heading", { name: /register/i })
    ).toBeInTheDocument();

    const nameInput = screen.getByLabelText(/name/i);
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const roleSelect = screen.getByLabelText(/role/i);
    const ageInput = screen.getByLabelText(/age/i);
    const registerSubmitButton = screen.getByRole("button", {
      name: /register/i,
    });

    await userEvent.type(nameInput, "John Doe");
    await userEvent.type(emailInput, "john@example.com");
    await userEvent.type(passwordInput, "securePass123");
    await userEvent.selectOptions(roleSelect, "user");
    await userEvent.type(ageInput, "25");

    await userEvent.click(registerSubmitButton);

    expect(mockRegisterUser).toHaveBeenCalledWith({
        name:"John Doe",
        email:"john@example.com",
        password:"securePass123",
        role:"user",
        age:25
    })
    // expect(mockNavigate).toHaveBeenCalledWith("/login");
  });

  test("navigates back to login form when clicking login button", async () => {
    render(<AuthForm formType="register" />);

    expect(
      screen.getByRole("heading", { name: /register/i })
    ).toBeInTheDocument();

    const loginNavButton = screen.getByRole("button", { name: /login/i });
    await userEvent.click(loginNavButton);

    expect(mockNavigate).toHaveBeenCalledWith("/login");
  });
});
