import { useEffect, useContext, useState } from "react";
import { checkCharacters } from "../../services/userService";
import { UserContext } from "../../App";
import { Logout } from "../../services/userService";

import { Link, useNavigate } from "react-router-dom";


const BreadCumb = ({ header, paragraph }) => {
  const [characters, setCharacters] = useState(0);
  const { state, dispatch } = useContext(UserContext);
  const [openDrop, setOpenDrop] = useState(false);
  const navigate = useNavigate();
  const onLogout = async () => {
    await Logout(dispatch);
    navigate("/login");
  }
  useEffect(() => {
    const getCharacter = async () => {
      let data = await checkCharacters();
      setCharacters(data)
    }
    getCharacter()
    const intervalId = setInterval(checkCharacters, 10000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="w-full flex justify-between p-4 breadbubble-element bg-white shadow-md absolute top-0 left-0">
      <div>
        <h1 className="lg:text-4xl md:text-2xl text-xl font-semibold text-gray-900 px-2 py-2">{header}</h1>
        <p className="text-green-500 px-2">Characters {characters === -1 ? '∞' : `${characters}`}</p>
        <div className="font-normal text-gray-400 lg:text-lg md:text-md text-sm py-2 px-2">{paragraph}</div>
      </div>
      {state.user ? <>
        <div className="flex items-center md:order-2 px-2">
          <button onClick={() => { setOpenDrop(!openDrop) }} type="button" className="outline-0 flex mr-3 text-sm bg-gray-800 rounded-full md:mr-0">
            <img className="w-8 h-8 rounded-full" src="/docs/images/people/profile-picture-3.jpg" alt="user" />
          </button>
          <div className={`dropDown ${openDrop ? '' : 'hidden'} z-50 absolute right-[32px] top-[75%] text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow`}>
            <div className="px-4 py-3">
              <span className="block text-md text-gray-900">{state.user.user.username}</span>
              <span className="block font-medium text-sm text-gray-500 truncate">{state.user.user.email}</span>
            </div>
            <ul className="py-2">
              <li className="hover:bg-green-400 hover:rounded-lg hover:text-green-800">
                <Link to="/settings" className="block px-4 py-2 text-md text-gray-700">Settings</Link>
              </li>
              <li className="hover:bg-green-400 hover:rounded-lg hover:text-green-800">
                <button onClick={onLogout} className="block px-4 py-2 text-md text-gray-700">Sign out</button>
              </li>
            </ul>
          </div>
          <button data-collapse-toggle="mobile-menu-2" type="button" className="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="mobile-menu-2" aria-expanded="false">
            <span className="sr-only">Open main menu</span>
            <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd"></path></svg>
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