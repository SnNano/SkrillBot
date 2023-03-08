import React, { createContext, useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../App';
import { sidebarData } from "../../data";
import logo from "../../assets/images/logo.png";


export const SidebarContext = createContext();


const Sidebar = () => {
  const { open } = useContext(SidebarContext);
  const { state } = useContext(UserContext);

  return (
    <>
      <aside className={`fixed top-0 left-0 z-40 w-64 ${open ? '' : '-translate-x-full'} h-screen pt-4 transition-transform bg-white shadow-md sm:translate-x-0`}>
        <div className="overflow-hidden h-full px-3 pb-4 bg-white relative">
          <Link to="/" className="flex items-center ml-4">
            <img className="w-auto h-8" src={logo} alt="Skrillbot logo" />
          </Link>
          <ul className="space-y-2 mt-6">
            {sidebarData.map((item) => {
              return <li key={item.id}>
                <Link to={item.link} className={` ${state.user.user.characters < -1 ? 'pointer-events' : ''} flex my-6 items-center p-2 text-sm font-normal text-gray-900 rounded-lg hover:bg-indigo-500 hover:text-white`}>
                  <i className={`text-gray-600 fa-solid ${item.icone}`}></i>
                  <span className="ml-3">{item.title}</span>
                </Link>
              </li>
            })}
          </ul>
        </div>
      </aside>
    </>
  )
}
export default Sidebar