import { Layout, Menu, Button } from "antd";
import { useEffect, useState } from "react";

const { Header } = Layout;

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 60);
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <Header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 1000,

        display: "flex",
        alignItems: "center",

        padding: scrolled ? "10px 60px" : "20px 60px",
        height: "auto",

        background: scrolled
          ? "rgba(255, 255, 255, 0.95)"
          : "transparent",

        backdropFilter: scrolled ? "blur(8px)" : "none",

        transition: "all 0.35s ease",
      }}
    >
      {/* Logo placeholder */}
      <div style={{ width: 120 }} />

      <Menu
        mode="horizontal"
        selectable={false}
        style={{
          flex: 1,
          justifyContent: "center",
          background: "transparent",
          borderBottom: "none",
          color: scrolled ? "#1f3a52" : "#fff",
        }}
        items={[
          { key: "1", label: "Home" },
          { key: "2", label: "Products" },
          { key: "3", label: "Contact" },
        ]}
      />

      <Button
        style={{
          borderRadius: 20,
          borderColor: scrolled ? "#1f3a52" : "#fff",
          color: scrolled ? "#1f3a52" : "#fff",
          background: "transparent",
        }}
      >
        Sign in
      </Button>
    </Header>
  );
}
