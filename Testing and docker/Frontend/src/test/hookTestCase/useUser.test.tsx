import { renderHook } from "@testing-library/react";
import { AuthContext } from "../../context/user/AuthProvider";
import useUser from "../../hooks/useUser";
import { ReactNode } from "react";

const mockAuthContext = {
  isLoggedIn: true,
  currentUser: {
    id: "123",
    name: "John Doe",
    email: "john.doe@example.com",
    role: "admin",
    age: 30,
  },
};

describe("useUser Hook", () => {
  test("returns context value when inside AuthProvider", () => {
    const wrapper = ({ children }: { children: ReactNode }) => (
      <AuthContext.Provider value={mockAuthContext}>{children}</AuthContext.Provider>
    );

    const { result } = renderHook(() => useUser(), { wrapper });

    expect(result.current).toEqual(mockAuthContext);
  });

  test("throws an error when used outside AuthProvider", () => {
    const consoleErrorMock = jest.spyOn(console, "error").mockImplementation(() => {});

    expect(() => renderHook(() => useUser())).toThrow(
      "useUser must be used within an AuthProvider"
    );

    consoleErrorMock.mockRestore();
  });

  test("matches the snapshot", () => {
    const wrapper = ({ children }: { children: ReactNode }) => (
      <AuthContext.Provider value={mockAuthContext}>{children}</AuthContext.Provider>
    );

    const { result } = renderHook(() => useUser(), { wrapper });

    expect(result.current).toMatchSnapshot();
  });
});
