import { useState } from "react";

function SignUp() {
    const [firstName, setFirstName] = useState();
    const [lastName, setlasttName] = useState();
    const [dateOfBirth, setDateOfBirth] = useState();
    const [sex, setSex] = useState();
    const [country, setCountry] = useState();
    const [state, setState] = useState();
    const [street, setStreet] = useState();
    const [zip, setZip] = useState();
    const [phoneNumber, setPhoneNumber] = useState();
    const [email, setEmail] = useState();


    return (
        <div className="signup">
            <div className="signupHeader">
                <h1>Sign up</h1>
            </div>
            <form method="post">
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
                        onChange={event => setlasttName(event.target.value)}
                        type="text" name="lastName" />
                </div>
                <div>
                    <label>
                        Date of birth:
                    </label>
                    <input
                        onChange={event => setDateOfBirth(event.target.value)}
                        type="text" name="firstName" />
                </div>
                <div>
                    <label>
                        Sex:
                    </label>
                    <input
                        onChange={event => setSex(event.target.value)}
                        type="text" name="firstName" />
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
                        onChange={event => setPhoneNumber(event.target.value)}
                        type="text" name="firstName" />
                </div>
                <div>
                    <label>
                        Email:
                    </label>
                    <input
                        onChange={event => setEmail(event.target.value)}
                        type="text" name="firstName" />
                </div>
                <div>
                    <button className="submitButton" type="submit">Submit</button>
                </div>
            </form>
        </div>
    );
}

export default SignUp;