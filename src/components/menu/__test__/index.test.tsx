import { fireEvent, render, screen } from "@testing-library/react";
import { mountTest } from "@/test/shared";
import Menu from "../index";

describe("Testing Menu", () => {
  mountTest(() => (
    <Menu>
      <Menu.Item>normal item</Menu.Item>
      <Menu.Item>
        {undefined}
        {null}
      </Menu.Item>
      <Menu.Item disabled>disabled item</Menu.Item>
      <Menu.SubMenu title="sub1">
        <Menu.Item>1</Menu.Item>
        <Menu.Item>2</Menu.Item>
      </Menu.SubMenu>
    </Menu>
  ));

  mountTest(() => (
    <Menu mode="vertical">
      <Menu.Item>normal item</Menu.Item>
      <Menu.Item>
        {undefined}
        {null}
      </Menu.Item>
      <Menu.Item disabled>disabled item</Menu.Item>
      <Menu.SubMenu title="sub1">
        <Menu.Item>1</Menu.Item>
        <Menu.Item>2</Menu.Item>
      </Menu.SubMenu>
    </Menu>
  ));

  it("render default menu", () => {
    render(
      <Menu>
        <Menu.Item>normal item</Menu.Item>
      </Menu>
    );
    const element = screen.getByTestId("test-menu");
    expect(element).toMatchSnapshot();
  });

  it("render menu item outside of menu got warning", () => {
    const mockWarn = jest.spyOn(console, "error").mockImplementation(() => {});
    render(<Menu.Item index="0">alone item</Menu.Item>);
    expect(mockWarn).toBeCalledWith("Warning: MenuItem using outside of Menu");
    mockWarn.mockRestore();
  });

  it("render subMenu outside of menu got warning", () => {
    const mockWarn = jest.spyOn(console, "error").mockImplementation(() => {});
    render(
      <Menu.SubMenu index="0" title="sub menu">
        alone item
      </Menu.SubMenu>
    );
    expect(mockWarn).toBeCalledWith("Warning: SubMenu using outside of Menu");
    mockWarn.mockRestore();
  });

  it("render invalid node under Menu got warning", () => {
    const mockWarn = jest.spyOn(console, "error").mockImplementation(() => {});
    const OtherCom = () => <h6>other</h6>;
    render(
      <Menu>
        <OtherCom></OtherCom>
      </Menu>
    );
    expect(mockWarn).toBeCalledWith("Warning: Invalid child node of Menu");
    mockWarn.mockRestore();
  });
  it("render invalid node under SubMenu got warning", () => {
    const mockWarn = jest.spyOn(console, "error").mockImplementation(() => {});
    const OtherCom = () => <h6>other</h6>;
    render(
      // {*/ <Menu> */}
      <Menu.SubMenu title="test">
        <OtherCom></OtherCom>
      </Menu.SubMenu>
      // {/* </Menu> */}
    );
    expect(mockWarn).toBeCalledWith("Warning: Invalid child node of SubMenu");
    mockWarn.mockRestore();
  });

  it("select menu item change current active and run callback", () => {
    const mockFn = jest.fn();
    render(
      <Menu onSelect={mockFn}>
        <Menu.Item>item1</Menu.Item>
        <Menu.Item>item2</Menu.Item>
      </Menu>
    );
    const target = screen.getByText("item2");
    fireEvent.click(target);
    expect(target).toHaveClass("is-active");
    expect(mockFn).toBeCalledWith("1");
  });
  it("disabled menu item can not change current active or run callback", () => {
    const mockFn = jest.fn();
    render(
      <Menu onSelect={mockFn}>
        <Menu.Item>item1</Menu.Item>
        <Menu.Item disabled>item2</Menu.Item>
      </Menu>
    );
    const target = screen.getByText("item2");
    fireEvent.click(target);
    expect(target).toHaveClass("is-disabled");
    expect(target).not.toHaveClass("is-active");
    expect(mockFn).toBeCalledTimes(0);
  });

  it("render vertical menu correctly", () => {
    render(
      <Menu mode="vertical">
        <Menu.Item>normal item</Menu.Item>
      </Menu>
    );
    const element = screen.getByTestId("test-menu");
    expect(element).toMatchSnapshot();
  });

  it("hover horizontal SubMenu should trigger dropdown", async () => {
    render(
      <Menu>
        <Menu.SubMenu title="sub1">
          <Menu.Item>item1</Menu.Item>
        </Menu.SubMenu>
      </Menu>
    );
    const subMenu = screen.getByText("sub1");
    expect(screen.queryByText("item1")).toBeNull();
    fireEvent.mouseOver(subMenu);

    // // // css trigger 有延时

    expect(await screen.findByText("item1")).toBeVisible();
  });

  it("click vertical SubMenu should trigger dropdown", async () => {
    render(
      <Menu mode="vertical">
        <Menu.SubMenu title="sub1">
          <Menu.Item>item1</Menu.Item>
        </Menu.SubMenu>
      </Menu>
    );
    const subMenu = screen.getByText("sub1");
    const item = screen.queryByText("item1");
    expect(item).toBeNull();

    fireEvent.mouseOver(subMenu);
    // // css trigger 有延时
    expect(item).toBeNull();

    fireEvent.click(subMenu);
    expect(await screen.findByText("item1")).toBeVisible();
  });

  it("expandMenus props should trigger SubMenu dropdown", async () => {
    render(
      <Menu expandMenus={["1"]} mode="vertical">
        <Menu.SubMenu title="sub1">
          <Menu.Item>item1</Menu.Item>
        </Menu.SubMenu>
        <Menu.SubMenu title="sub2">
          <Menu.Item>item2</Menu.Item>
        </Menu.SubMenu>
      </Menu>
    );
    const target = await screen.findByText("item2");
    expect(target).toBeVisible();
  });
});
