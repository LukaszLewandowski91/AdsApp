import { useDispatch } from "react-redux";
import { API_URL } from "../../../config";
import { logOut } from "../../../redux/usersRedux";
import { useEffect } from "react";
const Logout = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const options = {
      method: "DELETE",
    };

    fetch(`${API_URL}logout`, options).then(() => {
      dispatch(logOut());
    });
  }, [dispatch]);
  return null;
};

export default Logout;
