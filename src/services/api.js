// services/api.js
export async function apiRequest(url, method = "GET", body) {
    const options = { method, headers: { "Content-Type": "application/json" } };
    if (body) options.body = JSON.stringify(body);
    const res = await fetch(url, options);
    const result = await res.json();
    if (!result.success) throw new Error("API error");
    return result.data;
  }