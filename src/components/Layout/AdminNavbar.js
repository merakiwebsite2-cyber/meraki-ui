"use client";

import React from "react";
import { useRouter, usePathname } from "next/navigation";
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
  const pathname = usePathname();

  // Detect selected menu from current route
  const selectedKey =
    menuItems.find((item) => pathname.startsWith(item.path))?.key || "dashboard";

  return (
    <Layout style={{ minHeight: "100vh" }}>
      {/* Sidebar */}
      <Sider
        width={240}
        style={{
          background: "#fff",
          borderRight: "1px solid #f0f0f0",
        }}
      >
        {/* Logo */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "12px 0",
          }}
        >
          <img
            src="/logo2.png"
            alt="logo"
            style={{
              height: 70,
              objectFit: "contain",
              cursor: "pointer",
            }}
            onClick={() => router.push("/")}
          />
        </div>

        {/* Menu */}
        <Menu
          mode="inline"
          selectedKeys={[selectedKey]}
          style={{ borderRight: 0 }}
          items={menuItems}
          onClick={({ key }) => {
            const item = menuItems.find((menu) => menu.key === key);
            if (item?.path) router.push(item.path);
          }}
        />
      </Sider>

      {/* Main Layout */}
      <Layout>
        {/* Header */}
        <Header
          style={{
            background: "#fff",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "0 20px",
            borderBottom: "1px solid #f0f0f0",
          }}
        >
          <Input
            placeholder="Search..."
            prefix={<SearchOutlined />}
            style={{
              width: 260,
              borderRadius: 8,
            }}
          />

          <div
            style={{
              display: "flex",
              gap: "18px",
              alignItems: "center",
            }}
          >
            <SettingOutlined
              style={{
                fontSize: 20,
                cursor: "pointer",
              }}
            />

            <Avatar
              style={{
                backgroundColor: "#1677ff",
                cursor: "pointer",
              }}
            >
              AM
            </Avatar>
          </div>
        </Header>

        {/* Page Content */}
        <Content
          style={{
            padding: 24,
            background: "#f5f5f5",
            minHeight: "calc(100vh - 64px)",
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminNavbar;