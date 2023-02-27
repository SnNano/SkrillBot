import { UserContext } from "../../App";
import { useContext, useEffect, useState } from "react";
import BreadCumb from "../layouts/BreadCumb";
import Sidebar from "../layouts/Sidebar";



const Profile = () => {
    const { state } = useContext(UserContext);
    const [referralLink, setReferralLink] = useState('');
    useEffect(() => {
        setReferralLink(`${window.location.origin}/sign-up/${state.user.user.referralId}`);
    }, [state.user.user.referralId])
    return (
        <>
            <BreadCumb header="Profile" />
            <Sidebar />
            <div className="container mt-40">
                <a href={referralLink} target="_blank" rel="noreferrer">Your referral link: {referralLink}</a>
            </div>
        </>
    )
}
export default Profile