import Navbar from "./Navbar";
import { Meta, StoryObj } from "@storybook/react";
import { I18nextProvider } from "react-i18next";
import i18n from "../../translation/i18n";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import authTokenReducer from "../../redux/features/slices/auth/authSlice";
import languageReducer from "../../redux/features/slices/languages/languageSlice";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "../../context/user/AuthProvider";

const store = configureStore({
  reducer: {
    lang: languageReducer,
    auth: authTokenReducer,
  },
});

const meta: Meta<typeof Navbar> = {
  title: "Components/organisms/Navbar",
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <Provider store={store}>
        <BrowserRouter>
          <AuthProvider>
            <I18nextProvider i18n={i18n}>
              <Story />
            </I18nextProvider>
          </AuthProvider>
        </BrowserRouter>
      </Provider>
    ),
  ],
  component: Navbar,
  argTypes: {
    role: { control: "text" },
    currentUser: { control: "object" },
  },
};

export default meta;

type Story = StoryObj<typeof Navbar>;

export const AdminNavbar: Story = {
  args: {
    role: "admin",
    currentUser: {
      id: "1",
      name: "Admin User",
      email: "admin@example.com",
      role: "admin",
      age: 30,
    },
  },
};

export const UserNavbar: Story = {
  args: {
    role: "user",
    currentUser: {
      id: "2",
      name: "Regular User",
      email: "user@example.com",
      role: "user",
      age: 25,
    },
  },
};
