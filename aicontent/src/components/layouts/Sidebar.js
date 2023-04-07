import React, { createContext, useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../App';
import { moreData } from "../../data";
import logo from "../../assets/images/logo.png";
import { fetchAuthUser } from '../../services/userService';
import connection from "../../assets/images/connection.svg";

export const SidebarContext = createContext();

const Sidebar = ({ removeIsVisible }) => {
  const { open } = useContext(SidebarContext);
  const { state, dispatch } = useContext(UserContext);
  const [showModal, setShowModal] = useState(false);

  const copyToClip = () => {
    navigator.clipboard.writeText(`${window.location.origin}/sign-up/${state.user.user.referralId}`);
    setShowModal(!showModal)
  }

  return (
    <>
      <aside className={`fixed top-0 left-0 z-40 w-64 ${open ? '' : '-translate-x-full'} h-screen pt-4 transition-transform bg-white shadow-md sm:translate-x-0`}>
        <div className="flex justify-between flex-col overflow-y-scroll h-full px-3 pb-4 bg-white relative">
          <div>
            <Link to="/" className="flex items-center ml-4">
              <img className="w-auto h-8" src={logo} alt="Skrillbot logo" />
            </Link>
            <ul className="flex flex-col mt-6 text-justify">
              {moreData.map((item) => {
                return <li key={item.id} onClick={() => { removeIsVisible() }}>
                  <Link to={item.link} onClick={() => { fetchAuthUser(dispatch) }} className={` ${state.user.user.characters < -1 ? 'pointer-events' : ''} flex my-2 items-center p-2 text-sm font-normal text-gray-900 rounded-lg hover:bg-indigo-500 hover:text-white`}>
                    <i className={`text-gray-600 fa-solid ${item.icone}`}></i>
                    <span className="ml-3">{item.title}</span>
                  </Link>
                </li>
              })}
            </ul>
          </div>
          <div className="flex justify-center flex-col">
            <button onClick={() => copyToClip()} className="px-4 py-2 text-white text-sm bg-green-500 mb-2 rounded-lg">Invite Friends</button>
            <Link to="/billing" className="text-center px-4 py-2 text-white text-sm bg-purple-500 rounded-lg">Upgrade Plan</Link>
          </div>
        </div>
      </aside>
      {showModal && <>
        <div className="transition ease-in-out delay-150 justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
          <div className="relative w-auto my-6 mx-auto max-w-md">
            {/*content*/}
            <div className="py-6 justify-center items-center border-0 rounded-sm shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
              {/*body*/}
              <div className="relative p-6 flex flex-col items-center text-center">
                <img src={connection} alt="connection" className='w-28' />
                <h2 className='text-purple-500 lg:text-lg text-md mt-2'>Referral Link Copied!</h2>
                <p className="py-4 text-sm text-gray-400">You will get 5000 FREE CHARACTERS when your friend uses up 2000 characters!</p>
              </div>
              {/*footer*/}
              <div className="flex items-center justify-center p-2 border-t border-solid border-slate-200 rounded-b">
                <button onClick={() => setShowModal(!showModal)} className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button">
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
      </>}
    </>
  )
}
export default Sidebar