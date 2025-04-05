import { fetchWrapper } from "./utility";

const url = import.meta.env.VITE_SERVER_URL;

const storeToken = (accessToken) => {
  localStorage.setItem("token", accessToken);
  const expiration = new Date();
  expiration.setHours(expiration.getHours() + 1);
  localStorage.setItem("expiration", expiration.toISOString());
};

export const SignIn = async (values) => {
  const response = await fetch(`${url}api/users/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(values),
  });

  const resData = await response.json();
  if(resData.status === "success" && response.ok) {
    storeToken(resData?.data?.accessToken);
  }
  return resData;
};

export const SignUp = async (values) => {
  const response = await fetch(`${url}api/users/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(values),
  });
  const resData = await response.json();
  console.log(resData);
  if (resData.status === "success") {
    storeToken(resData.data);
  }
  return { ...resData };
};

export const currentUser = async () => {
  const response = await fetchWrapper(`${url}api/users/current-user`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  return { ...response };
};
