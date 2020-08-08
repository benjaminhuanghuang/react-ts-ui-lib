import React from "react";
import { render } from "@testing-library/react";
import Button from "./button";

test("should render the button", () => {
  const wrapper = render(<Button>Nice</Button>);
  const element = wrapper.getByText("Nice") as HTMLButtonElement;
  // testing-library
  expect(element).toBeTruthy();
  // toBeInTheDocument is provided by jest-dom
  expect(element).toBeInTheDocument();   
});
