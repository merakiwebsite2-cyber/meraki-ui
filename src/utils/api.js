export const BASE_URL = "http://localhost:8000";

export const apiRequest = async ({
  endpoint,
  method = "GET",
  params = {},
  body = null,
  headers = {},
}) => {
  const query = new URLSearchParams(params).toString();
  const url = `${BASE_URL}${endpoint}${query ? `?${query}` : ""}`;

  const isFormData = body instanceof FormData;

  const response = await fetch(url, {
    method,
    headers: {
      ...(isFormData ? {} : { "Content-Type": "application/json" }),
      ...headers,
    },
    body: body ? (isFormData ? body : JSON.stringify(body)) : null,
  });

  // 🔥 IMPORTANT FIX STARTS HERE
  const contentType = response.headers.get("content-type");

  if (!response.ok) {
    if (contentType && contentType.includes("application/json")) {
      return await response.json();
    } else {
      return await response.text();
    }
  }

  if (contentType && contentType.includes("application/json")) {
    return await response.json();
  } else {
    return await response.text(); // ✅ handles "done"
  }
};