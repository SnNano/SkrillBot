import { Link, useParams } from "react-router-dom"
import { toast } from 'react-toastify';
import { UserContext } from "../../App";
import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { referralCode, register } from "../../services/userService";
import GeneralSpinner from "../../components/layouts/GeneralSpinner";
import LeftLoginSignup from "../../components/layouts/LeftLoginSignup";
import google from "../../assets/images/googleLogo.png";
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'


const Signup = () => {

    const { state, dispatch } = useContext(UserContext);
    const [phone, setPhoneNumber] = useState('');
    const { referralId } = useParams();

    const [formData, setFormData] = useState({
        username: '', email: '',
        phone: "", password: '',
        cpassword: ''
    });
    const { username, email, password, cpassword } = formData;
    const navigate = useNavigate();

    useEffect(() => {
        if (state.isError) {
            toast.error(state.message);
        }
        if (state.isSuccess || state.user) {
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
    const handleOnChange = (value) => {
        setPhoneNumber(value);
    };
    // Submit the htmlForm
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== cpassword) {
            toast.error("Password mismatch", {
                position: toast.POSITION.BOTTOM_RIGHT,
            });
        } else {
            const userData = { username, email, phone, password };
            await register(userData, dispatch);
            if (referralId) {
                await referralCode(referralId);
            }
        }
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
            <div className="signTemplate h-screen w-full grid lg:grid-cols-2 grid-cols-1">
                <LeftLoginSignup />
                <div className="signColor flex justify-center items-center flex-col p-4">
                    <h3 className="mb-6 text-4xl font-semibold text-center">Sign Up</h3>
                    <form className="formWidth" onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label htmlFor="username" className="block mb-2 text-sm font-light">Username</label>
                            <input type="text" value={username} onChange={handleChange} name="username" id="username" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 focus:outline-none" placeholder="John Smith" required />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="email" className="block mb-2 text-sm font-light">Email</label>
                            <input type="email" value={email} onChange={handleChange} name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 focus:outline-none" placeholder="john@gmail.com" required />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="phone" className="block mb-2 text-sm font-light">Phone Number</label>
                            <PhoneInput
                                country={'us'}
                                enableSearch={true}
                                value={phone}
                                onChange={handleOnChange}
                                inputProps={{
                                    name: 'phone',
                                    required: true,
                                }}
                                inputClass="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-[100%] p-2.5 focus:outline-none"
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="password" className="block mb-2 text-sm font-light">Password</label>
                            <input type="password" value={password} onChange={handleChange} name="password" id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 focus:outline-none" placeholder="Password" required />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="cpassword" className="block mb-2 text-sm font-light">Confirm Password</label>
                            <input type="password" value={cpassword} onChange={handleChange} name="cpassword" id="cpassword" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 focus:outline-none" placeholder="Confirm Password" required />
                        </div>
                        {/* <div className="mb-6">
                            <div className="flex items-center">
                                <input id="terms" type="checkbox" value="" className="w-4 h-4 text-indigo-700 bg-gray-100 border-gray-300 rounded focus:ring-indigo-500 focus:ring-2" />
                                <label htmlFor="terms" className="ml-2 text-sm font-medium text-gray-900">I agree with the <a href="##" className="text-indigo-700 hover:underline">terms and conditions</a>.</label>
                            </div>
                        </div> */}
                        <div className="flex justify-center ">
                            <button className="w-full mb-3 rounded-lg px-4 py-2 bg-indigo-500 text-white text-md hover:bg-indigo-300">Sign Up</button>
                        </div>
                        <div className="flex justify-center mb-6">
                            <p onClick={redirectToGoogleSSO} className="cursor-pointer flex items-center justify-center bg-transparent w-full px-4 py-2 rounded-full border border-gray-200 hover:border-gray-400">
                                <img src={google} alt="google logo" className="w-6 h-6 mr-3" />
                                <span className="text-black">Google</span>
                            </p>
                        </div>
                        <div className="text-sm text-center mt-4">
                            <Link to="/login">Already signed up? Click here to <span className="text-indigo-700 font-medium">Log in!</span></Link>
                        </div>
                        <hr className="container bg-gray-400 my-4" />
                    </form>
                </div>
            </div>
        </div>
    )
}
export default Signup