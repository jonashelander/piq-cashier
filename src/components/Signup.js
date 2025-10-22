import { useState } from "react";
import { signUp } from "../api/authApi";
import { useNavigate } from "react-router-dom";

function Signup() {
  const navigate = useNavigate();
  const [userId, setUserId] = useState();
  const [firstName, setFirstName] = useState();
  const [lastName, setlastName] = useState();
  const [dob, setDob] = useState();
  const [sex, setSex] = useState();
  const [country, setCountry] = useState();
  const [city, setCity] = useState();
  const [state, setState] = useState();
  const [street, setStreet] = useState();
  const [zip, setZip] = useState();
  const [mobile, setMobile] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const userDTO = {
    userId: userId,
    firstName: firstName,
    lastName: lastName,
    dob: dob,
    sex: sex,
    country: country,
    state: state,
    city: city,
    street: street,
    zip: zip,
    mobile: mobile,
    email: email,
    password: password,
  };

  const handleSubmit = (event) => {
    console.log(sex);
    event.preventDefault();
    signUp(userDTO).then(navigate("/"));
  };

  return (
    <div className="signup">
      <div className="signupHeader">
        <h2 className="heading-secondary">Sign up</h2>
      </div>
      <form className="signup-form" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="userId">userId</label>
          <input
            id="userId"
            type="text"
            placeholder="userId"
            required
            onChange={(event) => setUserId(event.target.value)}
          />
        </div>
        <div>
          <label htmlFor="first-name">First Name</label>
          <input
            id="first-name"
            type="text"
            placeholder="First name"
            required
            onChange={(event) => setFirstName(event.target.value)}
          />
        </div>
        <div>
          <label htmlFor="last-name">Last Name</label>
          <input
            id="last-name"
            type="text"
            placeholder="Last name"
            required
            onChange={(event) => setlastName(event.target.value)}
          />
        </div>
        <div>
          <label htmlFor="dob">Date of birth</label>
          <input
            id="dob"
            type="text"
            placeholder="Date of birth"
            required
            onChange={(event) => setDob(event.target.value)}
          />
        </div>
        <div>
          <label htmlFor="sex">Sex</label>
          <select
            id="sex"
            required
            onChange={(event) => setSex(event.target.value)}
          >
            <option value="">Choose sex:</option>
            <option value="male">MALE</option>
            <option value="female">FEMALE</option>
            <option value="UNKNOWN">UNKNOWN</option>
            <option value="X">X</option>
          </select>
        </div>
        <div>
          <label htmlFor="country">Country</label>
          <input
            id="country"
            type="text"
            placeholder="Country"
            required
            onChange={(event) => setCountry(event.target.value)}
          />
        </div>
        <div>
          <label htmlFor="city">City</label>
          <input
            id="city"
            type="text"
            placeholder="City"
            required
            onChange={(event) => setCity(event.target.value)}
          />
        </div>
        <div>
          <label htmlFor="state">State</label>
          <input
            id="state"
            type="text"
            placeholder="State"
            required
            onChange={(event) => setState(event.target.value)}
          />
        </div>
        <div>
          <label htmlFor="street">Steet</label>
          <input
            id="street"
            type="text"
            placeholder="Street"
            required
            onChange={(event) => setStreet(event.target.value)}
          />
        </div>
        <div>
          <label htmlFor="zip">Zip</label>
          <input
            id="zip"
            type="text"
            placeholder="Zip"
            required
            onChange={(event) => setZip(event.target.value)}
          />
        </div>
        <div>
          <label htmlFor="mobile">Mobile number</label>
          <input
            id="mobile"
            type="text"
            placeholder="Mobile number"
            required
            onChange={(event) => setMobile(event.target.value)}
          />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="text"
            placeholder="Email"
            required
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="text"
            placeholder="Password"
            required
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        <div>
          <button className="btn" type="submit">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default Signup;
