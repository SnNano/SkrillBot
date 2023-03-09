import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { toast } from 'react-toastify';

import { UserContext } from "../../App";
import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import GeneralSpinner from "../../components/layouts/GeneralSpinner";
import LeftLoginSignup from "../../components/layouts/LeftLoginSignup";
import { addPhoneNumber } from '../../services/userService';
import { parsePhoneNumber } from 'libphonenumber-js';


const Phone = () => {
    const [phone, setPhoneNumber] = useState('');
    const [country, setCountry] = useState('');
    const { state, dispatch } = useContext(UserContext);
    const navigate = useNavigate();

    const handleOnChange = (value, country) => {
        setPhoneNumber(value);
        setCountry(country);
    };
    useEffect(() => {
        if (state.isError) {
            toast.error(state.message);
        }
        if (state.isSuccess || (state.user && state.user.user.phone)) {
            navigate('/dashboard');
        }
        dispatch({ type: "RESET" });
    }, [state.isError, state.isSuccess, state.message, navigate, state.user, dispatch]);

    // Submit the htmlForm
    const handleSubmit = async (e) => {
        e.preventDefault();
        const parsedNumber = parsePhoneNumber(phone.toString(), country.countryCode.toUpperCase());
        if (parsedNumber && parsedNumber.isValid()) {
            const response = await addPhoneNumber({ email: state.user.user.email, phone: phone }, dispatch);
            if (response) {
                navigate("/dashboard")
            }
        } else {
            toast.error("That's not a valid phone number");
        }
    }
    if (state.isLoading) {
        return <GeneralSpinner />
    }

    return (
        <>
            <div className=" bg-gradient-to-r from-pink-500 to-blue-500 h-screen">
                <div className="h-full container mx-auto px-12 flex justify-center items-center">
                    <div className="flex items-center justify-center">
                        <div className="max-w-xl w-[400px] relative rounded-lg bg-white shadow-md p-6">
                            <h1 className="text-2xl text-center mt-6 mb-4 font-bold">Please Type your phone number</h1>
                            <div className="px-12">
                                <form className="" onSubmit={handleSubmit}>
                                    <div className="mb-4">
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
                                </form>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Phone