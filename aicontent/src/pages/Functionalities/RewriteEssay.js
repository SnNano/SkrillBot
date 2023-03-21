import { rewriteText } from "../../services/openaiService";
import { useContext, useEffect, useState } from "react";
import BreadCumb from "../../components/layouts/BreadCumb";
import Sidebar from "../../components/layouts/Sidebar";
import Button from "../../components/layouts/Button";
import Content from "../../components/Content";
import axios from 'axios';
import Footer from "../../components/layouts/Footer";
import { RemainingWordsContext } from "../../App";
import { useNavigate } from "react-router-dom";
const { CancelToken } = axios;

const RewriteEssay = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        message: "", loading: false,
        generatedText: null
    });
    const [showModal, setShowModal] = useState(false);
    const [cancelToken, setCancelToken] = useState(null);
    const { message, generatedText, loading } = formData;

    const { setRemainingWords } = useContext(RemainingWordsContext);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setFormData({ ...formData, loading: true });
        const source = CancelToken.source();
        setCancelToken(source);
        setShowModal(true);
        try {
            const rewritten = await rewriteText(message, source.token);
            setFormData({ ...formData, generatedText: rewritten.result, loading: false });
            if (rewritten.userCharacters) {
                setRemainingWords(rewritten.userCharacters);
            } else {
                navigate("/billing")
            }

        } catch (error) {
            if (axios.isCancel(error)) {
                setFormData({ ...formData, loading: false });
                console.log('Request canceled');
            } else {
                console.log('Error', error.message);
            }
        }
        setShowModal(false);
    }
    useEffect(() => { window.scrollTo({ top: 0, left: 0, behavior: "smooth" }); }, []);

    return (
        <>
            <BreadCumb header="Rewriter" paragraph="Crafting content that is both polished and playful, while avoiding plagiarism and evading the detection of AI algorithms" />
            <Sidebar />
            <div className="container px-8 py-4">
                <section className="flex justify-center flex-col lg:pb-32 lg:pt-6 md:pb-12 md:pt-4 sm:py-6">
                    <div className="">
                        <form onSubmit={handleSubmit} className="mb-6">
                            <div className="mb-6">
                                <label htmlFor="message" className="block mb-2 text-md font-medium text-indigo-500">Essay to rewrite</label>
                                <textarea id="message" minLength={10} value={message} onChange={handleChange} name="message" rows="6" className="block w-full px-4 py-2 text-sm text-gray-900 placeholder-gray-500 border border-gray-300 rounded-md shadow-sm focus:outline-0 focus:border-indigo-400 flex-1" placeholder="Paste Full Text" required></textarea>
                            </div>
                            <div className="flex justify-center">
                                {loading ? (
                                    <p className="inline-flex cursor-pointer bg-transparent border border-red-500 text-red-500 rounded-lg hover:bg-red-700 hover:text-white font-bold py-2 px-8 hover:translate-y-[-10px] transition ease-in"
                                        onClick={() => cancelToken.cancel()} > Stop Generating </p>
                                ) : (<Button loading={loading} />)}
                            </div>
                        </form>
                        <Content showModal={showModal} setShowModal={setShowModal} generatedText={generatedText} loading={loading} />
                    </div>
                </section>
            </div>
            <Footer />
        </>
    )
}
export default RewriteEssay