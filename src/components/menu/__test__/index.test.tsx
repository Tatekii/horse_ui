import { fireEvent, render, screen} from "@testing-library/react";
import { mountTest } from "@/test/shared";
import Menu from "../index";
import MenuItem from "../menuItem";
import SubMenu from "../subMenu";

describe("Testing Menu", () => {
  mountTest(() => (
    <Menu>
      <MenuItem>normal item</MenuItem>
      <MenuItem>
        {undefined}
        {null}
      </MenuItem>
      <MenuItem disabled>disabled item</MenuItem>
      <SubMenu title="sub1">
        <MenuItem>1</MenuItem>
        <MenuItem>2</MenuItem>
      </SubMenu>
    </Menu>
  ));

  mountTest(() => (
    <Menu mode="vertical">
      <MenuItem>normal item</MenuItem>
      <MenuItem>
        {undefined}
        {null}
      </MenuItem>
      <MenuItem disabled>disabled item</MenuItem>
      <SubMenu title="sub1">
        <MenuItem>1</MenuItem>
        <MenuItem>2</MenuItem>
      </SubMenu>
    </Menu>
  ));

  it("render default menu and menu-item", () => {
    render(
      <Menu>
        <MenuItem>normal item</MenuItem>
      </Menu>
    );
    const element = screen.getByTestId("test-menu");
    expect(element).toMatchSnapshot();
  });

  it("render menu item outside of menu got warning", () => {
    const mockWarn = jest.spyOn(console, "error").mockImplementation(() => {});
    render(<MenuItem index="0">alone item</MenuItem>);
    expect(mockWarn).toBeCalledWith("Warning: MenuItem using outside of Menu");
    mockWarn.mockRestore();
  });

  it("render submenu outside of menu got warning", () => {
    const mockWarn = jest.spyOn(console, "error").mockImplementation(() => {});
    render(
      <SubMenu index="0" title="sub menu">
        alone item
      </SubMenu>
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
      <SubMenu title="test">
        <OtherCom></OtherCom>
      </SubMenu>
      // {/* </Menu> */}
    );
    expect(mockWarn).toBeCalledWith("Warning: Invalid child node of SubMenu");
    mockWarn.mockRestore();
  });

  it("select menu item change current active and run callback", () => {
    const mockFn = jest.fn();
    render(
      <Menu onSelect={mockFn}>
        <MenuItem>item1</MenuItem>
        <MenuItem>item2</MenuItem>
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
        <MenuItem>item1</MenuItem>
        <MenuItem disabled>item2</MenuItem>
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
        <MenuItem>normal item</MenuItem>
      </Menu>
    );
    const element = screen.getByTestId("test-menu");
    expect(element).toMatchSnapshot();
  });

  it("hover horizontal SubMenu should trigger dropdown", async () => {
    render(
      <Menu>
        <SubMenu title="sub1">
          <MenuItem>item1</MenuItem>
        </SubMenu>
      </Menu>
    );
    const subMenu = screen.getByText("sub1");
    expect(screen.queryByText("item1")).toBeNull();
    fireEvent.mouseOver(subMenu);

    // // // css trigger 有延时

    expect(await screen.findByText("item1")).toBeVisible();
  });

  it("click vertical Submenu should trigger dropdown", async () => {
    render(
      <Menu mode="vertical">
        <SubMenu title="sub1">
          <MenuItem>item1</MenuItem>
        </SubMenu>
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
        <SubMenu title="sub1">
          <MenuItem>item1</MenuItem>
        </SubMenu>
        <SubMenu title="sub2">
          <MenuItem>item2</MenuItem>
        </SubMenu>
      </Menu>
    );
    const target = await screen.findByText("item2");
    expect(target).toBeVisible();
  });
});
