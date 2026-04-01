"use client";

import React, { useEffect, useState } from "react";
import { Form, Input, Button, Card, message } from "antd";
import { apiRequest } from "@/src/utils/api";

const UserForm = ({ initialData, onClose, setUpdateStatus }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (initialData) {
      form.setFieldsValue(initialData);
    }
  }, [initialData, form]);

  const onFinish = async (values) => {
    setLoading(true);
    try {
      if (initialData) {
        await apiRequest({
          endpoint: `/user/update`,
          method: "POST",
          body: values,
        });
      } else {
        await apiRequest({
          endpoint: "/user",
          method: "POST",
          body: values,
        });
      }

      setUpdateStatus({ success: true });
      message.success("User update successfully");
      onClose();
      form.resetFields();
    } catch (error) {
      message.error("Failed to update user");
      console.error("Failed to save user:", error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <Card title="User Form" style={{ maxWidth: 500 }}>
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        initialValues={{
          id: "4534456346",
          name: "Mercy",
          email: "mercy@gmail.com",
          companyName: "Test private limited",
          mobileNo: "808459945945",
        }}
      >
        <Form.Item
          label="User ID"
          name="id"
          rules={[{ required: true, message: "Please enter user ID" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: "Please enter name" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: "Please enter email" },
            { type: "email", message: "Enter valid email" },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Company Name"
          name="companyName"
          rules={[{ required: true, message: "Please enter company name" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Mobile Number"
          name="mobileNo"
          rules={[
            { required: true, message: "Please enter mobile number" },
            // { pattern: /^[0-9]{10,15}$/, message: "Enter valid phone number" },
          ]}
        >
          <Input />
        </Form.Item>
        <div style={{ display: "flex", justifyContent: "flex-end", gap: "8px" }}>
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading}>
              Submit
            </Button>
          </Form.Item>
          <Button
            type="default"
            loading={loading}
            onClick={onClose}
            style={{
              color: "var(--delete-icon)",
              border: "1px solid var(--delete-icon)",
            }}
          >
            Close
          </Button>
        </div>
      </Form>
    </Card>
  );
};

export default UserForm;
