import { Meta, StoryObj } from "@storybook/react";
import Button from "./Button";

const meta: Meta<typeof Button> = {
  title: "Components/atoms/Button",
  tags:["autodocs"],
  component: Button,
  argTypes: {
    handleOnClick: { action: "clicked" },
    isDisabled: { control: "boolean" },
  },
};

export default meta;

type Story = StoryObj<typeof Button>;

export const Default: Story = {
  args: {
    text: "Click Me",
    isDisabled: false,
  },
};

export const Disabled: Story = {
  args: {
    text: "Disabled Button",
    isDisabled: true,
  },
};
