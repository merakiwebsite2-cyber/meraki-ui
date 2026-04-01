"use client";
import {
  DeleteOutlined,
  EditOutlined,
  HistoryOutlined,
} from "@ant-design/icons";
import { Space, Tag, Tooltip } from "antd";
import React, { useState } from "react";
import AdminNavbar from "../Layout/AdminNavbar";
import { ordersMockData } from "@/src/utils/constant";
import ReusableTable from "../UI/Table";

const OrdersTable = () => {
  const [searchString, setSearchString] = useState(null);
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(0);

  const handleEdit = (record) => {
    console.log("Edit Order:", record);
  };

  const handleHistory = (record) => {
    console.log("View Order History:", record);
  };

  const handleDelete = (record) => {
    console.log("Delete Order:", record);
  };

  const columns = [
    {
      title: "Order ID",
      dataIndex: "orderId",
    },
    {
      title: "Customer Name",
      dataIndex: "customerName",
    },
    {
      title: "Order Date",
      dataIndex: "orderDate",
    },
    {
      title: "Order Status",
      dataIndex: "orderStatus",
      render: (status) => (
        <Tag
          style={{
            borderColor:
              status === "Completed"
                ? "green"
                : status === "Pending"
                  ? "orange"
                  : "red",
            color:
              status === "Completed"
                ? "green"
                : status === "Pending"
                  ? "orange"
                  : "red",
            background: "transparent",
          }}
        >
          {status}
        </Tag>
      ),
    },
    {
      title: "Shipping Status",
      dataIndex: "shippingStatus",
      render: (status) => (
        <Tag
          style={{
            borderColor:
              status === "Shipped"
                ? "green"
                : status === "Processing"
                  ? "orange"
                  : "red",
            color:
              status === "Shipped"
                ? "green"
                : status === "Processing"
                  ? "orange"
                  : "red",
            background: "transparent",
          }}
        >
          {status}
        </Tag>
      ),
    },
    {
      title: "Actions",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Tooltip title="Edit">
            <EditOutlined
              style={{
                color: "var(--edit-icon)",
                cursor: "pointer",
                fontSize: 16,
              }}
              onClick={() => handleEdit(record)}
            />
          </Tooltip>

          <Tooltip title="History">
            <HistoryOutlined
              style={{
                color: "var(--history-icon)",
                cursor: "pointer",
                fontSize: 16,
              }}
              onClick={() => handleHistory(record)}
            />
          </Tooltip>

          <Tooltip title="Delete">
            <DeleteOutlined
              style={{
                color: "var(--delete-icon)",
                cursor: "pointer",
                fontSize: 16,
              }}
              onClick={() => handleDelete(record)}
            />
          </Tooltip>
        </Space>
      ),
    },
  ];

  const headerActions = [
    {
      label: "Edit",
      icon: <EditOutlined />,
      onClick: () => {},
    },
    {
      label: "Delete",
      icon: <DeleteOutlined />,
      onClick: () => {},
    },
  ];

  return (
    <AdminNavbar>
      <ReusableTable
        title="Orders"
        columns={columns}
        dataSource={ordersMockData}
        searchText={searchString}
        setSearchText={setSearchString}
        pageSize={pageSize}
        setPageSize={setPageSize}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        actions={headerActions}
      />
    </AdminNavbar>
  );
};

export default OrdersTable;
