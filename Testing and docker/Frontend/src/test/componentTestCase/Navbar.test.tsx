import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Navbar from "../../components/organisms/Navbar";
import useUser from "../../hooks/useUser";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
// import { useTranslation } from "react-i18next";
import { setAuthToken } from "../../redux/features/slices/auth/authSlice";

jest.mock("../../hooks/useUser", () => ({
  __esModule: true,
  default: jest.fn(),
}));

jest.mock("react-redux", () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn()
}));

jest.mock("react-router", () => ({
  useNavigate: jest.fn(),
}));

jest.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string) => key,
    i18n: {
      changeLanguage: jest.fn(),
    },
  }),
}));


describe("Navbar Component", () => {
  let mockDispatch: jest.Mock;
  let mockNavigate: jest.Mock;
  let mockUser: { isLoggedIn: boolean };

  beforeEach(() => {
    mockDispatch = jest.fn();
    mockNavigate = jest.fn();
    mockUser = { isLoggedIn: true };

    (useDispatch as unknown as jest.Mock).mockReturnValue(mockDispatch);
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);
    (useUser as jest.Mock).mockReturnValue(mockUser);
    (useSelector as unknown as jest.Mock).mockReturnValue({
      lang: { language: "en" },
    });
  });

  test("renders profile details correctly", () => {
    render(
      <Navbar
        role="user"
        currentUser={{
          id: "1",
          name: "John Doe",
          email: "john@example.com",
          role: "user",
          age: 30,
        }}
      />
    );

    expect(screen.getByText(/Name: John Doe/i)).toBeInTheDocument();
    expect(screen.getByText(/Email: john@example.com/i)).toBeInTheDocument();
    expect(screen.getByText(/Role: user/i)).toBeInTheDocument();
    expect(screen.getByText(/Age: 30/i)).toBeInTheDocument();
  });

  test("calls logout function on Logout button click", async () => {
    render(<Navbar role="user" currentUser={null} />);

    const logoutButton = screen.getByRole("button", { name: /logout/i });
    await userEvent.click(logoutButton);

    expect(mockDispatch).toHaveBeenCalledWith(setAuthToken({ message: "", token: "" }));
  });

  test("navigates to report page when Report button is clicked (for admin users)", async () => {
    render(<Navbar role="admin" currentUser={null} />);

    const reportButton = screen.getByRole("button", { name: /report/i });
    await userEvent.click(reportButton);

    expect(mockNavigate).toHaveBeenCalledWith("report");
  });

  test("toggles dropdown menu on Profile button click", async () => {
    render(<Navbar role="user" currentUser={null} />);

    const profileButton = screen.getByRole("button", { name: /profile/i });
    await userEvent.click(profileButton);

    const dropdownMenu = screen.getByText(/Name:/i);
    expect(dropdownMenu).toBeInTheDocument();
  });
});
