import { useEffect, useState } from "react";
import { Row, Col, Spin, Empty } from "antd";
import Navbar from "@/pages/components/Navbar";
import { apiRequest } from "@/src/utils/api";
import { useRouter } from "next/router";

export default function ProductPage() {
  const router = useRouter();

  const [products, setProducts] = useState([]);
  const [selectedSubCategory, setSelectedSubCategory] = useState("Indoor");
  const [loading, setLoading] = useState(true);

  const subCategoryTabs = [
    { label: "Indoor", value: "Indoor" },
    { label: "Indoor / Outdoor", value: "Indoor/Outdoor" },
  ];

  /* ---------------- FETCH PRODUCTS ---------------- */
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await apiRequest({
          endpoint: "/products",
          method: "GET",
        });

        if (res?.success) {
          setProducts(res?.data?.content || []);
        }
      } catch (error) {
        console.error("PRODUCT ERROR:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  /* ---------------- FILTER PRODUCTS ---------------- */
  const filteredProducts = products.filter(
    (item) =>
      (item?.subCategory || "").toLowerCase() ===
      selectedSubCategory.toLowerCase()
  );

  return (
    <>
      <Navbar />

      <div
        style={{
          minHeight: "100vh",
          padding: "110px 55px 60px",
          background:
            "linear-gradient(135deg, #0f0f0f 0%, #151515 30%, #090909 100%)",
        }}
      >
        {/* PREMIUM TOP TABS */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: 45,
          }}
        >
          <div
            style={{
              display: "flex",
              gap: 14,
              padding: 10,
              borderRadius: 18,
              background: "rgba(255,255,255,0.04)",
              backdropFilter: "blur(14px)",
              border: "1px solid rgba(255,255,255,0.08)",
              boxShadow: "0 12px 35px rgba(0,0,0,0.35)",
            }}
          >
            {subCategoryTabs.map((tab) => {
              const active = selectedSubCategory === tab.value;

              return (
                <div
                  key={tab.value}
                  onClick={() => setSelectedSubCategory(tab.value)}
                  style={{
                    padding: "16px 34px",
                    minWidth: 220,
                    textAlign: "center",
                    borderRadius: 14,
                    cursor: "pointer",
                    fontSize: 17,
                    fontWeight: 700,
                    letterSpacing: 0.4,
                    transition: "all 0.3s ease",
                    color: active ? "#111" : "#f5f5dc",
                    background: active
                      ? "linear-gradient(135deg,#f5f5dc,#d8c8a5)"
                      : "transparent",
                    boxShadow: active
                      ? "0 8px 22px rgba(245,245,220,0.25)"
                      : "none",
                  }}
                >
                  {tab.label}
                </div>
              );
            })}
          </div>
        </div>

        {/* LOADER */}
        {loading ? (
          <div style={{ textAlign: "center", paddingTop: 120 }}>
            <Spin size="large" />
          </div>
        ) : filteredProducts.length === 0 ? (
          <div style={{ paddingTop: 100 }}>
            <Empty description="No Products Found" />
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
            {filteredProducts.map((item) => {
              const extraImages = item?.defaultVariant?.images || [];

              return (
                <div
                  key={item.id}
                  onClick={() =>
                    router.push(`/product-view?id=${item.id}`)
                  }
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1.4fr",
                    gap: 24,
                    padding: 24,
                    cursor: "pointer",
                    borderRadius: 24,
                    background:
                      "linear-gradient(180deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02))",
                    backdropFilter: "blur(14px)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    boxShadow: "0 18px 45px rgba(0,0,0,0.35)",
                    transition: "all 0.3s ease",
                  }}
                >
                  {/* LEFT SIDE - PRODUCT NAME */}
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      padding: "10px 10px 10px 5px",
                    }}
                  >
                    <div
                      style={{
                        fontSize: 14,
                        color: "#d8c8a5",
                        letterSpacing: 2,
                        marginBottom: 8,
                        textTransform: "uppercase",
                      }}
                    >
                      Meraki Collection
                    </div>

                    <div
                      style={{
                        fontSize: 38,
                        fontWeight: 800,
                        lineHeight: 1.1,
                        color: "#ffffff",
                        marginBottom: 14,
                      }}
                    >
                      {item?.collection || "Product"}
                    </div>

                    <div
                      style={{
                        fontSize: 16,
                        color: "#e6e6e6",
                        marginBottom: 8,
                      }}
                    >
                      Article:{" "}
                      <span style={{ color: "#f5f5dc" }}>
                        {item?.defaultVariant?.article || "-"}
                      </span>
                    </div>

                    <div
                      style={{
                        fontSize: 15,
                        color: "#bdbdbd",
                        marginBottom: 18,
                      }}
                    >
                      Category: {item?.category || "-"}
                    </div>

                    <div
                      style={{
                        display: "inline-block",
                        width: "fit-content",
                        padding: "10px 18px",
                        borderRadius: 30,
                        background:
                          "linear-gradient(135deg,#f5f5dc,#d8c8a5)",
                        color: "#111",
                        fontWeight: 700,
                        fontSize: 14,
                      }}
                    >
                      View Product
                    </div>
                  </div>

                  {/* RIGHT SIDE - IMAGES */}
                  <div>
                    {/* Main Image */}
                    <div
                      style={{
                        height: 360,
                        overflow: "hidden",
                        borderRadius: 18,
                        marginBottom: 14,
                      }}
                    >
                      <img
                        src={item?.defaultVariant?.mainImageUrl}
                        alt=""
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                      />
                    </div>

                    {/* Small Images */}
                    {extraImages.length > 0 && (
                      <div
                        style={{
                          display: "grid",
                          gridTemplateColumns: "repeat(4,1fr)",
                          gap: 10,
                        }}
                      >
                        {extraImages.slice(0, 4).map((img, index) => (
                          <div
                            key={index}
                            style={{
                              height: 78,
                              borderRadius: 12,
                              overflow: "hidden",
                              border:
                                "1px solid rgba(255,255,255,0.08)",
                            }}
                          >
                            <img
                              src={img}
                              alt=""
                              style={{
                                width: "100%",
                                height: "100%",
                                objectFit: "cover",
                              }}
                            />
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
}