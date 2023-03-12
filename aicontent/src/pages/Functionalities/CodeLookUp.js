import Button from "../../components/layouts/Button";
// import ContentCode from "../../components/ContentCode";
import { codePrompt } from "../../services/openaiService";
import { useState } from "react";
import { CopyBlock, dracula } from "react-code-blocks";

import PropTypes from 'prop-types';
import Sidebar from "../../components/layouts/Sidebar";
import BreadCumb from "../../components/layouts/BreadCumb";
import axios from 'axios';
import Facts from "../../components/layouts/Facts";
import Footer from "../../components/layouts/Footer";
const { CancelToken } = axios;



const CodeLookUp = () => {

  const [formData, setFormData] = useState({
    codeEx: "",
    language: "",
    loading: false,
    generatedText: null
  });
  const { codeEx, language, generatedText, loading } = formData;
  const [cancelToken, setCancelToken] = useState(null);
  const [showModal, setShowModal] = useState(false);
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
    prompt = `Please generate the following code: [${codeEx}] in [${language}].`;
    try {
      const result = await codePrompt(prompt, source.token);
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
      <BreadCumb header="Code Generator" paragraph="Effortlessly generate high-quality code with our Al-powered code generator. Save time and focus on what matters most - bringing your ideas to life" />
      <Sidebar />
      <div className="container px-8 py-4">
        <section className="flex justify-center flex-col lg:pb-32 lg:pt-6 md:pb-12 md:pt-4 sm:py-6">
          <div className="grid grid-cols-1 gap-3">
            <form onSubmit={handleSubmit}>
              <div className="mb-6">
                <label htmlFor="language" className="block mb-2 text-sm font-medium text-indigo-500">Language (Javascript, java, cpp)</label>
                <input maxLength={100} minLength={1} name="language" id="language" value={language} onChange={handleChange} className="block w-full px-4 py-2 text-sm text-gray-900 placeholder-gray-500 border border-gray-300 rounded-md shadow-sm focus:outline-0 flex-1" placeholder="Language (Javascript, java, cpp)" required />
              </div>
              <div className="mb-6">
                <label htmlFor="codeEx" className="block mb-2 text-sm font-medium text-indigo-500">Describe exactly the exercice you wanna solve for better results</label>
                <textarea minLength={3} maxLength={500} rows="6" name="codeEx" id="codeEx" value={codeEx} onChange={handleChange} className="block w-full px-4 py-2 text-sm text-gray-900 placeholder-gray-500 border border-gray-300 rounded-md shadow-sm focus:outline-0 flex-1" placeholder="Write a Python function that takes in a list of numbers and returns the sum of the even numbers in the list."></textarea>
              </div>
              {loading ? (
                <p
                  className="inline-flex cursor-pointer bg-transparent border border-red-500 text-red-500 rounded-lg hover:bg-red-700 hover:text-white font-bold py-2 px-8 hover:translate-y-[-10px] transition ease-in"
                  onClick={() => cancelToken.cancel()}
                > Stop Generating </p>
              ) : (<Button loading={loading} />)}
            </form>
            <div className="my-2">
              <Facts showModal={showModal} setShowModal={setShowModal} />
            </div>
            {generatedText && <CopyBlock
              text={generatedText} language={language}
              wrapLines theme={dracula} />}
          </div>
        </section>
      </div>
      <Footer />
    </>
  )
}
CodeLookUp.propTypes = {
  maxLength: PropTypes.number,
  minLength: PropTypes.number,
}
export default CodeLookUp