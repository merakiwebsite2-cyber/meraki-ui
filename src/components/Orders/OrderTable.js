"use client";

import {
  DeleteOutlined,
  EditOutlined,
  HistoryOutlined,
} from "@ant-design/icons";
import { Image, Space, Tag, Tooltip, message } from "antd";
import React, { useEffect, useState } from "react";
import AdminNavbar from "../Layout/AdminNavbar";
import ReusableTable from "../UI/Table";
import { apiRequest } from "@/src/utils/api";

const OrdersTable = () => {
  const [searchString, setSearchString] = useState("");
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(0);

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalElements, setTotalElements] = useState(0);

  const handleEdit = (record) => {
    console.log("Edit:", record);
  };

  const handleHistory = (record) => {
    console.log("History:", record);
  };

  const handleDelete = (record) => {
    console.log("Delete:", record);
  };

  const fetchOrders = async () => {
    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      const res = await apiRequest({
        endpoint: "/sample-requests/my",
        method: "GET",
        params: {
          page: currentPage,
          size: pageSize,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res?.success) {
        const pageData = res.data;

        const formatted = pageData.content.map((item, index) => ({
          key: item.id || index,
          id: item.id,
          image: item.requestedMainImageUrl,
          orderId: item.id,
          customerName: item.userName,
          article: item.requestedArticle,
          category: item.requestedCategory,
          collection: item.requestedCollection,
          color: item.requestedColor,
          orderDate: new Date(item.createdAt).toLocaleDateString(),
          orderStatus: item.status,
          shippingStatus:
            item.status === "APPROVED"
              ? "Shipped"
              : item.status === "PENDING"
              ? "Processing"
              : "Cancelled",
          rawData: item,
        }));

        setOrders(formatted);
        setTotalElements(pageData.totalElements || 0);
      }
    } catch (error) {
      console.error(error);
      message.error("Failed to fetch sample requests");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [currentPage, pageSize]);

  const statusColor = (status) => {
    if (status === "APPROVED") return "green";
    if (status === "PENDING") return "orange";
    if (status === "REJECTED") return "red";
    return "blue";
  };

  const columns = [
    {
      title: "Image",
      dataIndex: "image",
      width: 90,
      render: (img) => (
        <Image
          src={img}
          alt="Product"
          width={55}
          height={55}
          style={{
            objectFit: "cover",
            borderRadius: 8,
            border: "1px solid #f0f0f0",
          }}
          preview={true}
        />
      ),
    },
    {
      title: "Order ID",
      dataIndex: "orderId",
      width: 180,
    },
    {
      title: "Customer Name",
      dataIndex: "customerName",
      width: 180,
    },
    {
      title: "Article",
      dataIndex: "article",
    },
    {
      title: "Category",
      dataIndex: "category",
    },
    {
      title: "Collection",
      dataIndex: "collection",
    },
    {
      title: "Color",
      dataIndex: "color",
    },
    {
      title: "Order Date",
      dataIndex: "orderDate",
      width: 130,
    },
    {
      title: "Order Status",
      dataIndex: "orderStatus",
      width: 140,
      render: (status) => (
        <Tag
          color={statusColor(status)}
          style={{
            borderRadius: 20,
            paddingInline: 12,
            fontWeight: 500,
          }}
        >
          {status}
        </Tag>
      ),
    },
    {
      title: "Shipping",
      dataIndex: "shippingStatus",
      width: 140,
      render: (status) => (
        <Tag
          color={
            status === "Shipped"
              ? "green"
              : status === "Processing"
              ? "orange"
              : "red"
          }
          style={{
            borderRadius: 20,
            paddingInline: 12,
          }}
        >
          {status}
        </Tag>
      ),
    },
    // {
    //   title: "Actions",
    //   key: "action",
    //   fixed: "right",
    //   width: 130,
    //   render: (_, record) => (
    //     <Space size="middle">
    //       <Tooltip title="Edit">
    //         <EditOutlined
    //           onClick={() => handleEdit(record.rawData)}
    //           style={{
    //             color: "var(--edit-icon)",
    //             cursor: "pointer",
    //             fontSize: 16,
    //           }}
    //         />
    //       </Tooltip>

    //       <Tooltip title="History">
    //         <HistoryOutlined
    //           onClick={() => handleHistory(record.rawData)}
    //           style={{
    //             color: "var(--history-icon)",
    //             cursor: "pointer",
    //             fontSize: 16,
    //           }}
    //         />
    //       </Tooltip>

    //       <Tooltip title="Delete">
    //         <DeleteOutlined
    //           onClick={() => handleDelete(record.rawData)}
    //           style={{
    //             color: "var(--delete-icon)",
    //             cursor: "pointer",
    //             fontSize: 16,
    //           }}
    //         />
    //       </Tooltip>
    //     </Space>
    //   ),
    // },
  ];

  return (
    <AdminNavbar>
      <ReusableTable
        title="Sample Requests"
        columns={columns}
        dataSource={orders}
        loading={loading}
        searchText={searchString}
        setSearchText={setSearchString}
        pageSize={pageSize}
        setPageSize={setPageSize}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        total={totalElements}
        scroll={{ x: 1600 }}
      />
    </AdminNavbar>
  );
};

export default OrdersTable;