import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LoggedInContext from "../contexts/LoggedInContext";
import '../styles/App.css'
import UserContext from "../contexts/UserContext";
import { authUser } from "../api/authApi";




const LandingPage = (props) => {    

    const navigate = useNavigate();
    const { loggedIn, setLoggedIn } = useContext(LoggedInContext);
    const { user } = useContext(UserContext);
    const authDTO = {
        userId: user.userId,
        sessionId: user.sessionId
    }

    useEffect(() => {
        authUser(authDTO)
            .then(response => {
                if (response.data === true) {
                    console.log("User authenticated.")
                    setLoggedIn(true);
                } else console.log("User NOT authenticated.");
            })
    })

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