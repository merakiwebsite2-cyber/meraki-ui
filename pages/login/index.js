"use client";

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
import { useEffect, useState } from "react";

export default function LoginPage() {
  const router = useRouter();
  const uuid = uuidv4();

  const [screenWidth, setScreenWidth] = useState(1024);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleResize = () => setScreenWidth(window.innerWidth);
    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isMobile = screenWidth < 768;

  /* ---------------- REQUEST ACCESS ---------------- */
  const onRequestAccess = async (values) => {
    try {
      const body = { ...values, isVerified: false };

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

      if (data?.success) {
        localStorage.setItem("token", data?.data?.token);
        localStorage.setItem("email", values.email);

        message.success("Login successful");
        setTimeout(() => router.push("/password"), 1500);
      } else {
        message.error("Invalid credentials");
      }
  } catch (err) {
    console.error(err);
    message.error("Server error! Try again");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: isMobile ? "20px" : "40px",

        backgroundImage: "url('/pattern.png')",
        backgroundRepeat: "repeat",
        backgroundSize: "250px",
      }}
    >
      {/* MAIN CONTAINER */}
      <div
        style={{
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          alignItems: "center",
          // justifyContent: "center",
          gap: isMobile ? 20 : 80,
          width: "80%",
          maxWidth: 1200,
        }}
      >
        {/* LEFT VISUAL */}
                {!isMobile && (
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

            {/* OVERLAY PERSON */}
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
        )}

        {/* RIGHT FORM */}
        <div
          style={{
            width: isMobile ? "100%" : 420,
            maxWidth: 420,
          }}
        >
          <h1
            style={{
              fontSize: isMobile ? 26 : 42,
              marginBottom: 20,
              color: "#4b1e1e",
              textAlign: isMobile ? "center" : "left",
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
                    <Form.Item name="name" rules={[{ required: true }]}>
                      <Input prefix={<UserOutlined />} placeholder="Full Name" size="large" />
                    </Form.Item>

                    <Form.Item name="mobileNo" rules={[{ required: true }]}>
                      <Input prefix={<MobileOutlined />} placeholder="Mobile" size="large" />
                    </Form.Item>

                    <Form.Item name="email" rules={[{ required: true }]}>
                      <Input prefix={<MailOutlined />} placeholder="Email" size="large" />
                    </Form.Item>

                    <Form.Item name="companyName" rules={[{ required: true }]}>
                      <Input prefix={<ApartmentOutlined />} placeholder="Company" size="large" />
                    </Form.Item>

                    <Button
                      block
                      size="large"
                      htmlType="submit"
                      style={{
                        background: "#4b0f0f",
                        color: "#fff",
                        height: 48,
                        borderRadius: 8,
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
                    <Form.Item name="email" rules={[{ required: true }]}>
                      <Input prefix={<MailOutlined />} placeholder="Email" size="large" />
                    </Form.Item>

                    <Form.Item name="password" rules={[{ required: true }]}>
                      <Input.Password prefix={<LockOutlined />} placeholder="Password" size="large" />
                    </Form.Item>

                    <Button
                      block
                      size="large"
                      htmlType="submit"
                      style={{
                        background: "#4b0f0f",
                        color: "#fff",
                        height: 48,
                        borderRadius: 8,
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
  );
}