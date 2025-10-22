import "../styles/App.css";
import VerifyUser from "../responses/VerifyUser";
import Authorize from "../responses/Authorize";
import Transfer from "../responses/Transfer";
import Cancel from "../responses/Cancel";

function Dashboard() {
  return (
    <div className="container dashboard grid grid--2-cols">
      <div className="section-response  ">
        <VerifyUser />
        <Authorize />
        <Transfer />
        <Cancel />
      </div>
    </div>
  );
}

export default Dashboard;
