import { chatapi, getResponse } from "../../services/openaiService";
import { useEffect, useState } from "react";
import BreadCumb from "../../components/layouts/BreadCumb";
import Sidebar from "../../components/layouts/Sidebar";
import Button from "../../components/layouts/Button";
import Content from "../../components/Content";
import Facts from "../../components/layouts/Facts";
import axios from 'axios';
import { Helmet } from "react-helmet-async";

import Footer from "../../components/layouts/Footer";
const { CancelToken } = axios;

const Essay = () => {

  const [showModal, setShowModal] = useState(false);
  const [cancelToken, setCancelToken] = useState(null);

  const [formData, setFormData] = useState({
    tone: "", level: "elementary",
    creativity: 0.5, message: "",
    keywords: "", loading: false,
    generatedText: null
  });

  const { tone, creativity, level, keywords, message, generatedText, loading } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormData({ ...formData, loading: true });
    if (cancelToken) {
      cancelToken.cancel();
    }
    const source = CancelToken.source();
    setCancelToken(source);
    setShowModal(true);
    try {
      let prompt = `Write ${tone} a long essay on ${message}.
      ${keywords ? `Keywords: [${keywords}]` : ''}\nIt should not have outlines.
      It should not be plagiarised, it should be original. It should have more than 2000 words.`;
      //const result = await getResponse(prompt, parseFloat(creativity), source.token);
      const result = await chatapi([{ role: "user", content: prompt }], parseFloat(creativity), source.token);
      setFormData({ ...formData, generatedText: result.content, loading: false });
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
  // const handleNext = async (e) => {
  //   e.preventDefault();
  //   if (cancelToken) {
  //     cancelToken.cancel();
  //   }
  //   const source = CancelToken.source();
  //   setCancelToken(source);
  //   setFormData({ ...formData, loading: true });
  //   try {
  //     const result = await chatapi([{ role: "assistant", content: generatedText }, {
  //       role: 'user', content: `Please generate content for the outlines.`
  //     }], parseFloat(creativity), source.token);
  //     setContent(1);
  //     setFormData({ ...formData, generatedText: result.content, loading: false });
  //   } catch (error) {
  //     if (axios.isCancel(error)) {
  //       setFormData({ ...formData, loading: false });
  //       console.log('Request canceled');
  //     } else {
  //       console.log('Error', error.message);
  //     }
  //   }

  // }
  useEffect(() => { window.scrollTo({ top: 0, left: 0, behavior: "smooth" }); }, []);

  return (
    <>
      <Helmet>
        <title>SkrillBot | Essay Writer</title>
      </Helmet>
      <BreadCumb header="Essay Writing" paragraph="Unlock your writing potential with our Al-powered essay writing tool. Say goodbye to writer's block and hello to top-notch, plagiarism-free essays in record time." />
      <Sidebar />
      <div className="container px-8 py-4">
        <section className="flex justify-center flex-col lg:pb-32 lg:pt-6 md:pb-12 md:pt-4 sm:py-6">
          <div className="relative">
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
                <div>
                  <label htmlFor="keywords" className="block mb-2 text-sm font-medium text-indigo-500">Keywords</label>
                  <input name="keywords" id="keywords" value={keywords} onChange={handleChange} className="block w-full px-4 py-2 text-sm text-gray-900 placeholder-gray-500 border border-gray-300 rounded-md shadow-sm focus:outline-0 focus:border-indigo-400 flex-1" placeholder="Ex. Name, place, location, and etc." />
                </div>
                <div>
                  <label htmlFor="level" className="block mb-2 text-sm font-medium text-indigo-500">Select level</label>
                  <select name="level" id="level" value={level} onChange={handleChange} className="block w-full px-4 py-2 text-sm text-gray-900 placeholder-gray-500 border border-gray-300 rounded-md shadow-sm focus:outline-0 focus:border-indigo-400 flex-1">
                    <option value="elementary">Elementary</option>
                    <option value="high-school">High-school</option>
                    <option value="college">College</option>
                    <option value="phd">PHD</option>
                  </select>
                </div>
              </div>
              <div className="mb-6">
                <label htmlFor="message" className="block mb-2 text-md font-medium text-indigo-500">Essay topic</label>
                <textarea id="message" minLength="10" maxLength="300" value={message} onChange={handleChange} name="message" rows="6" className="block w-full px-4 py-2 text-sm text-gray-900 placeholder-gray-500 border border-gray-300 rounded-md shadow-sm focus:outline-0 focus:border-indigo-400 flex-1" placeholder="The more context the better!" required></textarea>
              </div>
              <div className="flex justify-center">
                {generatedText ? (<div className="flex flex-col items-center justify-center">
                  <Button loading={loading} />
                  {/* <div className="flex flex-col justify-center items-center">
                    <p disabled={loading} className="cursor-pointer w-[200px] text-center inline rounded-md text-white text-md px-4 py-2 bg-green-400 hover:bg-green-500 focus:outline-none" onClick={handleNext}>Generate Content</p>
                  </div> */}
                  <p className="text-sm mt-2 text-center text-gray-700">
                    <span className="text-red-500 font-bold text-md mr-2">*IMPORTANT*:</span>If you want to avoid Plagiarism and AI detection, Use Rewriter.</p>
                </div>
                ) : (<Button loading={loading} />)}
                {loading ? (
                  <p style={{ zIndex: '80' }} className="fixed z-12 bottom-10 cursor-pointer bg-red-500 border border-red-500 rounded-lg hover:bg-red-700 text-white font-bold py-2 px-8 hover:translate-y-[-10px] transition ease-in"
                    onClick={() => cancelToken.cancel()}> Stop Generating </p>
                ) : (<></>)}
              </div>
            </form>
            <Facts showModal={showModal} setShowModal={setShowModal} />
            <Content generatedText={generatedText} loading={loading} />
          </div>
        </section>
      </div>
      <Footer />
    </>
  )
}
export default Essay