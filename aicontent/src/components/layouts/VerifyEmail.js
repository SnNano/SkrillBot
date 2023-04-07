import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import logo from "../../assets/images/logo.png";
import { verifyEmail } from "../../services/userService";

const VerifyEmail = () => {
    const param = useParams();

    useEffect(() => {
        const verifyEmailUrl = async () => {
            const url = `${process.env.REACT_APP_BACKEND_URL}users/${param.id}/verify/${param.token}`;
            await verifyEmail(url);
        };
        verifyEmailUrl();
    }, [param]);


    return (
        <>
            <div className="flex items-center justify-center min-h-screen p-5 bg-purple-100 min-w-screen">
                <div className="max-w-xl p-8 text-center text-gray-800 bg-white shadow-xl lg:max-w-3xl rounded-3xl lg:p-12">
                    <h3 className="text-2xl">Thanks for signing up for SkrillBot.com!</h3>
                    <div className="flex justify-center">
                        <img src={logo} alt="skrillbot logo" />
                    </div>
                    <div>
                        <p className="mb-4">Your email address is verified Click on:</p>
                        <Link to="/login" className="px-4 py-2 text-white bg-purple-500 rounded">login</Link>
                    </div>
                </div>
            </div>
        </>
    )
}
export default VerifyEmail