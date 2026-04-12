import { Form, Input, Button, Tabs, message } from "antd";
import {
  UserOutlined,
  MailOutlined,
  LockOutlined,
  ApartmentOutlined,
} from "@ant-design/icons";
import { useRouter } from "next/router";
import { apiRequest } from "@/src/utils/api";
import { useEffect, useState } from "react";

import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";

import {
  AsYouType,
  parsePhoneNumberFromString,
  getCountryCallingCode,
  isValidPhoneNumber,
} from "libphonenumber-js";

export default function LoginPage() {
  const router = useRouter();

  const [screenWidth, setScreenWidth] = useState(1024);
  const [phone, setPhone] = useState("");
  const [countryCode, setCountryCode] = useState("IN");
  const [country, setCountry] = useState("India");

  const [requestForm] = Form.useForm();

  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleResize = () => setScreenWidth(window.innerWidth);
    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isMobile = screenWidth < 768;

  /* ---------------- COUNTRY NAME ---------------- */
  const getCountryName = (iso) => {
    try {
      const regionNames = new Intl.DisplayNames(["en"], {
        type: "region",
      });
      return regionNames.of(iso) || "";
    } catch {
      return "";
    }
  };

  /* ---------------- COUNTRY CHANGE ---------------- */
  const handleCountryChange = (iso) => {
    if (!iso) return;

    setCountryCode(iso);

    const name = getCountryName(iso);
    setCountry(name);

    requestForm.setFieldsValue({
      country: name,
    });

    setPhone("");
  };

  /* ---------------- PHONE CHANGE ---------------- */
  const handlePhoneChange = (value) => {
    if (!value) {
      setPhone("");
      return;
    }

    try {
      const formatter = new AsYouType(countryCode);
      formatter.input(value);

      const national = formatter.getNationalNumber() || "";
      const template = formatter.getTemplate() || "";

      const maxDigits = (template.match(/x/g) || []).length;

      if (!maxDigits || national.length <= maxDigits) {
        setPhone(value);
      }
    } catch {
      setPhone(value);
    }
  };

  /* ---------------- REQUEST ACCESS ---------------- */
  const onRequestAccess = async (values) => {
    try {
      if (!phone || !isValidPhoneNumber(phone)) {
        message.error("Enter valid mobile number");
        return;
      }

      const parsed = parsePhoneNumberFromString(phone);

      const body = {
        name: values.name,
        email: values.email,
        companyName: values.companyName,
        mobileNo: parsed?.nationalNumber || "",
        countryCode: `+${parsed?.countryCallingCode || getCountryCallingCode(countryCode)}`,
        country: country,
        isVerified: false,
      };

      const data = await apiRequest({
        endpoint: "/auth/signup",
        method: "POST",
        body,
      });

      if (data?.success) {
        message.success(
          "User request has been sent to Meraki team. We will contact you soon."
        );

        requestForm.resetFields();
        setPhone("");
        setCountryCode("IN");
        setCountry("India");

        setTimeout(() => router.push("/"), 1500);
      } else {
        message.error("Something went wrong! Try again later");
      }
    } catch (err) {
      console.error(err);
      message.error("Server error! Try again");
    }
  };

  /* ---------------- LOGIN ---------------- */
  const onLogin = async (values) => {
    try {
      const data = await apiRequest({
        endpoint: "/auth/login",
        method: "POST",
        body: values,
      });

      if (data?.success) {
        localStorage.setItem("token", data?.data?.token);
        localStorage.setItem("email", values.email);

        message.success("Login successful");

        const mustChangePassword = data?.data?.mustChangePassword;

        setTimeout(() => {
          if (mustChangePassword) {
            router.push("/password");
          } else {
            router.push("/product");
          }
        }, 1500);
      } else {
        message.error("Invalid credentials");
      }
    } catch (err) {
      console.error(err);
      message.error("Server error! Try again");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: isMobile ? "20px" : "40px",
        backgroundImage: "url('/pattern.png')",
        backgroundRepeat: "repeat",
        backgroundSize: "250px",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          alignItems: "center",
          gap: isMobile ? 20 : 80,
          width: "80%",
          maxWidth: 1200,
        }}
      >
        {!isMobile && (
          <div style={{ position: "relative" }}>
            <img
              src="/login2.png"
              alt="login"
              style={{
                width: 499,
                height: 628,
                borderRadius: "30px",
              }}
            />

            <img
              src="/login1.png"
              alt="overlay"
              style={{
                position: "absolute",
                top: 180,
                left: 48,
                width: 322,
                height: 555,
              }}
            />
          </div>
        )}

        <div
          style={{
            width: isMobile ? "100%" : 420,
            maxWidth: 420,
          }}
        >
          <h1
            style={{
              fontSize: isMobile ? 26 : 42,
              marginBottom: 20,
              color: "#4b1e1e",
              textAlign: isMobile ? "center" : "left",
            }}
          >
            Welcome!
          </h1>

          <Tabs
            defaultActiveKey="login"
            centered
            items={[
              {
                key: "request",
                label: "Request Access",
                children: (
                  <Form
                    form={requestForm}
                    layout="vertical"
                    onFinish={onRequestAccess}
                    initialValues={{
                      country: "India",
                    }}
                  >
                    <Form.Item
                      name="name"
                      rules={[
                        {
                          required: true,
                          message: "Enter full name",
                        },
                      ]}
                    >
                      <Input
                        prefix={<UserOutlined />}
                        placeholder="Full Name"
                        size="large"
                      />
                    </Form.Item>

                    <Form.Item label="Mobile Number" required>
                      <PhoneInput
                        international
                        defaultCountry="IN"
                        country={countryCode}
                        value={phone}
                        onChange={handlePhoneChange}
                        onCountryChange={handleCountryChange}
                        placeholder="Enter phone number"
                        style={{
                          border: "1px solid #d9d9d9",
                          padding: "10px 12px",
                          borderRadius: "8px",
                        }}
                      />
                    </Form.Item>

                    <Form.Item
                      name="country"
                      rules={[
                        {
                          required: true,
                          message: "Country required",
                        },
                      ]}
                    >
                      <Input
                        placeholder="Country"
                        size="large"
                        disabled
                      />
                    </Form.Item>

                    <Form.Item
                      name="email"
                      rules={[
                        {
                          required: true,
                          message: "Enter email",
                        },
                        {
                          type: "email",
                          message: "Enter valid email",
                        },
                      ]}
                    >
                      <Input
                        prefix={<MailOutlined />}
                        placeholder="Email"
                        size="large"
                      />
                    </Form.Item>

                    <Form.Item
                      name="companyName"
                      rules={[
                        {
                          required: true,
                          message: "Enter company name",
                        },
                      ]}
                    >
                      <Input
                        prefix={<ApartmentOutlined />}
                        placeholder="Company"
                        size="large"
                      />
                    </Form.Item>

                    <Button
                      block
                      size="large"
                      htmlType="submit"
                      style={{
                        background: "#4b0f0f",
                        color: "#fff",
                        height: 48,
                        borderRadius: 8,
                      }}
                    >
                      REQUEST ACCESS
                    </Button>
                  </Form>
                ),
              },
              {
                key: "login",
                label: "Login",
                children: (
                  <Form layout="vertical" onFinish={onLogin}>
                    <Form.Item
                      name="email"
                      rules={[
                        {
                          required: true,
                          message: "Enter email",
                        },
                      ]}
                    >
                      <Input
                        prefix={<MailOutlined />}
                        placeholder="Email"
                        size="large"
                      />
                    </Form.Item>

                    <Form.Item
                      name="password"
                      rules={[
                        {
                          required: true,
                          message: "Enter password",
                        },
                      ]}
                    >
                      <Input.Password
                        prefix={<LockOutlined />}
                        placeholder="Password"
                        size="large"
                      />
                    </Form.Item>

                    <Button
                      block
                      size="large"
                      htmlType="submit"
                      style={{
                        background: "#4b0f0f",
                        color: "#fff",
                        height: 48,
                        borderRadius: 8,
                      }}
                    >
                      LOG IN
                    </Button>
                  </Form>
                ),
              },
            ]}
          />
        </div>
      </div>
    </div>
  );
}