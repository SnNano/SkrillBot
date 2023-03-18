import { UserContext } from "../../App";
import { useContext, useState } from "react";
import Sidebar from "../layouts/Sidebar";
import Modal from "../layouts/Modal";



const Billing = () => {
    const { state } = useContext(UserContext);
    const [showModal, setShowModal] = useState(false);
    return (
        <>
            {/* <BreadCumb header="Profile" /> */}
            <Sidebar />
            <div className="mt-32">
                <div className="flex flex-col justify-center items-center p-4 pb-20">
                    {state.user && state.user.user.characters < -1 && <div className="card px-4 py-2">
                        <p className="text-red-500 text-lg">You have reached the characters limits. Please upgrade to get unlimited characters.</p>
                    </div>}
                    <div className="w-[80%] settings bg-white mt-6 rounded-lg shadow-lg">
                        <div className="p-4">
                            <h3 className="font-normal text-lg mb-2">Subscription</h3>
                            <p className="text-sm text-gray-400">Upgrade your subscription to save</p>
                        </div>
                        <hr className="bg-gray-400 my-2" />
                        <div className="p-4">
                            <div className="">
                                <h3 className="font-normal text-md mb-2">Current Plan: <span className="font-light">{state.user.user.plan}</span></h3>
                                <button onClick={() => setShowModal(true)} className="px-4 py-2 bg-pink-400 text-md font-light text-white border border-pink-400 hover:bg-transparent hover:text-pink-400 rounded-lg w-[220px]">Upgrade plan</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Modal showModal={showModal} setShowModal={setShowModal} />
        </>
    )
}
export default Billing