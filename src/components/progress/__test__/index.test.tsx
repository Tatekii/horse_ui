import Progress from "../progress";
import { render } from "@testing-library/react";
import { mountTest } from "@/test/shared";

describe("Testing progress", () => {
  mountTest(() => <Progress percent={50} />);

  it("should render correctly", () => {
    render(
      <Progress percent={50} showText theme="primary" strokeHeight={20} />
    );
  });
});
