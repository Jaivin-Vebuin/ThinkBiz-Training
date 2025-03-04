import styled from "styled-components";

export const NavbarContainer = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #0a192f;
  padding: 0.5rem 2rem;
  color: white;
`;

export const Logo = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
`;

export const NavItems = styled.ul`
  display: flex;
  align-items: center;
  list-style: none;
  gap: 1rem;
`;

export const ProfileDropdown = styled.div`
  position: relative;
`;

export const ProfileButton = styled.button`
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  font-size: 1rem;
  &:hover {
    text-decoration: underline;
  }
`;

export const DropdownMenu = styled.div<{ open: boolean }>`
  position: absolute;
  right: 0;
  top: 2rem;
  background-color: #112240;
  border-radius: 5px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 0.5rem;
  display: flex;
  flex-direction: column;
  min-width: 150px;
  visibility: ${({ open }) => (open ? "visible" : "hidden")};
  opacity: ${({ open }) => (open ? "1" : "0")};
  transition: opacity 0.2s ease-in-out;
  `;

  export const LogoutButtonStyle = styled.div`
  width: 100%;
  text-align: center;

  button {
    padding: 10px 24px;
    color: white;
    background-color: #4a90e2; /* Blue button */
    border: none;
    border-radius: 8px;
    cursor: pointer;
    font-size: 18px;

    &:hover {
      background-color: #3a7bd5;
    }

    &:focus {
      outline: none;
    }

    &:disabled {
      background-color: #bbb;
      cursor: not-allowed;
    }
  }
`;

export const ReportButtonStyle = styled.div`
width: 100%;
text-align: center;

button {
  padding: 10px 24px;
  color: white;
  background-color:rgb(44, 200, 91);
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 18px;

  &:hover {
    background-color: rgb(17, 145, 56);
  }

  &:focus {
    outline: none;
  }

  &:disabled {
    background-color: #bbb;
    cursor: not-allowed;
  }
}
`;

export const NavbarLanguageSelector = styled.div`
  select {
    padding: 8px 12px;
    border: none;
    border-radius: 8px;
    background-color: #dbeafe; /* Light blueish selector background */
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

    &:focus {
      outline: none;
      box-shadow: 0 0 8px rgba(164, 202, 254, 0.8);
    }
  }
`;
  