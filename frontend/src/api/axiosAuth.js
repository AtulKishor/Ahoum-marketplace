import api from "./axios";

export const authApi = (token) => {
  return api.create({
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
