"use strict";
import axios from "axios";
import { StrictMode } from "react";

/* const auth_url = "http://localhost:8080/user/";
const respUrl = "http://localhost:8080/response/"; */

const auth_url = "https://piq-cashier-backend-production.up.railway.app/user/";
const respUrl =
  "https://piq-cashier-backend-production.up.railway.app/response/";

const signUp = async (signupDTO) => {
  const user = await axios.post(auth_url + "signup", signupDTO);
  return user;
};

const login = async (loginDTO) => {
  console.log(loginDTO);
  try {
    const resp = await axios.post(auth_url + "signin", loginDTO);
    if (resp.status === 200) {
      console.log(resp.data);
      return resp;
    }
    throw new Error("Could not log in");
  } catch (error) {
    throw error.message;
  }
};

const logOut = async (userId) => {
  try {
    const resp = await axios.post(auth_url + userId);
    if (resp.status === 200) {
      return resp;
    }
    throw new Error("Something went wrong!");
  } catch (error) {
    throw error.message;
  }
};

const authUser = async (authDTO) => {
  try {
    const resp = await axios.post(auth_url + "auth", authDTO);
    if (resp.status === 200) {
      return resp;
    }
    throw new Error("Unauthorized");
  } catch (error) {
    throw new Error(error.message);
  }
};

const getUsers = async () => {
  try {
    const resp = await axios.get(auth_url);
    if (resp.status === 200) {
      return resp;
    }
    throw new Error("Could not fetch users");
  } catch (error) {
    throw error.message;
  }
};

const getUser = async (userId) => {
  try {
    const resp = await axios.get(auth_url + `${userId}`);
    if (resp.status === 200) {
      return resp;
    }
    throw new Error("Could not fetch users");
  } catch (error) {
    throw error.message;
  }
};

const updateUser = async (id, userDTO) => {
  try {
    const resp = await axios.put(auth_url + `${id}`, userDTO, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (resp.status === 200) {
      return resp;
    }
    throw new Error("Could not update user");
  } catch (error) {
    throw error.message;
  }
};

const checkDuplicateUserId = async (userId) => {
  if (!userId || userId.trim() === "") return false;

  try {
    const resp = await axios.get(`${auth_url}checkDuplicate/${userId.trim()}`);
    // If the request succeeds (200 OK), userId is available
    return false;
  } catch (error) {
    // If backend returns 409 Conflict, userId already exists
    if (error.response && error.response.status === 409) {
      return true;
    }
    console.error("Error checking duplicate userId:", error.message);
    return false; // fallback to allow typing to continue
  }
};

const getAuthorizeData = async (userId) => {
  try {
    const res = await axios.get(`${respUrl}authorize/${userId}`);
    if (res.status === 200) {
      return res;
    }
    throw new Error("Could not fetch authorize data");
  } catch (error) {
    throw error.message;
  }
};

const getTransferData = async (id) => {
  try {
    const res = await axios.get(`${respUrl}transfer/${id}`);
    if (res.status === 200) {
      return res;
    }
    throw new Error("Could not fetch transfer data");
  } catch (error) {
    throw error.message;
  }
};

const getCancelData = async (id) => {
  try {
    const res = await axios.get(`${respUrl}cancel/${id}`);
    if (res.status === 200) {
      return res;
    }
    throw new Error("Could not fetch cancel data");
  } catch (error) {
    throw error.message;
  }
};

const updateAuthorize = async (id, authorizeDTO) => {
  try {
    const resp = await axios.put(`${respUrl}authorize/${id}`, authorizeDTO, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(resp.data);
    if (resp.status === 200) {
      return resp;
    }
    throw new Error("Could not update authorize");
  } catch (error) {
    throw error.message;
  }
};

const updateTransfer = async (id, transferDTO) => {
  try {
    const resp = await axios.put(`${respUrl}transfer/${id}`, transferDTO, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(resp.data);
    if (resp.status === 200) {
      return resp;
    }
    throw new Error("Could not update transfer");
  } catch (error) {
    throw error.message;
  }
};

const updateCancel = async (id, transferDTO) => {
  try {
    const resp = await axios.put(`${respUrl}cancel/${id}`, transferDTO, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(resp.data);
    if (resp.status === 200) {
      return resp;
    }
    throw new Error("Could not update cancel");
  } catch (error) {
    throw error.message;
  }
};

export {
  signUp,
  login,
  logOut,
  authUser,
  getUsers,
  getUser,
  updateUser,
  updateAuthorize,
  getAuthorizeData,
  getTransferData,
  getCancelData,
  updateTransfer,
  updateCancel,
  checkDuplicateUserId,
};
