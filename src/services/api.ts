const API_URL = import.meta.env.VITE_API_URL;

export const api = async (endpoint: string, options: RequestInit = {}) => {
  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,

    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
  });

  const responseBody = await response.text();
  let data;

  if (responseBody.trim()) {
    try {
      data = JSON.parse(responseBody);
    } catch {
      if (response.ok) {
        throw new Error("The server returned an invalid JSON response.");
      }
    }
  }

  if (!response.ok) {
    const message =
      typeof data === "object" &&
      data !== null &&
      "message" in data &&
      typeof data.message === "string"
        ? data.message
        : `Request failed with status ${response.status}.`;
    throw new Error(message);
  }

  if (!responseBody.trim()) {
    throw new Error(`The server returned an empty response (${response.status}).`);
  }

  return data;
};
