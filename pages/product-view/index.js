import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { Row, Col, Spin, Tabs, message } from "antd";
import {
  Waves,
  FlaskConical,
  Wind,
  Shirt,
  CircleDot,
  Sofa,
  Armchair,
  BedDouble,
} from "lucide-react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import Navbar from "@/pages/components/Navbar";
import { apiRequest } from "@/src/utils/api";

export default function ProductView() {
  const router = useRouter();
  const { id } = router.query;

  const sheetRef = useRef(null);

  const [product, setProduct] = useState(null);
  const [variants, setVariants] = useState([]);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sampleLoading, setSampleLoading] = useState(false);
  const [downloadLoading, setDownloadLoading] = useState(false);

  useEffect(() => {
    if (!id) return;

    const fetchProduct = async () => {
      try {
        const res = await apiRequest({
          endpoint: `/products/${id}`,
          method: "GET",
        });

        if (res?.success) {
          setProduct(res?.data?.product);
          setVariants(res?.data?.variants || []);
        }
      } catch (error) {
        console.error("PRODUCT VIEW ERROR:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <>
        <Navbar />
        <div
          style={{
            minHeight: "100vh",
            background:
              "radial-gradient(circle at top left, #2c2c2c 0%, #111 40%, #050505 100%)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Spin size="large" />
        </div>
      </>
    );
  }

  if (!product) return null;

  const activeVariant = selectedVariant || product?.defaultVariant;

const handleSampleRequest = async () => {
  try {
    setSampleLoading(true);

    const token = localStorage.getItem("token");

    if (!token) {
      message.error("Please login first");
      return;
    }

    const payload = {
      productId: product?.id,
      variantId: activeVariant?.id || null,
    };

    const res = await apiRequest({
      endpoint: "/sample-requests",
      method: "POST",
      body: payload,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (res?.success) {
      message.success(res?.message || "Sample request sent successfully");
    } else {
      message.error(res?.message || "Failed to send sample request");
    }
  } catch (error) {
    console.error("SAMPLE REQUEST ERROR:", error);
    message.error("Something went wrong");
  } finally {
    setSampleLoading(false);
  }
};

  const handleDownloadSheet = async () => {
    try {
      setDownloadLoading(true);

      const canvas = await html2canvas(sheetRef.current, {
        scale: 2,
        useCORS: true,
        backgroundColor: "#ececec",
      });

      const imgData = canvas.toDataURL("image/png");

      const pdf = new jsPDF("p", "mm", "a4");
      pdf.addImage(imgData, "PNG", 0, 0, 210, 297);
      pdf.save(`${product?.collection || "specification-sheet"}.pdf`);
    } catch (error) {
      message.error("Failed to download sheet");
    } finally {
      setDownloadLoading(false);
    }
  };

  const careIcons = {
    wash: { icon: <Waves size={22} />, label: "WASH" },
    bleach: { icon: <FlaskConical size={22} />, label: "BLEACH" },
    dry: { icon: <Wind size={22} />, label: "DRY" },
    iron: { icon: <Shirt size={22} />, label: "IRON" },
    dryClean: { icon: <CircleDot size={22} />, label: "DRYCLEAN" },
  };

  const careInstructionView = (
    <div
      style={{
        display: "flex",
        gap: 18,
        flexWrap: "wrap",
        alignItems: "center",
      }}
    >
      {Object.keys(product?.specification?.careInstructions || {})
        .filter((key) => product?.specification?.careInstructions?.[key])
        .map((key) => (
          <div
            key={key}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 4,
              minWidth: 48,
              color: "#f5e6c8",
            }}
          >
            {careIcons[key]?.icon}
            <span style={{ fontSize: 10 }}>{careIcons[key]?.label}</span>
          </div>
        ))}
    </div>
  );

const usageView =
  product?.specification?.usage &&
  typeof product.specification.usage === "object" ? (
    <div
      style={{
        display: "flex",
        gap: 18,
        flexWrap: "wrap",
        alignItems: "center",
      }}
    >
      {Object.keys(product.specification.usage)
        .filter((key) => product.specification.usage[key] === true)
        .map((key) => {
          const usageItem = usageIcons[key];

          if (!usageItem) return null;

          return (
            <div
              key={key}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 4,
                minWidth: 48,
                color: "#f5e6c8",
              }}
            >
              {usageItem.icon}

              <span style={{ fontSize: 10 }}>
                {usageItem.label}
              </span>
            </div>
          );
        })}
    </div>
  ) : null;

const rows = [
  ["Width (cm)", product?.specification?.width],
  ["Composition", product?.specification?.composition],
  ["Weight", product?.specification?.weight],
  ["Vertical Repeat", product?.specification?.repeat?.vertical],
  ["Horizontal Repeat", product?.specification?.repeat?.horizontal],
  ["Fire retardant", product?.specification?.flameRetardancy],
  ["Martindale", product?.specification?.martindale],

  ["Care Instructions", careInstructionView],

  product?.specification?.usage
    ? ["Usage", usageView]
    : null,

  ["Pilling", product?.specification?.pilling],
  ["Water Repellent", product?.specification?.waterRepellent],
  ["Attention", product?.specification?.attention],
].filter(
  (item) =>
    Array.isArray(item) &&
    item.length === 2 &&
    item[1] !== null &&
    item[1] !== undefined &&
    item[1] !== ""
);

  const borderColor = "rgba(245,230,200,0.25)";
  const textPrimary = "#f5e6c8";
  const textSecondary = "#d8cbb3";
  const panelBg = "rgba(255,255,255,0.03)";

  return (
    <>
      <Navbar />

      <div
        style={{
          padding: "180px 70px 80px",
          minHeight: "100vh",
          background:
            "radial-gradient(circle at top left, #2c2c2c 0%, #111 40%, #050505 100%)",
        }}
      >
        <Row gutter={50}>
          {/* LEFT THUMBNAILS */}
          <Col span={3}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 15,
              }}
            >
              {[activeVariant?.mainImageUrl, ...(activeVariant?.images || [])]
                .filter(Boolean)
                .map((img, i) => (
                  <img
                    key={i}
                    src={img}
                    alt=""
                    onClick={() =>
                      setSelectedVariant({
                        ...activeVariant,
                        mainImageUrl: img,
                      })
                    }
                    style={{
                      width: "100%",
                      height: 82,
                      objectFit: "cover",
                      border: `1px solid ${borderColor}`,
                      background: panelBg,
                      cursor: "pointer",
                    }}
                  />
                ))}
            </div>
          </Col>

          {/* MAIN IMAGE */}
          <Col span={11}>
            <div
              style={{
                background: panelBg,
                padding: 20,
                border: `1px solid ${borderColor}`,
                borderRadius: 10,
              }}
            >
              <img
                src={activeVariant?.mainImageUrl}
                alt=""
                style={{
                  width: "100%",
                  height: 560,
                  objectFit: "cover",
                }}
              />
            </div>
          </Col>

          {/* RIGHT DETAILS */}
          <Col span={10}>
            <div style={{ paddingLeft: 10 }}>
              <h1
                style={{
                  fontSize: 42,
                  fontWeight: 400,
                  marginBottom: 8,
                  fontFamily: "serif",
                  color: textPrimary,
                }}
              >
                {product?.collection}
              </h1>

              <div
                style={{
                  fontSize: 15,
                  color: textSecondary,
                  marginBottom: 20,
                }}
              >
                {activeVariant?.article}
              </div>

              <div
                style={{
                  borderBottom: `1px solid ${borderColor}`,
                  marginBottom: 25,
                }}
              />

              {/* COLORS */}
              <div style={{ marginBottom: 25 }}>
                <div
                  style={{
                    fontSize: 13,
                    marginBottom: 10,
                    color: textSecondary,
                  }}
                >
                  col. {activeVariant?.color}
                </div>

                <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                  {[product?.defaultVariant, ...variants]
                    .filter(Boolean)
                    .map((variant, i) => (
                      <img
                        key={i}
                        src={variant?.mainImageUrl}
                        alt=""
                        onClick={() => setSelectedVariant(variant)}
                        style={{
                          width: 54,
                          height: 54,
                          objectFit: "cover",
                          border:
                            activeVariant?.mainImageUrl ===
                            variant?.mainImageUrl
                              ? `2px solid ${textPrimary}`
                              : `1px solid ${borderColor}`,
                          background: panelBg,
                          cursor: "pointer",
                        }}
                      />
                    ))}
                </div>
              </div>

              {/* TABS */}
              <Tabs
                defaultActiveKey="1"
                tabBarStyle={{
                  borderBottom: `1px solid ${borderColor}`,
                  color: textPrimary,
                }}
                items={[
                  {
                    key: "1",
                    label: (
                      <span style={{ color: textPrimary }}>More info</span>
                    ),
                    children: (
                      <div style={{ marginTop: 12 }}>
                        <div
                          style={{
                            border: `1px solid ${borderColor}`,
                            background: panelBg,
                            borderRadius: 8,
                            overflow: "hidden",
                          }}
                        >
                          {rows.map(([label, value], index) => (
                            <div
                              key={index}
                              style={{
                                display: "grid",
                                gridTemplateColumns: "42% 58%",
                                minHeight: 58,
                                borderBottom:
                                  index !== rows.length - 1
                                    ? `1px solid ${borderColor}`
                                    : "none",
                                alignItems: "center",
                                fontSize: 16,
                                color: textPrimary,
                              }}
                            >
                              <div
                                style={{
                                  padding: "14px",
                                  borderRight: `1px solid ${borderColor}`,
                                  color: "#fff8ee",
                                }}
                              >
                                {label}
                              </div>

                              <div
                                style={{
                                  padding: "14px",
                                  lineHeight: 1.4,
                                  color: textSecondary,
                                }}
                              >
                                {value}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ),
                  },
                  {
                    key: "2",
                    label: <span style={{ color: textPrimary }}>Images</span>,
                    children: (
                      <div
                        style={{
                          display: "flex",
                          gap: 12,
                          marginTop: 14,
                          flexWrap: "wrap",
                        }}
                      >
                        {[
                          activeVariant?.mainImageUrl,
                          ...(activeVariant?.images || []),
                        ]
                          .filter(Boolean)
                          .map((img, i) => (
                            <img
                              key={i}
                              src={img}
                              alt=""
                              onClick={() =>
                                setSelectedVariant({
                                  ...activeVariant,
                                  mainImageUrl: img,
                                })
                              }
                              style={{
                                width: 90,
                                height: 90,
                                objectFit: "cover",
                                border: `1px solid ${borderColor}`,
                                cursor: "pointer",
                              }}
                            />
                          ))}
                      </div>
                    ),
                  },
                ]}
              />

              {/* BUTTONS */}
              <div
                style={{
                  marginTop: 30,
                  display: "flex",
                  flexDirection: "column",
                  gap: 12,
                }}
              >
                <button
                  onClick={handleDownloadSheet}
                  disabled={downloadLoading}
                  style={{
                    width: "100%",
                    padding: "15px",
                    background: textPrimary,
                    color: "#111",
                    border: "none",
                    cursor: "pointer",
                    fontSize: 14,
                    letterSpacing: 1,
                    fontWeight: 600,
                    borderRadius: 6,
                  }}
                >
                  {downloadLoading
                    ? "DOWNLOADING..."
                    : "DOWNLOAD SPECIFICATION SHEET"}
                </button>

                <button
                  onClick={handleSampleRequest}
                  disabled={sampleLoading}
                  style={{
                    width: "100%",
                    padding: "15px",
                    background: "transparent",
                    color: textPrimary,
                    border: `1px solid ${textPrimary}`,
                    cursor: "pointer",
                    letterSpacing: 1,
                    fontSize: 14,
                    borderRadius: 6,
                  }}
                >
                  {sampleLoading ? "SENDING..." : "REQUEST A SAMPLE"}
                </button>
              </div>
            </div>
          </Col>
        </Row>
      </div>

      {/* PDF TEMPLATE (UNCHANGED LIGHT THEME) */}
      <div
        style={{
          position: "fixed",
          left: "-9999px",
          top: 0,
          width: 794,
          background: "#ececec",
          padding: 25,
        }}
      >
        <div
          ref={sheetRef}
          style={{
            width: "100%",
            minHeight: 1123,
            background: "#ececec",
            padding: 20,
            boxSizing: "border-box",
          }}
        >
          <div style={{ textAlign: "center", paddingTop: 10 }}>
            <img
              src="/logo.png"
              alt="logo"
              style={{ height: 55, objectFit: "contain" }}
            />
          </div>

          <div
            style={{
              borderBottom: "1px solid #999",
              margin: "20px 0 30px",
            }}
          />

          <h1
            style={{
              fontSize: 22,
              marginBottom: 20,
              fontWeight: 600,
            }}
          >
            Specification sheet
          </h1>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "52% 48%",
              gap: 18,
            }}
          >
            <div
              style={{
                border: "1px solid #777",
                background: "#ececec",
              }}
            >
              {rows.map(([label, value], index) => (
                <div
                  key={index}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "42% 58%",
                    minHeight: 46,
                    borderBottom:
                      index !== rows.length - 1 ? "1px solid #777" : "none",
                    alignItems: "center",
                    fontSize: 13,
                  }}
                >
                  <div
                    style={{
                      padding: "10px",
                      borderRight: "1px solid #777",
                    }}
                  >
                    {label}
                  </div>

                  <div style={{ padding: "10px", lineHeight: 1.4 }}>
                    {value}
                  </div>
                </div>
              ))}
            </div>

            <div>
              <div style={{ marginBottom: 12, fontSize: 14 }}>
                <div style={{ display: "flex", gap: 8 }}>
                  <span>Article</span>
                  <strong>{activeVariant?.article}</strong>
                </div>

                <div style={{ display: "flex", gap: 8 }}>
                  <span>Collection</span>
                  <strong>{product?.collection}</strong>
                </div>
              </div>

              <img
                src={activeVariant?.mainImageUrl}
                alt=""
                style={{
                  width: "100%",
                  height: 380,
                  objectFit: "cover",
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}