"use client";

import {
  Layout,
  Row,
  Col,
  Typography,
  Space,
  Divider,
} from "antd";
import {
  FacebookFilled,
  LinkedinFilled,
  InstagramFilled,
  MailOutlined,
  PhoneOutlined,
  EnvironmentOutlined,
} from "@ant-design/icons";
import { useRouter } from "next/navigation";

const { Footer: AntFooter } = Layout;
const { Title, Text } = Typography;

export default function Footer() {
  const router = useRouter();

  return (
    <AntFooter
      style={{
        background:
          "linear-gradient(135deg,#0f172a 0%,#111827 40%,#1e293b 100%)",
        color: "#fff",
        padding: "60px 40px 20px",
      }}
    >
      <Row gutter={[40, 40]}>
        {/* Company */}
        <Col xs={24} md={10}>
          <img
            src="/logo.png"
            alt="Logo"
            style={{
              width: 170,
              marginBottom: 20,
              cursor: "pointer",
            }}
            onClick={() => router.push("/")}
          />

        </Col>

        {/* Quick Links */}
        <Col xs={24} sm={12} md={7}>
          <Title
            level={4}
            style={{
              color: "#fff",
              marginBottom: 20,
            }}
          >
            Quick Links
          </Title>

          <Space
            direction="vertical"
            size="middle"
            style={{ width: "100%" }}
          >
            <Text
              style={{ color: "#cbd5e1", cursor: "pointer" }}
              onClick={() => router.push("/")}
            >
              Home
            </Text>

            <Text
              style={{ color: "#cbd5e1", cursor: "pointer" }}
              onClick={() => router.push("/product")}
            >
              Products
            </Text>

            <Text
              style={{ color: "#cbd5e1", cursor: "pointer" }}
              onClick={() => router.push("/contact")}
            >
              Contact
            </Text>
          </Space>
        </Col>

        {/* Contact */}
        <Col xs={24} sm={12} md={7}>
          <Title
            level={4}
            style={{
              color: "#fff",
              marginBottom: 20,
            }}
          >
            Contact
          </Title>

          <Space
            direction="vertical"
            size="middle"
            style={{ width: "100%" }}
          >
            <Space align="start">
              <EnvironmentOutlined
                style={{
                  color: "#1677ff",
                  marginTop: 4,
                }}
              />

              <Text style={{ color: "#cbd5e1" }}>
                Office 1101,
                <br />
                Warsan Tower,
                <br />
                Barsha Heights,
                <br />
                PO Box 453020,
                <br />
                Dubai, UAE
              </Text>
            </Space>

            <Space>
              <PhoneOutlined style={{ color: "#1677ff" }} />

              <Text style={{ color: "#cbd5e1" }}>
                +971-4-5771009
              </Text>
            </Space>

            <Space>
              <MailOutlined style={{ color: "#1677ff" }} />

              <Text style={{ color: "#cbd5e1" }}>
                info@meraki-interiors.ae
              </Text>
            </Space>
          </Space>
        </Col>
      </Row>

      <Divider
        style={{
          borderColor: "rgba(255,255,255,.15)",
          margin: "40px 0 20px",
        }}
      />

      <Row
        justify="space-between"
        align="middle"
        gutter={[20, 20]}
      >
        <Col xs={24} md={12}>
          <Text style={{ color: "#94a3b8" }}>
            © {new Date().getFullYear()} Your Company. All Rights Reserved.
          </Text>
        </Col>

        <Col
          xs={24}
          md={12}
          style={{
            textAlign: "right",
          }}
        >
          <Space size="large">
            <FacebookFilled
              style={{
                fontSize: 24,
                color: "#fff",
                cursor: "pointer",
              }}
            />

            <InstagramFilled
              style={{
                fontSize: 24,
                color: "#fff",
                cursor: "pointer",
              }}
            />

            <LinkedinFilled
              style={{
                fontSize: 24,
                color: "#fff",
                cursor: "pointer",
              }}
            />
          </Space>
        </Col>
      </Row>
    </AntFooter>
  );
}