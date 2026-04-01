import React from "react";
import { Table, Input, Button, Space, Pagination } from "antd";
import { SearchOutlined } from "@ant-design/icons";

const ReusableTable = ({
  title,
  columns,
  dataSource = [],
  loading = false,
  rowKey = "id",
  showSearch = true,
  searchText,
  setSearchText,
  currentPage = 0,
  pageSize = 10,
  totalItems,
  setCurrentPage,
  setPageSize,
  actions = [],
  showDefaultPagination = false,

  ...rest
}) => {
  const handleSearch = (value) => {
    setSearchText(value);
  };

  const handlePageChange = (page, size) => {
    setCurrentPage(page - 1);
  };

  return (
    <div
      style={{
        background: "#fff",
        padding: 20,
        borderRadius: 10,
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 16,
        }}
      >
        <h2 style={{ margin: 0 }}>{title}</h2>

        <Space>
          {showSearch && (
            <Input.Search
              placeholder="Search"
              allowClear
              enterButton={<SearchOutlined />}
              onSearch={handleSearch}
              style={{ width: 220 }}
            />
          )}

          {actions.map((action, index) => (
            <Button
              key={index}
              type={action.type || "default"}
              icon={action.icon}
              onClick={action.onClick}
              loading={action.loading}
              disabled={action.disabled}
              style={action.style}
              danger={action.danger}
            >
              {action.label}
            </Button>
          ))}
        </Space>
      </div>

      {/* Table */}
      <Table
        className="custom-table"
        columns={columns}
        dataSource={dataSource}
        rowKey={rowKey}
        loading={loading}
        pagination={showDefaultPagination}
        {...rest}
      />

      {/* Pagination */}
      {!showDefaultPagination && (
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            marginTop: 20,
          }}
        >
          <Pagination
            current={currentPage + 1}
            pageSize={pageSize}
            total={totalItems}
            onChange={handlePageChange}
            showSizeChanger
            onShowSizeChange={(page, size) => {
              setPageSize(size);
              setCurrentPage(page);
            }}
            pageSizeOptions={["10", "20", "50", "100"]}
            showTotal={(total) => `Total ${total} items`}
          />
        </div>
      )}
    </div>
  );
};

export default ReusableTable;
