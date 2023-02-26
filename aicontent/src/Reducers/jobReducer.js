
// Get user from localStorage
const user = JSON.parse(localStorage.getItem("user"));
export const initialState = {
    jobs:[],
    job:{},
    user: user ? user : null,
    isLoading:true,
    isError:false,
    isSuccess:false,
    search:'',
    message:""
}

export const jobReducer = (state, action) => {
    switch(action.type) {
        case "ADD_JOB":
            return {...state,
                isLoading: true,
                isError:false,
                isSuccess: true,
                message:"Job offer added successfully"
            }
        case "EDIT_JOB":
            return {...state,
                isLoading: true,
                isError:false,
                isSuccess: true,
                message:"Job offer edited successfully"
            }
        case "DELETE_JOB":
            return {...state,
                jobs:state.jobs.filter((job)=>job._id !== action.payload),
                isLoading: true,
                isError:false,
                isSuccess: true,
                message:"Job offer deleted successfully"
            }
        case "SINGLE_JOB":
            return {...state,
                job:action.payload,
                isLoading: true,
                isError:false,
                isSuccess: true,
            }
        case "FETCH_JOBS":
            return {...state,
                jobs:action.payload,
                isLoading:false,
                isError:false,
                isSuccess: true
              }
        case "FILTER_JOBS":
            return {...state,
                isLoading:false,
                isError:false,
                isSuccess: true,
                search:action.search
              }
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