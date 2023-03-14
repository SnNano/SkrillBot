import Button from "./layouts/Button";
import Content from "./Content";
import { getResponse } from "../services/openaiService";
import { useEffect, useState } from "react";
import PropTypes from 'prop-types';
import Sidebar from "./layouts/Sidebar";
import BreadCumb from "./layouts/BreadCumb";
import axios from 'axios';
import Footer from "./layouts/Footer";
const { CancelToken } = axios;

const GeneralForm = ({ header, paragraph, keywordP, label2, type, maxLength, minLength }) => {

  const [formData, setFormData] = useState({
    tone: "", creativity: 0.5,
    message: "", keywords: "", genre: "paragraph",
    loading: false, generatedText: null
  });

  const [showModal, setShowModal] = useState(false);
  const [cancelToken, setCancelToken] = useState(null);

  const { tone, genre, creativity, keywords, message, generatedText, loading } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    let prompt;
    setFormData({ ...formData, loading: true });
    if (cancelToken) {
      cancelToken.cancel();
    }
    const source = CancelToken.source();
    setCancelToken(source);
    setShowModal(true);
    if (type === "ESSAY") {
      prompt = `Write a ${tone} essay discussing the importance and implications of [${message}]. 
        Provide examples, research, and arguments to support your position. 
        Address any potential counterarguments and conclude with your final thoughts on the topic.
        Write it in multiple paragraphs.\n${keywords ? `Keywords: [${keywords}]` : ''}
        \nIt should not be plagiarised, it should be original.`;
    } else if (type === "EMAIL") {
      prompt = `"Write a ${tone} email about ${message}, and asking the recipient to reach out 
      if they have any questions, and suggest a Subject for the email. 
      End the email with a polite closing such as 'Have a great day'. 
      ${keywords ? `Keywords: [${keywords}]` : ''}".`
    } else if (type === "FULL_BLOG") {
      prompt = `Write a full blog post on [${message}].
      The post should be well-researched.
      The post should be more than 900 words. It should not have outlines write just a normal blog post.
      The tone of the post should be [${tone}], thought-provoking, encouraging readers to further explore the topic and consider its impact on people.
      It should not be plagiarised, it should be original.
      \n${keywords ? `Keywords: [${keywords}]` : ''}\nPlease use numbers for the outlines.`;
    } else if (type === "SALES_COPY") {
      prompt = `Write a ${tone} sales copy that highlights the key features and benefits of [${message}]. Address the pain points of your target audience, explain how your product/service solves their problems, and demonstrate its value proposition. Use persuasive language, testimonials, and social proof to convince potential customers to make a purchase.\nKeywords:[${keywords}].`;
    } else if (type === "ARTICLE_SUM") {
      prompt = `"Please summarize the following article in ${genre}:
                [${message}]\nTone should be [${tone}]     
                \n${keywords ? `Keywords: [${keywords}]` : ''}.`;
    } else if (type === "AD_COPY") {
      prompt = `Title: ${message}\n${keywords ? `Keywords: [${keywords}]` : ''}
      Tone: ${tone}\n
      Write an ad copy based on the provided title, keywords, and tone. 
      The ad copy should be engaging and persuasive, and should encourage the target audience to take action.
      Use emojis and numbers for the important points.`;
    } else if (type === "IDEAS") {
      prompt = `Provide me with 10 different ${tone} ideas related to [${message}], but should be original.\n Start from 1 to 10.`;
    } else if (type === "YOUTUBE_SCRIPT") {
      prompt = `Generate a ${tone} script about [${message}].\n${keywords ? `Keywords: [${keywords}]` : ''}.`;
    } else if (type === "COLLEGE") {
      prompt = `Generate a ${tone} script about [${message}].\n${keywords ? `Keywords: [${keywords}]` : ''}.`;
    }
    try {
      const result = await getResponse(prompt, parseFloat(creativity), source.token);
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
  useEffect(() => { window.scrollTo({ top: 0, left: 0, behavior: "smooth" }); }, []);

  return (
    <>
      <BreadCumb header={header} paragraph={paragraph} />
      <Sidebar />
      <div className="container px-8 py-4">
        <section className="flex justify-center flex-col lg:pb-32 lg:pt-6 md:pb-12 md:pt-4 sm:py-6">
          <div className="">
            <form onSubmit={handleSubmit} className="mb-6">
              <div className="mb-6 grid md:grid-cols-2 grid-cols-1 gap-4">
                <div>
                  <label htmlFor="tone" className="block mb-2 text-sm font-medium text-indigo-500">Select tone</label>
                  <select name="tone" id="tone" value={tone} onChange={handleChange} className="block w-full px-4 py-2 text-sm text-gray-900 placeholder-gray-500 border border-gray-300 rounded-md shadow-sm focus:outline-0 focus:border-indigo-400 flex-1">
                    <option value="Convincing">Convincing</option>
                    <option value="Creative">Creative</option>
                    <option value="Appreciative">Appreciative</option>
                    <option value="Casual">Casual</option>
                    <option value="Informative">Informative</option>
                    <option value="Worried">Worried</option>
                    <option value="Luxury">Luxury</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="creativity" className="block mb-2 text-sm font-medium text-indigo-500">Creativity level (The higher the creativity level the less factual it gets)</label>
                  <select name="creativity" id="creativity" value={creativity} onChange={handleChange} className="block w-full px-4 py-2 text-sm text-gray-900 placeholder-gray-500 border border-gray-300 rounded-md shadow-sm focus:outline-0 focus:border-indigo-400 flex-1">
                    <option value="0">None</option>
                    <option value="0.3">Low</option>
                    <option value="0.5">Medium (recommended)</option>
                    <option value="0.7">High</option>
                    <option value="1">Max</option>
                  </select>
                </div>

              </div>
              {(type === "ARTICLE_SUM") && <div className="mb-6">
                <label htmlFor="genre" className="block mb-2 text-sm font-medium text-indigo-500">Select tone</label>
                <select name="genre" id="genre" value={genre} onChange={handleChange} className="block w-full px-4 py-2 text-sm text-gray-900 placeholder-gray-500 border border-gray-300 rounded-md shadow-sm focus:outline-0 focus:border-indigo-400 flex-1">
                  <option value="bullet points">Bullet points</option>
                  <option value="paragraph">Paragraph</option>
                </select>
              </div>}
              <div className="mb-6">
                <label htmlFor="keywords" className="block mb-2 text-sm font-medium text-indigo-500">Keywords</label>
                <input name="keywords" id="keywords" value={keywords} onChange={handleChange} className="block w-full px-4 py-2 text-sm text-gray-900 placeholder-gray-500 border border-gray-300 rounded-md shadow-sm focus:outline-0 focus:border-indigo-400 flex-1" placeholder={keywordP} />
              </div>
              <div className="mb-6">
                <label htmlFor="message" className="block mb-2 text-md font-medium text-indigo-500">{label2}</label>
                <textarea id="message" minLength={minLength} maxLength={maxLength} value={message} onChange={handleChange} name="message" rows="6" className="block w-full px-4 py-2 text-sm text-gray-900 placeholder-gray-500 border border-gray-300 rounded-md shadow-sm focus:outline-0 focus:border-indigo-400 flex-1" placeholder={label2} required></textarea>
              </div>
              <div className="flex justify-center">
                {loading ? (
                  <p style={{ zIndex: '80' }}
                    className="cursor-pointer z-12 bg-transparent border border-red-500 text-red-500 rounded-lg hover:bg-red-700 hover:text-white font-bold py-2 px-8 hover:translate-y-[-10px] transition ease-in"
                    onClick={() => cancelToken.cancel()}
                  > Stop Generating </p>
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
GeneralForm.propTypes = {
  message: PropTypes.string,
  maxLength: PropTypes.number,
  minLength: PropTypes.number,
}
export default GeneralForm