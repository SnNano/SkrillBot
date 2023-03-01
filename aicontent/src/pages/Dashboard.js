import Sidebar from "../components/layouts/Sidebar";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../App";
import { useContext, useState } from "react";
import { Logout } from "../services/userService";
import { moreData } from "../data";

const categories = [
    "All", "Writing", "Summary", "Code", "Ideas", "Blog", "Copy"
]

const Dashboard = () => {
    const { state, dispatch } = useContext(UserContext);
    const [openDrop, setOpenDrop] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState("All");
    const navigate = useNavigate();
    // Filter data based on selected category
    const filteredData = selectedCategory === "All"
        ? moreData // show all items
        : moreData.filter(item => item.category.toLowerCase() === selectedCategory.toLowerCase());

    const onLogout = async () => {
        await Logout(dispatch);
        navigate("/login");
    }
    return (
        <>
            <header className="border-b w-full z-30 md:bg-opacity-90 transition duration-300 ease-in-out false">
                <div className="max-w-6xl mx-auto">
                    <div className="flex items-center justify-between h-16 md:h-20">
                        <div className="flex-shrink-0">
                            <p className="text-2xl font-bold block">
                                Dashboard
                            </p>
                        </div>
                        <nav className="flex flex-grow relative">
                            <ul className="flex flex-grow justify-end flex-wrap items-center">
                                <div className="mr-6">
                                    <span className="text-indigo-500">{state.user.user.characters ? state.user.user.characters : ''}</span> characters
                                </div>
                                <div className="flex items-center md:order-2 px-2">
                                    <button onClick={() => { setOpenDrop(!openDrop) }} className="w-8 h-8 outline-0 flex mr-3 text-sm bg-gray-800 rounded-full md:mr-0">
                                        {/* <i className="fa-solid fa-user text-white"></i> */}
                                    </button>
                                    <div className={`dropDown ${openDrop ? '' : 'hidden'} z-50 absolute right-[-2%] top-[112%] text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow`}>
                                        <div className="px-4 py-3">
                                            <span className="block text-md text-gray-900">{state.user ? state.user.user.username : ''}</span>
                                            <span className="block font-medium text-sm text-gray-500 truncate">{state.user ? state.user.user.email : ''}</span>
                                        </div>
                                        <ul className="py-2">
                                            <li className="hover:bg-indigo-400 hover:rounded-lg hover:text-indigo-800">
                                                <Link to="/billing" className="block px-4 py-2 text-md text-gray-700">Billing</Link>
                                            </li>
                                            <li className="hover:bg-indigo-400 hover:rounded-lg hover:text-indigo-800">
                                                <Link to="/settings" className="block px-4 py-2 text-md text-gray-700">Settings</Link>
                                            </li>
                                            <li className="hover:bg-indigo-400 hover:rounded-lg hover:text-indigo-800">
                                                <button onClick={onLogout} className="block px-4 py-2 text-md text-gray-700">Sign out</button>
                                            </li>
                                        </ul>
                                    </div>
                                    <button data-collapse-toggle="mobile-menu-2" type="button" className="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="mobile-menu-2" aria-expanded="false">
                                        <span className="sr-only">Open main menu</span>
                                        <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd"></path></svg>
                                    </button>
                                </div>

                            </ul>
                        </nav>
                    </div>
                </div>
            </header>
            <Sidebar />
            <div className="container">
                <section className="flex justify-center flex-col lg:pb-32 lg:pt-6 md:pb-12 md:pt-4 sm:py-6">
                    <div className="block w-full">
                        <div className="mb-6">
                            {categories.map((item, index) => {
                                return <button key={index} onClick={() => setSelectedCategory(item)} className={`rounded-full mr-5 py-2 px-6 border border-indigo-500 ${selectedCategory === item
                                    ? 'bg-indigo-500 text-white'
                                    : 'bg-white text-indigo-500 hover:text-white hover:bg-indigo-600'
                                    }`}>{item}</button>
                            })}
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-6">
                        <div className="grid md:grid-cols-2 grid-cols-1 gap-6">
                            {filteredData.map((item, index) => {
                                return <Link to={item.link} key={index} className="scale-90 hover:scale-100 hover:shadow-xl transition ease-in delay-150 max-w-sm bg-white border border-gray-200 rounded-[25px] shadow">
                                    <img className="rounded-t-[25px]" src="https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" />
                                    <div className="p-5">
                                        <h5 className="mb-2 text-md font-bold tracking-tight text-gray-900">{item.title}</h5>
                                        <p className="mb-3 font-light text-gray-700 text-sm">{item.text}</p>
                                    </div>
                                </Link>
                            })}
                        </div>
                        <div className="w-full">
                            <div className="w-full bg-white border border-gray-200 rounded-[25px] shadow">
                                <div className="p-5">
                                    <h5 className="mb-2 text-md font-bold tracking-tight text-gray-900">Upcoming Tools</h5>
                                    <p className="mb-3 font-light text-gray-700 text-sm">holalalal</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </>
    )
}
export default Dashboard