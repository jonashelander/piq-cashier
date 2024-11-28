 
import { Route, useNavigate } from "react-router-dom";
import LoggedInContext from "../contexts/LoggedInContext";
import _PaymentIQCashier from "paymentiq-cashier-bootstrapper";
import UserContext from "../contexts/UserContext";
import "../styles/App.css";
import "../styles/General.css";
import { fetchUser, updateUser } from "../api/authApi";
import { SignOut } from "@phosphor-icons/react";
import { useContext, useEffect, useState } from 'react';

function Cashier() {
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);
  const [mid, setMid] = useState("1000");
  const [method, setMethod] = useState("deposit");
  const [data, setData] = useState({});

  const handleUpdateUser = (userId, userDTO) => {
    updateUser(userId, userDTO)
      .then((response) => {
        if (response.status === 200) {
          setUser(response.data);
        }
      })
      // .then(() => {
      //   document.getElementsByClassName("balance")[0].innerHTML = data.status;
      // });
    };

    const handleFetchUser = (userId) => {
      fetchUser(userId)
      .then((res) => {
        console.log(res)
        if(res.status === 200) {
          document.getElementsByClassName("balance")[0].innerHTML = res.data.balance;
        }
      })
    }
    
    const handleMidChange = (event) => {
    setMid(event.target.value);
    localStorage.setItem("mid", mid);
    // window._PaymentIQCashierReset();
  };

  const handleMethodChange = () => {
    window._PaymentIQCashierReset();
    var selectedMethod = document.getElementById("method").value;
    setMethod(selectedMethod);
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
        containerHeight: "650px",
        containerWidth: "auto",
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
          success: (data) => handleFetchUser(user.userId)
          // success: (data) => console.log("Successful testing")
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
    window._PaymentIQCashierReset();    
    cashierInstance();
  }, [mid, method]);

  return (
    <section className="section-cashier">
      <div className="cashier">
        <div className="cashier-settings-box">
          <div className="cashier-settings">
            <h1 className="heading-primary">Cashier settings</h1>
            <p className="cashier-description">
              Choose your MID. Then choose the method, either deposit or
              withdrawal. The cashier always defaults to PaymentIQ's master MID
              1000 and the method deposit.
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
