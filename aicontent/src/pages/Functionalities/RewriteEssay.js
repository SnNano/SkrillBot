import { rewriteText } from "../../services/openaiService";
import { useEffect, useState } from "react";
import BreadCumb from "../../components/layouts/BreadCumb";
import Sidebar from "../../components/layouts/Sidebar";
import Button from "../../components/layouts/Button";
import Content from "../../components/Content";

const RewriteEssay = () => {

    const [formData, setFormData] = useState({
        message: "", loading: false,
        generatedText: null
    });

    const { message, generatedText, loading } = formData;

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setFormData({ ...formData, loading: true });
        const rewritten = await rewriteText(message);
        setFormData({ ...formData, generatedText: rewritten, loading: false });
    }
    useEffect(() => { window.scrollTo({ top: 0, left: 0, behavior: "smooth" }); }, []);

    return (
        <>
            <BreadCumb header="Rewritter" paragraph="Crafting content that is both polished and playful, while avoiding plagiarism and evading the detection of AI algorithms" type="ESSAY" label2="Type the subject of essay you want" />
            <Sidebar />
            <div className="container mt-32">
                <section className="flex justify-center flex-col lg:pb-32 lg:pt-6 md:pb-12 md:pt-4 sm:py-6">
                    <div className="">
                        <form onSubmit={handleSubmit} className="mb-6">
                            <div className="mb-6">
                                <label htmlFor="message" className="block mb-2 text-md font-medium text-indigo-500">Essay to rewrite</label>
                                <textarea id="message" minLength={10} value={message} onChange={handleChange} name="message" rows="6" className="block w-full px-4 py-2 text-sm text-gray-900 placeholder-gray-500 border border-gray-300 rounded-md shadow-sm focus:outline-0 focus:border-indigo-400 flex-1" placeholder="Paste Full Text" required></textarea>
                            </div>
                            <div className="flex justify-center">
                                <Button loading={loading} />
                            </div>
                        </form>
                        <Content generatedText={generatedText} loading={loading} />
                    </div>
                </section>
            </div>
        </>
    )
}
export default RewriteEssay