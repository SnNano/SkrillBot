import axios from "axios";

export const getResponse = async (prompt, creativity, cancelToken) => {
    const response = await axios.post(process.env.REACT_APP_BACKEND_URL + "chatgpt", { prompt, creativity }, {
        headers: {
            'x-access-token': getToken()
        }, cancelToken: cancelToken
    });
    return response.data;
}
export const getEssay = async (prompt, creativity, cancelToken) => {
    const response = await axios.post(process.env.REACT_APP_BACKEND_URL + "essay", { prompt, creativity }, {
        headers: {
            'x-access-token': getToken()
        }, cancelToken: cancelToken
    });
    return response.data;
}

export const rewriteText = async (prompt, cancelToken) => {
    const response = await axios.post(process.env.REACT_APP_BACKEND_URL + "rewrite", { prompt }, {
        headers: {
            'x-access-token': getToken()
        }, cancelToken: cancelToken
    });
    return response.data;
}

export const chatapi = async (prompt, creativity, cancelToken) => {

    const response = await axios.post(process.env.REACT_APP_BACKEND_URL + "chatgpt/chat", { prompt, creativity }, {
        headers: {
            'x-access-token': getToken()
        }, cancelToken: cancelToken
    });
    return response.data;
}

export const codePrompt = async (prompt, cancelToken) => {
    const response = await axios.post(process.env.REACT_APP_BACKEND_URL + "chatgpt/code", { prompt },
        {
            headers: {
                'x-access-token': getToken()
            }, cancelToken: cancelToken
        });
    return response.data;
}

export const getRandomUser = async () => {
    const response = await axios.get(process.env.REACT_APP_BACKEND_URL + "random");
    return response.data.results;
}
const getToken = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    return user.token;
}