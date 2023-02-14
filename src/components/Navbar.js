import { useState } from "react";
import "../styles/Navbar.css";

function Navbar() {
  const [balance, setBalance] = useState(1000);

  return (
    <header className="navbar">
      <h1>PaymentIQ Casino Demo</h1>
      <h3>Balance: $ {balance}</h3>

      <nav>
        <a href="www.dn.se">Sing out</a>
      </nav>
    </header>
  );
}

export default Navbar;
