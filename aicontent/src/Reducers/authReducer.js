

// Get user from localStorage
const user = JSON.parse(localStorage.getItem("user"));

export const initialState = {
    user: user ? user : null,
    isLoading:false,
    isError:false,
    isSuccess:false,
    message:""
  }
export const authReducer = (state, action) => {
    switch(action.type){
        case "REGISTER_USER":
            return {...state,
                user:action.payload,
                isLoading:true,
                isError:false,
                isSuccess: true,
                message:"User has been created"
                };
        case "LOGIN_USER":
            return {...state,
                user:action.payload,
                isLoading:true,
                isError:false,
                isSuccess: true,
                message:"User is loggedIn"
                };
        case "LOGOUT":
            return {...state,
                user:null,
                isLoading:true,
                };
        case "ERROR":
            return {...state,
                isLoading:false,
                isError:true,
                isSuccess: false,
                message:action.payload
              }
        case "RESET":
            return {
                ...state,
                isLoading:false,
                isError:false,
                isSuccess: false,
                message:""
            };
        default:
            throw new Error("You are dispatching something that is not in reducer");
 }

}

