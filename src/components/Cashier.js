import { useNavigate } from "react-router-dom";
import LoggedInContext from "../contexts/LoggedInContext";
import _PaymentIQCashier from "paymentiq-cashier-bootstrapper";
import UserContext from "../contexts/UserContext";
import "../styles/App.css";
import "../styles/General.css";
import { fetchUser, updateUser } from "../api/authApi";
import { useContext, useEffect, useState } from "react";

function Cashier() {
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);
  const [userDTO, setUserDTO] = useState({ ...user });
  const [mid, setMid] = useState("");
  const [method, setMethod] = useState("deposit");

  const handleFetchUser = (userId) => {
    fetchUser(userId).then((res) => {
      console.log(res);
      if (res.status === 200) {
        document.getElementsByClassName("balance")[0].innerHTML =
          res.data.balance;
      }
    });
  };

  const handleInputChange = (field, value) => {
    setUserDTO((prevState) => ({
      ...prevState,
      [field]: value,
    }));
    console.log(value);
  };

  const handleMidChange = (event) => {
    console.log(userDTO);
    setMid(event.target.value);
    localStorage.setItem("mid", event.target.value);
  };

  const handleMethodChange = () => {
    var selectedMethod = document.getElementById("method").value;
    setMethod(selectedMethod);
  };

  const handleUserChange = (value, event) => {
    userDTO.value = event.target.value;
  };

  const cashierInstance = () => {
    new _PaymentIQCashier(
      "#cashier",
      {
        // accountId: "aeafb066-874a-40b0-8fa3-0dcdf884b76e",
        // showAccounts: "inline",
        // globalSubmit: true,
        // user: { email: "helanderjonas@gmail.com" },
        // providerType: "creditcard",
        // autoProcess: true,
        // amount: 200,
        // fetchConfig: "false",
        // locale: "test",
        allowCancelPendingWithdrawal: "true",
        merchantId: mid,
        userId: localStorage.getItem("userId"),
        sessionId: localStorage.getItem("sessionId"),
        method: method, // if not set, defaults to deposit
        environment: "test", // if not set, defaults to production
        // containerHeight: "650px",
        containerHeight: "auto",
        // containerWidth: "auto",
        autoOpenFirstPaymentMethod: "false",
        receiptExcludeKeys: [
          "creditcarddeposit.receiptDepositAccountToCharge",
          "creditcarddeposit.receiptDepositAmount",
          "creditcarddeposit.receiptDepositFee",
        ],
        // showFooter: "false",
        // listType: "list",
        singlePageFlow: "true",
        defaultLoader: "true",
        // showBackAtInitPath: "false",
        theme: {
          input: {
            color: "#555",
            fontSize: "12px",
            height: "40px",
            borderRadius: "9px",
          },
          inputbackground: {
            color: "#fefaf0",
          },

          labels: {
            color: "#444",
            fontSize: "14px",
          },
          headings: {
            color: "#333",
          },
          buttons: {
            color: "#f3a800",
          },
          headerbackground: {
            color: "#EC2828",
          },
          cashierbackground: {
            color: "#fbe5b3",
          },
          cardbackground: {
            color: "",
          },
          border: {
            radius: "9px",
          },
          providerlogos: {
            dropdown: "4px",
          },
        },
      },
      (api) => {
        console.log("Cashier intialized and ready to take down the empire");
        // register callbacks
        api.on({
          navigate: () => api.set(),
          success: (data) => handleFetchUser(user.userId),
          // success: (data) => console.log(data),
        });

        api.css(`
        #cashier{
          box-shadow: 0 2.4rem 4.8rem rgba(0, 0, 0, 0.075);
        }
        `);
        api.set({
          config: {
            // amount: 200,
            user: {
              phonenumber: "08080808",
              email: "jane.doe@example.com",
            },
          },
        });
      },
      (api) => {}
    );
  };

  useEffect(() => {
    setMid(localStorage.getItem("mid"));
    window._PaymentIQCashierReset();
    cashierInstance();
  }, [mid, method]);

  return (
    <section className="section-cashier">
      <div className="cashier">
        <div className="cashier-settings-box">
          <div className="cashier-settings">
            <h1 className="heading-primary">Setup the cashier</h1>

            <p className="setting-title">Cashier parameters</p>
            <div className="settings">
              <div className="input-mid">
                <span className="setting-description">Merchant ID</span>
                <input
                  className="input"
                  type="text"
                  value={mid}
                  placeholder="MID"
                  onChange={handleMidChange}
                />
              </div>
              <div className="input-method">
                <span className="setting-description">Payment method</span>
                <select
                  className="select"
                  id="method"
                  name="method"
                  onChange={handleMethodChange}
                >
                  <option className="option" value="deposit">
                    Deposit
                  </option>
                  <option className="option" value="withdrawal">
                    Withdrawal
                  </option>
                </select>
              </div>
              {/* <div className="input-sessionid">
                <span className="setting-description">Session ID</span>
                <input
                  className="input"
                  type="text"
                  value={sessionId}
                  placeholder="Session ID"
                  // onChange={}
                />
              </div> */}
            </div>
          </div>

          <div className="user-data-box">
            <p className="setting-title">User data</p>
            <div className="user-data grid--2-cols">
              <div className="user-parameter">
                <p className="setting-description">First name</p>
                <input
                  className="input-large"
                  type="text"
                  placeholder="First name"
                  value={userDTO.firstName}
                  onChange={(e) =>
                    handleInputChange("firstName", e.target.value)
                  }
                />
              </div>
              <div className="user-parameter">
                <p className="setting-description">Last name</p>
                <input
                  className="input-large"
                  type="text"
                  value={userDTO.lastName}
                  placeholder="Last name"
                  onChange={(e) =>
                    handleInputChange("lastName", e.target.value)
                  }
                />
              </div>
              <div className="user-parameter">
                <p className="setting-description">User ID</p>
                <input
                  className="input-large"
                  type="text"
                  value={userDTO.userId}
                  placeholder="User ID"
                  onChange={(e) => handleInputChange("userId", e.target.value)}
                />
              </div>
              <div className="user-parameter">
                <p className="setting-description">Session ID</p>
                <input
                  className="input-large"
                  type="text"
                  value={userDTO.sessionId}
                  placeholder="Session ID"
                  onChange={(e) =>
                    handleInputChange("sessionId", e.target.value)
                  }
                />
              </div>
              <div className="user-parameter">
                <p className="setting-description">KYC Status</p>
                <input
                  className="input-large"
                  type="text"
                  value={userDTO.kycStatus}
                  placeholder="KYC Status"
                  onChange={(e) =>
                    handleInputChange("kycStatus", e.target.value)
                  }
                />
              </div>
              <div className="user-parameter">
                <p className="setting-description">Balance</p>
                <input
                  className="input-large"
                  type="text"
                  value={userDTO.balance}
                  placeholder="Balance"
                  onChange={(e) => handleInputChange("balance", e.target.value)}
                />
              </div>
              <div className="user-parameter">
                <p className="setting-description">Date of birth</p>
                <input
                  className="input-large"
                  type="text"
                  value={userDTO.dob}
                  placeholder="Date of birth"
                  onChange={(e) => handleInputChange("dob", e.target.value)}
                />
              </div>
              <div className="user-parameter">
                <p className="setting-description">Gender</p>
                <input
                  className="input-large"
                  type="text"
                  value={userDTO.sex}
                  placeholder="Gender"
                  onChange={(e) => handleInputChange("sex", e.target.value)}
                />
              </div>
              <div className="user-parameter">
                <p className="setting-description">Country</p>
                <input
                  className="input-large"
                  type="text"
                  value={userDTO.country}
                  placeholder="Country"
                  onChange={(e) => handleInputChange("country", e.target.value)}
                />
              </div>
              <div className="user-parameter">
                <p className="setting-description">City</p>
                <input
                  className="input-large"
                  type="text"
                  value={userDTO.city}
                  placeholder="City"
                  onChange={(e) => handleInputChange("city", e.target.value)}
                />
              </div>
              <div className="user-parameter">
                <p className="setting-description">State</p>
                <input
                  className="input-large"
                  type="text"
                  value={userDTO.state}
                  placeholder="State"
                  onChange={(e) => handleInputChange("state", e.target.value)}
                />
              </div>
              <div className="user-parameter">
                <p className="setting-description">Zip</p>
                <input
                  className="input-large"
                  type="text"
                  value={userDTO.zip}
                  placeholder="Zip"
                  onChange={(e) => handleInputChange("zip", e.target.value)}
                />
              </div>
              <div className="user-parameter">
                <p className="setting-description">Phone number</p>
                <input
                  className="input-large"
                  type="text"
                  value={userDTO.phone}
                  placeholder="Phone number"
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                />
              </div>
              <div className="user-parameter">
                <p className="setting-description">Email</p>
                <input
                  className="input-large"
                  type="text"
                  value={userDTO.email}
                  placeholder="Email"
                  onChange={(e) => handleInputChange("email", e.target.value)}
                />
              </div>
              <div className="user-parameter">
                {userDTO.isActivated ? (
                  <p className="user-parameter">User activated</p>
                ) : (
                  <p className="user-parameter">User blocked</p>
                )}
                <label className="switch">
                  <input
                    type="checkbox"
                    checked={userDTO.activated}
                    onChange={(e) =>
                      handleInputChange("activated", e.target.checked)
                    }
                  />
                  <span className="slider round"></span>
                </label>
              </div>
              <div className="user-parameter save-btn-box">
                <button
                  className="btn"
                  onClick={e => console.log(userDTO)}
                >
                  Save changes
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="cashier-box">
          <div id="cashier"></div>
        </div>
      </div>
    </section>
  );
}

export default Cashier;
