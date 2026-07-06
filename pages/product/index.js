import { useCallback, useEffect, useState,useRef } from "react";
import { Row, Col, Spin } from "antd";
import Navbar from "@/pages/components/Navbar";
import { apiRequest } from "@/src/utils/api";
import { useRouter } from "next/router";

export default function ProductPage() {
  const Router = useRouter();


  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubCategory, setSelectedSubCategory] =
    useState("Indoor");
 const [products, setProducts] = useState([]);

const [page, setPage] = useState(0);
const [hasMore, setHasMore] = useState(true);

const [loading, setLoading] = useState(true);
const [loadingMore, setLoadingMore] = useState(false);

  const subCategoryTabs = [
    { label: "Indoor", value: "Indoor" },
    { label: "Indoor / Outdoor", value: "Indoor/Outdoor" },
  ];

  /* ---------------- FETCH PRODUCTS ---------------- */

const fetchProducts = async (pageNo = 0, reset = false) => {
  try {
    if (pageNo === 0) {
      setLoading(true);
    } else {
      setLoadingMore(true);
    }

    const res = await apiRequest({
      endpoint: `/products?page=${pageNo}&size=10`,
      method: "GET",
    });

    if (res?.success) {
      const response = res.data;

      const newProducts = response.content || [];

      setProducts((prev) =>
        reset ? newProducts : [...prev, ...newProducts]
      );

      setHasMore(!response.last);

      if (reset) {
        const uniqueCategories = [
          ...new Set(
            newProducts.map((p) =>
              p.category?.toLowerCase()
            )
          ),
        ];

        setCategories(uniqueCategories);
        setSelectedCategory(uniqueCategories[0] || "");
      }
    }
  } catch (err) {
    console.error(err);
  } finally {
    setLoading(false);
    setLoadingMore(false);
  }
};
  useEffect(() => {
 fetchProducts(0, true);
  }, []);

  /* ---------------- FILTER PRODUCTS ---------------- */
  const filteredProducts = products.filter(
    (p) =>
      p.category?.toLowerCase() === selectedCategory &&
      (p?.subCategory || "").toLowerCase() ===
        selectedSubCategory.toLowerCase()
  );

  const observer = useRef();

