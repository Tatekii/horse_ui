import AutoComplete from "@/components/auto-complete";
import { act, fireEvent, render, screen } from "@testing-library/react";
import { mountTest } from "@/test/shared";
import { AutoCompleteProps } from "../types";
import { FetchForSuggestion } from "../types";

const testArray = [
  { value: "ab", number: 11 },
  { value: "abc", number: 1 },
  { value: "b", number: 4 },
  { value: "bcd", number: 4 },
  { value: "c", number: 15 },
];

const mockFetch: FetchForSuggestion = (query) => {
  return new Promise((resolve, reject) => {
    process.nextTick(() => {
      let r = testArray.filter((item) => item.value.includes(query));
      resolve(r);
    });
  });
};

const testProps: AutoCompleteProps = {
  fetchSuggestions: mockFetch,
  onSelect: jest.fn(),
  placeholder: "auto-complete",
};

describe("Testing AutoComplete", () => {
  mountTest(() => <AutoComplete {...testProps} />);

  it("should trigger suggestions", async () => {
    render(<AutoComplete {...testProps} />);
    const inputElement = screen.getByPlaceholderText("auto-complete");
    // input change
    fireEvent.change(inputElement, { target: { value: "a" } });
    // render two suggestions
    let first = await screen.findByText("ab");
    let second = await screen.findByText("abc");
    expect(first).toBeInTheDocument();
    expect(second).toBeInTheDocument();
    //click the first item
    fireEvent.click(first);
    expect(testProps.onSelect).toHaveBeenCalledWith({
      value: "ab",
      number: 11,
    });

    //fill the input
    expect(inputElement).toHaveValue("ab");

    // 300mm 后dropdown 消失
    await act(async () => {
      await new Promise((r) => setTimeout(r, 300));
    });

    expect(screen.queryByRole("list")).not.toBeInTheDocument();
  });

  it("should support keyboard handle suggestion", async () => {
    render(<AutoComplete {...testProps} />);
    const inputElement = screen.getByPlaceholderText("auto-complete");
    // input change
    fireEvent.change(inputElement, { target: { value: "a" } });

    let first = await screen.findByText("ab");
    let second = await screen.findByText("abc");

    // arrow down
    fireEvent.keyDown(inputElement, { keyCode: 40 });
    expect(first).toHaveClass("is-active");
    //arrow down
    fireEvent.keyDown(inputElement, { keyCode: 40 });
    expect(second).toHaveClass("is-active");
    //arrow up
    fireEvent.keyDown(inputElement, { keyCode: 38 });
    expect(first).toHaveClass("is-active");
    // press enter
    fireEvent.keyDown(inputElement, { keyCode: 13 });
    expect(testProps.onSelect).toHaveBeenCalledWith({
      value: "ab",
      number: 11,
    });

    expect(inputElement).toHaveValue("ab");

    // 300mm 后dropdown 消失
    await act(async () => {
      await new Promise((r) => setTimeout(r, 300));
    });

    expect(screen.queryByRole("list")).not.toBeInTheDocument();
  });

  it("click outside should hide the dropdown", async () => {
    render(<AutoComplete {...testProps} />);
    const inputElement = screen.getByPlaceholderText("auto-complete");
    // input change
    fireEvent.change(inputElement, { target: { value: "a" } });
    // 出现suggestion
    expect(await screen.findByRole("list")).toBeInTheDocument();
    // 点击外部区域
    fireEvent.click(document);

    // 300mm 后dropdown 消失
    await act(async () => {
      await new Promise((r) => setTimeout(r, 300));
    });

    expect(screen.queryByRole("list")).not.toBeInTheDocument();
  });
});
