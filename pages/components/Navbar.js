"use client";

import { Layout, Menu, Button, Dropdown } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const { Header } = Layout;

export default function Navbar() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const storedEmail = localStorage.getItem("email");
    if (storedEmail) {
      setEmail(storedEmail);
    }

    const handleScroll = () => {
      setScrolled(window.scrollY > 60);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    setEmail("");
    router.push("/login");
  };

  const items = [
    {
      key: "1",
      label: (
        <span onClick={handleLogout} style={{ color: "red" }}>
          Logout
        </span>
      ),
    },
  ];

  return (
    <Header
      style={{
        position: "fixed",
        top: 0,
        width: "100%",
        zIndex: 1000,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 80px",
        height: 70,
        background: scrolled ? "rgba(0,0,0,0.9)" : "transparent",
      }}
    >
      {/* Logo */}
      <img
        src="/logo.png"
        alt="logo"
        style={{ height: 80, cursor: "pointer" }}
        onClick={() => router.push("/")}
      />

      {/* Menu */}
      <Menu
        mode="horizontal"
        selectable={false}
        style={{
          flex: 1,
          justifyContent: "center",
          background: "transparent",
          borderBottom: "none",
        }}
        items={[
          { key: "1", label: <span style={{ color: "#fff" }}>Home</span> },
          { key: "2", label: <span style={{ color: "#fff" }}>Products</span> },
          { key: "3", label: <span style={{ color: "#fff" }}>Contact</span> },
        ]}
      />

      {/* Right Side */}
      {email ? (
        <Dropdown menu={{ items }} trigger={["click"]}>
          <div
            style={{
              color: "#fff",
              cursor: "pointer",
              fontWeight: 500,
            }}
          >
            {email} <DownOutlined />
          </div>
        </Dropdown>
      ) : (
        <Button onClick={() => router.push("/login")}>Sign in</Button>
      )}
    </Header>
  );
}