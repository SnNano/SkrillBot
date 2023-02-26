import { Link } from "react-router-dom"
import { useState, useEffect } from "react";
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../App";
import { useContext } from "react";
import { login } from "../../services/userService";
import GeneralSpinner from "../../components/layouts/GeneralSpinner";


const Login = () => {

  const navigate = useNavigate();
  const {state, dispatch} = useContext(UserContext);

  const [formData, setFormData] = useState({
    email:"",
    password:""
  });

  const {email, password} = formData;

  useEffect(()=>{
    if(state.isError){
      toast.error(state.message);
    }
    if(state.user || state.isSuccess){
      navigate("/essay");
    }
    dispatch({type:"RESET"});
  }, [state.isError, state.isLoading, state.isSuccess, state.user, state.message, navigate, dispatch]);


  const handleChange = (e) => {
    setFormData((prevState)=>({
      ...prevState,
      [e.target.name]:e.target.value
    }));
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(formData, dispatch)
  }

  if(state.isLoading){
    return <GeneralSpinner />
  }
  return (
    <div>
    <header>
        <nav className="bg-white py-6 shadow-md flex justify-center">
            <Link to="/">SkrillBot</Link>
        </nav>
    </header>
    <div className="min-h-screen w-full relative">
        <div className="hidden gradients lg:flex justify-center items-center">
            <div className="absolute left-[5%] top-0 rounded-full cyan "></div>
            <div className="absolute right-[5%] top-0 rounded-full red"></div>
        </div>
        <div className="mt-12 flex flex-col items-center justify-center">
            <h3 className="text-6xl md:text-4xl text-center max-w-[40rem]">Log in with your email and password!</h3>
            <form className="mt-12 md:max-w-md" onSubmit={handleSubmit}>
                <div className="mb-6">
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <i className="fa-regular fa-envelope w-5 h-5 text-gray-500"></i>
                        </div>
                        <input type="email" value={email} onChange={handleChange} id="email" name="email" className="outline-0 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full pl-10 p-2.5" placeholder="name@gmail.com" />
                    </div>
                </div>
                <div className="mb-6">
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <i className="fa-solid fa-lock w-5 h-5 text-gray-500"></i>
                        </div>
                        <input type="password" value={password} onChange={handleChange} id="password" name="password" className="outline-0 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full pl-10 p-2.5" placeholder="Password" />
                    </div>
                </div>
                <div className="mb-6 flex justify-center">
                    <button className="uppercase rounded-lg px-6 py-2 text-md bg-green-700 text-white hover:bg-green-800">Log in</button>
                </div>
                <div className="text-sm text-center">
                    <Link to="/sign-up">Don't have an account? Click here to <span className="text-green-700">Sign up!</span></Link>
                </div>
            </form>   
        </div>
    </div>
</div>
  )
}
export default Login