import React from "react";
import axios from "axios";
import { render, fireEvent, createEvent, screen } from "@testing-library/react";
import Upload from "../index";
import { UploadProps } from "../types";
import { mountTest } from "../../../test/shared";

jest.mock("../../icon/index.tsx", () => ({ icon, onClick }: any) => {
  return <span onClick={onClick}>{icon}</span>;
});

jest.mock("axios");

const mockedAxios = axios as jest.Mocked<typeof axios>;

const testProps: UploadProps = {
  action: "fakeurl.com",
  onSuccess: jest.fn(),
  onChange: jest.fn(),
  onRemove: jest.fn(),
  drag: true,
};

// test file
const testFile = new File(["xyz"], "test.png", { type: "image/png" });

describe("Testing upload", () => {
  mountTest(() => <Upload {...testProps} />);

  it("upload should fully functional", async () => {
    render(<Upload {...testProps}>Click to upload</Upload>);

    mockedAxios.post.mockResolvedValue({ data: "cool" });

    const fileInput = screen.getByTestId("file-input");

    const uploadArea = screen.getByText("Click to upload");

    expect(uploadArea).toBeInTheDocument();

    expect(fileInput).not.toBeVisible();

    fireEvent.change(fileInput, { target: { files: [testFile] } });

    expect(screen.getByText("spinner")).toBeInTheDocument();

    expect(await screen.findByText("test.png")).toBeInTheDocument();

    expect(await screen.findByText("check-circle")).toBeInTheDocument();

    expect(testProps.onSuccess).toHaveBeenCalledWith("cool", testFile);

    expect(testProps.onChange).toHaveBeenCalledWith(
      expect.objectContaining({
        raw: testFile,
        status: "success",
        name: "test.png",
      })
    );

    //remove the uploaded file
    const times = screen.getByText("times");
    expect(times).toBeInTheDocument();
    fireEvent.click(times);

    expect(screen.queryByText("test.png")).not.toBeInTheDocument();

    expect(testProps.onRemove).toHaveBeenCalledWith(
      expect.objectContaining({
        raw: testFile,
        status: "success",
        name: "test.png",
      })
    );
  });

  it("upload should drapable", async () => {
    render(<Upload {...testProps}>Click to upload</Upload>);

    mockedAxios.post.mockResolvedValue({ data: "cool" });

    const uploadArea = screen.getByText("Click to upload");
    fireEvent.dragOver(uploadArea);
    expect(uploadArea).toHaveClass("is-dragover");
    fireEvent.dragLeave(uploadArea);
    expect(uploadArea).not.toHaveClass("is-dragover");
    const mockDropEvent = createEvent.drop(uploadArea);

    Object.defineProperty(mockDropEvent, "dataTransfer", {
      value: {
        files: [testFile],
      },
    });

    fireEvent(uploadArea, mockDropEvent);
    expect(await screen.findByText("test.png")).toBeInTheDocument();
    expect(testProps.onSuccess).toHaveBeenCalledWith("cool", testFile);
  });
});
