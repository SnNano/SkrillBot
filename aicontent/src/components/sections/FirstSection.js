import happyStudents from "../../assets/images/happyStudents.svg";
import teenager from "../../assets/images/teenSmile.jpg";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../App";
import { useContext } from "react";
import GeneralSpinner from "../layouts/GeneralSpinner";
import { Logout } from "../../services/userService";


const FirstSection = () => {
    const { state, dispatch } = useContext(UserContext);
    const navigate = useNavigate();
    const onLogout = async () => {
        await Logout(dispatch);
        navigate("/login");
    }
    if (state.isLoading) {
        return <GeneralSpinner />
    }
    return (
        <>
            <div className="pl-14 pr-12 pt-4 flex justify-between items-center">
                <div class="flex items-center space-x-2">
                    <img class="w-auto h-8" src="https://storage.googleapis.com/mixo-files/logos/thesisBot-1676073030014.svg" alt="PlumeAi logo" />
                    <p class="font-sans text-xl font-bold text-gray-900">Skrillbot</p>
                </div>
                {state.user ? (<>
                    <button onClick={onLogout} className="rounded-md text-white text-lg px-4 py-2 bg-green-400 hover:bg-green-500">Logout</button>
                </>) : (<>
                    <Link to="/login" className="rounded-md text-white text-lg px-4 py-2 bg-green-400 hover:bg-green-500">Login</Link>
                </>)}
            </div>
            <section className="pt-8 overflow-hidden sm:pt-12 lg:relative lg:pb-48">
                <div className="max-w-md px-4 mx-auto sm:max-w-3xl sm:px-6 lg:px-8 lg:max-w-7xl lg:grid lg:grid-cols-2 lg:gap-24">
                    <div>
                        <div className="mt-14">
                            <div className="mt-6 sm:max-w-xl">
                                <h1 className="text-4xl font-black tracking-tight text-gray-900 sm:text-6xl md:text-7xl">The Perfect Tool for Writing<span className="text-green-400">.</span></h1>
                                <h2 className="mt-6 text-lg text-gray-500 sm:text-xl">Unlock your writing potential with our Al-powered service. From essays to sales copy, create original and compelling content with ease and confidence, free from the worries of plagiarism detection.</h2>
                            </div>
                            <div className="my-10 space-y-4">
                                <Link to="/" className="rounded-md text-white text-lg px-4 py-2 bg-green-400 hover:bg-green-500">Get Started</Link>
                            </div>
                            <div className="mt-6">
                                <div className="inline-flex items-center">
                                    <img src={teenager} alt="William White" className="object-cover inline-block mr-3 border-2 border-green-400 rounded-full sm:mr-2 h-14 w-[4.3rem]" />
                                    <div>
                                        <p className="sm:pl-2.5 text-base font-black tracking-tight text-gray-800 sm:text-lg"> “Using SkrillBot has been a life-saver. My essays now look professional.” </p>
                                        <p className="sm:pl-2.5 text-sm sm:text-base font-bold text-gray-500">William White </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="sm:mx-auto sm:max-w-3xl sm:px-6">
                    <div className="py-12 sm:relative sm:mt-12 sm:py-16 lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
                        <div className="hidden sm:block">
                            <div className="absolute inset-y-0 w-screen left-1/2 bg-gray-50 rounded-l-3xl lg:left-80 lg:right-0 lg:w-full">
                            </div>
                            <svg className="absolute -mr-3 top-8 right-1/2 lg:m-0 lg:left-0" width="404" height="392" fill="none" viewBox="0 0 404 392"><defs><pattern id="837c3e70-6c3a-44e6-8854-cc48c737b659" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse"><rect x="0" y="0" width="4" height="4" className="text-gray-200" fill="currentColor"></rect></pattern></defs><rect width="404" height="392" fill="url(#837c3e70-6c3a-44e6-8854-cc48c737b659)"></rect></svg>
                        </div>
                        <div className="relative pl-4 -mr:20 sm:-mr-32 md:-mr-16 sm:mx-auto sm:max-w-3xl sm:px-0 lg:h-full lg:max-w-none lg:flex lg:items-center xl:pl-12">
                            <img className="w-full rounded-l-3xl lg:w-auto 2xl:h-full 2xl:max-w-none" src={happyStudents} alt="happy students" />
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
export default FirstSection