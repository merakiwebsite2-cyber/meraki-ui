"use client";
import {
  DeleteOutlined,
  EditOutlined,
  HistoryOutlined,
} from "@ant-design/icons";
import { message, Modal, Popconfirm, Space, Tag, Tooltip } from "antd";
import React, { useEffect, useState } from "react";
import AdminNavbar from "../Layout/AdminNavbar";
import ReusableTable from "../UI/Table";
import { apiRequest } from "@/src/utils/api";
import UserForm from "./UserEditForm";

const DashboardTable = () => {
  const [searchString, setSearchString] = useState("");
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(0);
  const [users, setUsers] = useState([]);
  const [updateStatus, setUpdateStatus] = useState();
  const [visible, setVisible] = useState(false);
  const [initialData, setInitialData] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleHistory = (record) => {
    console.log("View history:", record);
  };

  const handleDelete = (record) => {
    setUsers((prev) => ({
      ...prev,
      data: {
        ...prev.data,
        content: prev.data.content.filter((x) => x.id !== record.id),
        totalElements: prev.data.totalElements - 1,
      },
    }));

    message.success("User deleted successfully");
  };

  const openModal = (record) => {
    console.log("Edit:", record);
    setVisible(true);
    setInitialData(record);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);

      const data = await apiRequest({
        endpoint: "/admin/users/approved", // ✅ FIXED HERE
        method: "GET",
        // params: {
        //   page: currentPage,
        //   size: 100,
        //   name: searchString,
        // },
      });

      setUsers(data);
      setLoading(false);
    };

    fetchUsers();
  }, [currentPage, pageSize, searchString, updateStatus]);

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Phone Number",
      dataIndex: "mobileNo",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Account Status",
      dataIndex: "isVerified",
      render: (status) => (
        <Tag
          style={{
            borderColor: "green",
            color: "green",
            background: "transparent",
          }}
        >
          {"Verified"}
        </Tag>
      ),
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
              onClick={() => openModal(record)}
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

          <Popconfirm
            title="Delete Request"
            description="Are you sure you want to delete this Request?"
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
        loading={loading}
        title="Dashboard"
        columns={columns}
        dataSource={users?.data?.content} 
        searchText={searchString}
        setSearchText={setSearchString}
        pageSize={pageSize}
        setPageSize={setPageSize}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        actions={[]}
        showDefaultPagination={true}
        totalItems={users?.data?.totalElements}
      />
      <Modal
        title={initialData ? "Edit User" : "Add User"}
        open={visible}
        onCancel={handleCancel}
        footer={null}
        destroyOnClose
      >
        <UserForm
          initialData={initialData}
          onClose={handleCancel}
          setUpdateStatus={setUpdateStatus}
        />
      </Modal>
    </AdminNavbar>
  );
};

export default DashboardTable;