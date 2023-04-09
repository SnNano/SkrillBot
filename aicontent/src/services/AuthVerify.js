import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const parseJwt = (token) => {
  try {
    return JSON.parse(atob(token.split(".")[1]));
  } catch (e) {
    return null;
  }
};

const AuthVerify = (props) => {
  let location = useLocation();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("skrill_user"));
    if (user) {
      const decodedJwt = parseJwt(user.token);
      if (decodedJwt.exp * 1000 < Date.now()) {
        props.logout();
      }
    }
  }, [location, props]);

  return;
};

export default AuthVerify;