import { mountTest } from "@/test/shared";
import { render, screen } from "@testing-library/react";
import Input from "@/components/input";
import Icon from "@/components/icon";

describe("Testing Input", () => {
  mountTest(() => <Input />);

  it("should render default input", () => {
    render(<Input />);
    const target = screen.getByTestId("input-wrapper");
    expect(target).toMatchSnapshot();
  });

  it("should support size", () => {
    render(<Input size="large" />);
    const target = screen.getByTestId("input-wrapper");
    expect(target).toHaveClass("input-size-lg");
    expect(target).toMatchSnapshot();
  });

  it("should support icon", () => {
    render(<Input icon="coffee" />);
    const target = screen.getByTestId("icon");
    expect(target).toBeInTheDocument();
  });

  it("should support prepend and append", () => {
    render(
      <>
        <Input prepend="prepend" />
        <Input append={<Icon icon={"search"} />}></Input>
      </>
    );
    const icon = screen.getByTestId('icon')
    const target = screen.getByText('prepend')
    expect(icon).toBeInTheDocument()
    expect(target).toBeInTheDocument()
  });
});
