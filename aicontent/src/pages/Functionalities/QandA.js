import { useEffect, useState } from "react";
import BreadCumb from "../../components/layouts/BreadCumb";
import Sidebar from "../../components/layouts/Sidebar";
import {getResponse} from "../../services/openaiService";



const QandA = () => {
  const [input, setInput] = useState("");
  const [isSuccess, setIsSuccess]= useState(false);

  const [chatLog, setChatLog] = useState([{
    user:"A",
    message:"how can I help you today?"
  }]);
  const [isLoading, setIsLoading] = useState("");

  useEffect(()=>{
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);

  const copyToClip = (data) => {
    navigator.clipboard.writeText(data);
    setIsSuccess(true);
    setTimeout(()=>{
      setIsSuccess(false);
    }, 3000)
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    let chatLogNew = [...chatLog, {user:'Q', message:`${input}`}];
    setIsLoading(true);
    setInput("");
    let newPrompt=chatLogNew.map((message) => message.message).join("\n");
    const result = await getResponse(newPrompt, 0.7);
    setChatLog([...chatLogNew, {
      user:"A", message: `${result}`
    }]);
    setIsLoading(false);
  }

  return (
    <>
    <BreadCumb header="Ask any educational question" paragraph="Our Al-powered homework bot is here to help." />
    <Sidebar />
      <h3 className="lg:text-4xl sm:text-2xl font-bold text-center mt-6 leading-relaxed">Start Generating Now <span className="text-green-400">Replies For anything</span></h3>
      <section  className="flex justify-center items-center flex-col lg:pb-24 lg:pt-16 py-16">
        <div className="flex flex-col min-h-screen flex-grow w-full lg:max-w-6xl bg-gray-50 shadow-xl rounded-lg overflow-hidden">
          <div className="flex flex-col flex-grow h-0 p-4 overflow-auto">

            {chatLog.map((data, index) => {
              return  <div key={index} className={`flex w-full mt-2 space-x-3 max-w-xs ${data.user==="Q" ? 'ml-auto justify-end' : ''}`}>
              {data.user === "A" && <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-300"></div>}
              <div>
                <div className={`${data.user==="Q" ? 'bg-green-400 text-white' : 'bg-gray-300'} p-3 rounded-r-lg rounded-bl-lg`}>
                  <p className="text-sm">{data.message}</p>
                  <span className="cursor-pointer text-green-400 text-sm" onClick={()=>{copyToClip(data.message)}}><i className="fa-regular fa-copy"></i> Copy</span>
                  {isSuccess && <p className="text-sm text-black font-light">The text is copied</p>}
                </div>
              </div>
              {data.user === "Q" && <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-300"></div>}
            </div>
            })}
          </div>
          <form onSubmit={handleSubmit} className="bg-gray-300 p-4">
            <input value={input}
                onChange={(e)=>setInput(e.target.value)}
                name="input" className="flex items-center outline-0 h-10 w-full rounded px-3 text-sm" type="text" placeholder="Type your message…" />
          </form>
        </div>
    </section>
    </>
  )
}
export default QandA