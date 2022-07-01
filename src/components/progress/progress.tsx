import { FC } from "react";
import { ProgressProps } from "./types";

const Progress: FC<ProgressProps> = ({
  percent,
  strokeHeight,
  showText,
  styles,
  theme,
}) => {
  return (
    <div className="progress-bar" style={styles}>
      <div
        className="progress-bar-outer"
        style={{ height: `${strokeHeight}px` }}
      >
        <div
          className={`progress-bar-inner color-${theme || "primary"}`}
          style={{ width: `${percent}%` }}
        >
          {showText && <span className="inner-text">{`${percent}%`}</span>}
        </div>
      </div>
    </div>
  );
};
Progress.displayName = "Progress";
Progress.defaultProps = {
  strokeHeight: 15,
  showText: true,
  theme: "primary",
};
export default Progress;
