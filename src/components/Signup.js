import { useState } from "react";

function SignUp() {
    const [firstName, setFirstName] = useState();
    const [lastName, setlasttName] = useState();
    const [country, setCountry] = useState();
    const [street, setStreet] = useState();
    const [zip, setZip] = useState();
    const [state, setState] = useState();


    return (
        <div className="signUp">

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
                        Country:
                    </label>
                    <input
                        onChange={event => setCountry(event.target.value)}
                        type="text" name="country" />
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
                        State:
                    </label>
                    <input
                        onChange={event => setState(event.target.value)}
                        type="text" name="state" />
                </div>
                <div>
                    <button className="submitButton" type="submit">Submit</button>
                </div>
            </form>

            <p>{firstName}</p>
            <p>{lastName}</p>
            <p>{country}</p>
            <p>{street}</p>
            <p>{zip}</p>
            <p>{state}</p>


        </div>
    );
}

export default SignUp;