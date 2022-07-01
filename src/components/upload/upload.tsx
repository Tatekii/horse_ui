import React, { FC, useRef, ChangeEvent, useState } from "react";
import axios from "axios";
import UploadList from "./uploadList";
import UploadDragger from "./uploadDragger";
import { UploadProps, UploadFile } from "./types";

export const Upload: FC<UploadProps> = ({
  action,
  defaultFileList,
  beforeUpload,
  onProgress,
  onSuccess,
  onError,
  onChange,
  onRemove,
  name,
  headers,
  data,
  withCredentials,
  accept,
  multiple,
  children,
  drag,
}) => {
  /** 被隐藏的file input */
  const fileInput = useRef<HTMLInputElement>(null);
  /**  */
  const [fileList, setFileList] = useState<UploadFile[]>(defaultFileList || []);

  /** 从文件列表中更新信息 */
  const updateFileList = (
    updateFile: UploadFile,
    updateObj: Partial<UploadFile>
  ) => {
    setFileList((prevList) => {
      return prevList.map((file) => {
        if (file.uid === updateFile.uid) {
          const _file = { ...file, ...updateObj };
          /** 执行onChange回调 */
          onChange && onChange(_file);
          return _file;
        } else {
          return file;
        }
      });
    });
  };

  const handleClick = () => {
    if (fileInput.current) {
      fileInput.current.click();
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) {
      return;
    }
    uploadFiles(files);
    // 获取到文件后清理input
    if (fileInput.current) {
      fileInput.current.value = "";
    }
  };

  /** 删除单个文件 */
  const handleRemove = (file: UploadFile) => {
    setFileList((prevList) => {
      return prevList.filter((item) => item.uid !== file.uid);
    });
    onRemove && onRemove(file);
  };

  /**
   * 循环文件列表上传
   */
  const uploadFiles = (files: FileList) => {
    let postFiles = Array.from(files);
    postFiles.forEach((file) => {
      if (!beforeUpload) {
        /** 无before upload步骤 */
        upload(file);
      } else {
        /** before upload先处理 */
        const result = beforeUpload(file);

        if (result && result instanceof Promise) {
          result.then((processedFile) => {
            upload(processedFile);
          });
        } else if (result !== false) {
          upload(file);
        }
      }
    });
  };

  /**
   * 上传单个文件
   * 发送请求
   */
  const upload = (file: File) => {
    let _file: UploadFile = {
      uid: Date.now() + "upload-file",
      status: "ready",
      name: file.name,
      size: file.size,
      percent: 0,
      raw: file,
    };
    // 添加到文件列表
    setFileList((prevList) => {
      return [_file, ...prevList];
    });
    const formData = new FormData();
    formData.append(name || "file", file);
    if (data) {
      Object.keys(data).forEach((key) => {
        formData.append(key, data[key]);
      });
    }
    axios
      .post(action, formData, {
        headers: {
          ...headers,
          "Content-Type": "multipart/form-data",
        },
        withCredentials,
        onUploadProgress: (e) => {
          let percentage = Math.round((e.loaded * 100) / e.total) || 0;
          if (percentage < 100) {
            /** 更新上传状态 */
            updateFileList(_file, { percent: percentage, status: "uploading" });
            /** 执行onProgress回调 */
            onProgress && onProgress(percentage, file);
          }
        },
      })
      .then((resp) => {
        /** 更新上传成功状态 */
        updateFileList(_file, { status: "success", response: resp.data });
        /** 执行onSuccess回调 */
        onSuccess && onSuccess(resp.data, file);
      })
      .catch((err) => {
        /** 更新上传出错状态 */
        updateFileList(_file, { status: "error", error: err });
        /** onError回调 */
        onError && onError(err, file);
      });
  };

  return (
    <div className="upload-component">
      <div
        className="upload-input"
        style={{ display: "inline-block" }}
        onClick={handleClick}
      >
        {drag ? (
          <UploadDragger
            onFile={(files) => {
              uploadFiles(files);
            }}
          >
            {children}
          </UploadDragger>
        ) : (
          children
        )}
        <input
          className="file-input"
          style={{ display: "none" }}
          ref={fileInput}
          onChange={handleFileChange}
          type="file"
          accept={accept}
          multiple={multiple}
          data-testid="file-input"
        />
      </div>

      <UploadList fileList={fileList} onRemove={handleRemove} />
    </div>
  );
};
Upload.displayName = "Upload";
Upload.defaultProps = {
  name: "file",
};
export default Upload;
