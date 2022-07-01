import React, { FC, useState, DragEvent } from "react";
import classNames from "classnames";
import { UploadDraggerProps } from "./types";

export const UploadDragger: FC<UploadDraggerProps> = ({ onFile, children }) => {
  const [dragOver, setDragOver] = useState(false);

  /** drag over时显示效果 */
  const classes = classNames("upload-dragger", {
    "is-dragover": dragOver,
  });

  /** 拿到丢进来的文件 */
  const handleDrop = (e: DragEvent<HTMLElement>) => {
    e.preventDefault();
    setDragOver(false);
    onFile(e.dataTransfer.files);
  };
  const handleDrag = (e: DragEvent<HTMLElement>, over: boolean) => {
    e.preventDefault();
    setDragOver(over);
  };
  return (
    <div
      className={classes}
      onDragOver={(e) => {
        handleDrag(e, true);
      }}
      onDragLeave={(e) => {
        handleDrag(e, false);
      }}
      onDrop={handleDrop}
    >
      {children}
    </div>
  );
};

export default UploadDragger;
