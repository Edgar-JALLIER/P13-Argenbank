import axios from "axios";

export const fetchAuth = async (email: string, password: string) => {
  try {
    const response = await axios.post(
      "http://localhost:3001/api/v1/user/login",
      {
        email,
        password,
      }
    );
    return response.data.body;
  } catch (error) {
    throw new Error("Failed to authenticate user");
  }
};
