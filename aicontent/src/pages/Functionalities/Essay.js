import { chatapi, rewriteText } from "../../services/openaiService";
import { useEffect, useState } from "react";
import BreadCumb from "../../components/layouts/BreadCumb";
import Sidebar from "../../components/layouts/Sidebar";
import Button from "../../components/layouts/Button";
import Content from "../../components/Content";
import Facts from "../../components/layouts/Facts";

const Essay = () => {

  const [tokenUsage, setTokenUsage] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [prompt, setPrompt] = useState("");

  const [formData, setFormData] = useState({
    tone: "", level: "elementary",
    creativity: 0.7, message: "",
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
    setShowModal(true);
    let prompt = `Write a 4 pages ${tone} essay discussing the importance and implications of [${message}].\nDO NOT show a table of content.\nInclude Content for each outline.
        Write it in 10 paragraphs.\nIt should be suitable for ${level} level.\nPlease Use Roman for each outline.\n${keywords ? `Keywords: [${keywords}]` : ''}
        \nIt should not be plagiarised, it should be original.`;
    setPrompt(prompt);
    const result = await chatapi([{ role: "user", content: prompt }], parseFloat(creativity));
    setFormData({ ...formData, generatedText: result.content, loading: false });
    setTokenUsage(generatedText.length);
    setShowModal(false);
  }
  const handleNext = async (e) => {
    e.preventDefault();
    setFormData({ ...formData, loading: true });
    const result = await chatapi([{ role: "user", content: prompt }, { role: "assistant", content: generatedText }, { role: 'user', content: `Please continue the essay by adding three more paragraphs.` }], parseFloat(creativity));
    setFormData({ ...formData, generatedText: result.content, loading: false });
    setTokenUsage(generatedText.length);
  }
  useEffect(() => { window.scrollTo({ top: 0, left: 0, behavior: "smooth" }); }, []);

  return (
    <>
      <BreadCumb header="Essay Writing" paragraph="Unlock your writing potential with our Al-powered essay writing tool" type="ESSAY" label2="Type the subject of essay you want" />
      <Sidebar />
      <div className="container mt-32">
        <Facts showModal={showModal} setShowModal={setShowModal} />
        <section className="flex justify-center flex-col lg:pb-32 lg:pt-6 md:pb-12 md:pt-4 sm:py-6">
          <div className="">
            <form onSubmit={handleSubmit} className="mb-6">
              <div className="mb-6 grid lg:grid-cols-2 gap-4">
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
                  <label htmlFor="creativity" className="block mb-2 text-sm font-medium text-indigo-500">Creativity level</label>
                  <select name="creativity" id="creativity" value={creativity} onChange={handleChange} className="block w-full px-4 py-2 text-sm text-gray-900 placeholder-gray-500 border border-gray-300 rounded-md shadow-sm focus:outline-0 focus:border-indigo-400 flex-1">
                    <option value="0">None</option>
                    <option value="0.3">Low</option>
                    <option value="0.5">Medium</option>
                    <option value="0.7">High</option>
                    <option value="1">Max</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="keywords" className="block mb-2 text-sm font-medium text-indigo-500">Keywords</label>
                  <input name="keywords" id="keywords" value={keywords} onChange={handleChange} className="block w-full px-4 py-2 text-sm text-gray-900 placeholder-gray-500 border border-gray-300 rounded-md shadow-sm focus:outline-0 focus:border-indigo-400 flex-1" placeholder="keywords should be separated by a comma" />
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
                <textarea id="message" minLength="10" maxLength="300" value={message} onChange={handleChange} name="message" rows="6" className="block w-full px-4 py-2 text-sm text-gray-900 placeholder-gray-500 border border-gray-300 rounded-md shadow-sm focus:outline-0 focus:border-indigo-400 flex-1" placeholder="The more info you give the more you get quality outcome" required></textarea>
              </div>
              <div className="flex justify-center">
                {tokenUsage >= 2000 ? (
                  <div className="flex flex-col justify-center">
                    <button disabled={loading} type="submit" className="rounded-md text-white text-md px-4 py-2 bg-green-400 hover:bg-green-500 focus:outline-none" onClick={handleNext}>Next</button>
                    <p className="text-sm text-center mt-2 text-gray-700">Please Copy and Paste the current result before you click on next</p>
                  </div>
                ) : (<Button loading={loading} />)}

              </div>
            </form>
            <Content tokenUsage={tokenUsage} generatedText={generatedText} loading={loading} />
          </div>
        </section>
      </div>
    </>
  )
}
export default Essay