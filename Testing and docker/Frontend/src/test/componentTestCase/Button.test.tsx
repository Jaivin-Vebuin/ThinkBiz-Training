import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Button from "../../components/atoms/Button";

test("Button renders with text and handles click event", async () => {
  const handleClick = jest.fn();
  const { getByText } = render(<Button text="Click Me" handleOnClick={handleClick} />);

  const buttonElement = getByText("Click Me");

  expect(buttonElement).toBeInTheDocument();

  await userEvent.click(buttonElement);
  expect(handleClick).toHaveBeenCalledTimes(1);
});
