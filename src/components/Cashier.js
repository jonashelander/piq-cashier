import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import LoggedInContext from "../contexts/LoggedInContext";
import _PaymentIQCashier from "paymentiq-cashier-bootstrapper";
import UserContext from "../contexts/UserContext";
import "../styles/App.css";
import "../styles/General.css";
import { authUser, fetchUser } from "../api/authApi";

function Cashier() {
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);
  const [mid, setMid] = useState("1000");
  const [method, setMethod] = useState("deposit");

  const handleFetchUser = (userId) => {
    fetchUser(userId)
      .then((response) => {
        if (response.status === 200) {
          setUser(response.data);
          const balance = document.getElementsByClassName('user-balance-num');
          balance.textContent = user.balance;
        }
      })
      .catch((error) => {
        alert(error);
      })
  };

  const handleMidChange = (event) => {
    setMid(event.target.value);
    localStorage.setItem("mid", mid);
    // window._PaymentIQCashierReset();
  };

  const handleMethodChange = () => {
    window._PaymentIQCashierReset();
    var selectedMethod = document.getElementById("method").value;
    console.log("selected method " + selectedMethod);
    setMethod(selectedMethod);
    console.log("method " + method);
  };

  useEffect(() => {
    const cashierInstance = () => {
      new _PaymentIQCashier(
        "#cashier",
        {
          merchantId: mid,
          userId: localStorage.getItem("userId"),
          sessionId: localStorage.getItem("sessionId"),
          method: method, // if not set, defaults to deposit
          environment: "test", // if not set, defaults to production
          containerHeight: "auto",
          containerWidth: "auto",
          autoOpenFirstPaymentMethod: "false",
          showFooter: "false",
          listType: "list",
          singlePageFlow: "true",
          theme: {
            input: {
              color: "#555",
              fontSize: "12px",
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
            cashierInitLoad: () =>
              console.log("The cashier successfully loaded and is ready"),
            success: () => handleFetchUser(user.userId),
          });
          api.css(`
          #cashier{
            box-shadow: 0 2.4rem 4.8rem rgba(0, 0, 0, 0.075);
          }
          `);
        }
      );
    };
    window._PaymentIQCashierReset();
    cashierInstance();
  });

  return (
    <section className="section-cashier">
      <div className="cashier">
        <div className="cashier-settings-box">
          <div className="cashier-settings">
            <h1 className="heading-primary">Set up your cashier</h1>
            <p className="cashier-description">
              Start by choosing your PaymentIQ MID, so that the cashier knows
              what MID to send the transaction through. Then you need to choose
              the method, either deposit or withdrawal. The cashier always
              defaults to PaymentIQ's master MID 1000 and the method Deposit.
            </p>
            <div className="settings">
              <div className="input-mid-box">
                <span className="setting-description">MID</span>
                <input
                  className="input"
                  type="text"
                  value={mid}
                  placeholder="MID"
                  onChange={handleMidChange}
                />
              </div>
              <div className="input-method-box">
                <span className="setting-description">Method</span>
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
              <button className="btn btn--outline">Manage User &darr;</button>
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
