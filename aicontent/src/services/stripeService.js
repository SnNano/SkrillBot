import axios from "axios";


export const stripeSubscription = async (dispatch) => {
    try {
        const response = await axios.post(process.env.REACT_APP_BACKEND_URL + "stripe/stripe/cancel", {}, {
            headers: { 'x-access-token': getToken() }
        });
        console.log(response)
    } catch (error) {
        console.log(error)
        //dispatch({ type: "ERROR", payload: error.response.data.message });
    }
}
export const cancelSubscription = async (dispatch) => {
    try {
        const response = await axios.post(process.env.REACT_APP_BACKEND_URL + "stripe/stripe/cancel", {}, {
            headers: { 'x-access-token': getToken() }
        });
        console.log(response)
    } catch (error) {
        console.log(error)
        //dispatch({ type: "ERROR", payload: error.response.data.message });
    }
}

const getToken = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    return user.token;
}
