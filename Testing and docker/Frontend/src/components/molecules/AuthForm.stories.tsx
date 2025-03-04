import { Meta, StoryObj } from "@storybook/react";
import { within, userEvent } from "@storybook/testing-library";
import AuthForm from "../molecules/AuthForm";
import { I18nextProvider } from "react-i18next";
import i18n from "../../translation/i18n";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import authTokenReducer from "../../redux/features/slices/auth/authSlice";
import languageReducer from "../../redux/features/slices/languages/languageSlice";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "../../context/user/AuthProvider";
import { LoginWrapper } from "../styles/AuthFormStyles";
import { ToastContainer } from "react-toastify";

const store = configureStore({
  reducer: {
    lang: languageReducer,
    auth: authTokenReducer,
  },
});

const meta: Meta<typeof AuthForm> = {
  title: "Components/molecules/AuthForm",
  component: AuthForm,
  decorators: [
    (Story) => (
      <Provider store={store}>
        <BrowserRouter>
          <AuthProvider>
            <ToastContainer />
            <I18nextProvider i18n={i18n}>
              <LoginWrapper>
                <Story />
              </LoginWrapper>
            </I18nextProvider>
          </AuthProvider>
        </BrowserRouter>
      </Provider>
    ),
  ],
  argTypes: {
    formType: { control: "text" },
  },
};

export default meta;

type Story = StoryObj<typeof AuthForm>;

export const LoginForm: Story = {
  args: {
    formType: "login",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const delay = (ms: number) =>
      new Promise((resolve) => setTimeout(resolve, ms));

    await delay(500);
    await userEvent.type(canvas.getByLabelText("Email"), "test", {
      delay: 100,
    });

    await delay(500);
    await userEvent.type(canvas.getByLabelText("Password"), "123", {
      delay: 100,
    });

    await delay(500);
    await userEvent.click(canvas.getByRole("button", { name: /login/i }));

    await delay(500);
    await userEvent.clear(canvas.getByLabelText("Email"));

    await delay(500);
    await userEvent.clear(canvas.getByLabelText("Password"));

    await delay(500);
    await userEvent.type(canvas.getByLabelText("Email"), "test@example.com", {
      delay: 100,
    });

    await delay(500);
    await userEvent.type(canvas.getByLabelText("Password"), "Password123", {
      delay: 100,
    });

    await delay(500);
    await userEvent.click(canvas.getByRole("button", { name: /login/i }));
  },
};

export const RegisterForm: Story = {
  args: {
    formType: "register",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const delay = (ms: number) =>
      new Promise((resolve) => setTimeout(resolve, ms));

    await delay(500);
    await userEvent.type(canvas.getByLabelText("Name"), "testName", {
      delay: 100,
    });

    await delay(500);
    await userEvent.type(canvas.getByLabelText("Email"), "test@example.com", {
      delay: 100,
    });

    await delay(500);
    await userEvent.type(canvas.getByLabelText("Password"), "Password123", {
      delay: 100,
    });

    await delay(500);
    await userEvent.selectOptions(canvas.getByLabelText("Role"), "user", {
      delay: 100,
    });

    await delay(500);
    await userEvent.type(canvas.getByLabelText("Age"), "20", { delay: 100 });

    await delay(500);
    await userEvent.click(canvas.getByRole("button", { name: /register/i }));
  },
};
