import { useContext, useEffect, useState } from "react";
import UserContext from "../contexts/UserContext";
import { updateUser } from "../api/authApi";

const Cancel = () => {
  const { user, setUser } = useContext(UserContext);
  const [cancelData, setCancelData] = useState({});

  const handleSaveChanges = (id, userDTO) => {
    console.log(user);
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
      <h2 className="heading-secondary">Cancel</h2>
      <form className="response-form" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="userId">userId</label>
          <input
            id="userId"
            type="text"
            placeholder="user_123"
            required
            value={user.cancel.userId}
            onChange={(e) => handleChange("userId", e.target.value, "cancel")}
          />
        </div>

        <div>
          <label htmlFor="success">success</label>
          <select
            id="success"
            required
            value={user.cancel.success?.toString() ?? ""}
            onChange={(e) => handleChange("success", e.target.value, "cancel")}
          >
            <option value="">Choose an option:</option>
            <option value="true">true</option>
            <option value="false">false</option>
          </select>
        </div>

        <div>
          <label htmlFor="errCode">errCode</label>
          <input
            id="errCode"
            type="text"
            placeholder="111111"
            value={user.cancel.errCode}
            onChange={(e) => handleChange("errCode", e.target.value, "cancel")}
          />
        </div>

        <div>
          <label htmlFor="errMsg">errMsg</label>
          <input
            id="errMsg"
            type="text"
            placeholder="Transfer failed"
            value={user.cancel.errMsg}
            onChange={(e) => handleChange("errMsg", e.target.value, "cancel")}
          />
        </div>

        <button className="btn btn--form" type="submit">
          Save
        </button>
      </form>
    </div>
  );
};

export default Cancel;
