import { Meta, StoryObj } from "@storybook/react";
import Option from "./Option";

const meta: Meta<typeof Option> = {
  title: "Components/atoms/Option",
  tags:["autodocs"],
  component: Option,
  argTypes: {
    value: { control: "text" },
    label: { control: "text" },
  },
};

export default meta;

type Story = StoryObj<typeof Option>;

export const Option_1: Story = {
  args: {
    value: "option1",
    label: "Option 1",
  },
};

export const Option_2: Story = {
    args: {
      value: "option2",
      label: "Option 2",
    },
  };