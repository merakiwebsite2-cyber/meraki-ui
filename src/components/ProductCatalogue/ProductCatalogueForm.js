"use client";

import React, { useEffect, useState } from "react";
import { Modal, Form, Input, Select, Button, Card, Space, message } from "antd";
import ImageUpload from "../UI/ImageUpload";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { v4 as uuidv4 } from "uuid";
import { apiRequest } from "@/src/utils/api";
import { productCategory } from "@/src/utils/constant";

const ProductFormModal = ({
  open,
  onClose,
  initialValues = {},
  setCreateResponse,
  setUpdateResponse,
}) => {
  const [form] = Form.useForm();
  const [productCatalogue, setProductCatalogue] = useState(null);
  const [loading, setLoading] = useState(false);
  console.log(loading);

  useEffect(() => {
    if (!initialValues?.id) {
      form.resetFields();
      setProductCatalogue(null);

      return;
    }

    const fetchProductCatalogue = async () => {
      const data = await apiRequest({
        endpoint: `/products/${initialValues?.id}`,
        method: "GET",
      });

      setProductCatalogue(data);
    };

    fetchProductCatalogue();
  }, [initialValues?.id]);

  useEffect(() => {
    if (productCatalogue?.data?.product) {
      const { product, variants } = productCatalogue?.data;

      const formattedValues = {
        product: {
          id: product?.id,
          category: product.category,
          collection: product.collection,
          specification: {
            length: product.specification?.length,
            width: product.specification?.width,
          },
          defaultVariant: {
            id: product.defaultVariant?.id,
            article: product.defaultVariant?.article,
            color: product.defaultVariant?.color,

            mainImageUrl: product.defaultVariant?.mainImageUrl
              ? [product.defaultVariant.mainImageUrl]
              : [],

            images: product.defaultVariant?.images || [],
          },
        },

        variantList:
          variants?.map((v) => ({
            id: v?.id,
            article: v.article,
            color: v.color,

            mainImageUrl: v.mainImageUrl ? [v.mainImageUrl] : [],

            images: v.images || [],
          })) || [],
      };

      form.setFieldsValue(formattedValues);
    }
  }, [productCatalogue, form]);

  const handleFinish = async (values) => {
    setLoading(true);
    values.product.defaultVariant.mainImageUrl =
      values.product.defaultVariant.mainImageUrl[0];

    values.variantList = values.variantList?.map((x) => ({
      ...x,
      mainImageUrl: x.mainImageUrl?.[0],
    }));

    if (initialValues?.id) {
      const data = await apiRequest({
        endpoint: `/products/${initialValues.id}/update-with-urls`,
        method: "PUT",
        body: values,
      });
      if (data?.success) {
        message.success("Product updated successfully");
        onClose();
      } else {
        message.error("Something went wrong!");
      }
      setUpdateResponse(data);
      setLoading(false);
    } else {
      const data = await apiRequest({
        endpoint: "/products/create-with-urls",
        method: "POST",
        body: values,
      });
      if (data?.success) {
        message.success("Product added successfully");
        onClose();
      } else {
        message.error("Something went wrong!");
      }
      setCreateResponse(data);
      setLoading(false);
    }
  };

  return (
    <Modal
      title={initialValues ? "Edit Catalogue" : "Add Catalogue"}
      open={open}
      onCancel={onClose}
      loading={loading}
      destroyOnClose
      width={700}
      footer={null}
    >
      <Form
        layout="vertical"
        form={form}
        onFinish={handleFinish}
        initialValues={{
          variantList: [{}],
        }}
      >
        <Space style={{ width: "100%", display: "flex", flexWrap: "wrap" }}>
          <Form.Item name={["product", "id"]} hidden>
            <Input />
          </Form.Item>
          <Form.Item
            label="Category"
            name={["product", "category"]}
            rules={[{ required: true, message: "Enter category" }]}
          >
            <Select options={productCategory} style={{ width: "300px" }} />
          </Form.Item>
          <Form.Item
            label="Collection"
            name={["product", "collection"]}
            rules={[{ required: true, message: "Enter collection" }]}
          >
            <Input placeholder="Enter collection" style={{ width: "300px" }} />
          </Form.Item>
        </Space>

        <Card title="Specification" style={{ marginBottom: 16 }}>
          <Space direction="horizontal">
            <Form.Item
              name={["product", "specification", "length"]}
              label="Length"
              rules={[{ required: true, message: "Enter length" }]}
            >
              <Input
                placeholder="Enter length (e.g. 300cm)"
                style={{ width: "300px" }}
              />
            </Form.Item>

            <Form.Item
              name={["product", "specification", "width"]}
              label="Width"
              rules={[{ required: true, message: "Enter width" }]}
            >
              <Input
                placeholder="Enter width (e.g. 200cm)"
                style={{ width: "300px" }}
              />
            </Form.Item>
          </Space>
        </Card>

        <Card title="Default Variant" style={{ marginBottom: 16 }}>
          <Space direction="horizontal" style={{ width: "100%" }}>
            <Form.Item name={["product", "defaultVariant", "id"]} hidden>
              <Input />
            </Form.Item>
            <Form.Item
              name={["product", "defaultVariant", "article"]}
              label="Article"
              rules={[{ required: true, message: "Enter article" }]}
            >
              <Input placeholder="Enter article" style={{ width: "300px" }} />
            </Form.Item>

            <Form.Item
              name={["product", "defaultVariant", "color"]}
              label="collection"
              rules={[{ required: true, message: "Enter color" }]}
            >
              <Input placeholder="Enter color" style={{ width: "300px" }} />
            </Form.Item>
          </Space>
          <Space direction="horizontal" style={{ width: "100%" }}>
            <Form.Item
              name={["product", "defaultVariant", "mainImageUrl"]}
              label="Main Image"
              valuePropName="value"
              getValueFromEvent={(val) => val}
              rules={[{ required: true, message: "Upload main image" }]}
            >
              <ImageUpload maxCount={1} />
            </Form.Item>

            <Form.Item
              name={["product", "defaultVariant", "images"]}
              label="Images"
              valuePropName="value"
              getValueFromEvent={(val) => val}
            >
              <ImageUpload maxCount={3} />
            </Form.Item>
          </Space>
        </Card>

        <Form.List name="variantList">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, ...restField }) => (
                <Card
                  key={key}
                  title={`Variant ${name + 1}`}
                  style={{ marginBottom: 16 }}
                  extra={<MinusCircleOutlined onClick={() => remove(name)} />}
                >
                  <Form.Item {...restField} name={[name, "id"]} hidden>
                    <Input />
                  </Form.Item>
                  <Form.Item
                    {...restField}
                    name={[name, "article"]}
                    label="Article"
                    rules={[{ required: true, message: "Enter article" }]}
                  >
                    <Input
                      placeholder="Enter article"
                      style={{ width: "100%" }}
                    />
                  </Form.Item>

                  <Form.Item
                    {...restField}
                    name={[name, "color"]}
                    label="Color"
                    rules={[{ required: true, message: "Enter color" }]}
                  >
                    <Input
                      placeholder="Enter color"
                      style={{ width: "100%" }}
                    />
                  </Form.Item>
                  <Space direction="horizontal" style={{ width: "100%" }}>
                    <Form.Item
                      label="Main Image"
                      name={[name, "mainImageUrl"]}
                      valuePropName="value"
                      getValueFromEvent={(val) => val}
                    >
                      <ImageUpload maxCount={1} />
                    </Form.Item>

                    <Form.Item
                      label="Images"
                      name={[name, "images"]}
                      valuePropName="value"
                      getValueFromEvent={(val) => val}
                    >
                      <ImageUpload maxCount={3} />
                    </Form.Item>
                  </Space>
                </Card>
              ))}

              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <Form.Item>
                  <Button
                    type="primary"
                    style={{ width: "150px", marginTop: "20px" }}
                    onClick={() => add()}
                    block
                    icon={<PlusOutlined />}
                  >
                    Add Variant
                  </Button>
                </Form.Item>
              </div>
            </>
          )}
        </Form.List>

        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            gap: "8px",
            marginTop: "20px",
          }}
        >
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading}>
              Submit
            </Button>
          </Form.Item>
          <Button
            type="default"
            loading={loading}
            onClick={onClose}
            style={{
              color: "var(--delete-icon)",
              border: "1px solid var(--delete-icon)",
            }}
          >
            Close
          </Button>
        </div>
      </Form>
    </Modal>
  );
};

export default ProductFormModal;
