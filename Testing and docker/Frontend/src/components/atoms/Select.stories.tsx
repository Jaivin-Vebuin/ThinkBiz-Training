
import { Meta, StoryObj } from "@storybook/react";
import Select from "./Select";

const meta: Meta<typeof Select> = {
  title: "Components/atoms/Select",
  tags:["autodocs"],
  component: Select,
  argTypes: {
    handleOnChange: { action: "changed" },
    value: { control: "text" },
    labelText: { control: "text" },
    error: { control: "text" },
  },
};

export default meta;

type Story = StoryObj<typeof Select>;

export const Default: Story = {
  args: {
    name: "selectField",
    labelText: "Select an option",
    htmlFor: "selectField",
    options: [
      { value: "option1", label: "Option 1" },
      { value: "option2", label: "Option 2" },
      { value: "option3", label: "Option 3" },
    ],
    error: "",
  },
};

// export const WithError: Story = {
//   args: {
//     name: "selectField",
//     labelText: "Select an option",
//     htmlFor: "selectField",
//     options: [
//       { value: "option1", label: "Option 1" },
//       { value: "option2", label: "Option 2" },
//       { value: "option3", label: "Option 3" },
//     ],
//     error: "Selection is required",
//   },
// };
