import { useState } from "react";

function SignUp() {
    const [firstName, setFirstName] = useState("Jonas");
    const [lastName, setlasttName] = useState("Helander");
    const [country, setCountry] = useState("Sweden");
    const [street, setStreet] = useState("Prajtejder");
    const [zip, setZip] = useState("184 61");


    return (
        <div className="signUp">

            <form method="post">
                <div>
                    <label>
                        First Name:
                    </label>
                    <input type="text" name="firstName" />
                </div>

                <div>
                    <label>
                        Last Name:
                    </label>
                    <input type="text" name="lastName" />
                </div>
                <div>
                    <label>
                        Country:
                    </label>
                    <input type="text" name="country" />
                </div>
                <div>
                    <label>
                        Steet:
                    </label>
                    <input type="text" name="street" />
                </div>
                <div>
                    <label>
                        Zip:
                    </label>
                    <input type="text" name="zip" />
                </div>
                <div>
                    <label>
                        State:
                    </label>
                    <input type="text" name="state" />
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


        </div>
    );
}

export default SignUp;