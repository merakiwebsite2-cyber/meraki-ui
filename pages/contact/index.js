"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import emailjs from "@emailjs/browser";
import Navbar from "../components/Navbar";

export default function ContactUs() {
  const [isMobile, setIsMobile] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    product: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const [status, setStatus] = useState({
    type: "",
    message: "",
  });

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setStatus({
      type: "",
      message: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    setStatus({
      type: "",
      message: "",
    });

    try {
      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
        formData,
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
      );

      setStatus({
        type: "success",
        message: "Thank you! We will get back to you shortly.",
      });

      setFormData({
        name: "",
        company: "",
        email: "",
        phone: "",
        product: "",
        message: "",
      });
    } catch (error) {
      console.error("EmailJS Error:", error);

      setStatus({
        type: "error",
        message: "Unable to send your message. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = {
    width: "100%",
    height: "46px",
    boxSizing: "border-box",
    border: "1px solid #ded8d0",
    borderRadius: "7px",
    background: "#fff",
    padding: "0 13px",
    fontSize: "12px",
    color: "#342b24",
    outline: "none",
    fontFamily: "Arial, sans-serif",
    transition: "all 0.3s ease",
  };

  const labelStyle = {
    display: "block",
    marginBottom: "7px",
    fontSize: "10px",
    fontWeight: "600",
    color: "#342b24",
    letterSpacing: "0.1px",
  };

  const productCircleStyle = {
    width: isMobile ? "100px" : "115px",
    height: isMobile ? "100px" : "115px",
    borderRadius: "50%",
    overflow: "hidden",
    position: "relative",
    border: "3px solid rgba(255,255,255,0.9)",
    boxShadow: "0 8px 25px rgba(60,45,30,0.18)",
    background: "#ddd",
  };

  return (
    <>
    <Navbar/>
    <section
      style={{
        position: "relative",
        width: "100%",
        minHeight: "100vh",
        overflow: "hidden",
        background:
          "linear-gradient(110deg, #f7f5f1 0%, #eee9e1 48%, #d6c9b8 100%)",
        fontFamily: "Arial, Helvetica, sans-serif",
        boxSizing: "border-box",
        padding: isMobile ? "30px 16px" : "45px 35px",
      }}
    >
      {/* BACKGROUND DECORATION */}

      <motion.div
        animate={{
          y: [0, -15, 0],
          opacity: [0.35, 0.55, 0.35],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{
          position: "absolute",
          width: "280px",
          height: "280px",
          borderRadius: "50%",
          background: "rgba(154,117,78,0.12)",
          filter: "blur(40px)",
          top: "-100px",
          left: "-100px",
          pointerEvents: "none",
        }}
      />

      <motion.div
        animate={{
          y: [0, 20, 0],
          opacity: [0.25, 0.45, 0.25],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{
          position: "absolute",
          width: "350px",
          height: "350px",
          borderRadius: "50%",
          background: "rgba(120,85,50,0.1)",
          filter: "blur(45px)",
          right: "-160px",
          bottom: "-150px",
          pointerEvents: "none",
        }}
      />

      {/* MAIN CONTAINER */}

      <div
        style={{
          position: "relative",
          zIndex: 2,
          maxWidth: "1250px",
          width: "100%",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: isMobile
            ? "1fr"
            : "0.92fr 1.08fr",
          gap: isMobile ? "40px" : "45px",
          alignItems: "center",
        }}
      >
        {/* ================================
            LEFT SIDE
        ================================= */}

        <motion.div
          initial={{
            opacity: 0,
            x: -60,
          }}
          whileInView={{
            opacity: 1,
            x: 0,
          }}
          viewport={{
            once: true,
            amount: 0.2,
          }}
          transition={{
            duration: 0.9,
            ease: "easeOut",
          }}
          style={{
            position: "relative",
            minHeight: isMobile ? "auto" : "620px",
            padding: isMobile ? "10px 5px" : "15px 10px",
          }}
        >
          {/* LOGO */}

          <motion.img
            src="/spreadsheet.png"
            alt="Meraki Fabric Solutions"
            initial={{
              opacity: 0,
              y: -20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.8,
            }}
            style={{
              width: isMobile ? "155px" : "190px",
              height: "auto",
              objectFit: "contain",
              marginBottom: isMobile ? "30px" : "45px",
            }}
          />

          {/* HEADING */}

          <motion.div
            initial={{
              opacity: 0,
              y: 25,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              delay: 0.15,
              duration: 0.7,
            }}
          >
            <div
              style={{
                fontSize: "10px",
                letterSpacing: "3px",
                color: "#856542",
                fontWeight: "600",
                marginBottom: "14px",
              }}
            >
              GET IN TOUCH
            </div>

            <h1
              style={{
                margin: 0,
                maxWidth: "460px",
                fontFamily:
                  "Georgia, 'Times New Roman', serif",
                fontWeight: "400",
                fontSize: isMobile
                  ? "42px"
                  : "56px",
                lineHeight: "1.02",
                letterSpacing: "-1.5px",
                color: "#171512",
              }}
            >
              Let's Create
              <br />
              Beautiful Spaces
              <br />

              <span
                style={{
                  color: "#765638",
                  fontStyle: "italic",
                }}
              >
                Together
              </span>
            </h1>

            <p
              style={{
                maxWidth: "390px",
                marginTop: "22px",
                marginBottom: "30px",
                color: "#625c55",
                fontSize: "13px",
                lineHeight: "1.7",
              }}
            >
              Get in touch with us for your curtain,
              upholstery, and mat fabric requirements.
              Our team is here to help you with the
              perfect fabric solutions.
            </p>
          </motion.div>

          {/* PRODUCT CIRCLES */}

          {!isMobile && (
            <div
              style={{
                position: "absolute",
                right: "-15px",
                top: "80px",
                display: "flex",
                flexDirection: "column",
                gap: "15px",
                alignItems: "center",
              }}
            >
              {/* CURTAINS */}

              <motion.div
                whileHover={{
                  scale: 1.08,
                  rotate: 3,
                }}
                animate={{
                  y: [0, -5, 0],
                }}
                transition={{
                  y: {
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  },
                }}
                style={{
                  position: "relative",
                }}
              >
                <div style={productCircleStyle}>
                  <img
                    src="/curtain.png"
                    alt="Curtains"
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
                      left: 0,
                      right: 0,
                      padding: "8px",
                      textAlign: "center",
                      background:
                        "rgba(255,255,255,0.8)",
                      fontSize: "8px",
                      letterSpacing: "1.5px",
                      color: "#3d3329",
                    }}
                  >
                    CURTAINS
                  </div>
                </div>
              </motion.div>

              {/* UPHOLSTERY */}

              <motion.div
                whileHover={{
                  scale: 1.08,
                  rotate: -3,
                }}
                animate={{
                  y: [0, 5, 0],
                }}
                transition={{
                  y: {
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  },
                }}
              >
                <div style={productCircleStyle}>
                  <img
                    src="/uphoistry.png"
                    alt="Upholstery"
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
                      left: 0,
                      right: 0,
                      padding: "8px",
                      textAlign: "center",
                      background:
                        "rgba(255,255,255,0.8)",
                      fontSize: "8px",
                      letterSpacing: "1.5px",
                      color: "#3d3329",
                    }}
                  >
                    UPHOLSTERY
                  </div>
                </div>
              </motion.div>

              {/* MATS */}

              <motion.div
                whileHover={{
                  scale: 1.08,
                  rotate: 3,
                }}
                animate={{
                  y: [0, -4, 0],
                }}
                transition={{
                  y: {
                    duration: 4.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  },
                }}
              >
                <div style={productCircleStyle}>
                  <img
                    src="/rugs.png"
                    alt="Mats"
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
                      left: 0,
                      right: 0,
                      padding: "8px",
                      textAlign: "center",
                      background:
                        "rgba(255,255,255,0.8)",
                      fontSize: "8px",
                      letterSpacing: "1.5px",
                      color: "#3d3329",
                    }}
                  >
                    RUGS
                  </div>
                </div>
              </motion.div>
            </div>
          )}

          {/* CONTACT DETAILS */}

          <motion.div
            initial={{
              opacity: 0,
              y: 20,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              delay: 0.4,
              duration: 0.7,
            }}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "16px",
              marginTop: "35px",
            }}
          >
            <ContactDetail
              icon="☎"
              text="+971 4 123 4567"
            />

            <ContactDetail
              icon="✉"
              text="info@meraki-interiors.ae"
            />

            <ContactDetail
              icon="●"
              text="Dubai, UAE"
            />

            <ContactDetail
              icon="◷"
              text={
                <>
                  Mon - Sat
                  <br />
                  9:00 AM - 6:00 PM
                </>
              }
            />
          </motion.div>

          {/* TAGLINE */}

          <div
            style={{
              marginTop: "35px",
              paddingTop: "18px",
              borderTop: "1px solid rgba(100,80,60,0.25)",
              maxWidth: "350px",
              fontFamily:
                "Georgia, 'Times New Roman', serif",
              color: "#80664c",
              fontSize: "15px",
              fontStyle: "italic",
            }}
          >
            Fabrics for Better Interiors.
          </div>
        </motion.div>

        {/* ================================
            RIGHT FORM
        ================================= */}

        <motion.div
          initial={{
            opacity: 0,
            x: 70,
            scale: 0.97,
          }}
          whileInView={{
            opacity: 1,
            x: 0,
            scale: 1,
          }}
          viewport={{
            once: true,
            amount: 0.2,
          }}
          transition={{
            duration: 0.9,
            ease: "easeOut",
          }}
          style={{
            width: "100%",
            boxSizing: "border-box",
            padding: isMobile
              ? "28px 20px"
              : "34px 38px",
            borderRadius: "12px",
            background:
              "rgba(255,255,255,0.95)",
            boxShadow:
              "0 25px 70px rgba(70,50,30,0.16)",
            border:
              "1px solid rgba(255,255,255,0.8)",
          }}
        >
          {/* FORM HEADER */}

          <div
            style={{
              marginBottom: "24px",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                color: "#856542",
                fontSize: "9px",
                letterSpacing: "2.5px",
                fontWeight: "600",
              }}
            >
              GET IN TOUCH

              <span
                style={{
                  width: "32px",
                  height: "1px",
                  background: "#856542",
                }}
              />
            </div>

            <h2
              style={{
                margin: "12px 0 6px",
                fontFamily:
                  "Georgia, 'Times New Roman', serif",
                fontWeight: "400",
                fontSize: isMobile
                  ? "36px"
                  : "42px",
                lineHeight: "1.1",
                color: "#1e1a17",
              }}
            >
              Contact Us
            </h2>

            <p
              style={{
                margin: 0,
                color: "#77716b",
                fontSize: "11px",
              }}
            >
              Fill in the details below and we'll get
              back to you shortly.
            </p>
          </div>

          {/* FORM */}

          <form onSubmit={handleSubmit}>
            {/* ROW 1 */}

            <div
              style={{
                display: "grid",
                gridTemplateColumns: isMobile
                  ? "1fr"
                  : "1fr 1fr",
                gap: "14px",
              }}
            >
              <FormField
                label="Full Name"
                name="name"
                type="text"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={handleChange}
                required
              />

              <FormField
                label="Company Name"
                name="company"
                type="text"
                placeholder="Enter your company name"
                value={formData.company}
                onChange={handleChange}
              />
            </div>

            {/* ROW 2 */}

            <div
              style={{
                display: "grid",
                gridTemplateColumns: isMobile
                  ? "1fr"
                  : "1fr 1fr",
                gap: "14px",
              }}
            >
              <FormField
                label="Email Address"
                name="email"
                type="email"
                placeholder="Enter your email address"
                value={formData.email}
                onChange={handleChange}
                required
              />

              <FormField
                label="Phone Number"
                name="phone"
                type="tel"
                placeholder="Enter your phone number"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>

            {/* PRODUCT */}

            <div
              style={{
                marginBottom: "14px",
              }}
            >
              <label
                style={{
                  display: "block",
                  marginBottom: "7px",
                  fontSize: "10px",
                  fontWeight: "600",
                  color: "#342b24",
                }}
              >
                Product Interest *
              </label>

              <select
                name="product"
                value={formData.product}
                onChange={handleChange}
                required
                style={{
                  width: "100%",
                  height: "46px",
                  boxSizing: "border-box",
                  border:
                    "1px solid #ded8d0",
                  borderRadius: "7px",
                  background: "#fff",
                  padding: "0 13px",
                  fontSize: "12px",
                  color: formData.product
                    ? "#342b24"
                    : "#99938c",
                  outline: "none",
                  cursor: "pointer",
                }}
              >
                <option value="">
                  Select your product interest
                </option>

                <option value="Curtains">
                  Curtains
                </option>

                <option value="Upholstery">
                  Upholstery
                </option>

                <option value="Mats">
                  Mats
                </option>

                <option value="Custom Fabrics">
                  Custom Fabrics
                </option>

                <option value="Interior Furnishing">
                  Interior Furnishing
                </option>

                <option value="Other">
                  Other
                </option>
              </select>
            </div>

            {/* MESSAGE */}

            <div
              style={{
                marginBottom: "17px",
              }}
            >
              <label
                style={{
                  display: "block",
                  marginBottom: "7px",
                  fontSize: "10px",
                  fontWeight: "600",
                  color: "#342b24",
                }}
              >
                Message *
              </label>

              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Tell us about your requirements..."
                rows={4}
                required
                style={{
                  width: "100%",
                  boxSizing: "border-box",
                  border:
                    "1px solid #ded8d0",
                  borderRadius: "7px",
                  background: "#fff",
                  padding: "13px",
                  fontSize: "12px",
                  color: "#342b24",
                  outline: "none",
                  resize: "vertical",
                  minHeight: "95px",
                  fontFamily:
                    "Arial, Helvetica, sans-serif",
                }}
              />
            </div>

            {/* STATUS */}

            <AnimatePresence>
              {status.message && (
                <motion.div
                  initial={{
                    opacity: 0,
                    height: 0,
                  }}
                  animate={{
                    opacity: 1,
                    height: "auto",
                  }}
                  exit={{
                    opacity: 0,
                    height: 0,
                  }}
                  style={{
                    marginBottom: "12px",
                    padding: "10px 12px",
                    borderRadius: "6px",
                    background:
                      status.type === "success"
                        ? "#edf7ef"
                        : "#fff0f0",
                    color:
                      status.type === "success"
                        ? "#3d7048"
                        : "#a34b4b",
                    fontSize: "11px",
                  }}
                >
                  {status.type === "success"
                    ? "✓ "
                    : "⚠ "}
                  {status.message}
                </motion.div>
              )}
            </AnimatePresence>

            {/* BUTTON */}

            <motion.button
              type="submit"
              disabled={loading}
              whileHover={{
                scale: loading ? 1 : 1.015,
              }}
              whileTap={{
                scale: loading ? 1 : 0.98,
              }}
              style={{
                width: "100%",
                height: "48px",
                border: "none",
                borderRadius: "7px",
                background: loading
                  ? "#8f7962"
                  : "#6f5136",
                color: "#fff",
                cursor: loading
                  ? "not-allowed"
                  : "pointer",
                fontSize: "11px",
                fontWeight: "500",
                letterSpacing: "0.2px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "14px",
                boxShadow:
                  "0 8px 20px rgba(90,65,40,0.18)",
              }}
            >
              {loading ? (
                <>
                  <motion.span
                    animate={{
                      rotate: 360,
                    }}
                    transition={{
                      duration: 0.8,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    style={{
                      width: "13px",
                      height: "13px",
                      border:
                        "2px solid rgba(255,255,255,0.4)",
                      borderTopColor: "#fff",
                      borderRadius: "50%",
                    }}
                  />

                  Sending...
                </>
              ) : (
                <>
                  Send Message

                  <motion.span
                    animate={{
                      x: [0, 4, 0],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                    }}
                    style={{
                      fontSize: "16px",
                    }}
                  >
                    →
                  </motion.span>
                </>
              )}
            </motion.button>
          </form>

          {/* BOTTOM BENEFITS */}

          <div
            style={{
              marginTop: "25px",
              paddingTop: "20px",
              borderTop:
                "1px solid #ebe6df",
              display: "grid",
              gridTemplateColumns: isMobile
                ? "1fr"
                : "repeat(3, 1fr)",
              gap: "15px",
            }}
          >
            <Benefit
              icon="♧"
              title="Quick Response"
              text="We reply within 24 hours"
            />

            <Benefit
              icon="♢"
              title="Expert Guidance"
              text="Get professional advice"
            />

            <Benefit
              icon="⚒"
              title="Custom Solutions"
              text="Tailored to your needs"
            />
          </div>
        </motion.div>
      </div>
    </section>
    </>
  );
}

