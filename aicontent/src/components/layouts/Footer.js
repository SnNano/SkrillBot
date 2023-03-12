import { Link } from "react-router-dom"
import discord from "../../assets/images/discord.png";
import instagram from "../../assets/images/instagram.svg";
import youtube from "../../assets/images/youtube.svg";
import logo from "../../assets/images/logo.png";

const Footer = () => {
    return (
        <footer className="mt-auto">
            <div className="max-w-6xl mx-auto px-4 sm:px-6">
                <div className="grid md:grid-cols-3 grid-cols-2 items-center justify-center py-4 md:py-8 border-t border-gray-200">
                    <div className="flex flex-col">
                        <img src={logo} className="w-24 mb-1" alt="skrillbot logo" />
                        <p className="text-[12px] font-light">Copyright © Skrillbot All rights reserved.</p>
                    </div>
                    <div className="flex flex-col">
                        <p className="text-sm md:ml-4 mb-1 font-bold">Skrillbot</p>
                        <p className="text-[12px] md:ml-4 mb-1 font-light">Support: Skrillbotai@gmail.com</p>
                        <ul className="flex mb-4 md:ml-4 md:mb-0">
                            <li>
                                <Link className="flex justify-center items-center text-gray-600 hover:text-gray-900 bg-white hover:bg-white-100 rounded-full shadow transition duration-150 ease-in-out">
                                    <img className="w-4 h-4" src={instagram} alt="insta logo" />
                                </Link>
                            </li>
                            <li className="ml-4">
                                <Link className="flex justify-center items-center text-gray-600 hover:text-gray-900 bg-white hover:bg-white-100 rounded-full shadow transition duration-150 ease-in-out">
                                    <img className="w-4 h-4" src={youtube} alt="insta logo" />
                                </Link>
                            </li>
                            <li className="ml-4">
                                <a href=" https://discord.gg/hZcD6FZBUA" className="flex justify-center items-center text-gray-600 hover:text-gray-900 bg-white hover:bg-white-100 rounded-full shadow transition duration-150 ease-in-out">
                                    <img className="w-4 h-4" src={discord} alt="discord logo" />
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div className="flex flex-col">
                        <p className="text-sm md:ml-4 mb-1 font-bold">Legal</p>
                        <Link to="/terms-of-use" className="text-[12px] md:ml-4 mb-1 font-light hover:underline">Terms of use</Link>
                        <Link to="/privacy-policy" className="text-[12px] md:ml-4 mb-1 font-light hover:underline">Privacy Policy</Link>
                    </div>
                </div>
            </div>
        </footer >
    )
}
export default Footer