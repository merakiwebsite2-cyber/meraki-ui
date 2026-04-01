import { Form, Input, Button, message } from "antd";
import { LockOutlined } from "@ant-design/icons";
import { useRouter } from "next/router";
import { apiRequest } from "@/src/utils/api";

export default function ChangePassword() {
  const router = useRouter();

  const handleChangePassword = async (values) => {
    try {
      const token = localStorage.getItem("token");
      const email = localStorage.getItem("email");

      const data = await apiRequest({
        endpoint: "/auth/change-password",
        method: "POST",
        body: {
          email,
          ...values,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (data?.success) {
        message.success("Password changed successfully");

        // Redirect after change
        setTimeout(() => router.push("/product"), 1500);
      } else {
        message.error(data?.message || "Failed to change password");
      }
    } catch (err) {
      console.error(err);
      message.error("Server error");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundImage: "url('/pattern.png')",
        backgroundRepeat: "repeat",
        backgroundSize: "250px",
      }}
    >
      <div style={{ width: 420 }}>
        <h1 style={{ fontSize: 42, marginBottom: 30, color: "#4b1e1e" }}>
          Change Password
        </h1>

        <Form layout="vertical" onFinish={handleChangePassword}>
          <Form.Item
            name="oldPassword"
            rules={[{ required: true, message: "Enter old password" }]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Old Password"
              size="large"
            />
          </Form.Item>

          <Form.Item
            name="newPassword"
            rules={[{ required: true, message: "Enter new password" }]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="New Password"
              size="large"
            />
          </Form.Item>

          <Button
            htmlType="submit"
            block
            size="large"
            style={{
              background: "#4b0f0f",
              color: "#fff",
              borderRadius: 6,
              height: 48,
            }}
          >
            CHANGE PASSWORD
          </Button>
        </Form>
      </div>
    </div>
  );
}