/* =====================================
   FORM FIELD
===================================== */

function FormField({
  label,
  name,
  type,
  placeholder,
  value,
  onChange,
  required,
}) {
  return (
    <motion.div
      whileFocusWithin={{
        y: -2,
      }}
      style={{
        marginBottom: "14px",
      }}
    >
      <label
        htmlFor={name}
        style={{
          display: "block",
          marginBottom: "7px",
          fontSize: "10px",
          fontWeight: "600",
          color: "#342b24",
        }}
      >
        {label} {required && "*"}
      </label>

      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        style={{
          width: "100%",
          height: "46px",
          boxSizing: "border-box",
          border: "1px solid #ded8d0",
          borderRadius: "7px",
          background: "#fff",
          padding: "0 13px",
          fontSize: "12px",
          color: "#342b24",
          outline: "none",
          transition:
            "border-color 0.25s ease, box-shadow 0.25s ease",
          fontFamily:
            "Arial, Helvetica, sans-serif",
        }}
      />
    </motion.div>
  );
}

/* =====================================
   CONTACT DETAIL
===================================== */

function ContactDetail({ icon, text }) {
  return (
    <motion.div
      whileHover={{
        x: 7,
      }}
      transition={{
        duration: 0.25,
      }}
      style={{
        display: "flex",
        alignItems: "center",
        gap: "14px",
        color: "#3d3731",
        fontSize: "11px",
      }}
    >
      <div
        style={{
          width: "31px",
          height: "31px",
          flexShrink: 0,
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#806447",
          color: "#fff",
          fontSize: "12px",
        }}
      >
        {icon}
      </div>

      <div
        style={{
          lineHeight: "1.5",
        }}
      >
        {text}
      </div>
    </motion.div>
  );
}

/* =====================================
   BENEFIT
===================================== */

function Benefit({ icon, title, text }) {
  return (
    <motion.div
      whileHover={{
        y: -3,
      }}
      style={{
        textAlign: "center",
      }}
    >
      <div
        style={{
          color: "#755536",
          fontSize: "18px",
          marginBottom: "5px",
        }}
      >
        {icon}
      </div>

      <div
        style={{
          fontSize: "9px",
          fontWeight: "600",
          color: "#40382f",
          marginBottom: "3px",
        }}
      >
        {title}
      </div>

      <div
        style={{
          fontSize: "8px",
          color: "#918980",
          lineHeight: "1.4",
        }}
      >
        {text}
      </div>
    </motion.div>
  );
}