import axios from "axios";

export const fetchUser = async (token: string) => {
  try {
    const response = await axios.post(
      "http://localhost:3001/api/v1/user/profile",
      null,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data.body;
  } catch (error) {
    throw new Error("Failed to fetch user data");
  }
};

export const updateUser = async (
  token: string,
  firstName: string,
  lastName: string
) => {
  try {
    const response = await axios.put(
      "http://localhost:3001/api/v1/user/profile",
      {
        firstName: firstName,
        lastName: lastName,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data.body;
  } catch (error) {
    throw new Error("Failed to update user data");
  }
};
