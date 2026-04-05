import React, { useState } from "react";
import { Form, Input, Button, Card, Typography, message } from "antd";
import { apiRequest, BASE_URL } from "../utils/api";
import { useRouter } from "next/navigation";

const { Title, Text } = Typography;

const AdminLogin = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    setLoading(true);
    const url = `${BASE_URL}/auth/login`;
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });
    // console.log("res", res.text());
    message.success("Login successfully");
    router.push("/admin/dashboard");

    setLoading(false);
  };

  return (
    <div style={styles.container}>
      {/* Decorative Elements */}
      <div style={styles.topCircle}></div>
      <div style={styles.bottomShape}></div>

      <Card style={styles.card}>
        <Title level={4} style={{ textAlign: "center", marginBottom: 20 }}>
          Welcome to <b>MERAKI Admin</b>
        </Title>

        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: "Enter email" }]}
          >
            <Input placeholder="email@domain.com" />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Enter password" }]}
          >
            <Input.Password placeholder="********" />
          </Form.Item>

          <Button type="primary" htmlType="submit" block style={styles.button}>
            SUBMIT
          </Button>

        </Form>
      </Card>
    </div>
  );
};

const styles = {
  container: {
    height: "100vh",
    background: `
  linear-gradient(135deg, rgba(245,241,235,0.95), rgba(237,230,220,0.95)),
  url('/background.png')
`,
    backgroundSize: "cover",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    overflow: "hidden",
  },

  card: {
    width: 380,
    borderRadius: 12,
    padding: "20px",
    background: "#FFFFFF",
    boxShadow: "0 10px 40px rgba(90, 45, 31, 0.15)",
  },
  button: {
    backgroundColor: "#5A2D1F",
    borderColor: "#5A2D1F",
    height: 42,
    fontWeight: "600",
  },

  /* Top Right Circle (Cup style) */
  topCircle: {
    position: "absolute",
    top: -80,
    right: -80,
    width: 200,
    height: 200,
    borderRadius: "50%",
    background: "#a87a2e",
    boxShadow: "inset -10px -10px 20px rgba(0,0,0,0.1)",
  },

  /* Bottom Left Shape */
  bottomShape: {
    position: "absolute",
    bottom: -100,
    left: -100,
    width: 250,
    height: 250,
    background: "#5A2D1F",
    transform: "rotate(45deg)",
    borderRadius: 20,
  },
};

export default AdminLogin;
