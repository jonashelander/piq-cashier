import { useState } from "react";
import "../styles/Navbar.css";

function Navbar() {
  const [balance, setBalance] = useState(1000);

  const test = () => setBalance( balance + 10);

  return (
    <header className="navbar">
      <h1>PaymentIQ Casino Demo</h1>
      <h3>Balance: $ {balance}</h3>

      <nav>
        <button onClick={test}>Sign up</button>
      </nav>
    </header>
  );
}

export default Navbar;
