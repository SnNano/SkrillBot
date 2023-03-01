import Button from "./layouts/Button";
import Content from "./Content";
import { getResponse } from "../services/openaiService";
import { useEffect, useState } from "react";
import PropTypes from 'prop-types';
import Sidebar from "./layouts/Sidebar";
import BreadCumb from "./layouts/BreadCumb";


const Input = ({ header, paragraph, type, keywordsText }) => {

  const [formData, setFormData] = useState({
    name: "",
    creativity: 0.7,
    youtubeUrl: "",
    message: "",
    loading: false,
    generatedText: null
  });
  const { name, youtubeUrl, creativity, keywords, generatedText, loading } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }
  useEffect(() => { window.scrollTo({ top: 0, left: 0, behavior: "smooth" }); }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
    let prompt;
    setFormData({ ...formData, loading: true });
    if (type === "PRODUCT_REVIEW") {
      prompt = `Write a product review based on these notes:\nName:${name}\nKeywords:${keywords}\nReview:\nUse emojis and markdown to bold important points.`;
    } else if (type === "YOUTUBE_SUM") {
      prompt = `Please generate a summary of the YouTube video at [${youtubeUrl}]. The summary should capture the main ideas and key points of the video.`
    }
    const result = await getResponse(prompt, parseFloat(creativity));
    setFormData({ ...formData, generatedText: result, loading: false });
  }

  return (
    <>
      <BreadCumb header={header} paragraph={paragraph} />
      <Sidebar />
      <div className="container mt-32">
        <section className="flex justify-center flex-col lg:pb-32 lg:pt-6 md:pb-12 md:pt-4 sm:py-6">
          <div className="grid grid-cols-1 gap-3">
            <form onSubmit={handleSubmit} className="mb-6">
              {type !== "YOUTUBE_SUM" && <div className="mb-6">
                <label htmlFor="name" className="block mb-2 text-sm font-medium text-indigo-500">Name of Product</label>
                <input maxLength={300} minLength={3} name="name" id="name" value={name} onChange={handleChange} className="block w-full px-4 py-2 text-sm text-gray-900 placeholder-gray-500 border border-gray-300 rounded-md shadow-sm focus:outline-0 flex-1" placeholder="Hamburger" />
              </div>}
              <div className="mb-6">
                <label htmlFor="creativity" className="block mb-2 text-sm font-medium text-indigo-500">Creativity level</label>
                <select name="creativity" id="creativity" value={creativity} onChange={handleChange} className="block w-full px-4 py-2 text-sm text-gray-900 placeholder-gray-500 border border-gray-300 rounded-md shadow-sm focus:outline-0 flex-1">
                  <option value="0">None</option>
                  <option value="0.3">Low</option>
                  <option value="0.5">Medium</option>
                  <option value="0.7">High</option>
                  <option value="1">Max</option>
                </select>
              </div>
              {type !== "YOUTUBE_SUM" && <div className="mb-6">
                <label htmlFor="keywords" className="block mb-2 text-sm font-medium text-indigo-500">Keywords</label>
                <input name="keywords" id="keywords" value={keywords} onChange={handleChange} className="block w-full px-4 py-2 text-sm text-gray-900 placeholder-gray-500 border border-gray-300 rounded-md shadow-sm focus:outline-0 flex-1" placeholder={keywordsText} />
              </div>}
              {type === "YOUTUBE_SUM" && <div className="mb-6">
                <label htmlFor="youtubeUrl" className="block mb-2 text-sm font-medium text-indigo-500">Youtube URL</label>
                <input name="youtubeUrl" id="youtubeUrl" value={youtubeUrl} onChange={handleChange} className="block w-full px-4 py-2 text-sm text-gray-900 placeholder-gray-500 border border-gray-300 rounded-md shadow-sm focus:outline-0 flex-1" placeholder="Youtube link" />
              </div>}
              <Button btnText="Generate" loading={loading} />
            </form>
            <Content generatedText={generatedText} loading={loading} />
          </div>
        </section>
      </div>
    </>
  )
}
Input.propTypes = {
  keywords: PropTypes.string,
  maxLength: PropTypes.number,
  minLength: PropTypes.number,
}
export default Input