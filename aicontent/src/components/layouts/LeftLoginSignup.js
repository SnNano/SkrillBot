// import signin from "../../assets/images/signin.png";
// import logo from "../../assets/images/logo.png";
import { Link } from "react-router-dom";

const LeftLoginSignup = () => {
    return (
        <div className="relative px-8 leftpart text-white bg-indigo-500 w-full">
            <div className="flex logo pt-4">
                {/* <Link to="/"><img src={logo} alt="content crunch logo" /></Link> */}
            </div>
            <div className="py-12 grid lg:grid-cols-2 grid-cols-1 gap-4">
                <div className="flex flex-col justify-center items-center">
                    <h3 className="text-2xl mb-4 text-center lg:text-start font-bold">Lorem ipsum dolor sit amet.</h3>
                    <p className="text-sm text-center lg:text-start">Save time and money on copy writing and optimisation, while reducing risk to your business</p>
                </div>
                <div className="flex flex-col justify-center items-center">
                    <div className="videoGif rounded-lg">
                        {/* <img src={signin} className="md:w-full w-96" alt="Sign in" /> */}
                    </div>
                </div>
            </div>
        </div>
    )
}
export default LeftLoginSignup