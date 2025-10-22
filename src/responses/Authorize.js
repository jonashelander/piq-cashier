import React, { useContext, useState, useEffect } from "react";
import UserContext from "../contexts/UserContext";
import { updateUser } from "../api/authApi";

const Authorize = () => {
  const { user, setUser } = useContext(UserContext);
  const [authorizeData, setAuthorizeData] = useState({});

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
    console.log(user.authorize.userId);
    e.preventDefault();
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

  return (
    <div className="response">
      <h2 className="heading-secondary">Authorize</h2>
      <form className="response-form" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="userId">userId</label>
          <input
            id="userId"
            type="text"
            placeholder="user_123"
            required
            value={user.authorize?.userId || ""}
            onChange={(e) =>
              handleChange("userId", e.target.value, "authorize")
            }
          />
        </div>
        <div>
          <label htmlFor="success">success</label>
          <select
            id="success"
            required
            value={user.authorize.success?.toString() ?? ""}
            onChange={(e) =>
              handleChange("success", e.target.value, "authorize")
            }
          >
            <option value="">Choose an option:</option>
            <option value="true">true</option>
            <option value="false">false</option>
          </select>
        </div>
        <div>
          <label htmlFor="merchantTxId">merchantTxId</label>
          <input
            id="merchantTxId"
            type="text"
            placeholder="111111111"
            value={user.authorize.merchantTxId}
            onChange={(e) =>
              handleChange("merchantTxId", e.target.value, "authorize")
            }
          />
        </div>
        <div>
          <label htmlFor="authCode">authCode</label>
          <input
            id="authCode"
            type="text"
            placeholder="550e8400-e29b-41d4-a716-446655440000"
            required
            value={user.authorize.authCode}
            onChange={(e) =>
              handleChange("authCode", e.target.value, "authorize")
            }
          />
        </div>
        <div>
          <label htmlFor="errCode">errCode</label>
          <input
            id="errCode"
            type="text"
            placeholder="10001"
            value={user.authorize.errCode}
            onChange={(e) =>
              handleChange("errCode", e.target.value, "authorize")
            }
          />
        </div>
        <div>
          <label htmlFor="errMsg">errMsg</label>
          <input
            id="errMsg"
            type="text"
            placeholder="Authorize failed"
            value={user.authorize.errMsg}
            onChange={(e) =>
              handleChange("errMsg", e.target.value, "authorize")
            }
          />
        </div>
        <button className="btn btn--form" type="submit">
          Save
        </button>
      </form>
    </div>
  );
};

export default Authorize;
