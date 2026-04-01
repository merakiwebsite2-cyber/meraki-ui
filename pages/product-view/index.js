import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Row, Col, Spin, Tabs } from "antd";
import Navbar from "@/src/components/Navbar";
import { apiRequest } from "@/src/utils/api";

export default function ProductView() {
  const router = useRouter();
  const { id } = router.query;

  const [product, setProduct] = useState(null);
  const [variants, setVariants] = useState([]);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [loading, setLoading] = useState(true);

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
      } catch (err) {
        console.error("PRODUCT VIEW ERROR:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) return <Spin size="large" />;

  // ✅ ACTIVE VARIANT
  const activeVariant = selectedVariant || product?.defaultVariant;

  return (
    <>
      <Navbar />

      <div style={{ padding: "190px 80px", background: "#f5f5f3" }}>
        <Row gutter={50}>
          
          {/* LEFT THUMBNAILS */}
          <Col span={3}>
            <div style={{ display: "flex", flexDirection: "column", gap: 15 }}>
              {[
                activeVariant?.mainImageUrl,
                ...(activeVariant?.images || []),
              ].map((img, i) => (
                <img
                  key={i}
                  src={img}
                  onClick={() =>
                    setSelectedVariant({
                      ...activeVariant,
                      mainImageUrl: img,
                    })
                  }
                  style={{
                    width: "100%",
                    height: 80,
                    objectFit: "cover",
                    border: "1px solid #ddd",
                    cursor: "pointer",
                  }}
                />
              ))}
            </div>
          </Col>

          {/* CENTER IMAGE */}
          <Col span={11}>
            <div style={{ background: "#fff", padding: 20 }}>
              <img
                src={activeVariant?.mainImageUrl}
                style={{
                  width: "100%",
                  height: 500,
                  objectFit: "cover",
                }}
              />
            </div>
          </Col>

          {/* RIGHT SIDE */}
          <Col span={10}>
            <div style={{ paddingLeft: 20 }}>
              
              {/* TITLE */}
              <h1
                style={{
                  fontSize: 40,
                  fontWeight: 400,
                  fontFamily: "serif",
                  marginBottom: 5,
                }}
              >
                {product?.collection}
              </h1>

              {/* ARTICLE */}
              <div style={{ color: "#444", marginBottom: 15 }}>
                {activeVariant?.article}
              </div>

              {/* DIVIDER */}
              <div style={{ borderBottom: "1px solid #ddd", margin: "20px 0" }} />

              {/* COLOR */}
              <div style={{ marginBottom: 20 }}>
                <div style={{ fontSize: 12, marginBottom: 10 }}>
                  col. {activeVariant?.color}
                </div>

                <div style={{ display: "flex", gap: 10 }}>
                  {[product?.defaultVariant, ...variants]?.map((v, i) => (
                    <img
                      key={i}
                      src={v?.mainImageUrl}
                      onClick={() => setSelectedVariant(v)}
                      style={{
                        width: 50,
                        height: 50,
                        objectFit: "cover",
                        border:
                          activeVariant?.mainImageUrl === v?.mainImageUrl
                            ? "2px solid black"
                            : "1px solid #ccc",
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
                  borderBottom: "1px solid #ddd",
                  fontWeight: 400,
                }}
                items={[
                  {
                    key: "1",
                    label: "More info",
                    children: (
                      <div style={{ paddingTop: 10 }}>
                        <div
                          style={{
                            border: "1px solid #ddd",
                            fontSize: 13,
                          }}
                        >
                          {[
                            ["Width (cm)", "140"],
                            ["Composition", "65 WM - 35 CO"],
                            ["Weight", "1180"],
                            ["Fire retardant", "YES"],
                          ].map(([label, value], index) => (
                            <div
                              key={index}
                              style={{
                                display: "grid",
                                gridTemplateColumns: "40% 60%",
                                padding: "10px 12px",
                                borderBottom: "1px solid #eee",
                              }}
                            >
                              <div style={{ color: "#777" }}>{label}</div>
                              <div>{value}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ),
                  },
                  {
                    key: "2",
                    label: "Images",
                    children: (
                      <div style={{ display: "flex", gap: 10, marginTop: 10 }}>
                        {activeVariant?.images?.map((img, i) => (
                          <img
                            key={i}
                            src={img}
                            style={{
                              width: 80,
                              height: 80,
                              objectFit: "cover",
                              cursor: "pointer",
                            }}
                            onClick={() =>
                              setSelectedVariant({
                                ...activeVariant,
                                mainImageUrl: img,
                              })
                            }
                          />
                        ))}
                      </div>
                    ),
                  },
                ]}
              />

              {/* BUTTON */}
              <button
                style={{
                  marginTop: 30,
                  width: "100%",
                  padding: "14px",
                  background: "#000",
                  color: "#fff",
                  border: "none",
                  cursor: "pointer",
                  letterSpacing: 1,
                }}
              >
                REQUEST A SAMPLE
              </button>
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
}