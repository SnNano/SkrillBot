import { UserContext } from "../../App";
import { useContext, useEffect, useState } from "react";
import BreadCumb from "../layouts/BreadCumb";
import Sidebar from "../layouts/Sidebar";
import { Link, useNavigate } from "react-router-dom";
import { Logout } from "../../services/userService";


const Settings = () => {
    const { state, dispatch } = useContext(UserContext);
    const [isSuccess, setIsSuccess] = useState(false);
    const [referralLink, setReferralLink] = useState('');
    const navigate = useNavigate();
    const onLogout = async () => {
        await Logout(state, dispatch);
        navigate("/login");
    }
    useEffect(() => {
        setReferralLink(`${window.location.origin}/sign-up/${state.user.user.referralId}`);
    }, [state.user.user.referralId])
    const copyToClip = () => {
        navigator.clipboard.writeText(referralLink);
        setIsSuccess(true);
        setTimeout(() => {
            setIsSuccess(false);
        }, 3000)
    }
    return (
        <>
            <BreadCumb header="Settings" />
            <Sidebar />
            <div className="mt-4">
                <div className="flex flex-col justify-center items-center p-4 pb-20">
                    <div className="flex justify-center w-full">
                        <div className="mb-1">
                            <Link to="/terms-of-use" className={`rounded-full mr-2 py-2 px-6 border border-indigo-500 hover:bg-indigo-500 hover:text-white text-indigo-500 bg-white`}>Terms of use</Link>
                            <Link to="/billing" className={`rounded-full mr-2 py-2 px-6 border border-indigo-500 hover:bg-indigo-500 hover:text-white text-indigo-500 bg-white`}>Subscription</Link>
                            <button onClick={onLogout} className={`rounded-full mr-2 py-2 px-6 border border-indigo-500 hover:bg-indigo-500 hover:text-white text-indigo-500 bg-white`}>Sign out</button>

                        </div>
                    </div>
                    <div className="w-[80%] settings bg-white mt-6 rounded-lg shadow-lg">
                        <div className="p-4">
                            <h3 className="font-normal text-lg mb-2">Personal Information</h3>
                            <p className="text-sm text-gray-400">Update your Settings here</p>
                        </div>
                        <hr className="bg-gray-400 my-2" />
                        <div className="p-4">
                            <div className="flex justify-between items-center flex-row">
                                <h3 className="font-semibold text-gray-700 text-md mb-2">Personalization Settings</h3>
                                <Link to="/billing" className="btn bg-indigo-600 text-white px-4 py-2 rounded-md outline-0 hover:bg-indigo-800 transition ease-in duration-150">Subscribe</Link>
                            </div>
                        </div>
                        <hr className="bg-gray-400 my-2" />
                        <div className="p-4">
                            <div className="flex justify-between items-center flex-row">
                                <h3 className="font-semibold text-gray-700 text-md mb-2">Email</h3>
                                <p className="text-md font-light text-black px-4 py-2 rounded-md ">{state.user ? state.user.user.email : ''}</p>
                            </div>
                        </div>
                        <hr className="bg-gray-400 my-2" />
                        <div className="p-4">
                            <div className="flex justify-between items-center flex-row">
                                <h3 className="font-semibold text-gray-700 text-md mb-2">Referral Link</h3>
                                <div>
                                    <p className="text-md font-semibold text-indigo-500 px-4 py-2 rounded-md cursor-pointer" onClick={copyToClip} >Copy referral Link</p>
                                    {isSuccess && <p className="text-md text-purple-700 px-4 py-2 font-light">The text is copied</p>}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Settings