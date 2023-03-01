import { UserContext } from "../../App";
import { useContext, useState } from "react";
import BreadCumb from "../layouts/BreadCumb";
import Sidebar from "../layouts/Sidebar";
import { Link } from "react-router-dom";
import Pricing from "./Pricing";



const Billing = () => {
    const { state } = useContext(UserContext);
    const [showModal, setShowModal] = useState(false);
    return (
        <>
            <BreadCumb header="Profile" />
            <Sidebar />
            <div className="mt-32">
                <div className="flex justify-center p-4 pb-20">
                    <div className="w-[80%] settings bg-white mt-6 rounded-lg shadow-lg">
                        <div className="p-4">
                            <h3 className="font-normal text-lg mb-2">Subscription</h3>
                            <p className="text-sm text-gray-400">Upgrade your subscription to save</p>
                        </div>
                        <hr className="bg-gray-400 my-2" />
                        <div className="p-4">
                            <div className="">
                                <h3 className="font-normal text-md mb-2">Current Plan: <span className="font-light">{state.user.user.username}</span></h3>
                                <button onClick={() => setShowModal(true)} className="px-4 py-2 bg-pink-400 text-md font-light text-white border border-pink-400 hover:bg-transparent hover:text-pink-400 rounded-lg w-[220px]">Upgrade plan</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {showModal ? (
                <>
                    <div className="transition ease-in-out delay-150 justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                        <div className="relative w-auto my-6 mx-auto max-w-3xl">
                            {/*content*/}
                            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                {/*header*/}
                                <div className="flex items-center justify-center py-4 border-b border-solid border-slate-200 rounded-t">
                                    <h3 className="text-3xl font-semibold text-center"> Join Our Program </h3>
                                </div>
                                {/*body*/}
                                <div className="relative p-6 flex-auto">
                                    <Pricing />
                                </div>
                                {/*footer*/}
                                <div className="flex items-center justify-center p-6 border-t border-solid border-slate-200 rounded-b">
                                    <button className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button" onClick={() => setShowModal(false)}>
                                        Close
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                </>
            ) : null}
        </>
    )
}
export default Billing