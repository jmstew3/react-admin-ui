import Single from "../../components/Single/Single";
import { singleUser } from "../../data";
import "./user.scss";

const User = () => {

  // Fetch data and send to Single Component
  return (
    <div className="user">
      <Single {...singleUser} />
    </div>
  );
};

export default User;
