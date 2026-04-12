"use client";

import { Layout, Menu, Button, Dropdown } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const { Header } = Layout;

export default function Navbar() {
  const router = useRouter();

  const [email, setEmail] = useState(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const loadUser = () => {
      const storedEmail = localStorage.getItem("email");
      setEmail(storedEmail || "");
    };

    loadUser();

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

  // Protect Products Page
  const handleProductsClick = () => {
    const storedEmail = localStorage.getItem("email");

    if (storedEmail) {
      router.push("/product");
    } else {
      router.push("/login");
    }
  };

  const dropdownItems = [
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
        left: 0,
        width: "100%",
        zIndex: 1000,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 80px",
        height: 70,
        background: scrolled ? "rgba(0,0,0,0.9)" : "transparent",
        transition: "all 0.3s ease",
      }}
    >
      {/* Logo */}
      <img
        src="/logo.png"
        alt="logo"
        style={{
          height: 80,
          cursor: "pointer",
        }}
        onClick={() => router.push("/")}
      />

      {/* Menu */}
      <Menu
        mode="horizontal"
        selectable={false}
        style={{
          flex: 1,
          display: "flex",
          justifyContent: "center",
          background: "transparent",
          borderBottom: "none",
        }}
        items={[
          {
            key: "1",
            label: (
              <span
                style={{ color: "#fff" }}
                onClick={() => router.push("/")}
              >
                Home
              </span>
            ),
          },
          {
            key: "2",
            label: (
              <span
                style={{ color: "#fff" }}
                onClick={handleProductsClick}
              >
                Products
              </span>
            ),
          },
          {
            key: "3",
            label: (
              <span
                style={{ color: "#fff" }}
                onClick={() => router.push("/contact")}
              >
                Contact
              </span>
            ),
          },
        ]}
      />

      {/* Right Side */}
      {email === null ? null : email ? (
        <Dropdown menu={{ items: dropdownItems }} trigger={["click"]}>
          <div
            style={{
              color: "#fff",
              cursor: "pointer",
              fontWeight: 500,
              display: "flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            {email}
            <DownOutlined />
          </div>
        </Dropdown>
      ) : (
        <Button
          onClick={() => router.push("/login")}
          style={{
            borderRadius: 20,
            borderColor: "#fff",
            color: "#fff",
            background: "transparent",
          }}
        >
          Sign in
        </Button>
      )}
    </Header>
  );
}