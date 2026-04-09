"use client";

import React, { useEffect, useState } from "react";
import {
  Modal,
  Form,
  Input,
  Select,
  Button,
  Card,
  Space,
  message,
  Typography,
  Checkbox,
} from "antd";
import ImageUpload from "../UI/ImageUpload";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
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
          martindale: product.martindale,
          pilling: product.pilling,
          waterRepellent: product.waterRepellent,
          flameRetardancy: product.flameRetardancy,
          attention: product.attention,
          specification: {
            length: product.specification?.length,
            width: product.specification?.width,
            composition: product.specification?.composition,
            weight: product.specification?.weight,
            repeat: {
              vertical: product.specification?.repeat?.vertical,
              horizontal: product.specification?.repeat?.horizontal,
            },
          },
          careInstructions: {
            wash: product.careInstructions?.wash,
            bleach: product.careInstructions?.bleach,
            dry: product.careInstructions?.dry,
            iron: product.careInstructions?.iron,
            dryClean: product.careInstructions?.dryClean,
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

    const payload = {
      product: {
        ...values.product,
        defaultVariant: {
          ...values.product.defaultVariant,
          mainImageUrl: values.product.defaultVariant.mainImageUrl?.[0],
        },
      },
      variantList: values.variantList?.map((x) => ({
        ...x,
        mainImageUrl: x.mainImageUrl?.[0],
      })),
    };

    try {
      if (initialValues?.id) {
        const data = await apiRequest({
          endpoint: `/products/${initialValues.id}/update-with-urls`,
          method: "PUT",
          body: payload,
        });

        if (data?.success) {
          message.success("Product updated successfully");
          onClose();
        } else {
          message.error("Something went wrong!");
        }

        setUpdateResponse(data);
      } else {
        const data = await apiRequest({
          endpoint: "/products/create-with-urls",
          method: "POST",
          body: payload,
        });

        if (data?.success) {
          message.success("Product added successfully");
          onClose();
        } else {
          message.error("Something went wrong!");
        }

        setCreateResponse(data);
      }
    } catch (err) {
      message.error("API Error");
    }

    setLoading(false);
  };

  return (
    <Modal
      title={initialValues?.id ? "Edit Catalogue" : "Add Catalogue"}
      open={open}
      onCancel={onClose}
      confirmLoading={loading}
      destroyOnClose
      width={800}
      footer={null}
    >
      <Form
        layout="vertical"
        form={form}
        onFinish={handleFinish}
        initialValues={{ variantList: [{}] }}
      >
        <Space wrap>
          <Form.Item name={["product", "id"]} hidden>
            <Input />
          </Form.Item>

          <Form.Item
            label="Category"
            name={["product", "category"]}
            rules={[{ required: true }]}
          >
            <Select options={productCategory} style={{ width: 300 }} />
          </Form.Item>

          <Form.Item
            label="Collection"
            name={["product", "collection"]}
            rules={[{ required: true }]}
          >
            <Input style={{ width: 300 }} />
          </Form.Item>

          <Form.Item
            name={["product", "martindale"]}
            label="Martindale"
            rules={[{ required: true }]}
          >
            <Input style={{ width: 300 }} />
          </Form.Item>

          <Form.Item
            name={["product", "pilling"]}
            label="Pilling"
            rules={[{ required: true }]}
          >
            <Input style={{ width: 300 }} />
          </Form.Item>

          <Form.Item
            name={["product", "waterRepellent"]}
            valuePropName="checked"
          >
            <Checkbox>Water Repellent</Checkbox>
          </Form.Item>

          <Form.Item
            name={["product", "flameRetardancy"]}
            label="Flame Retardancy"
          >
            <Input style={{ width: 300 }} />
          </Form.Item>

          <Form.Item
            name={["product", "attention"]}
            label="Attention"
            rules={[{ required: true }]}
          >
            <Input.TextArea style={{ width: 700 }} />
          </Form.Item>
        </Space>

        <Card title="Specification">
          <Space wrap>
            <Form.Item
              name={["product", "specification", "length"]}
              label="Length"
              rules={[{ required: true }]}
            >
              <Input style={{ width: 300 }} />
            </Form.Item>

            <Form.Item
              name={["product", "specification", "width"]}
              label="Width"
              rules={[{ required: true }]}
            >
              <Input style={{ width: 300 }} />
            </Form.Item>

            <Form.Item
              name={["product", "specification", "composition"]}
              label="Composition"
              rules={[{ required: true }]}
            >
              <Input style={{ width: 300 }} />
            </Form.Item>

            <Form.Item
              name={["product", "specification", "weight"]}
              label="Weight"
              rules={[{ required: true }]}
            >
              <Input style={{ width: 300 }} />
            </Form.Item>

            <Form.Item
              name={["product", "specification", "repeat", "vertical"]}
              label="Vertical"
              rules={[{ required: true }]}
            >
              <Input style={{ width: 300 }} />
            </Form.Item>

            <Form.Item
              name={["product", "specification", "repeat", "horizontal"]}
              label="Horizontal"
              rules={[{ required: true }]}
            >
              <Input style={{ width: 300 }} />
            </Form.Item>
          </Space>
        </Card>

        <Card title="Care and Usage Instractions" style={{ marginBottom: 16 }}>
          <Form.Item label="Care Instructions">
            <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
              <Form.Item
                name={["product", "careInstructions", "wash"]}
                valuePropName="checked"
                noStyle
              >
              <Checkbox>Wash</Checkbox>
              </Form.Item>

              <Form.Item
                name={["product", "careInstructions", "bleach"]}
                valuePropName="checked"
                noStyle
              >
                <Checkbox>Bleach</Checkbox>
              </Form.Item>

              <Form.Item
                name={["product", "careInstructions", "dry"]}
                valuePropName="checked"
                noStyle
              >
                <Checkbox>Dry</Checkbox>
              </Form.Item>

              <Form.Item
                name={["product", "careInstructions", "iron"]}
                valuePropName="checked"
                noStyle
              >
                <Checkbox>Iron</Checkbox>
              </Form.Item>

              <Form.Item
                name={["product", "careInstructions", "dryClean"]}
                valuePropName="checked"
                noStyle
              >
                <Checkbox>Dry Clean</Checkbox>
              </Form.Item>
            </div>
          </Form.Item>
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
