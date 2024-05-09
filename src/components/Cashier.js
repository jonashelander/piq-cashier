import { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import LoggedInContext from "../contexts/LoggedInContext";
import _PaymentIQCashier from "paymentiq-cashier-bootstrapper";
import "../styles/App.css";

const cashierInstance = (props) => {
  new _PaymentIQCashier(
    "#cashier",
    {
      merchantId: "2906",
      userId: localStorage.getItem("userId"),
      sessionId: localStorage.getItem("sessionId"),
      environment: "test", // if not set, defaults to production
      // method: props.method, // if not set, defaults to deposit
      method: "deposit", // if not set, defaults to deposit
      containerHeight: "auto",
      containerWidth: "400px",
      autoOpenFirstPaymentMethod: false,
      showFooter: false,
      // showAccounts: "inline",
      // autoProcess: "true",
      // accountId: "",
      //font: "google, Inter",
      //fetchConfig: "true",
      // providerType: "creditcard",
      // amount: "10",
      //listType: 'grid',
      // lastUsedDepositAmount: true,
      // predefinedValues: false,
      theme: {
        input: {
          color: "#555",
          fontSize: "12px",
          borderRadius: "9px",
        },
        inputbackground: {
          color: "#ebfbee",
        },
        labels: {
          color: "#444",
          fontSize: "14px",
        },
        headings: {
          color: "#333",
        },
        buttons: {
          color: "#2f9e44",
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
        success: (data) =>
          console.log("Successful transaction completed", data),
      });
      api.css(`
      #cashier{
        box-shadow: 0 2.4rem 4.8rem rgba(0, 0, 0, 0.075);
      }
      `);
    }
  );
};

function Cashier() {
  const [mid, setMid] = useState("2906");
  const location = useLocation();

  useEffect(() => {
    cashierInstance(location.state);
  });

  return <div id="cashier"></div>;
}

export default Cashier;
