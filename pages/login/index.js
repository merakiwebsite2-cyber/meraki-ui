import { Form, Input, Button, Tabs, message } from "antd";
import {
  UserOutlined,
  MailOutlined,
  LockOutlined,
  ApartmentOutlined,
  MobileOutlined,
} from "@ant-design/icons";
import { useRouter } from "next/router";
import { v4 as uuidv4 } from "uuid";
import { apiRequest } from "@/src/utils/api";
import Navbar from "../components/Navbar";

export default function LoginPage() {
  const router = useRouter();
  const uuid = uuidv4();

  /* ---------------- REQUEST ACCESS ---------------- */
  const onRequestAccess = async (values) => {
    try {
      const body = {
        // id: uuid,
        ...values,
        isVerified: false,
      };

      const data = await apiRequest({
        endpoint: "/auth/signup",
        method: "POST",
        body,
      });

      if (data?.success) {
        message.success(
          "User request has been sent to Meraki team. We will contact you soon."
        );
        setTimeout(() => router.push("/"), 2000);
      } else {
        message.error("Something went wrong! Try again later");
      }
    } catch (err) {
      message.error("Server error! Try again");
    }
  };

  /* ---------------- LOGIN ---------------- */
const onLogin = async (values) => {
  try {
    const data = await apiRequest({
      endpoint: "/auth/login",
      method: "POST",
      body: values,
    });

    console.log("LOGIN RESPONSE:", data);

    if (data?.success) {
      // ✅ Store JWT
      localStorage.setItem("token", data?.data?.token);

      // ✅ Store email
      localStorage.setItem("email", values.username);

      message.success("Login successful");

      // ✅ Redirect to change password page
      setTimeout(() => router.push("/password"), 1500);
    } else {
      message.error(data?.message || "Invalid credentials");
    }
  } catch (err) {
    console.error(err);
    message.error("Server error! Try again");
  }
};

  return (
    <>

    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",

        /* BACKGROUND PATTERN */
        backgroundImage: "url('/pattern.png')",
        backgroundRepeat: "repeat",
        backgroundSize: "250px",
      }}
    >
      {/* MAIN CONTAINER */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 80,
          width: "80%",
          maxWidth: 1200,
        }}
      >
        {/* LEFT VISUAL */}
        <div style={{ position: "relative" }}>
          {/* FABRIC IMAGE */}
          <img
            src="/login2.png"
            style={{
              width: 499,
              height: 628,
              borderRadius: "30px",
            }}
          />

          {/* HORSE IMAGE */}
          <img
            src="/login1.png"
            style={{
              position: "absolute",
              top: 180,
              left: 48,
              width: 322,
              height: 555,
            }}
          />
        </div>

        {/* RIGHT FORM */}
        <div style={{ width: 420 }}>
          <h1
            style={{
              fontSize: 42,
              marginBottom: 30,
              color: "#4b1e1e",
            }}
          >
            Welcome!
          </h1>

          <Tabs
            defaultActiveKey="login"
            centered
            items={[
              {
                key: "request",
                label: "Request Access",
                children: (
                  <Form layout="vertical" onFinish={onRequestAccess}>
                    <Form.Item
                      name="name"
                      rules={[{ required: true, message: "Enter your name" }]}
                    >
                      <Input
                        prefix={<UserOutlined />}
                        placeholder="Full Name"
                        size="large"
                      />
                    </Form.Item>

                    <Form.Item
                      name="mobileNo"
                      rules={[
                        { required: true, message: "Enter Mobile Number" },
                      ]}
                    >
                      <Input
                        prefix={<MobileOutlined />}
                        placeholder="Mobile Number"
                        size="large"
                      />
                    </Form.Item>

                    <Form.Item
                      name="email"
                      rules={[{ required: true, message: "Enter email" }]}
                    >
                      <Input
                        prefix={<MailOutlined />}
                        placeholder="Email"
                        size="large"
                      />
                    </Form.Item>

                    <Form.Item
                      name="companyName"
                      rules={[
                        { required: true, message: "Enter company name" },
                      ]}
                    >
                      <Input
                        prefix={<ApartmentOutlined />}
                        placeholder="Company"
                        size="large"
                      />
                    </Form.Item>

                    {/* <Form.Item
                      name="password"
                      rules={[
                        { required: true, message: "Enter password" },
                      ]}
                    >
                      <Input.Password
                        prefix={<LockOutlined />}
                        placeholder="Password"
                        size="large"
                      />
                    </Form.Item> */}

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
                      REQUEST ACCESS
                    </Button>
                  </Form>
                ),
              },
              {
                key: "login",
                label: "Login",
                children: (
                  <Form layout="vertical" onFinish={onLogin}>
                    <Form.Item
                      name="email"
                      rules={[{ required: true, message: "Enter email" }]}
                    >
                      <Input
                        prefix={<MailOutlined />}
                        placeholder="Email"
                        size="large"
                      />
                    </Form.Item>

                    <Form.Item
                      name="password"
                      rules={[
                        { required: true, message: "Enter password" },
                      ]}
                    >
                      <Input.Password
                        prefix={<LockOutlined />}
                        placeholder="Password"
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
                      LOG IN
                    </Button>
                  </Form>
                ),
              },
            ]}
          />
        </div>
      </div>
    </div>
    </>
  );
}