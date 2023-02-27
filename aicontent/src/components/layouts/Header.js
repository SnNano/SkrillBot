import { Link } from "react-router-dom";
import { SidebarContext } from "./Sidebar";
import { useContext } from 'react';

import burger from "../../assets/images/burger.svg";


const Header = () => {
   const { open, setOpen } = useContext(SidebarContext);
   return (
      <header className="mb-24">
         <nav className="fixed top-0 z-50 w-full bg-white shadow-sm">
            <div className="px-3 py-6 lg:px-5 lg:pl-3">
               <div className="flex items-center justify-between relative">
                  <div className="flex items-center justify-center">
                     <Link to="/" className="flex items-center">
                        <span className="self-center text-xl font-semibold whitespace-nowrap">LOGO</span>
                     </Link>
                     <div className="cursor-pointer lg:hidden md:hidden block" onClick={() => setOpen(!open)}>
                        <img src={burger} className="w-8 absolute left-56 top-0" alt="open-close-tab" />
                     </div>
                  </div>
                  <div className="flex items-center">
                     <div className="flex items-center ml-3">
                        <div>
                           <button type="button" className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600" aria-expanded="false" data-dropdown-toggle="dropdown-user">
                              <span className="sr-only">Open user menu</span>
                              <img className="w-8 h-8 rounded-full" src="https://flowbite.com/docs/images/people/profile-picture-5.jpg" alt="user" />
                           </button>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </nav>
      </header>

   )
}
export default Header