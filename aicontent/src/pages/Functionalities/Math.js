import BreadCumb from "../../components/layouts/BreadCumb";
import MathKeyboard from "../../components/layouts/MathKeyboard";
import Sidebar from "../../components/layouts/Sidebar";



const Math = () => {
    return (
        <>
            <BreadCumb header="Solve your Math Problems" paragraph="Our Al-powered homework bot is here to help." />
            <Sidebar />
            <section className="mt-36 flex justify-center items-center flex-col md:pb-24 pb-12">
                <MathKeyboard />
            </section>
        </>
    )
}
export default Math