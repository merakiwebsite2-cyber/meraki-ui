"use client";

import React, { useEffect, useState } from "react";
import { Space, Tooltip, Tag, message, Select, Popconfirm } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

import AdminNavbar from "../Layout/AdminNavbar";
import ReusableTable from "../UI/Table";
import { productCategory } from "@/src/utils/constant";
import ProductFormModal from "./ProductCatalogueForm";
import { apiRequest } from "@/src/utils/api";
import Image from "next/image";

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

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const handleEdit = (record) => {
    setEditingProduct(record);
    setIsModalOpen(true);
  };

  const handleDelete = async (record) => {
    console.log("Delete product:", record);
    const data = await apiRequest({
      endpoint: `/products/${record.id}`,
      method: "DELETE",
    });
    setDeleteStatus(data);
    if (data?.success) message.success("Product deleted successfully");
    else message.error("Something went wrong!");
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
          category: searchString,
          category: category,
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

  const columns = [
    {
      title: "Image",
      dataIndex: "defaultVariant",
      render: (data) => (
        <Image src={data?.mainImageUrl} width={50} height={50} alt="Test" />
      ),
    },
    {
      title: "Category",
      dataIndex: "category",
    },
    {
      title: "Collection",
      dataIndex: "category",
    },
    {
      title: "Specification",
      dataIndex: "specification",
      render: (value) => {
        return (
          <div>
            {Object.entries(value || {}).map(([key, val], index) => (
              <div key={index}>
                <strong>{key}:</strong> {val}
              </div>
            ))}
          </div>
        );
      },
    },
    {
      title: "Article",
      dataIndex: "",
      render: (value) => value?.defaultVariant?.article,
    },

    {
      title: "collection",
      dataIndex: "color",
      render: (value) => value?.defaultVariant?.color,
    },
    {
      title: "Action",
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
                  color: "var(--delete-icon)",
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
        value={category}
        allowClear
        placeholder="Select Category"
        options={productCategory}
        onChange={(e) => {
          setCategory(e);
        }}
        style={{ width: "200px", marginBottom: "20px" }}
      />

      <ReusableTable
        loading={loading}
        rowKey="id"
        title="Product Catalogue"
        columns={columns}
        dataSource={products?.data?.content}
        searchText={searchString}
        setSearchText={setSearchString}
        pageSize={pageSize}
        setPageSize={setPageSize}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        actions={headerActions}
        totalItems={products?.data?.totalElements}
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
