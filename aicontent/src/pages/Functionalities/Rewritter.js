
import BreadCumb from "../../components/layouts/BreadCumb";
import Sidebar from "../../components/layouts/Sidebar";
import { getResponse } from "../../services/openaiService";
import { useState } from "react";
import Content from "../../components/Content";
import Button from "../../components/layouts/Button";

const Rewritter = () => {
    const [formData, setFormData] = useState({
        topic: "",
        loading: false,
        generatedText: null
    });
    const { topic, generatedText, loading } = formData;

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        let prompt;
        setFormData({ ...formData, generatedText: null, loading: true });
        prompt = `Please rewrite the following topic: [${topic}].\nKeep the same meaning with different words.\nIt should be original.\nWithout Plagiarism.`;
        const result = await getResponse(prompt);
        setFormData({ ...formData, generatedText: result, loading: false });
    }

    return (
        <>
            <BreadCumb header="Rewriter" paragraph="Effortlessly generate high-quality LinkedIn Bio." />
            <Sidebar />
            <div className="container mt-32">
                <section className="flex justify-center flex-col lg:pb-32 lg:pt-6 md:pb-12 md:pt-4 sm:py-6">
                    <div className="grid grid-cols-1 gap-3">
                        <form onSubmit={handleSubmit}>
                            <div className="mb-6">
                                <label htmlFor="topic" className="block mb-2 text-md font-medium text-indigo-500">Split your text to paragraphs for better results</label>
                                <textarea id="topic" minLength={10} maxLength={600} value={topic} onChange={handleChange} name="topic" rows="6" className="block w-full px-4 py-2 text-sm text-gray-900 placeholder-gray-500 border border-gray-300 rounded-md shadow-sm focus:outline-0 focus:border-indigo-400 flex-1" placeholder="Text to rewrite" required></textarea>
                            </div>
                        </form>
                        <div className="flex justify-center">
                            <Button loading={loading} />
                        </div>
                        <Content generatedText={generatedText} loading={loading} />
                    </div>
                </section>
            </div>
        </>
    )
}
export default Rewritter