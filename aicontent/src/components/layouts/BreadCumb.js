import { useEffect, useContext, useState } from "react";
import { UserContext } from "../../App";
import { Logout } from "../../services/userService";
import minibot from "../../assets/images/avatarprof.jpg";

import { Link, useNavigate, useLocation } from "react-router-dom";
import { SidebarContext } from "./Sidebar";


const BreadCumb = ({ header, paragraph }) => {
  const { state, dispatch } = useContext(UserContext);
  const { open, setOpen } = useContext(SidebarContext);

  const [openDrop, setOpenDrop] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  const onLogout = async () => {
    await Logout(state, dispatch);
    navigate("/login");
  }
  useEffect(() => {
    setOpenDrop(false); // close dropdown when location changes
  }, [location.pathname]);
  if (state.user && (state.user.user.characters < -1 || state.user.user.characters === 0)) {
    navigate('/billing'); // Navigate to the billing page
  }
  return (
    <div className="w-full flex justify-between p-4 breadbubble-element bg-white shadow-md  top-0 left-0">
      <div>
        <h1 className="md:text-2xl text-xl font-semibold text-gray-900 px-2 py-2">{header}</h1>
        {state.user.user.characters >= -1 && <p className="text-indigo-500 md:text-md text-sm px-2">Characters {state.user.user.characters === -1 ? 'Unlimited' : `${state.user.user.characters}`}</p>}
        {(state.user.user.characters < -1 || state.user.user.characters === 0) && <p className="text-red-600 md:text-md text-sm px-2">You reached the characters Limits Please Upgrade your plan</p>}
        <div className="font-normal text-gray-400 md:text-md text-sm py-2 px-2">{paragraph}</div>
      </div>
      {state.user ? <>
        <div className="flex items-center md:order-2 px-2">
          <button onClick={() => { setOpenDrop(!openDrop) }} type="button" className="w-8 h-8 outline-0 flex mr-3 text-sm bg-transparent rounded-full md:mr-0">
            <img src={minibot} className="rounded-full" alt="pfp" />
          </button>
          <div className={`dropDown ${openDrop ? '' : 'hidden'} z-50 absolute right-[32px] top-[75%] text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow`}>
            <div className="px-4 py-3">
              <span className="block text-md text-gray-900">{state.user.user.username}</span>
              <span className="block font-medium text-sm text-gray-500 truncate">{state.user.user.email}</span>
            </div>
            <ul className="py-2">
              <li className="hover:bg-indigo-400 hover:rounded-lg hover:text-indigo-800">
                <Link to="/settings" className="block px-4 py-2 text-md text-gray-700">Settings</Link>
              </li>
              <li className="hover:bg-indigo-400 hover:rounded-lg hover:text-indigo-800">
                <Link to="/billing" className="block px-4 py-2 text-md text-gray-700">Billing</Link>
              </li>
              <li className="hover:bg-indigo-400 hover:rounded-lg hover:text-indigo-800">
                <button onClick={onLogout} className="block px-4 py-2 text-md text-gray-700">Sign out</button>
              </li>
            </ul>
          </div>
          <button onClick={() => setOpen(!open)} type="button" className="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 outline-0">
            <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"></path></svg>
          </button>
        </div>
      </> : <>
        <li>
          <Link className="font-medium text-gray-600 hover:text-gray-900 px-5 py-3 flex items-center transition duration-150 ease-in-out" to="/login">Log in</Link>
        </li>
        <li>
          <Link className="btn-sm rounded-md px-4 py-2 text-gray-200 bg-gray-900 hover:bg-gray-800 ml-3" to="/sign-up"><span>Sign up</span><svg className="w-3 h-3 fill-current text-gray-400 flex-shrink-0 ml-2 -mr-1" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg"><path d="M11.707 5.293L7 .586 5.586 2l3 3H0v2h8.586l-3 3L7 11.414l4.707-4.707a1 1 0 000-1.414z" fillRule="nonzero"></path></svg>
          </Link>
        </li>
      </>}
    </div>
  )
}
export default BreadCumb