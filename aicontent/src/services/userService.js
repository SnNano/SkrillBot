import axios from "axios";


export const verifyEmail = async (url) => {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.log("Error response:", error.response.data.message);
  }
}


export const register = async (userData, dispatch, tokenRef) => {
  try {
    let response;
    if (!tokenRef) {
      response = await axios.post(process.env.REACT_APP_BACKEND_URL + "users", userData);
    } else {
      response = await axios.post(process.env.REACT_APP_BACKEND_URL + "users/" + tokenRef, userData);
    }
    dispatch({ type: "REGISTER_USER", payload: response.data.message });
    // dispatch({ type: "REGISTER_USER", payload: response.data });
    // localStorage.setItem("skrill_user", JSON.stringify(response.data));
    // return response.data;
  } catch (error) {
    dispatch({ type: "ERROR", payload: error.response.data.message });
  }
}

export const login = async (userData, dispatch) => {
  try {
    const response = await axios.post(process.env.REACT_APP_BACKEND_URL + "users/login", userData);
    dispatch({ type: "LOGIN_USER", payload: response.data });
    localStorage.setItem("skrill_user", JSON.stringify(response.data));
    return response.data;
  } catch (error) {
    if (error.response.data) {
      dispatch({ type: "ERROR", payload: error.response.data.message });
    } else {
      dispatch({ type: "ERROR", payload: error });
    }
  }
}
// export const addPhoneNumber = async (data, dispatch) => {
//   try {
//     const response = await axios.post(process.env.REACT_APP_BACKEND_URL + "users/phone-number", data, {
//       headers: { 'x-access-token': getToken() }
//     });
//     dispatch({ type: "LOGIN_USER", payload: response.data });
//     localStorage.setItem("skrill_user", JSON.stringify(response.data));
//   } catch (error) {
//     dispatch({ type: "ERROR", payload: error.response.data.message });
//   }
// }



export const updateCharacters = async () => {
  await axios.get(process.env.REACT_APP_BACKEND_URL + 'users/update-characters', {
    headers: {
      'x-access-token': getToken()
    }
  });
}

export const fetchAuthUserGoogle = async (dispatch) => {
  try {
    const response = await axios.get(process.env.REACT_APP_BACKEND_URL + "users/auth/user", { withCredentials: true });
    dispatch({ type: "LOGIN_USER", payload: response.data });
    localStorage.setItem("skrill_user", JSON.stringify(response.data));
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
    localStorage.setItem("skrill_user", JSON.stringify(response.data));
  } catch (error) {
    console.log(error)
    dispatch({ type: "ERROR", payload: error.response.data.message });
  }
}

export const Logout = async (state, dispatch) => {
  if (state.user.user.googleId || state.user.user.facebookId) {
    await axios.get(process.env.REACT_APP_BACKEND_URL + "users/auth/logout", { withCredentials: true });
  }
  dispatch({ type: "LOGOUT" });
  localStorage.removeItem("skrill_user");
  dispatch({ type: "RESET" });
}
const getToken = () => {
  const user = JSON.parse(localStorage.getItem("skrill_user"));
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