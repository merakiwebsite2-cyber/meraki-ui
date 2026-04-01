import { useEffect, useState } from "react";
import { Row, Col, Spin } from "antd";
import Navbar from "@/src/components/Navbar";
import { apiRequest } from "@/src/utils/api";
import { useRouter } from "next/router";

export default function ProductPage() {
    const Router= useRouter();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [loading, setLoading] = useState(true);

  /* ---------------- FETCH PRODUCTS ---------------- */
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await apiRequest({
          endpoint: "/products",
          method: "GET",
        });

        if (res?.success) {
          const list = res?.data?.content || [];

          setProducts(list);

          // ✅ Extract unique categories
          const uniqueCategories = [
            ...new Set(list.map((p) => p.category?.toLowerCase())),
          ];

          setCategories(uniqueCategories);

          // ✅ Default select first category
          setSelectedCategory(uniqueCategories[0] || "");
        }
      } catch (err) {
        console.error("PRODUCT ERROR:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  /* ---------------- FILTER PRODUCTS ---------------- */
  const filteredProducts = products.filter(
    (p) => p.category?.toLowerCase() === selectedCategory
  );

  return (
    <>
      <Navbar />

      <div style={{ padding: "100px 60px", background: "#f5f5f5" }}>
        <Row gutter={30}>
          {/* 🔥 LEFT - DYNAMIC CATEGORY */}
          <Col span={4}>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {categories.map((cat) => (
                <div
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  style={{
                    padding: "10px 15px",
                    cursor: "pointer",
                    background:
                      selectedCategory === cat ? "#e5e5e5" : "transparent",
                    textTransform: "capitalize",
                  }}
                >
                  {cat}
                </div>
              ))}
            </div>
          </Col>

          {/* 🔥 RIGHT - PRODUCTS BASED ON CATEGORY */}
          <Col span={20}>
            {loading ? (
              <Spin size="large" />
            ) : (
              <>
                {/* TOP BAR */}
                <div
                  style={{
                    background: "#3b0a0a",
                    color: "#fff",
                    padding: "10px 20px",
                    marginBottom: 20,
                    fontWeight: 500,
                  }}
                >
                  {filteredProducts.length} Items
                </div>

                <Row gutter={[30, 40]}>
                  {filteredProducts.map((item) => (
                    <Col key={item.id} xs={24} sm={12} md={8}>
                    <div
  style={{
    background: "#fff",
    padding: 10,
    cursor: "pointer" // 👈 add this
  }}
  onClick={() => Router.push(`/product-view?id=${item.id}`)} // 👈 IMPORTANT
>
                        {/* IMAGE */}
                        <div
                          style={{
                            height: 300,
                            position: "relative",
                            overflow: "hidden",
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

                          {/* QUICK VIEW */}
                          <div
                            style={{
                              position: "absolute",
                              bottom: 0,
                              width: "100%",
                              background: "rgba(255,255,255,0.8)",
                              textAlign: "center",
                              padding: 8,
                            }}
                          >
                            Quick View
                          </div>
                        </div>

                        {/* DETAILS */}
                        <div style={{ marginTop: 10 }}>
                          <div style={{ fontSize: 12 }}>
                            <b>Article</b>{" "}
                            {item?.defaultVariant?.article || "-"}
                          </div>

                          <div style={{ fontSize: 12 }}>
                            <b>Collection</b> {item?.collection || "-"}
                          </div>

                          <div
                            style={{
                              fontSize: 12,
                              marginTop: 5,
                              color: "#777",
                            }}
                          >
                            BY MERAKI
                          </div>
                        </div>
                      </div>
                    </Col>
                  ))}
                </Row>
              </>
            )}
          </Col>
        </Row>
      </div>
    </>
  );
}