import Tab from "..";
import { fireEvent, render, screen } from "@testing-library/react";
import { mountTest } from "@/test/shared";

describe("Testing Tab", () => {
  mountTest(() => (
    <Tab>
      <Tab.TabPane tab="tab1">tab1 content</Tab.TabPane>
    </Tab>
  ));

  it("default active pane should visible", () => {
    render(
      <Tab defaultActive={1}>
        <Tab.TabPane tab="t1">t1 content</Tab.TabPane>
        <Tab.TabPane tab="t2">t2 content</Tab.TabPane>
      </Tab>
    );
    const target = screen.getByText("t2 content");
    const other = screen.getByText("t1 content");
    expect(target).toHaveClass("is-active");
    expect(other).not.toBeVisible();
  });

  it("click tab should change active pane", () => {
    render(
      <Tab defaultActive={1}>
        <Tab.TabPane tab="t1">t1 content</Tab.TabPane>
        <Tab.TabPane tab="t2">t2 content</Tab.TabPane>
      </Tab>
    );
    fireEvent.click(screen.getByText("t1"));
    expect(screen.getByText("t1 content")).toHaveClass("is-active");
    expect(screen.getByText("t2 content")).not.toHaveClass("is-active");
  });

  it("click tab should trigger onChange callback with index", () => {
    const mockFn = jest.fn();
    render(
      <Tab onChange={mockFn}>
        <Tab.TabPane tab="t1"></Tab.TabPane>
        <Tab.TabPane tab="t2"></Tab.TabPane>
      </Tab>
    );
    fireEvent.click(screen.getByText("t1"));
    expect(mockFn).toBeCalledWith(0);
  });

  it("invalid node inside tab got warning", () => {
    const mockWarn = jest.spyOn(console, "error").mockImplementation(() => {});
    render(
      <Tab>
        <div>123</div>
      </Tab>
    );
    expect(mockWarn).toBeCalledWith("Warning: Invalid child node of Tab");
    mockWarn.mockRestore();
  });
});
