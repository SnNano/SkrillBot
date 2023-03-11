import Button from "./layouts/Button";
import Content from "./Content";
import { getResponse } from "../services/openaiService";
import { useEffect, useState } from "react";
import PropTypes from 'prop-types';
import Sidebar from "./layouts/Sidebar";
import BreadCumb from "./layouts/BreadCumb";
import axios from 'axios';
const { CancelToken } = axios;


const Input = ({ header, paragraph, type, keywordsText }) => {

  const [formData, setFormData] = useState({
    name: "",
    creativity: 0.5,
    youtubeUrl: "",
    message: "",
    loading: false,
    generatedText: null
  });
  const [cancelToken, setCancelToken] = useState(null);

  const { name, youtubeUrl, creativity, keywords, generatedText, loading } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }
  useEffect(() => { window.scrollTo({ top: 0, left: 0, behavior: "smooth" }); }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
    let prompt;
    setFormData({ ...formData, loading: true });
    if (cancelToken) {
      cancelToken.cancel();
    }
    const source = CancelToken.source();
    setCancelToken(source);
    if (type === "PRODUCT_REVIEW") {
      prompt = `Write a product review based on these notes:\nName:${name}\nKeywords:[${keywords}]\nReview:\nUse emojis and markdown to bold important points.`;
    } else if (type === "YOUTUBE_SUM") {
      prompt = `Please generate a full youtube transcript of [${youtubeUrl}] for 5 minutes.\nKeywords:[${keywords}].`
    }
    try {
      const result = await getResponse(prompt, parseFloat(creativity), source.token);
      setFormData({ ...formData, generatedText: result, loading: false });
    } catch (error) {
      if (axios.isCancel(error)) {
        console.log('Request canceled');
      } else {
        console.log('Error', error.message);
      }
    }
    setFormData({ ...formData, loading: false });
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
                <label htmlFor="creativity" className="block mb-2 text-sm font-medium text-indigo-500">Creativity level (The higher the creativity level the less factual it gets)</label>
                <select name="creativity" id="creativity" value={creativity} onChange={handleChange} className="block w-full px-4 py-2 text-sm text-gray-900 placeholder-gray-500 border border-gray-300 rounded-md shadow-sm focus:outline-0 flex-1">
                  <option value="0">None</option>
                  <option value="0.3">Low</option>
                  <option value="0.5">Medium (recommended)</option>
                  <option value="0.7">High</option>
                  <option value="1">Max</option>
                </select>
              </div>
              <div className="mb-6">
                <label htmlFor="keywords" className="block mb-2 text-sm font-medium text-indigo-500">Keywords</label>
                <input name="keywords" id="keywords" value={keywords} onChange={handleChange} className="block w-full px-4 py-2 text-sm text-gray-900 placeholder-gray-500 border border-gray-300 rounded-md shadow-sm focus:outline-0 flex-1" placeholder={keywordsText} />
              </div>
              {type === "YOUTUBE_SUM" && <div className="mb-6">
                <label htmlFor="youtubeUrl" className="block mb-2 text-sm font-medium text-indigo-500">Subject/Title</label>
                <input name="youtubeUrl" id="youtubeUrl" value={youtubeUrl} onChange={handleChange} className="block w-full px-4 py-2 text-sm text-gray-900 placeholder-gray-500 border border-gray-300 rounded-md shadow-sm focus:outline-0 flex-1" placeholder="Youtube Title/Subject" />
              </div>}
              {loading ? (
                <p
                  className="inline-flex z-12 cursor-pointer bg-transparent border border-red-500 text-red-500 rounded-lg hover:bg-red-700 hover:text-white font-bold py-2 px-8 hover:translate-y-[-10px] transition ease-in"
                  onClick={() => cancelToken.cancel()}
                > Stop Generating </p>
              ) : (<Button loading={loading} />)}
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