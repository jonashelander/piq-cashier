import axios from "axios";
import { useParams } from "react-router-dom";

const api_url = "http://localhost:8080/user/";

const signUp = async (signupDTO) => {
    const user = await axios.post(api_url + "signup", signupDTO);
    console.log(user.status);
    return user;
};

const login = async (loginDTO) => {
    try {
        const resp = await axios.post(api_url + "signin", loginDTO);
        if (resp.status === 200) {
            return resp;
        }
        throw new Error("Could not log in");
    } catch (error) {
        throw error.message;
    }
};

const logOut = async (userId) => {
    try {
        const resp = await axios.post(api_url + userId);
        if (resp.status === 200) {
            console.log("successful!!!")
            return resp;
        }
        throw new Error("Something went wrong!");
    } catch (error) {
        throw error.message;
    }
};

const authUser = async (userId) => {

    try {
        const resp = await axios.post(api_url + "auth", userId);
        if (resp.status === 200) {
            return resp;
        }
        throw new Error("User has no active session")
    } catch (error) {
        throw error.message;
    }
}


export { signUp, login, logOut, authUser };
