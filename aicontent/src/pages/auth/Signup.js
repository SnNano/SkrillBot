import { Link, useParams } from "react-router-dom"
import { toast } from 'react-toastify';
import { UserContext } from "../../App";
import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { referralCode, register } from "../../services/userService";
import GeneralSpinner from "../../components/layouts/GeneralSpinner";
import google from "../../assets/images/googleLogo.png";


const Signup = () => {

    const { state, dispatch } = useContext(UserContext);
    const { referralId } = useParams();

    const [formData, setFormData] = useState({
        username: '', email: '',
        password: '',
        cpassword: ''
    });
    const { username, email, password, cpassword } = formData;
    const navigate = useNavigate();

    useEffect(() => {
        if (state.isError) {
            toast.error(state.message);
        }
        if (state.isSuccess || (state.user && state.user.user.phone)) {
            navigate('/dashboard');
        }

        dispatch({ type: "RESET" });
    }, [state.isError, state.isSuccess, state.isLoading, state.message, navigate, state.user, dispatch]);

    // setForm data values
    const handleChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    }

    // Submit the htmlForm
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== cpassword) {
            toast.error("Password mismatch", {
                position: toast.POSITION.BOTTOM_RIGHT,
            });
        } else {
            const userData = { username, email, password };
            const response = await register(userData, dispatch);
            if (response) {
                navigate("/complete-signup");
            }
            if (referralId) {
                await referralCode(referralId);
            }
        }
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
            <div className=" bg-gradient-to-r from-pink-500 to-blue-500 h-screen">
                <div className="h-full container mx-auto px-12 flex justify-center items-center">
                    <div className="flex items-center justify-center">
                        <div className="max-w-xl w-[400px] relative rounded-lg bg-white shadow-md p-6">
                            <h1 className="text-2xl text-center mt-6 mb-4 font-bold">Signup</h1>
                            <div className="px-12">
                                <form className="" onSubmit={handleSubmit}>
                                    <div className="relative z-0 w-full mb-6 group">
                                        <input autoComplete="off" type="text" value={username} onChange={handleChange} name="username" id="username" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-pink-600 peer" placeholder=" " required />
                                        <label htmlFor="username" className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-pink-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"><i className="fa-regular fa-user mr-3"></i>Username</label>
                                    </div>
                                    <div className="relative z-0 w-full mb-6 group">
                                        <input autoComplete="off" type="email" value={email} onChange={handleChange} name="email" id="email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-pink-600 peer" placeholder=" " required />
                                        <label htmlFor="email" className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-pink-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"><i className="fa-regular fa-envelope mr-3"></i> Email</label>
                                    </div>
                                    <div className="relative z-0 w-full mb-6 group">
                                        <input type="password" value={password} onChange={handleChange} name="password" id="password" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-pink-600 peer" placeholder=" " required />
                                        <label htmlFor="password" className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-pink-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"><i className="fa-solid fa-unlock mr-3"></i>Password</label>
                                    </div>
                                    <div className="relative z-0 w-full mb-6 group">
                                        <input type="password" value={cpassword} onChange={handleChange} name="cpassword" id="cpassword" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-pink-600 peer" placeholder=" " required />
                                        <label htmlFor="cpassword" className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-pink-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"><i className="fa-solid fa-unlock mr-3"></i>Confirm Password</label>
                                    </div>
                                    <button type="submit" className="inline-block rounded-full px-6 py-2.5 bg-gradient-to-r from-pink-500 to-blue-500 text-white font-medium text-xs leading-tight uppercase rounded hover:scale-90 focus:bg-gray-100 focus:outline-none focus:ring-0 active:bg-gray-200 transition duration-150 ease-in-out w-full">SIGNUP</button>
                                    <div className="my-6 text-center text-sm text-gray-600">
                                        <span>Or Signup with</span>
                                    </div>
                                    <div className="flex justify-center mb-6">
                                        <p onClick={redirectToGoogleSSO} className="cursor-pointer flex items-center justify-center bg-transparent w-full px-4 py-2 rounded-full border border-gray-200 hover:border-gray-400">
                                            <img src={google} alt="google logo" className="w-6 h-6 mr-3" />
                                            <span className="text-black">Google</span>
                                        </p>
                                    </div>
                                </form>
                                <div className="mt-6">
                                    <div className="text-sm text-center my-4">
                                        <Link to="/login">Already have an account? Click here to <span className="text-indigo-700 font-medium">Sign up!</span></Link>
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
export default Signup