const lastProductRef = useCallback(
  (node) => {
    if (loadingMore) return;

    if (observer.current) {
      observer.current.disconnect();
    }

    observer.current = new IntersectionObserver(
      (entries) => {
        if (
          entries[0].isIntersecting &&
          hasMore
        ) {
          const nextPage = page + 1;
          setPage(nextPage);
          fetchProducts(nextPage);
        }
      },
      {
        threshold: 0.2,
      }
    );

    if (node) {
      observer.current.observe(node);
    }
  },
  [page, hasMore, loadingMore]
);

  return (
    <>
      <Navbar />

      <div
        style={{
          minHeight: "100vh",
          padding: "100px 60px",
          background:
            "radial-gradient(circle at top left, #2a2a2a 0%, #111111 35%, #050505 70%, #000000 100%)",
        }}
      >
        {/* PREMIUM TOGGLE ONLY ADDED */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: 28,
          }}
        >
          <div
            style={{
              display: "flex",
              gap: 10,
              padding: 8,
              borderRadius: 16,
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.08)",
              backdropFilter: "blur(10px)",
            }}
          >
            {subCategoryTabs.map((tab) => {
              const active =
                selectedSubCategory === tab.value;

              return (
                <div
                  key={tab.value}
                  onClick={() =>
                    setSelectedSubCategory(tab.value)
                  }
                  style={{
                    padding: "14px 28px",
                    minWidth: 220,
                    textAlign: "center",
                    borderRadius: 12,
                    cursor: "pointer",
                    fontSize: 16,
                    fontWeight: 700,
                    transition: "all 0.3s ease",
                    color: active ? "#111" : "#f5f5dc",
                    background: active
                      ? "linear-gradient(135deg,#f5f5dc,#d8c8a5)"
                      : "transparent",
                    boxShadow: active
                      ? "0 8px 20px rgba(245,245,220,0.18)"
                      : "none",
                  }}
                >
                  {tab.label}
                </div>
              );
            })}
          </div>
        </div>

        <Row gutter={30}>
          {/* LEFT CATEGORY */}
          <Col span={4}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 12,
              }}
            >
              {categories.map((cat) => (
                <div
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  style={{
                    padding: "12px 16px",
                    cursor: "pointer",
                    background:
                      selectedCategory === cat
                        ? "rgba(245, 245, 220, 0.18)"
                        : "rgba(255,255,255,0.04)",
                    color: "#f5f5dc",
                    textTransform: "capitalize",
                    borderRadius: 10,
                    border:
                      selectedCategory === cat
                        ? "1px solid rgba(245,245,220,0.35)"
                        : "1px solid rgba(255,255,255,0.08)",
                    fontWeight: 500,
                    transition: "0.3s ease",
                  }}
                >
                  {cat}
                </div>
              ))}
            </div>
          </Col>

          {/* RIGHT PRODUCTS - SAME UI KEPT */}
          <Col span={20}>
            {loading ? (
              <div
                style={{
                  textAlign: "center",
                  paddingTop: 100,
                }}
              >
                <Spin size="large" />
              </div>
            ) : (
              <>
                <div
                  style={{
                    background:
                      "linear-gradient(90deg, #f5f5dc 0%, #d8c8a5 100%)",
                    color: "#111",
                    padding: "12px 22px",
                    marginBottom: 25,
                    fontWeight: 700,
                    borderRadius: 10,
                    boxShadow:
                      "0 8px 20px rgba(0,0,0,0.35)",
                  }}
                >
                  {filteredProducts.length} Items Found
                </div>

                <Row gutter={[30, 35]}>
                  {filteredProducts.map((item,index) => {
                    const images =
                      item?.defaultVariant?.images || [];

                    return (
                      <Col
                       ref={
        index === filteredProducts.length - 1
            ? lastProductRef
            : null
    }
                        key={item.id}
                        xs={24}
                        sm={12}
                        md={8}
                      >
                        <div
                          onClick={() =>
                            Router.push(
                              `/product-view?id=${item.id}`
                            )
                          }
                          style={{
                            background:
                              "linear-gradient(180deg, rgba(255,255,255,0.08), rgba(255,255,255,0.03))",
                            backdropFilter: "blur(10px)",
                            padding: 14,
                            cursor: "pointer",
                            borderRadius: 18,
                            border:
                              "1px solid rgba(245,245,220,0.12)",
                            boxShadow:
                              "0 10px 30px rgba(0,0,0,0.45)",
                            transition: "0.3s ease",
                          }}
                        >
                          <div
                            style={{
                              height: 300,
                              position: "relative",
                              overflow: "hidden",
                              borderRadius: 14,
                            }}
                          >
                            <img
                              src={
                                item?.defaultVariant
                                  ?.mainImageUrl
                              }
                              alt=""
                              style={{
                                width: "100%",
                                height: "100%",
                                objectFit: "cover",
                              }}
                            />

                            <div
                              style={{
                                position: "absolute",
                                bottom: 0,
                                width: "100%",
                                background:
                                  "rgba(0,0,0,0.55)",
                                color: "#f5f5dc",
                                textAlign: "center",
                                padding: 10,
                                fontWeight: 600,
                              }}
                            >
                              Quick View
                            </div>
                          </div>

                          <div
                            style={{
                              marginTop: 14,
                              color: "#f5f5dc",
                            }}
                          >
                            <div
                              style={{
                                fontSize: 12,
                                marginBottom: 5,
                              }}
                            >
                              <b
                                style={{
                                  color: "#ffffff",
                                }}
                              >
                                Article
                              </b>{" "}
                              {
                                item?.defaultVariant
                                  ?.article
                              }
                            </div>

                            <div
                              style={{
                                fontSize: 12,
                                marginBottom: 5,
                              }}
                            >
                              <b
                                style={{
                                  color: "#ffffff",
                                }}
                              >
                                Collection
                              </b>{" "}
                              {item?.collection}
                            </div>

                            <div
                              style={{
                                fontSize: 12,
                                color: "#d8c8a5",
                                marginTop: 8,
                              }}
                            >
                              BY MERAKI
                            </div>
                          </div>

                          {images.length > 0 && (
                            <div
                              style={{
                                marginTop: 16,
                                background:
                                  "rgba(245,245,220,0.08)",
                                padding: 12,
                                borderRadius: 12,
                              }}
                            >
                              <div
                                style={{
                                  fontSize: 11,
                                  fontWeight: 700,
                                  marginBottom: 10,
                                  color: "#ffffff",
                                }}
                              >
                                Also available colours in
                                this design
                              </div>

                              <div
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  gap: 8,
                                }}
                              >
                                {images
                                  .slice(0, 4)
                                  .map((img, index) => (
                                    <img
                                      key={index}
                                      src={img}
                                      alt=""
                                      style={{
                                        width: 34,
                                        height: 34,
                                        borderRadius:
                                          "50%",
                                        objectFit: "cover",
                                        border:
                                          "2px solid rgba(245,245,220,0.5)",
                                      }}
                                    />
                                  ))}

                                {images.length > 4 && (
                                  <span
                                    style={{
                                      fontSize: 12,
                                      color:
                                        "#f5f5dc",
                                      fontWeight: 600,
                                    }}
                                  >
                                    +
                                    {images.length -
                                      4}
                                  </span>
                                )}
                              </div>
                            </div>
                          )}
                        </div>
                      </Col>
                    );
                  })}
                </Row>
              </>
            )}
          </Col>
        </Row>
        {loadingMore && (
    <div
        style={{
            textAlign: "center",
            padding: 30,
        }}
    >
        <Spin />
    </div>
)}
      </div>
    </>
  );
}