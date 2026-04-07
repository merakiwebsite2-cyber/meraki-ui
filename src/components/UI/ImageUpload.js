import { Upload, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useState, useEffect } from "react";
import { BASE_URL, STORAGE_BASE_URL } from "@/src/utils/api";

const ImageUpload = ({ maxCount = 1, value = [], onChange }) => {
  const fileList = value.map((url, index) => ({
    uid: index.toString(),
    name: `image-${index}`,
    status: "done",
    url,
  }));

  const customRequest = async ({ file, onSuccess, onError }) => {
    const formData = new FormData();
    formData.append("file", file);
    let url = STORAGE_BASE_URL + "/api/images/upload";
    try {
      const res = await fetch(url, {
        method: "POST",
        body: formData,
      });

      const data = await res.text(); // or JSON
      onSuccess(data);

      // Update parent with new URLs
      const updatedUrls = [...(value || []), data];
      onChange?.(updatedUrls);

      message.success("Uploaded successfully");
    } catch (err) {
      onError(err);
      message.error("Upload failed");
    }
  };

  const handleChange = ({ fileList: newFileList }) => {

    // Handle remove
    const urls = newFileList
      .filter((f) => f.status === "done")
      .map((f) => f.response || f.url);

    onChange?.(urls);
  };

  return (
    <Upload
      listType="picture-card"
      fileList={fileList}
      customRequest={customRequest}
      onChange={handleChange}
      maxCount={maxCount}
    >
      {fileList.length >= maxCount ? null : (
        <div>
          <PlusOutlined />
          <div>Upload</div>
        </div>
      )}
    </Upload>
  );
};

export default ImageUpload;
