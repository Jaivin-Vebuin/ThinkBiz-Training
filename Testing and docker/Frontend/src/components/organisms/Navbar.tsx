import { useState } from "react";
import { useDispatch } from "react-redux";
import { Navigate, useNavigate } from "react-router";
import { setAuthToken } from "../../redux/features/slices/auth/authSlice";
import Button from "../atoms/Button";
import {
  NavbarContainer,
  Logo,
  NavItems,
  ProfileDropdown,
  ProfileButton,
  DropdownMenu,
  LogoutButtonStyle,
  ReportButtonStyle,
  NavbarLanguageSelector,
} from "../styles/NavBarStyles";
import useUser from "../../hooks/useUser";
import LanguageSelector from "../molecules/LanguageSelector";
import { useTranslation } from "react-i18next";

type UserDetails = {
  id: string;
  name: string;
  email: string;
  role: string;
  age: number;
};

type NavbarPropsType = {
  role: string | undefined;
  currentUser: UserDetails | null;
};

const Navbar: React.FC<NavbarPropsType> = ({ role, currentUser }) => {
  const {t} = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useUser();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleLogout = () => {
    dispatch(setAuthToken({ message: "", token: "" }));
    <Navigate to="/login" />
  };

  const handleOnClickReport = () => {
    if (user.isLoggedIn) {
      navigate("report");
    }
  };

  return (
    <NavbarContainer>
      <Logo>Logo</Logo>
      <NavItems>
        {role === "admin" && (
          <li>
            <ReportButtonStyle>
              <Button text={t("reportButton")} handleOnClick={handleOnClickReport} />
            </ReportButtonStyle>
          </li>
        )}
        <ProfileDropdown>
          <ProfileButton onClick={() => setDropdownOpen(!dropdownOpen)}>
            {t("profileButton")}
          </ProfileButton>
          <DropdownMenu open={dropdownOpen}>
            <p>{t("Name")}: {currentUser?.name}</p>
            <p>{t("Email")}: {currentUser?.email}</p>
            <p>{t("Role")}: {currentUser?.role}</p>
            <p>{t("Age")}: {currentUser?.age}</p>
          </DropdownMenu>
        </ProfileDropdown>
        <li>
          <NavbarLanguageSelector>
            <LanguageSelector />
          </NavbarLanguageSelector>
        </li>
        <li>
          <LogoutButtonStyle>
            <Button text={t("logoutButton")} handleOnClick={handleLogout} />
          </LogoutButtonStyle>
        </li>
      </NavItems>
    </NavbarContainer>
  );
};

export default Navbar;
