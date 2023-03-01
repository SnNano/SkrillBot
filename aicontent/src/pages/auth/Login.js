import { Link } from "react-router-dom"
import { useState, useEffect } from "react";
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../App";
import { useContext } from "react";
import { login } from "../../services/userService";
import GeneralSpinner from "../../components/layouts/GeneralSpinner";
import LeftLoginSignup from "../../components/layouts/LeftLoginSignup";


const Login = () => {

  const navigate = useNavigate();
  const { state, dispatch } = useContext(UserContext);

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const { email, password } = formData;

  useEffect(() => {
    if (state.isError) {
      toast.error(state.message);
    }
    if (state.user || state.isSuccess) {
      navigate("/dashboard");
    }
    dispatch({ type: "RESET" });
  }, [state.isError, state.isLoading, state.isSuccess, state.user, state.message, navigate, dispatch]);


  const handleChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(formData, dispatch)
  }

  const redirectToGoogleSSO = async () => {
    const googleLoginURL = "http://localhost:5000/api/auth/google";
    window.open(
      googleLoginURL,
      "_self",
    );
  };

  if (state.isLoading) {
    return <GeneralSpinner />
  }
  return (
    <div className="h-full flex justify-center items-center">
      <div className="signTemplate h-screen w-full signTemplate grid lg:grid-cols-2 grid-cols-1">
        <LeftLoginSignup />
        <div className="flex justify-center items-center flex-col shadow-lg signColor p-4">
          <h3 className="mb-6 text-4xl font-semibold text-center">Log in</h3>
          <form className="formWidth" onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="email" className="block mb-2 text-sm font-light">Email</label>
              <input type="email" value={email} onChange={handleChange} name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 focus:outline-none" placeholder="john@gmail.com" />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block mb-2 text-sm font-light">Password</label>
              <input type="password" value={password} onChange={handleChange} name="password" id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 focus:outline-none" placeholder="Password" />
            </div>
            <div className="flex justify-center flex-col">
              <button className="rounded-lg w-full mb-3 px-4 py-2 bg-indigo-500 text-white text-md hover:bg-indigo-300">Log In</button>
              <button onClick={redirectToGoogleSSO} className="text-red-500 bg-transparent px-4 py-2 rounded-full border border-gray-200">
                <i className="fa-brands fa-google mr-3"></i>
                <span className="text-red-500">Google</span>
              </button>
            </div>
            <hr className="container bg-gray-400 my-4" />
            <div className="text-sm text-center my-4">
              <Link to="/sign-up">Don't have an account? Click here to <span className="text-indigo-700 font-medium">Sign up!</span></Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
export default Login