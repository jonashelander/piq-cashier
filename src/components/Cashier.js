import _PaymentIQCashier from "paymentiq-cashier-bootstrapper";
import { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import LoggedInContext from "../contexts/LoggedInContext";

import "../styles/App.css";

const cashierInstance = (props) => {
  const createTxlog = () => {
    const logId = uuidv4();
    console.log(logId);
  };

  new _PaymentIQCashier(
    ".cashier",
    {
      // merchantId: "2906",
      merchantId: "2906",
      // // userId: localStorage.getItem("userId"),
      userId: "JonasEUR",
      // // sessionId: localStorage.getItem("sessionId"),
      sessionId: "1b83f773-9d28-4da4-a9a4-51aeb0175289",
      environment: "test", // if not set, defaults to production
      method: props.method, // if not set, defaults to deposit
      containerHeight: "auto",
      containerWidth: "400px",
      autoOpenFirstPaymentMethod: false,
      showAccounts: "inline",
      // autoProcess: "true",
      // accountId: "",
      //font: "google, Inter",
      //fetchConfig: "true",
      providerType: "creditcard",
      amount: "10",
      //listType: 'grid',
      // lastUsedDepositAmount: true,
      // predefinedValues: false,
    },
    (api) => {
      console.log("Cashier intialized and ready to take down the empire");
      // register callbacks
      api.on({
        cashierInitLoad: () =>
          console.log("The cashier successfully loaded and is ready"),
        cashierInitLoad: () => createTxlog(),
        success: (data) =>
          console.log("Successful transaction completed", data),
      });
    }
  );
};

function Cashier() {
  const [mid, setMid] = useState("2906");
  const location = useLocation();

  useEffect(() => {
    cashierInstance(location.state);
  });

  return <div className="cashier"></div>;
}

export default Cashier;
