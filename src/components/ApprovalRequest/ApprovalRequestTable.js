"use client";

import React, { useEffect, useState } from "react";
import { message, Popconfirm, Space, Tooltip } from "antd";
import {
  CheckOutlined,
  CloseOutlined,
  CloudUploadOutlined,
} from "@ant-design/icons";

import AdminNavbar from "../Layout/AdminNavbar";
import ReusableTable from "../UI/Table";
import { apiRequest, getRequest } from "@/src/utils/api";

const ApprovalRequestTable = () => {
  const [searchString, setSearchString] = useState("");
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(0);
  const [users, setUsers] = useState([]);
  const [updateStatus, setUpdateStatus] = useState();
  const [loading, setLoading] = useState(false);

const handleApprove = async (record) => {
  try {
    const data = await apiRequest({
      endpoint: `/admin/users/${record.id}/approve`,
      method: "POST",
    });

    setUpdateStatus(data);

    if (data?.success) {
      message.success("User Approved Successfully");
    } else {
      message.error(data?.message || "Approval failed");
    }
  } catch (err) {
    console.error(err);
    message.error("Server error");
  }
};

  const handleReject = async (record) => {
    let body = {
      ...record,
      isVerified: false,
    };
    const data = await apiRequest({
      endpoint: "/user/update",
      method: "POST",
      params: null,
      body,
    });
    setUpdateStatus(data);
    message.success("User Rejected Successfully");
  };
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
      title: "Company",
      dataIndex: "companyName",
    },
    {
      title: "Status",
      dataIndex: "isVerified",
      render: (isVerified) => <>{isVerified ? "Verified" : "Not Verified"}</>,
    },
    {
      title: "Approve & Reject",
      key: "action",
      render: (_, record) => (
        <Space>
          {!record?.isVerified ? (
            <Popconfirm
              title="Approve Product"
              description="Are you sure you want to approve this?"
              onConfirm={() => handleApprove(record)}
              okText="Yes"
              cancelText="No"
            >
              <Tooltip title="Approve">
                <CheckOutlined
                  style={{
                    background: "#52c41a",
                    color: "#fff",
                    padding: 6,
                    borderRadius: 4,
                    cursor: "pointer",
                  }}
                />
              </Tooltip>
            </Popconfirm>
          ) : (
            <Popconfirm
              title="Reject Product"
              description="Are you sure you want to reject this?"
              onConfirm={() => handleReject(record)}
              okText="Yes"
              cancelText="No"
              okButtonProps={{ danger: true }}
            >
              <Tooltip title="Reject">
                <CloseOutlined
                  style={{
                    background: "#ff4d4f",
                    color: "#fff",
                    padding: 6,
                    borderRadius: 4,
                    cursor: "pointer",
                  }}
                />
              </Tooltip>
            </Popconfirm>
          )}
        </Space>
      ),
    },
    // {
    //   title: "Trade License Upload",
    //   key: "upload",
    //   render: (_, record) => (
    //     <Tooltip title="View Upload">
    //       <CloudUploadOutlined
    //         style={{
    //           fontSize: 18,
    //           color: "#1677ff",
    //           cursor: "pointer",
    //         }}
    //         onClick={() => console.log("View upload:", record)}
    //       />
    //     </Tooltip>
    //   ),
    // },
  ];

  const headerActions = [
    {
      label: "Reject Users",
      type: "default",
      onClick: () => console.log("Reject Users"),
    },
    {
      label: "Approve Users",
      type: "primary",
      onClick: () => console.log("Approve Users"),
    },
  ];

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      const data = await apiRequest({
        endpoint: "/admin/users/pending",
        method: "GET",
        // params: {
        //   page: currentPage,
        //   size: pageSize,
        //   name: searchString,
        // },
      });

      setUsers(data);
      setLoading(false);
    };

    fetchUsers();
  }, [currentPage, pageSize, searchString, updateStatus]);

  return (
    <AdminNavbar>
      <ReusableTable
        rowKey="id"
        loading={loading}
        title="Approval Requests"
        columns={columns}
        dataSource={users?.data?.content}
        searchText={searchString}
        setSearchText={setSearchString}
        pageSize={pageSize}
        setPageSize={setPageSize}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        actions={[]}
        totalItems={users?.data?.totalElements}
      />
    </AdminNavbar>
  );
};

export default ApprovalRequestTable;
