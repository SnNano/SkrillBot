import { Link, useLocation } from "react-router-dom"
import { useState, useEffect } from "react";
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import { RemainingWordsContext, UserContext } from "../../App";
import { useContext } from "react";
import { login } from "../../services/userService";
import GeneralSpinner from "../../components/layouts/GeneralSpinner";
import google from "../../assets/images/googleLogo.png";
import { Helmet } from "react-helmet-async";


const Login = () => {

  const navigate = useNavigate();
  const { state, dispatch } = useContext(UserContext);
  const { setRemainingWords } = useContext(RemainingWordsContext);
  const location = useLocation();
  const { from } = location.state || { from: { pathname: '/dashboard' } };
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
    const response = await login(formData, dispatch);
    setRemainingWords(response.user.characters);
    navigate(from, { replace: true });
  }

  const redirectToGoogleSSO = async () => {
    const googleLoginURL = `${process.env.REACT_APP_BACKEND_URL}auth/google`;
    window.open(
      googleLoginURL,
      "_self",
    );
  };

  if (state.isLoading) {
    return <GeneralSpinner />
  }
  return (
    <>
      <Helmet>
        <title>SkrillBot | Login</title>
        <meta name="description" content="Securely Access Skrillbot's Writing and Coding Services | Login to Your Account and Get Started Today" />
        <meta rel="canonical" href="/login" />
      </Helmet>
      <div className=" bg-gradient-to-r from-pink-500 to-blue-500 h-screen">
        <div className="h-full container mx-auto px-12 flex justify-center items-center">
          <div className="flex items-center justify-center">
            <div className="max-w-xl w-[400px] relative rounded-lg bg-white shadow-md p-6">
              <h1 className="text-2xl text-center mt-6 mb-4 font-bold">Login</h1>
              <div className="px-12">
                <form className="" onSubmit={handleSubmit}>
                  <div className="relative z-0 w-full mb-6 group">
                    <input autoComplete="off" minLength={5} maxLength={100} type="email" value={email} onChange={handleChange} name="email" id="email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-pink-600 peer" placeholder=" " required />
                    <label htmlFor="email" className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-pink-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"><i className="fa-regular fa-envelope mr-3"></i> Email address</label>
                  </div>
                  <div className="relative z-0 w-full mb-6 group">
                    <input type="password" minLength={5} maxLength={100} value={password} onChange={handleChange} name="password" id="password" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-pink-600 peer" placeholder=" " required />
                    <label htmlFor="password" className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-pink-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"><i className="fa-solid fa-unlock mr-3"></i>Password</label>
                  </div>
                  <button type="submit" className="inline-block rounded-full px-6 py-2.5 bg-gradient-to-r from-pink-500 to-blue-500 text-white font-medium text-xs leading-tight uppercase rounded hover:scale-90 focus:bg-gray-100 focus:outline-none focus:ring-0 active:bg-gray-200 transition duration-150 ease-in-out w-full">LOGIN</button>
                  <div className="my-6 text-center text-sm text-gray-600">
                    <span>Or Login with</span>
                  </div>
                  <div className="flex justify-center mb-6">
                    <p onClick={redirectToGoogleSSO} className="cursor-pointer flex items-center justify-center bg-transparent w-full px-4 py-2 rounded-full border border-gray-200 hover:border-gray-400">
                      <img src={google} alt="google logo" className="w-6 h-6 mr-3" />
                      <span className="text-black">Google</span>
                    </p>
                  </div>
                </form>
                <div className="mt-32">
                  <div className="text-sm text-center my-4">
                    <Link to="/sign-up">Don't have an account? Click here to <span className="text-indigo-700 font-medium">Sign up!</span></Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
export default Login