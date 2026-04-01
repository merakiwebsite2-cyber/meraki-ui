import { Layout, Menu, Button } from "antd";
import { useRouter } from "next/router";
// import { Raleway } from "next/font/google";
const { Header } = Layout;

export default function Navbar() {
//   const raleway = Raleway({
//   subsets: ["latin"],
//   weight: ["400", "500", "600"],
// });
  const router = useRouter();

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

        background: "#000", // ✅ always black
        boxShadow: "0 2px 10px rgba(0,0,0,0.3)"
      }}
    >
      {/* LEFT - LOGO */}
      <div style={{ display: "flex", alignItems: "center" }}>
        <img
          src="/logo.png"
          alt="logo"
          style={{
            height: 80,
            objectFit: "contain",
            cursor: "pointer"
          }}
          onClick={() => router.push("/")}
        />
      </div>

      {/* CENTER - MENU */}
      <Menu
        mode="horizontal"
          // className={raleway.className}
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