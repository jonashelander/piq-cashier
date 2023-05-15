import { useState } from "react";
import { signUp } from "../api/userApi";
import { useNavigate } from "react-router-dom";

function SignUp() {
    const navigate = useNavigate();
    const [firstName, setFirstName] = useState();
    const [lastName, setlastName] = useState();
    const [dob, setDob] = useState();
    const [sex, setSex] = useState();
    const [country, setCountry] = useState();
    const [city, setCity] = useState();
    const [state, setState] = useState();
    const [street, setStreet] = useState();
    const [zip, setZip] = useState();
    const [phone, setPhone] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    const userDTO = {
        firstName: firstName,
        lastName: lastName,
        dob: dob,
        sex: sex,
        country: country,
        state: state,
        city: city,
        street: street,
        zip: zip,
        phone: phone,
        email: email,
        password: password
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        signUp(userDTO)
        .then(navigate("/"))
    }


    return (
        <div className="signup">
            <div className="signupHeader">
                <h1>Sign up</h1>
            </div>
            <form>
                <div>
                    <label>
                        First Name:
                    </label>
                    <input
                        onChange={event => setFirstName(event.target.value)}
                        type="text" name="firstName" />
                </div>
                <div>
                    <label>
                        Last Name:
                    </label>
                    <input
                        onChange={event => setlastName(event.target.value)}
                        type="text" name="lastName" />
                </div>
                <div>
                    <label>
                        Date of birth:
                    </label>
                    <input
                        onChange={event => setDob(event.target.value)}
                        type="text" name="dateOfBirth" />
                </div>
                <div>
                    <label>
                        Sex:
                    </label>
                    <input
                        onChange={event => setSex(event.target.value)}
                        type="text" name="sex" />
                </div>
                <div>
                    <label>
                        Country:
                    </label>
                    <input
                        onChange={event => setCountry(event.target.value)}
                        type="text" name="country" />
                </div>
                <div>
                    <label>
                        City:
                    </label>
                    <input
                        onChange={event => setCity(event.target.value)}
                        type="text" name="city" />
                </div>
                <div>
                    <label>
                        State:
                    </label>
                    <input
                        onChange={event => setState(event.target.value)}
                        type="text" name="state" />
                </div>
                <div>
                    <label>
                        Steet:
                    </label>
                    <input
                        onChange={event => setStreet(event.target.value)}
                        type="text" name="street" />
                </div>
                <div>
                    <label>
                        Zip:
                    </label>
                    <input
                        onChange={event => setZip(event.target.value)}
                        type="text" name="zip" />
                </div>
                <div>
                    <label>
                        Phone number:
                    </label>
                    <input
                        onChange={event => setPhone(event.target.value)}
                        type="text" name="phone" />
                </div>
                <div>
                    <label>
                        Email:
                    </label>
                    <input
                        onChange={event => setEmail(event.target.value)}
                        type="text" name="email" />
                </div>
                <div>
                    <label>
                        Password:
                    </label>
                    <input
                        onChange={event => setPassword(event.target.value)}
                        type="text" name="password" />
                </div>
                <div>
                    <button className="submitButton" type="submit" onClick={handleSubmit}>Submit</button>
                </div>
            </form>
        </div>
    );
}

export default SignUp;