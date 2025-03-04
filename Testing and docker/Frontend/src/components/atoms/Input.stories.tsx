import { Meta, StoryObj } from "@storybook/react";
import Input from "./Input";

const meta: Meta<typeof Input> = {
  title: "Components/atoms/Input",
  component: Input,
  tags:["autodocs"],
  argTypes: {
    handleOnChange: { action: "changed" },
    error: { control: "text" },
    value: { control: "text" },
    placeholder: { control: "text" },
    inputType: { control: "text" },
  },
};

export default meta;

type Story = StoryObj<typeof Input>;

export const Default: Story = {
  args: {
    name: "username",
    inputType: "text",
    placeholder: "Enter your name",
    labelText: "Username",
    htmlFor: "username",
    error: "",
  },
};

export const WithError: Story = {
  args: {
    name: "email",
    inputType: "email",
    placeholder: "Enter your email",
    labelText: "Email",
    htmlFor: "email",
    error: "Invalid email format",
  },
};
