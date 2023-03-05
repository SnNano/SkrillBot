import { useEffect, useState, useRef } from "react";
import BreadCumb from "../../components/layouts/BreadCumb";
import Sidebar from "../../components/layouts/Sidebar";
import { getResponse } from "../../services/openaiService";



const QandA = () => {
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);
  const chatLogContainerRef = useRef(null);

  const [chatLog, setChatLog] = useState([{
    user: "A",
    message: "how can I help you today?"
  }]);

  const [isLoading, setIsLoading] = useState("");

  useEffect(() => {
    chatLogContainerRef.current.scrollTop = chatLogContainerRef.current.scrollHeight;
  }, [chatLog, isLoading]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true)
    let chatLogNew = [...chatLog, { user: 'Q', message: `${input}` }];
    setInput("");
    let newPrompt = chatLogNew.map((message) => message.message).join("\n");
    const result = await getResponse(newPrompt, 0.7);
    setChatLog([...chatLogNew, {
      user: "A", message: `${result}`
    }]);
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    setIsLoading(false);
  }

  return (
    <>
      <BreadCumb header="Ask any educational question" paragraph="Our Al-powered homework bot is here to help." />
      <Sidebar />
      <section className="mt-32 flex justify-center items-center flex-col md:pb-24 pb-12">
        <div className=" flex flex-col min-h-screen flex-grow w-full lg:max-w-6xl bg-gray-50 shadow-xl rounded-lg overflow-hidden">
          <div ref={chatLogContainerRef} className="flex flex-col flex-grow h-0 p-4 overflow-auto">
            {chatLog.map((data, index) => {
              return <div key={index} className={`flex flex-col`}>
                <div className={`flex w-full mt-2 space-x-3 max-w-xs ${data.user === "Q" ? 'ml-auto justify-end' : ''}`}>
                  {data.user === "A" && <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-300"></div>}
                  <div>
                    <div className={`${data.user === "Q" ? 'bg-indigo-400 text-white' : 'bg-gray-300'} p-3 rounded-r-lg rounded-bl-lg`}>
                      <p className="text-sm">{data.message}</p>
                    </div>
                  </div>
                  {data.user === "Q" && <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-300"></div>}
                </div>
              </div>
            })}
            {isLoading && <div class="spinner mt-6 ml-6">
              <div class="bounce1"></div>
              <div class="bounce2"></div>
              <div class="bounce3"></div>
            </div>}
            <div ref={messagesEndRef} />
          </div>
          <form onSubmit={handleSubmit} className="bg-gray-300 p-4">
            <input value={input}
              onChange={(e) => setInput(e.target.value)}
              name="input" className="flex items-center outline-0 h-10 w-full rounded px-3 text-sm" type="text" placeholder="Type your message…" />
          </form>
        </div>
      </section>
    </>
  )
}
export default QandA