import { render } from "@testing-library/react";
import React from "react";

/** mount unmount test */
export const mountTest = (Component: React.ComponentType) => {
  describe(`mount and unmount`, () => {
    // https://github.com/ant-design/ant-design/pull/18441
    it(`component could be updated and unmounted without errors`, () => {
      const { unmount, rerender } = render(<Component />);
      expect(() => {
        rerender(<Component />);
        unmount();
      }).not.toThrow();
    });
  });
};
