import { Link } from "react-router-dom"
import discord from "../../assets/images/discord.png";
import instagram from "../../assets/images/instagram.svg";
import youtube from "../../assets/images/youtube.svg";

const Footer = () => {
    return (
        <footer>
            <div className="max-w-6xl mx-auto px-4 sm:px-6">
                <div className="md:flex md:items-center md:justify-between py-4 md:py-8 border-t border-gray-200">
                    <ul className="flex mb-4 md:order-1 md:ml-4 md:mb-0">
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
                    <div className="text-sm text-gray-600 mr-4">Made by
                        <a className="text-indigo-600 hover:underline" href="https://skrillbot.com/"> Skrillbot</a>.
                        All rights reserved.
                    </div>
                </div>
            </div>
        </footer>
    )
}
export default Footer