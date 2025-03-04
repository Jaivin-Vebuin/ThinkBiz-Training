import { Meta, StoryObj } from "@storybook/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import LanguageSelector from "./LanguageSelector";
import { I18nextProvider } from "react-i18next";
import i18n from "../../translation/i18n";
import languageReducer from "../../redux/features/slices/languages/languageSlice";

const mockStore = configureStore({
  reducer: { lang: languageReducer },
  preloadedState: { lang: { language: "en" } },
});

const meta: Meta<typeof LanguageSelector> = {
  title: "Components/molecules/LanguageSelector",
  component: LanguageSelector,
  tags:["autodocs"],
  decorators: [
    (Story) => (
      <Provider store={mockStore}>
        <I18nextProvider i18n={i18n}>
          <Story />
        </I18nextProvider>
      </Provider>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof LanguageSelector>;

export const Default: Story = {};

export const HindiSelected: Story = {
  args: {},
  decorators: [
    (Story) => (
      <Provider
        store={configureStore({
          reducer: { lang: languageReducer },
          preloadedState: { lang: { language: "hi" } },
        })}
      >
        <I18nextProvider i18n={i18n}>
          <Story />
        </I18nextProvider>
      </Provider>
    ),
  ],
};
