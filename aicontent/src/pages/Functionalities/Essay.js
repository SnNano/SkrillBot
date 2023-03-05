import { chatapi, getResponse, rewriteText } from "../../services/openaiService";
import { useEffect, useState } from "react";
import BreadCumb from "../../components/layouts/BreadCumb";
import Sidebar from "../../components/layouts/Sidebar";
import Button from "../../components/layouts/Button";
import Content from "../../components/Content";

const Essay = () => {

  const [tokenUsage, setTokenUsage] = useState(0);

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
    const prompt = `Write a 3 pages ${tone} essay discussing the importance and implications of [${message}]. 
        Provide example to support your position.\nDO NOT show a table of content.\nInclude Content for each outline.
        Address any potential counter arguments and conclude with your final thoughts on the topic.
        Write it in multiple paragraphs.\nIt should be suitable for ${level} level.\nPlease Use Roman for each outline.\n${keywords ? `Keywords: [${keywords}]` : ''}
        \nIt should not be plagiarised, it should be original.`;
    const result = await chatapi([{ role: "user", content: prompt }], parseFloat(creativity));
    const rewritten = await rewriteText(result.content);
    setFormData({ ...formData, generatedText: rewritten, loading: false });
  }
  useEffect(() => { window.scrollTo({ top: 0, left: 0, behavior: "smooth" }); }, []);

  return (
    <>
      <BreadCumb header="Essay Writing" paragraph="Unlock your writing potential with our Al-powered essay writing tool" type="ESSAY" label2="Type the subject of essay you want" />
      <Sidebar />
      <div className="container mt-32">
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
                <Button loading={loading} />
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