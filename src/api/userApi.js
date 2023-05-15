import axios from "axios";

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

const test = async () => {
    const resp = await axios.post(api_url + "hello");
    console.log(resp.data);
};


export { signUp, login, test };
