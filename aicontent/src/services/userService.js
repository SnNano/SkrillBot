import axios from "axios";


export const register = async (userData, dispatch) => {
  try {
    const response = await axios.post(process.env.REACT_APP_BACKEND_URL + "users", userData);
    dispatch({ type: "REGISTER_USER", payload: response.data });
    localStorage.setItem("user", JSON.stringify(response.data));
  } catch (error) {
    dispatch({ type: "ERROR", payload: error.response.data.message });
  }
}

export const login = async (userData, dispatch) => {
  try {
    const response = await axios.post(process.env.REACT_APP_BACKEND_URL + "users/login", userData);
    dispatch({ type: "LOGIN_USER", payload: response.data });
    localStorage.setItem("user", JSON.stringify(response.data));
  } catch (error) {
    dispatch({ type: "ERROR", payload: error.response.data.message });
  }
}
export const referralCode = async (referralId) => {
  await axios.get(process.env.REACT_APP_BACKEND_URL + 'users/' + referralId);
}
export const Logout = async (dispatch) => {
  dispatch({ type: "LOGOUT" });
  localStorage.removeItem("user");
  dispatch({ type: "RESET" });
}
const getToken = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  return user.token;
}

export const checkCharacters = async () => {
  const response = await axios.get(process.env.REACT_APP_BACKEND_URL + 'characterLimit', {
    headers: {
      'x-access-token': getToken()
    }
  })
  return response.data.characters;
}