import "@testing-library/jest-dom";
import { render, fireEvent } from "@testing-library/react";
import Input from "../../components/atoms/Input";

describe("Input Component", () => {
  test("renders input with label and handles change event", () => {
    const handleChange = jest.fn();
    const { getByLabelText, asFragment } = render(
      <Input 
        name="test-input" 
        inputType="text" 
        labelText="Test Label" 
        htmlFor="test-input" 
        handleOnChange={handleChange} 
      />
    );
    
    const inputElement = getByLabelText("Test Label", { selector: "input" });
    expect(inputElement).toBeInTheDocument();
    
    fireEvent.change(inputElement, { target: { value: "new value" } });
    expect(handleChange).toHaveBeenCalledTimes(1);
    
    expect(asFragment()).toMatchSnapshot();
  });
});
