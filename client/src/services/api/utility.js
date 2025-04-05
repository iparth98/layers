
export const fetchWrapper = async (url, options = {}) => {
  const token = localStorage.getItem("token");

  const headers = {
    // "Content-Type": "application/json",
    ...options.headers,
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const response = await fetch(url, { ...options, headers });

  if (response.status === 401) {
    localStorage.removeItem("token");
    localStorage.removeItem("expiration");
    window.location.href = "/sign-in";
    return { status: 401, ok: false, success: false };
  }
  const data = await response.json(); // Parse JSON response
  return {
    status: response.status,
    ok: response.ok,
    success: data.success || response.ok,
    data
  };
};