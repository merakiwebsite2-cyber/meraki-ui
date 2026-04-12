"use client";

import React, { useEffect, useState } from "react";
import { Modal, Form, Input, Select, Button, Card, Space, message, Typography, Checkbox } from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import ImageUpload from "../UI/ImageUpload";
import { apiRequest } from "@/src/utils/api";
import { productCategory } from "@/src/utils/constant";

const inputStyle = { width: 300 };

export default function ProductFormModal({ open, onClose, initialValues = {}, setCreateResponse, setUpdateResponse }) {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [productCatalogue, setProductCatalogue] = useState(null);

  useEffect(() => {
    if (!initialValues?.id) {
      form.resetFields();
      setProductCatalogue(null);
      return;
    }
    (async () => {
      const data = await apiRequest({ endpoint: `/products/${initialValues.id}`, method: "GET" });
      setProductCatalogue(data);
    })();
  }, [initialValues?.id, form]);

  useEffect(() => {
    const data = productCatalogue?.data;

    if (!data?.product) return;

    const { product, variants = [] } = data;

    const formattedValues = {
      product: {
        id: product.id,
        category: product.category,
        collection: product.collection,


        specification: {
          length: product.specification?.length,
          width: product.specification?.width,
          composition: product.specification?.composition,
          weight: product.specification?.weight,
          martindale: product.martindale,
          pilling: product.pilling,
          waterRepellent: product.waterRepellent,
          flameRetardancy: product.flameRetardancy,
          attention: product.attention,

          repeat: {
            vertical: product.specification?.repeat?.vertical,
            horizontal: product.specification?.repeat?.horizontal,
          },

          careInstructions: {
            wash: product.specification?.careInstructions?.wash,
            bleach: product.specification?.careInstructions?.bleach,
            dry: product.specification?.careInstructions?.dry,
            iron: product.specification?.careInstructions?.iron,
            dryClean: product.specification?.careInstructions?.dryClean,
          },
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
        variants.map((v) => ({
          id: v.id,
          article: v.article,
          color: v.color,
          mainImageUrl: v.mainImageUrl ? [v.mainImageUrl] : [],
          images: v.images || [],
        })) || [],
    };

    form.setFieldsValue(formattedValues);
  }, [productCatalogue, form]);

  const handleFinish = async (values) => {
    setLoading(true);

    const payload = {
      product: {
        ...values.product,
        defaultVariant: {
          ...values.product.defaultVariant,
          mainImageUrl: values.product.defaultVariant?.mainImageUrl?.[0],
        },
      },
      variantList: (values.variantList || []).map(v => ({ ...v, mainImageUrl: v.mainImageUrl?.[0] })),
    };

    try {
      const isEdit = !!initialValues?.id;
      const data = await apiRequest({
        endpoint: isEdit ? `/products/${initialValues.id}/update-with-urls` : "/products/create-with-urls",
        method: isEdit ? "PUT" : "POST",
        body: payload,
      });

      if (data?.success) {
        message.success(isEdit ? "Product updated successfully" : "Product added successfully");
        onClose();
      } else {
        message.error("Something went wrong!");
      }
      isEdit ? setUpdateResponse?.(data) : setCreateResponse?.(data);
    } catch {
      message.error("API Error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal title={initialValues?.id ? "Edit Catalogue" : "Add Catalogue"} open={open} onCancel={onClose} footer={null} width={800} destroyOnClose>
      <Form form={form} layout="vertical" onFinish={handleFinish} initialValues={{ variantList: [{}] }}>
        <Space wrap>
          <Form.Item name={["product", "id"]} hidden><Input /></Form.Item>
          <Form.Item label="Category" name={["product", "category"]} rules={[{ required: true }]}><Select options={productCategory} style={inputStyle} /></Form.Item>
          <Form.Item label="Collection" name={["product", "collection"]} rules={[{ required: true }]}><Input style={inputStyle} /></Form.Item>
          <Form.Item label="Martindale" name={["product", "martindale"]} rules={[{ required: true }]}><Input style={inputStyle} /></Form.Item>
          <Form.Item label="Pilling" name={["product", "pilling"]}><Input style={inputStyle} /></Form.Item>
          <Form.Item label="Flame Retardancy" name={["product", "flameRetardancy"]}><Input style={inputStyle} /></Form.Item>
          <Form.Item name={["product", "waterRepellent"]} valuePropName="checked"><Checkbox>Water Repellent</Checkbox></Form.Item>
          <Form.Item label="Attention" name={["product", "attention"]} rules={[{ required: true }]}><Input.TextArea style={{ width: 620 }} rows={3} /></Form.Item>
        </Space>

        <Card title="Specification" style={{ marginBottom: 16 }}>
          <Space wrap>
            <Form.Item label="Length" name={["product", "specification", "length"]} rules={[{ required: true }]}><Input style={inputStyle} /></Form.Item>
            <Form.Item label="Width" name={["product", "specification", "width"]} rules={[{ required: true }]}><Input style={inputStyle} /></Form.Item>
            <Form.Item label="Composition" name={["product", "specification", "composition"]} rules={[{ required: true }]}><Input style={inputStyle} /></Form.Item>
            <Form.Item label="Weight" name={["product", "specification", "weight"]} rules={[{ required: true }]}><Input style={inputStyle} /></Form.Item>
          </Space>
          {/* <Typography.Text strong>Repeat (cm)</Typography.Text> */}
          <Space wrap style={{ marginTop: 12 }}>
            <Form.Item label="Vertical" name={["product", "specification", "repeat", "vertical"]} ><Input style={inputStyle} /></Form.Item>
            <Form.Item label="Horizontal" name={["product", "specification", "repeat", "horizontal"]} ><Input style={inputStyle} /></Form.Item>
          </Space>
        </Card>

        <Card title="Care and Usage Instructions" style={{ marginBottom: 16 }}>
          <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
            {['wash', 'bleach', 'dry', 'iron', 'dryClean'].map((key) => (
              <Form.Item key={key}     name={["product", "specification", "careInstructions", key]} valuePropName="checked" noStyle>
                <Checkbox>{key === 'dryClean' ? 'Dry Clean' : key.charAt(0).toUpperCase() + key.slice(1)}</Checkbox>
              </Form.Item>
            ))}
          </div>
        </Card>

        <Card title="Default Variant" style={{ marginBottom: 16 }}>
          <Space wrap>
            <Form.Item name={["product", "defaultVariant", "id"]} hidden><Input /></Form.Item>
            <Form.Item label="Article" name={["product", "defaultVariant", "article"]} rules={[{ required: true }]}><Input style={inputStyle} /></Form.Item>
            <Form.Item label="Color" name={["product", "defaultVariant", "color"]} rules={[{ required: true }]}><Input style={inputStyle} /></Form.Item>
          </Space>
          <Space wrap>
            <Form.Item label="Main Image" name={["product", "defaultVariant", "mainImageUrl"]} valuePropName="value" getValueFromEvent={(v) => v} rules={[{ required: true }]}><ImageUpload maxCount={1} /></Form.Item>
            <Form.Item label="Images" name={["product", "defaultVariant", "images"]} valuePropName="value" getValueFromEvent={(v) => v}><ImageUpload maxCount={3} /></Form.Item>
          </Space>
        </Card>

        <Form.List name="variantList">
          {(fields, { add, remove }) => <>
            {fields.map(({ key, name, ...restField }) => (
              <Card key={key} title={`Variant ${name + 1}`} extra={<MinusCircleOutlined onClick={() => remove(name)} />} style={{ marginBottom: 16 }}>
                <Form.Item {...restField} name={[name, 'id']} hidden><Input /></Form.Item>
                <Form.Item {...restField} label="Article" name={[name, 'article']} rules={[{ required: true }]}><Input /></Form.Item>
                <Form.Item {...restField} label="Color" name={[name, 'color']} rules={[{ required: true }]}><Input /></Form.Item>
                <Space wrap>
                  <Form.Item {...restField} label="Main Image" name={[name, 'mainImageUrl']} valuePropName="value" getValueFromEvent={(v) => v}><ImageUpload maxCount={1} /></Form.Item>
                  <Form.Item {...restField} label="Images" name={[name, 'images']} valuePropName="value" getValueFromEvent={(v) => v}><ImageUpload maxCount={3} /></Form.Item>
                </Space>
              </Card>
            ))}
            <Button type="primary" icon={<PlusOutlined />} onClick={() => add()} block>Add Variant</Button>
          </>}
        </Form.List>

        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8, marginTop: 20 }}>
          <Button onClick={onClose}>Close</Button>
          <Button type="primary" htmlType="submit" loading={loading}>Submit</Button>
        </div>
      </Form>
    </Modal>
  );
}
