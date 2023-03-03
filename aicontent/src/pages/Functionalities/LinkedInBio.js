import BreadCumb from "../../components/layouts/BreadCumb";
import Sidebar from "../../components/layouts/Sidebar";
import { getResponse } from "../../services/openaiService";
import { useState } from "react";
import Content from "../../components/Content";

const LinkedInBio = () => {
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
        prompt = `Please generate a linkedin bio according to the following topic: [${topic}].`;
        const result = await getResponse(prompt);
        setFormData({ ...formData, generatedText: result, loading: false });
    }

    return (
        <>
            <BreadCumb header="LinkedIn Bio" paragraph="Effortlessly generate high-quality LinkedIn Bio." />
            <Sidebar />
            <div className="container mt-32">
                <section className="flex justify-center flex-col lg:pb-32 lg:pt-6 md:pb-12 md:pt-4 sm:py-6">
                    <div className="grid grid-cols-1 gap-3">
                        <form onSubmit={handleSubmit}>
                            <label className="mb-2 text-sm font-medium text-gray-900 sr-only">Search</label>
                            <div className="relative">
                                <div className="">
                                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                        <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>
                                    </div>
                                </div>
                                <input type="text" name="topic" id="topic" value={topic} onChange={handleChange} className="outline-0 block w-full p-4 text-xs md:text-sm pl-10 text-gray-900 border border-gray-300 rounded-md bg-gray-50 focus:ring-blue-500 focus:border-blue-500" placeholder="Write something about your major" />
                                <button type="submit" className="bg-blue-600 btn text-white absolute right-2.5 bottom-2.5  hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-md text-sm px-4 py-2"><span>Generate</span></button>
                            </div>
                        </form>
                        <Content generatedText={generatedText} loading={loading} />
                    </div>
                </section>
            </div>
        </>
    )
}
export default LinkedInBio