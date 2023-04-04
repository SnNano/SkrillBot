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
                    {state.user && state.user.user.characters < -1 && <div className="card text-center px-4 py-2">
                        <div className="flex p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                            <svg aria-hidden="true" className="flex-shrink-0 inline w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"></path></svg>
                            <span className="sr-only">Info</span>
                            <div>
                                You have reached the characters limit. Please upgrade to get unlimited characters.
                            </div>
                        </div>
                        <div className="flex p-4 mb-4 text-sm text-blue-800 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400" role="alert">
                            <svg aria-hidden="true" className="flex-shrink-0 inline w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"></path></svg>
                            <span className="sr-only">Info</span>
                            <div>
                                Refer to friends if you would like another additional 5k characters!
                            </div>
                        </div>
                    </div>}
                    <div className="w-[80%] settings bg-white mt-6 rounded-lg shadow-lg">
                        <div className="p-4">
                            <h3 className="font-normal text-lg mb-2">Subscription</h3>
                            <p className="text-sm text-gray-400">Upgrade your subscription to save</p>
                        </div>
                        <hr className="bg-gray-400 my-2" />
                        <div className="p-4">
                            <div className="">
                                <h3 className="font-normal text-md mb-2">Current Plan: <span className="capitalize font-light">{state.user.user.plan}</span></h3>
                                <button onClick={() => setShowModal(true)} className="px-4 py-2 bg-pink-400 text-md font-light text-white border border-pink-400 hover:bg-transparent hover:text-pink-400 rounded-lg w-[220px]">Upgrade plan</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
            <Modal showModal={showModal} setShowModal={setShowModal} />
        </>
    )
}
export default Billing