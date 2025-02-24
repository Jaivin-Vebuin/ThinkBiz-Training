import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import Login from "./components/pages/Login";
import Dashboard from "./components/pages/Dashboard";
import Register from "./components/pages/Register";
import Report from "./components/pages/Report";
import ProtectedRoute from "./routes/ProtectedRoute";
import { GlobalStyle } from "./components/styles/GlobalStyles";
import useUser from "./hooks/useUser";
import DashboardLayout from "./components/layouts/DashboardLayout";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "./redux/store/store";
import i18n from "./translation/i18n";
import ErrorPage from "./components/pages/ErrorPage";

function App() {
  const user = useUser();
  const isLoggedIn = user.isLoggedIn;

  const currentLanguage = useSelector(
    (state: RootState) => state.lang.language
  );

  useEffect(() => {
    if (currentLanguage) {
      i18n.changeLanguage(currentLanguage);
    }
  }, [currentLanguage, i18n]);

  return (
    <>
      <GlobalStyle />
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              isLoggedIn ? (
                <Navigate to="/dashboard" />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/login"
            element={isLoggedIn ? <Navigate to="/dashboard" /> : <Login />}
          />
          <Route
            path="/register"
            element={isLoggedIn ? <Navigate to="/dashboard" /> : <Register />}
          />
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<DashboardLayout />}>
              <Route index element={<Dashboard />} />
              {user.currentUser?.role === "admin" && (
                <>
                  <Route path="report" element={<Report />} />
                </>
              )}
            </Route>
          </Route>
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
