import React, { useContext, useEffect, useState } from "react";
import UserContext from "../contexts/UserContext";
import { updateUser, checkDuplicateUserId } from "../api/authApi";

const VerifyUser = () => {
  const { user, setUser } = useContext(UserContext);
  const [verifyUserData, setVerifyUserData] = useState({});
  const [userIdError, setUserIdError] = useState("");

  useEffect(() => {
    if (user && Object.keys(user).length > 0) {
      setVerifyUserData(user);
    }
  }, [user]);

  const handleSaveChanges = (id, userDTO) => {
    updateUser(id, userDTO).then((resp) => {
      if (resp.status === 200) {
        alert("User updated successfully!");
        setUser(resp.data);
      } else {
        alert("Something went wrong!");
      }
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (userIdError) {
      return alert("This userId is already exists");
    }
    handleSaveChanges(user.id, user);
  };

  const handleChange = (key, value, parent = null) => {
    setUser((prev) => {
      if (parent) {
        return {
          ...prev,
          [parent]: {
            ...prev[parent],
            [key]: value,
          },
        };
      }
      return {
        ...prev,
        [key]: value,
      };
    });
  };

  const handleUserIdChange = async (e) => {
    const newUserId = e.target.value;
    handleChange("userId", newUserId);

    if (newUserId.trim().length > 0) {
      const isDuplicate = await checkDuplicateUserId(newUserId);
      if (isDuplicate) {
        setUserIdError("This userId already exists");
      } else {
        setUserIdError("");
      }
    } else {
      setUserIdError("");
    }
  };

  return (
    <div className="response">
      <h2 className="heading-tertiary">Verifyuser</h2>
      <form className="response-form" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="userId">userId</label>
          {userIdError && <p style={{ color: "red" }}>{userIdError}</p>}
          <input
            id="userId"
            type="text"
            placeholder="user_123"
            required
            value={user.userId || ""}
            onChange={handleUserIdChange}
          />
        </div>
        <div>
          <label htmlFor="sessionId">sessionId</label>
          <input
            id="sessionId"
            type="text"
            placeholder="sessionId"
            required
            value={user.sessionId || ""}
            onChange={(e) => handleChange("sessionId", e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="success">success</label>
          <select
            id="success"
            required
            value={user.success?.toString() ?? ""}
            onChange={(e) => handleChange("success", e.target.value === "true")}
          >
            <option value="">Choose an option:</option>
            <option value="true">true</option>
            <option value="false">false</option>
          </select>
        </div>
        <div>
          <label htmlFor="userCat">userCat</label>
          <input
            id="userCat"
            type="text"
            placeholder="e.g., VIP_SE;NEW_USER"
            value={user.userCat || ""}
            onChange={(e) => handleChange("userCat", e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="kycStatus">kycStatus</label>
          <input
            id="kycStatus"
            type="text"
            placeholder="Approved, Reject, Unknown"
            value={user.kycStatus || ""}
            onChange={(e) => handleChange("kycStatus", e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="sex">sex</label>
          <select
            id="sex"
            value={user.sex || ""}
            onChange={(e) => handleChange("sex", e.target.value)}
          >
            <option value="">Choose an option:</option>
            <option value="MALE">MALE</option>
            <option value="FEMALE">FEMALE</option>
            <option value="UNKNOWN">UNKNOWN</option>
            <option value="X">X</option>
          </select>
        </div>
        <div>
          <label htmlFor="firstName">firstName</label>
          <input
            id="firstName"
            type="text"
            placeholder="John"
            value={user.firstName || ""}
            onChange={(e) => handleChange("firstName", e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="lastName">lastName</label>
          <input
            id="lastName"
            type="text"
            placeholder="Jonsson"
            value={user.lastName || ""}
            onChange={(e) => handleChange("lastName", e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="street">street</label>
          <input
            id="street"
            type="text"
            placeholder="Storgatan 1"
            value={user.street || ""}
            onChange={(e) => handleChange("street", e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="city">city</label>
          <input
            id="city"
            type="text"
            placeholder="Stockholm"
            value={user.city || ""}
            onChange={(e) => handleChange("city", e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="state">state</label>
          <input
            id="state"
            type="text"
            placeholder="Stockholm"
            value={user.state || ""}
            onChange={(e) => handleChange("state", e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="zip">zip</label>
          <input
            id="zip"
            type="text"
            placeholder="177 32"
            value={verifyUserData.zip || ""}
            onChange={(e) => handleChange("zip", e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="country">country</label>
          <input
            id="country"
            type="text"
            placeholder="SWE"
            value={user.country || ""}
            onChange={(e) => handleChange("country", e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="email">email</label>
          <input
            id="email"
            //type="email"
            placeholder="test@example.com"
            value={user.email || ""}
            onChange={(e) => handleChange("email", e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="dob">dob</label>
          <input
            id="dob"
            type="date"
            placeholder="1981-01-01"
            value={user.dob || ""}
            onChange={(e) => handleChange("dob", e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="mobile">mobile</label>
          <input
            id="mobile"
            type="tel"
            placeholder="+46733123123"
            value={user.mobile || ""}
            onChange={(e) => handleChange("mobile", e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="balance">balance</label>
          <input
            id="balance"
            type="number"
            step="0.01"
            placeholder="100.5"
            required
            value={user.balance || ""}
            onChange={(e) => handleChange("balance", e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="balanceCy">balanceCy</label>
          <input
            id="balanceCy"
            type="text"
            placeholder="SEK"
            required
            value={user.balanceCy || ""}
            onChange={(e) => handleChange("balanceCy", e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="locale">locale</label>
          <input
            id="locale"
            type="text"
            placeholder="bg_BG"
            value={user.locale || ""}
            onChange={(e) => handleChange("locale", e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="attributes">attributes</label>
          <input
            id="attributes"
            type="text"
            placeholder='{"allow_manual_payout":"true"}'
            value={user.attributes || ""}
            onChange={(e) => handleChange("attributes", e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="errCode">errCode</label>
          <input
            id="errCode"
            type="text"
            placeholder="210003"
            value={user.errCode || ""}
            onChange={(e) => handleChange("errCode", e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="errMsg">errMsg</label>
          <input
            id="errMsg"
            type="text"
            placeholder="Transaction failed"
            value={user.errMsg || ""}
            onChange={(e) => handleChange("errMsg", e.target.value)}
          />
        </div>
        <button className="btn btn--form" type="submit">
          Save
        </button>
      </form>
    </div>
  );
};

export default VerifyUser;
