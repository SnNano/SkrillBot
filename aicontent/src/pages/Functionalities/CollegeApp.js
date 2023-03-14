
import BreadCumb from "../../components/layouts/BreadCumb";
import Sidebar from "../../components/layouts/Sidebar";
import { getResponse } from "../../services/openaiService";
import { useState } from "react";
import Content from "../../components/Content";
import Button from "../../components/layouts/Button";
import axios from 'axios';
import Footer from "../../components/layouts/Footer";
const { CancelToken } = axios;

const CollegeApp = () => {
    const [formData, setFormData] = useState({
        topic: "", loading: false, generatedText: null
    });
    const { topic, generatedText, loading } = formData;
    const [showModal, setShowModal] = useState(false);
    const [cancelToken, setCancelToken] = useState(null);
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
            prompt = `Please write a college application essay for: [${topic}].\nIt should be original.\nWithout Plagiarism.`;
            const result = await getResponse(prompt, 0.5, source.token);
            setFormData({ ...formData, generatedText: result, loading: false });
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
            <BreadCumb header="College Application" paragraph="Effortlessly generate high-quality College application essays." />
            <Sidebar />
            <div className="container px-8 py-4">
                <section className="flex justify-center flex-col lg:pb-32 lg:pt-6 md:pb-12 md:pt-4 sm:py-6">
                    <div className="grid grid-cols-1 gap-3">
                        <form onSubmit={handleSubmit}>
                            <div className="mb-6">
                                <label htmlFor="topic" className="block mb-2 text-md font-medium text-indigo-500">University to apply for</label>
                                <textarea id="topic" minLength={10} maxLength={600} value={topic} onChange={handleChange} name="topic" rows="6" className="block w-full px-4 py-2 text-sm text-gray-900 placeholder-gray-500 border border-gray-300 rounded-md shadow-sm focus:outline-0 focus:border-indigo-400 flex-1" placeholder="University to apply for" required></textarea>
                            </div>
                            {loading ? (
                                <p style={{ zIndex: '80' }}
                                    className="inline-flex cursor-pointer bg-transparent border border-red-500 text-red-500 rounded-lg hover:bg-red-700 hover:text-white font-bold py-2 px-8 hover:translate-y-[-10px] transition ease-in"
                                    onClick={() => cancelToken.cancel()}
                                > Stop Generating </p>
                            ) : (<Button loading={loading} />)}
                        </form>
                        <Content showModal={showModal} setShowModal={setShowModal} generatedText={generatedText} loading={loading} />
                    </div>
                </section>
            </div>
            <Footer />
        </>
    )
}
export default CollegeApp