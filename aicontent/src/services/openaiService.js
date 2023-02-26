import axios from "axios";
 
export const getResponse = async (prompt, creativity) => {
    const response = await axios.post(process.env.REACT_APP_BACKEND_URL+"chatgpt", {prompt, creativity},{
        headers:{
            'x-access-token': getToken()
        }
    });
    return response.data.result;
}
 
export const chimpRewriter = async (prompt) => {
    const response = await axios.post(process.env.REACT_APP_BACKEND_URL+"chimp", {prompt});
    return response.data.output;
}

export const codePrompt = async (prompt) => {
    const response = await axios.post(process.env.REACT_APP_BACKEND_URL+"chatgpt/code", {prompt});
    return response.data.result;
}

export const getRandomUser = async () => {
    const response = await axios.get(process.env.REACT_APP_BACKEND_URL+"random");
    return response.data.results;
}
const getToken =()=>{
    const user = JSON.parse(localStorage.getItem("user"));
    return user.token;
}