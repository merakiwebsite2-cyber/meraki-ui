import { Layout, Menu, Button } from "antd";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

const { Header } = Layout;

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const router = useRouter();

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
        backdropFilter: scrolled ? "blur(6px)" : "none",
        boxShadow: scrolled ? "0 2px 10px rgba(0,0,0,0.3)" : "none",

        transition: "all 0.35s ease"
      }}
    >
      {/* LEFT - LOGO */}
      <div style={{ display: "flex", alignItems: "center" }}>
        <img
          src="/logo.png"
          alt="logo"
          style={{
            height: 90,
            objectFit: "contain",
            cursor: "pointer"
          }}
          onClick={() => router.push("/")}
        />
      </div>

      {/* CENTER - MENU */}
      <Menu
        mode="horizontal"
        selectable={false}
        style={{
          flex: 1,
          display: "flex",
          justifyContent: "center",
          background: "transparent",
          borderBottom: "none"
        }}
        items={[
          {
            key: "1",
            label: <span style={{ color: "#fff" }}>Home</span>
          },
          {
            key: "2",
            label: <span style={{ color: "#fff" }}>Products</span>
          },
          {
            key: "3",
            label: <span style={{ color: "#fff" }}>Contact</span>
          }
        ]}
      />

      {/* RIGHT - BUTTON */}
      <Button
        onClick={() => router.push("/login")}
        style={{
          borderRadius: 20,
          borderColor: "#fff",
          color: "#fff",
          background: "transparent"
        }}
      >
        Sign in
      </Button>
    </Header>
  );
}