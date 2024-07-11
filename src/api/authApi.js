// auth.js
import axios from "axios";
import { useParams } from "react-router-dom";

const auth_url = "http://localhost:8080/user/";

const signUp = async (signupDTO) => {
  const user = await axios.post(auth_url + "signup", signupDTO);
  return user;
};

const login = async (loginDTO) => {
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
    console.log(error);
  }
};

const fetchUser = async (userId) => {
  try {
    const resp = await axios.get(`${auth_url}${userId}`);
    if (resp.status === 200) {
      return resp;
    }
    throw new Error("User Not Found")
  } catch (error) {
    console.log(error);
  }
}

const getUsers = async () => {
  try {
    const resp = await axios.get(auth_url);
    if (resp.status === 200) {
      return resp;
    }
    throw new Error("Could not fetch users");
  } catch (error) {
    console.log(error);
  }
};

const updateUser = async (userId, userDTO) => {
  try {
    const resp = await axios.put(`${auth_url}${userId}`, userDTO, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(resp);
    if (resp.status === 200) {
      return resp;
    }
    throw new Error("Could not update user");
  } catch (error) {
    throw error.message;
  }
};

export { signUp, login, logOut, authUser, fetchUser, getUsers, updateUser };
