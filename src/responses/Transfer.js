import { useContext, useState, useEffect } from "react";
import UserContext from "../contexts/UserContext";
import { updateUser } from "../api/authApi";

const Transfer = () => {
  const { user, setUser } = useContext(UserContext);
  const [transferData, setTransferData] = useState({});

  const handleSaveChanges = (id, userDTO) => {
    console.log(userDTO);
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
      <h2 className="heading-secondary">Transfer</h2>
      <form className="response-form" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="userId">userId</label>
          <input
            id="userId"
            type="text"
            placeholder="user_123"
            required
            value={user.transfer.userId}
            onChange={(e) => handleChange("userId", e.target.value, "transfer")}
          />
        </div>

        <div>
          <label htmlFor="success">success</label>
          <select
            id="success"
            required
            value={user.transfer.success?.toString() ?? ""}
            onChange={(e) =>
              handleChange("success", e.target.value, "transfer")
            }
          >
            <option value="">Choose an option:</option>
            <option value="true">true</option>
            <option value="false">false</option>
          </select>
        </div>

        <div>
          <label htmlFor="txId">txId</label>
          <input
            id="txId"
            type="text"
            placeholder="26720"
            required
            value={user.transfer.txId}
            onChange={(e) => handleChange("txId", e.target.value, "transfer")}
          />
        </div>

        <div>
          <label htmlFor="merchantTxId">merchantTxId</label>
          <input
            id="merchantTxId"
            type="text"
            placeholder="111111111"
            value={user.transfer.merchantTxId}
            onChange={(e) =>
              handleChange("merchantTxId", e.target.value, "transfer")
            }
          />
        </div>

        <div>
          <label htmlFor="errCode">errCode</label>
          <input
            id="errCode"
            type="text"
            placeholder="111111"
            value={user.transfer.errCode}
            onChange={(e) =>
              handleChange("errCode", e.target.value, "transfer")
            }
          />
        </div>

        <div>
          <label htmlFor="errMsg">errMsg</label>
          <input
            id="errMsg"
            type="text"
            placeholder="Transfer failed"
            value={user.transfer.errMsg}
            onChange={(e) => handleChange("errMsg", e.target.value, "transfer")}
          />
        </div>

        <button className="btn btn--form" type="submit">
          Save
        </button>
      </form>
    </div>
  );
};

export default Transfer;
