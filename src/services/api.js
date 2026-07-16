import { API_BASE_URL } from "../utils/constants";

export const fetchData = async (path) => {
  try {
    const response = await fetch(API_BASE_URL + path);
    if (!response.ok) {
      throw new Error("something went wrong");
    }
    const result = await response.json();
    return result;
  } catch (error) {
    console.error(error);
    return error instanceof Error ? error.message : "something went wrong";
  }
};

export const postData = async (path) => {
  try {
    const response = await fetch(API_BASE_URL + path, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error("something went wrong");
    }
    const result = await response.json();
    return result;
  } catch (error) {
    console.error(error);
    return error instanceof Error ? error.message : "something went wrong";
  }
};
