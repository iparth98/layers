import { fetchWrapper } from "./utility.js";

const url = import.meta.env.VITE_SERVER_URL;

export const getVendors = async (page, limit, search) => {
  const response = await fetchWrapper(
    `${url}api/users/vendor?limit=${limit}&page=${page}&search=${search}`
  );
  return response;
};

export const getVendorProducts = async (vendorId, page, limit, search) => {
  const response = await fetchWrapper(
    `${url}api/users/vendor/${vendorId}/products/?limit=${limit}&page=${page}&search=${search}`
  );
  return response;
};

export const activateVendor = async (values) => {
  const response = await fetchWrapper(`${url}api/users/vendor/activate`, {
    method: "POST",
    body: JSON.stringify(values),
  });
  return response;
};
