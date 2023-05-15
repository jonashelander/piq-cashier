import { useContext } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import LoggedInContext from "../contexts/LoggedInContext";
import '../styles/App.css'
import UserContext from "../contexts/UserContext";




const LandingPage = (props) => {
    const { loggedIn } = useContext(LoggedInContext);
    const { user, setUser } = useContext(UserContext);
    const navigate = useNavigate();

    console.log("user balance, landingpage " + user.balance);
    console.log("user balanceCy, landingpage " + user.balanceCy);

    const handleDeposit = () => {
        // Navigate to the cashier in deposit mode.
        navigate("/deposit", { state: { method: 'deposit' } })

    }
    const handleWithdrawal = () => {
        // Navigate to the cashier in withdrawal mode.
        navigate("/withdrawal", { state: { method: 'withdrawal' } })
    }

    return (
        <div>

            {loggedIn ?
                (
                    <div className="landingPageLoggedIn">
                        <button
                            type="button"
                            onClick={handleDeposit}
                        >Deposit</button>
                        <button
                            type="button"
                            onClick={handleWithdrawal}
                        >Whitdrawal</button>
                    </div>
                )
                :
                (
                    <div className="landingPageLoggedOut">
                        <h3>Please Log In, or Sign Up...</h3>
                    </div>
                )
            }
        </div>
    );
}

export default LandingPage;