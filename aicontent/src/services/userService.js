import axios from "axios";


export const register = async (userData, dispatch) => {
  try {
    const response = await axios.post(process.env.REACT_APP_BACKEND_URL + "users", userData);
    dispatch({ type: "REGISTER_USER", payload: response.data });
    localStorage.setItem("user", JSON.stringify(response.data));
    return response.data;
  } catch (error) {
    dispatch({ type: "ERROR", payload: error.response.data.message });
  }
}

export const login = async (userData, dispatch) => {
  try {
    const response = await axios.post(process.env.REACT_APP_BACKEND_URL + "users/login", userData);
    dispatch({ type: "LOGIN_USER", payload: response.data });
    localStorage.setItem("user", JSON.stringify(response.data));
    return response.data;
  } catch (error) {
    dispatch({ type: "ERROR", payload: error.response.data.message });
  }
}
export const addPhoneNumber = async (data, dispatch) => {
  try {
    const response = await axios.post(process.env.REACT_APP_BACKEND_URL + "users/phone-number", data, {
      headers: { 'x-access-token': getToken() }
    });
    dispatch({ type: "LOGIN_USER", payload: response.data });
    localStorage.setItem("user", JSON.stringify(response.data));
  } catch (error) {
    dispatch({ type: "ERROR", payload: error.response.data.message });
  }
}



export const referralCode = async (referralId) => {
  await axios.get(process.env.REACT_APP_BACKEND_URL + 'users/' + referralId);
}
export const fetchAuthUserGoogle = async (dispatch) => {
  try {
    const response = await axios.get(process.env.REACT_APP_BACKEND_URL + "users/auth/user", { withCredentials: true });
    dispatch({ type: "LOGIN_USER", payload: response.data });
    localStorage.setItem("user", JSON.stringify(response.data));
  } catch (error) {
    console.log(error)
    dispatch({ type: "ERROR", payload: error.response.data.message });
  }
}
export const fetchAuthUser = async (dispatch) => {
  try {
    const response = await axios.get(process.env.REACT_APP_BACKEND_URL + "users/auth/refresh", {
      headers: {
        'x-access-token': getToken()
      }
    });
    dispatch({ type: "LOGIN_USER", payload: response.data });
    localStorage.setItem("user", JSON.stringify(response.data));
  } catch (error) {
    console.log(error)
    dispatch({ type: "ERROR", payload: error.response.data.message });
  }
}

export const Logout = async (state, dispatch) => {
  console.log(state.user.user.googleId)
  if (state.user.user.googleId || state.user.user.facebookId) {
    await axios.get(process.env.REACT_APP_BACKEND_URL + "users/auth/logout", { withCredentials: true });
  }
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