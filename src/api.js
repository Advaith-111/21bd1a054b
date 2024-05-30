import axios from "axios";

const API_BASE_URL = "http://20.244.56.144/test";

// Function to register and get the token
export const registerAndGetToken = async () => {
  try {
    const response = await axios.post(`${API_BASE_URL}/register`, {
      // Registration payload (adjust based on your API requirements)
      username: "724403b1-1264-42ca-9c3c-2fd4054009a3",
      password:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiZXhwIjoxNzE3MDc1NzUwLCJpYXQiOjE3MTcwNzU0NTAsImlzcyI6IkFmZm9yZG1lZCIsImp0aSI6IjcyNDQwM2IxLTEyNjQtNDJjYS05YzNjLTJmZDQwNTQwMDlhMyIsInN1YiI6ImFkdmFpdGhjaDAzQGdtYWlsLmNvbSJ9LCJjb21wYW55TmFtZSI6ImttaXRuZ2l0IiwiY2xpZW50SUQiOiI3MjQ0MDNiMS0xMjY0LTQyY2EtOWMzYy0yZmQ0MDU0MDA5YTMiLCJjbGllbnRTZWNyZXQiOiJ0bnlPZEt0bmF3YmxWcktkIiwib3duZXJOYW1lIjoiYWR2YWl0aCIsIm93bmVyRW1haWwiOiJhZHZhaXRoY2gwM0BnbWFpbC5jb20iLCJyb2xsTm8iOiIyMWJkMWEwNTRiIn0.fAHYwOrM9kSRXFrp0qx90p28pcJT21iS_MIZqJYdyG8",
    });
    return response.data.token;
  } catch (error) {
    console.error("Error during registration:", error);
    throw error;
  }
};

// Function to fetch products
export const fetchProducts = async (
  token,
  company,
  category,
  top,
  minPrice,
  maxPrice
) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/companies/${company}/categories/${category}/products`,
      {
        headers: { Authorization: `Bearer ${token}` },
        params: { top, minPrice, maxPrice },
      }
    );
    return response.data.map((product) => ({
      productName: product.productName,
      price: product.price,
      rating: product.rating,
      discount: product.discount,
      availability: product.availability,
    }));
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

// Function to fetch product details
export const fetchProductDetails = async (token, productId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/products/${productId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching product details:", error);
    throw error;
  }
};
