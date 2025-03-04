import { Meta, StoryObj } from "@storybook/react";
import { within, userEvent, waitFor } from "@storybook/testing-library";
import Login from "./Login";
import { I18nextProvider } from "react-i18next";
import i18n from "../../translation/i18n";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import authTokenReducer from "../../redux/features/slices/auth/authSlice";
import languageReducer from "../../redux/features/slices/languages/languageSlice";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "../../context/user/AuthProvider";
import { GlobalStyle } from "../styles/GlobalStyles";
import { ToastContainer } from "react-toastify";

const store = configureStore({
  reducer: {
    lang: languageReducer,
    auth: authTokenReducer,
  },
});

const meta: Meta<typeof Login> = {
  title: "Components/pages/Login",
  component: Login,
  decorators: [
    (Story) => (
      <Provider store={store}>
        <BrowserRouter>
          <AuthProvider>
            <ToastContainer />
            <I18nextProvider i18n={i18n}>
              <GlobalStyle />
              <Story />
            </I18nextProvider>
          </AuthProvider>
        </BrowserRouter>
      </Provider>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof Login>;

export const DefaultLogin: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const delay = (ms: number) =>
      new Promise((resolve) => setTimeout(resolve, ms));

    await delay(500);
    await userEvent.selectOptions(canvas.getByRole("combobox"), "hi");

    await delay(1000);
    await userEvent.selectOptions(canvas.getByRole("combobox"), "en");

    await waitFor(() => canvas.getByLabelText("Email"), {
      timeout: 2000,
    });

    await delay(500);
    const emailField = await canvas.findByLabelText("Email");
    await userEvent.type(emailField, "test@example.com", { delay: 100 });

    await delay(500);
    const passwordField = await canvas.findByLabelText("Password");
    await userEvent.type(passwordField, "Password123", { delay: 100 });

    await delay(500);
    await userEvent.click(canvas.getByRole("button", { name: "Login" }));
  },
};
