import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Layout, Menu, Input, Avatar } from "antd";
import {
  DashboardOutlined,
  FileDoneOutlined,
  AppstoreOutlined,
  ShoppingCartOutlined,
  SearchOutlined,
  SettingOutlined,
} from "@ant-design/icons";

const { Header, Sider, Content } = Layout;

const menuItems = [
  {
    key: "dashboard",
    label: "Dashboard",
    icon: <DashboardOutlined />,
    path: "/admin/dashboard",
  },
  {
    key: "approval",
    label: "Approval Requests",
    icon: <FileDoneOutlined />,
    path: "/admin/approval-request",
  },
  {
    key: "catalogue",
    label: "Product Catalogue",
    icon: <AppstoreOutlined />,
    path: "/admin/product-catalogue",
  },
  {
    key: "order",
    label: "Orders",
    icon: <ShoppingCartOutlined />,
    path: "/admin/orders",
  },
];

const AdminNavbar = ({ children }) => {
  const router = useRouter();
  const [selectedMenu, setSelectedMenu] = useState(menuItems?.[0]?.key);

  return (

    <Layout style={{ minHeight: "100vh" }}>
      
      <Sider width={240} style={{ background: "#fff" }}>
        <div style={{ display: "flex", alignItems: "center" }}>
          <img
            src="/logo2.png"
            alt="logo"
            style={{
              height: 90,
              objectFit: "contain",
              cursor: "pointer"
            }}
            onClick={() => router.push("/")}
          />
        </div>

        <Menu
          mode="inline"
          defaultSelectedKeys={[selectedMenu]}
          items={menuItems}
          onClick={({ key }) => {
            const item = menuItems.find((menu) => menu.key === key);
            setSelectedMenu(item?.key);
            if (item?.path) {
              router.push(item.path);
            }
          }}
        />
      </Sider>

      <Layout>
        <Header
          style={{
            background: "#fff",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "0 20px",
          }}
        >
          <Input
            placeholder="Search"
            prefix={<SearchOutlined />}
            style={{ width: 250 }}
          />

          <div style={{ display: "flex", gap: "15px", alignItems: "center" }}>
            <SettingOutlined style={{ fontSize: 20 }} />
            <Avatar style={{ backgroundColor: "#1677ff" }}>AM</Avatar>
          </div>
        </Header>

        <Content
          style={{
            padding: 24,
            flex: 1,
            background: "#f5f5f5",
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminNavbar;
