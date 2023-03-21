import BreadCumb from "../../components/layouts/BreadCumb";
import Sidebar from "../../components/layouts/Sidebar";
import { getResponse } from "../../services/openaiService";
import { useState, useContext } from "react";
import Content from "../../components/Content";
import Footer from "../../components/layouts/Footer";
import axios from 'axios';
import { Helmet } from "react-helmet-async";
import { RemainingWordsContext } from "../../App";
import { useNavigate } from "react-router-dom";

const { CancelToken } = axios;


const BioGenerator = () => {
    const { setRemainingWords } = useContext(RemainingWordsContext);
    const [formData, setFormData] = useState({
        topic: "",
        socialMedia: "",
        loading: false,
        generatedText: null
    });
    const navigate = useNavigate();
    const [cancelToken, setCancelToken] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const { topic, socialMedia, generatedText, loading } = formData;

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        let prompt;
        setFormData({ ...formData, generatedText: null, loading: true });
        if (cancelToken) {
            cancelToken.cancel();
        }
        const source = CancelToken.source();
        setCancelToken(source);
        setShowModal(true);
        try {
            prompt = `Please generate a ${socialMedia} bio according to the following topic: [${topic}].`;
            const result = await getResponse(prompt, 0.5, source.token);
            setFormData({ ...formData, generatedText: result.result, loading: false });
            if (result.userCharacters) {
                setRemainingWords(result.userCharacters);
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

    return (
        <>
            <Helmet>
                <title>SkrillBot | Bio Generator</title>
            </Helmet>
            <BreadCumb header="Bio Generator" paragraph="Create engaging and unique biographical profiles in a snap." />
            <Sidebar />
            <div className="container px-8 py-4">
                <section className="flex justify-center flex-col lg:pb-32 lg:pt-6 md:pb-12 md:pt-4 sm:py-6">
                    <div className="grid grid-cols-1 gap-3">
                        <form onSubmit={handleSubmit}>
                            <div className="mb-6">
                                <label htmlFor="socialMedia" className="block mb-2 text-sm font-medium text-indigo-500">Creativity level</label>
                                <select name="socialMedia" id="socialMedia" value={socialMedia} onChange={handleChange} className="block w-full px-4 py-2 text-sm text-gray-900 placeholder-gray-500 border border-gray-300 rounded-md shadow-sm focus:outline-0 focus:border-indigo-400 flex-1">
                                    <option value="Facebook">Facebook</option>
                                    <option value="Instagram">Instagram</option>
                                    <option value="LinkedIn">LinkedIn</option>
                                    <option value="Twitter">Twitter</option>
                                    <option value="Quora">Quora</option>
                                </select>
                            </div>
                            <label className="mb-2 text-sm font-medium text-gray-900 sr-only">Search</label>
                            <div className="relative">
                                <div className="">
                                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                        <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>
                                    </div>
                                </div>
                                <input type="text" name="topic" id="topic" value={topic} onChange={handleChange} className="outline-0 block w-full p-4 text-xs md:text-sm pl-10 text-gray-900 border border-gray-300 rounded-md bg-gray-50 focus:ring-blue-500 focus:border-blue-500" placeholder="Topic" />
                                <button type="submit" className="bg-blue-600 btn text-white absolute right-2.5 bottom-2.5  hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-md text-sm px-4 py-2"><span>Generate</span></button>
                            </div>
                        </form>
                        {loading &&
                            <p style={{ zIndex: '80' }} className="inline-flex my-2 cursor-pointer bg-transparent border border-red-500 text-red-500 rounded-lg hover:bg-red-700 hover:text-white font-bold py-2 px-8 hover:translate-y-[-10px] transition ease-in"
                                onClick={() => cancelToken.cancel()} > Stop Generating </p>}
                        <Content showModal={showModal} setShowModal={setShowModal} generatedText={generatedText} loading={loading} />
                    </div>
                </section>
            </div>
            <Footer />
        </>
    )
}
export default BioGenerator