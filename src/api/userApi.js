import axios from "axios";

const api_url = "http://localhost:8080/user/";


const signUp = async (signupDTO) => {
    const resp = await axios.post(api_url + "signup", signupDTO);
    console.log(signupDTO);
    console.log("response" + resp.data);

    const user = resp;

    console.log(user);

    return user;
};

export { signUp };
