"use client";

import React, { useEffect, useState } from "react";
import {
  Space,
  Tooltip,
  message,
  Select,
  Popconfirm,
  Tag,
  Collapse,
} from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";

import AdminNavbar from "../Layout/AdminNavbar";
import ReusableTable from "../UI/Table";
import { productCategory } from "@/src/utils/constant";
import ProductFormModal from "./ProductCatalogueForm";
import { apiRequest } from "@/src/utils/api";
import Image from "next/image";

const { Panel } = Collapse;

const ProductCatalogueTable = () => {
  const [searchString, setSearchString] = useState("");
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [products, setProducts] = useState([]);
  const [deleteStatus, setDeleteStatus] = useState();
  const [category, setCategory] = useState("");
  const [createResponse, setCreateResponse] = useState();
  const [updateResponse, setUpdateResponse] = useState();
  const [loading, setLoading] = useState(false);

  const handleAddProduct = () => {
    setEditingProduct(null);
    setIsModalOpen(true);
  };

  const handleEdit = (record) => {
    setEditingProduct(record);
    setIsModalOpen(true);
  };

  const handleDelete = async (record) => {
    const data = await apiRequest({
      endpoint: `/products/${record.id}`,
      method: "DELETE",
    });

    setDeleteStatus(data);

    if (data?.success) {
      message.success("Product deleted successfully");
    } else {
      message.error("Something went wrong!");
    }
  };

  useEffect(() => {
    const fetchProductCatalogues = async () => {
      setLoading(true);

      const data = await apiRequest({
        endpoint: "/products",
        method: "GET",
        params: {
          page: currentPage,
          size: pageSize,
          category: category,
          search: searchString,
        },
      });

      setProducts(data);
      setLoading(false);
    };

    fetchProductCatalogues();
  }, [
    currentPage,
    pageSize,
    searchString,
    category,
    createResponse?.success,
    updateResponse?.success,
    deleteStatus?.success,
  ]);

  const renderSpecification = (value) => {
    if (!value) return "-";

    const mainFields = [];
    const extraFields = [];

    Object.entries(value).forEach(([key, val]) => {
      if (
        typeof val !== "object" &&
        val !== null &&
        val !== "" &&
        mainFields.length < 4
      ) {
        mainFields.push(
          <Tag key={key} color="blue" style={{ marginBottom: 6 }}>
            {key}: {String(val)}
          </Tag>
        );
      } else {
        extraFields.push({ key, val });
      }
    });

    return (
      <div style={{ maxWidth: 350 }}>
        {/* Show compact tags */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 6,
            marginBottom: extraFields.length ? 8 : 0,
          }}
        >
          {mainFields}
        </div>

        {/* Expandable more details */}
        {extraFields.length > 0 && (
          <Collapse
            ghost
            size="small"
            expandIconPosition="end"
            style={{ background: "transparent" }}
          >
            <Panel
              header={
                <span style={{ fontSize: 13, color: "#1677ff" }}>
                  <InfoCircleOutlined /> View More
                </span>
              }
              key="1"
            >
              {extraFields.map((item, index) => {
                if (
                  typeof item.val === "object" &&
                  item.val !== null &&
                  !Array.isArray(item.val)
                ) {
                  return (
                    <div key={index} style={{ marginBottom: 10 }}>
                      <strong>{item.key}</strong>
                      <div style={{ marginTop: 4, paddingLeft: 10 }}>
                        {Object.entries(item.val).map(([k, v]) => (
                          <Tag
                            key={k}
                            style={{ marginBottom: 6 }}
                            color="default"
                          >
                            {k}: {String(v)}
                          </Tag>
                        ))}
                      </div>
                    </div>
                  );
                }

                return (
                  <Tag key={index} style={{ marginBottom: 6 }}>
                    {item.key}: {String(item.val)}
                  </Tag>
                );
              })}
            </Panel>
          </Collapse>
        )}
      </div>
    );
  };

  const columns = [
    {
      title: "Image",
      dataIndex: "defaultVariant",
      width: 90,
      render: (data) => (
        <Image
          src={data?.mainImageUrl}
          width={55}
          height={55}
          alt="product"
          style={{
            borderRadius: 8,
            objectFit: "cover",
            border: "1px solid #f0f0f0",
          }}
        />
      ),
    },
    {
      title: "Category",
      dataIndex: "category",
      width: 130,
      ellipsis: true,
    },
    {
      title: "Collection",
      dataIndex: "category",
      width: 130,
      ellipsis: true,
    },
    {
      title: "Specification",
      dataIndex: "specification",
      width: 420,
      render: renderSpecification,
    },
    {
      title: "Article",
      width: 140,
      render: (_, record) => record?.defaultVariant?.article || "-",
    },
    {
      title: "Color",
      width: 120,
      render: (_, record) => record?.defaultVariant?.color || "-",
    },
    {
      title: "Action",
      key: "action",
      width: 100,
      fixed: "right",
      render: (_, record) => (
        <Space size="middle">
          <Tooltip title="Edit">
            <EditOutlined
              style={{
                color: "#1677ff",
                cursor: "pointer",
                fontSize: 16,
              }}
              onClick={() => handleEdit(record)}
            />
          </Tooltip>

          <Popconfirm
            title="Delete Product"
            description="Are you sure you want to delete this product?"
            onConfirm={() => handleDelete(record)}
            okText="Yes"
            cancelText="No"
            okButtonProps={{ danger: true }}
          >
            <Tooltip title="Delete">
              <DeleteOutlined
                style={{
                  color: "#ff4d4f",
                  cursor: "pointer",
                  fontSize: 16,
                }}
              />
            </Tooltip>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const headerActions = [
    {
      label: "Add Product",
      type: "primary",
      onClick: handleAddProduct,
    },
  ];

  return (
    <AdminNavbar>
      <Select
        value={category || undefined}
        allowClear
        placeholder="Select Category"
        options={productCategory}
        onChange={(value) => setCategory(value || "")}
        style={{
          width: 220,
          marginBottom: 20,
        }}
      />

      <ReusableTable
        loading={loading}
        rowKey="id"
        title="Product Catalogue"
        columns={columns}
        dataSource={products?.data?.content || []}
        searchText={searchString}
        setSearchText={setSearchString}
        pageSize={pageSize}
        setPageSize={setPageSize}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        actions={headerActions}
        totalItems={products?.data?.totalElements || 0}
        scroll={{ x: 1200 }}
      />

      <ProductFormModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        initialValues={editingProduct}
        setCreateResponse={setCreateResponse}
        setUpdateResponse={setUpdateResponse}
      />
    </AdminNavbar>
  );
};

export default ProductCatalogueTable;