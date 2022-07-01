import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import Button from "..";
import { mountTest } from "@/test/shared";
import { SizeType } from "@/components/config-provider/size";

describe("Testing Button", () => {
  mountTest(Button);
  mountTest(() => <Button size="large" />);
  mountTest(() => <Button size="small" />);

  it("renders correctly", () => {
    render(<Button>Follow</Button>);
    const button = screen.getByRole("button");
    expect(button).toMatchSnapshot();
  });

  it("mount correctly", () => {
    expect(() => render(<Button>Follow</Button>)).not.toThrow();
  });

  it("warns wrong size", () => {
    const mockWarn = jest.spyOn(console, "error").mockImplementation(() => {});
    const size = "wrong size" as any as SizeType;
    render(<Button size={size} />);
    expect(mockWarn).toHaveBeenCalledWith("Invalid prop [size]:",size);
    mockWarn.mockRestore();
  });

  it("should render empty default button", () => {
    render(
      <Button id="emptyBtn">
        {null}
        {undefined}
      </Button>
    );
    const element = screen.getByRole("button");
    expect(element).toMatchSnapshot();
  });

  it("should support link button", () => {
    render(
      <Button target="_blank" href="google.com">
        Google
      </Button>
    );
    const element = screen.getByText("Google");
    expect(element).toMatchSnapshot();
  });

  it("should not render as link button when href is undefined", async () => {
    render(
      <Button btnType="primary" href={undefined}>
        undefined href
      </Button>
    );
    const element = screen.getByText("undefined href");
    expect(element).toMatchSnapshot();
  });

  it("should not redirect when button is disabled", () => {
    const onClick = jest.fn();
    render(
      <Button href="https://ant.design" onClick={onClick} disabled>
        click me
      </Button>
    );
    const element = screen.getByText("click me");
    fireEvent.click(element);
    expect(onClick).not.toHaveBeenCalled();
  });

  it("should match class .ant-btn-disabled when button is disabled and href is not undefined", () => {
    render(
      <Button href="https://ant.design" disabled>
        click me
      </Button>
    );
    const element = screen.getByText("click me");
    expect(element).toHaveClass("btn-disabled");
  });
});
