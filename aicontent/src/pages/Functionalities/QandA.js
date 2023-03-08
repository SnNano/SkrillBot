import { useEffect, useState, useRef } from "react";
import BreadCumb from "../../components/layouts/BreadCumb";
import Sidebar from "../../components/layouts/Sidebar";
import { getResponse } from "../../services/openaiService";
import Typewriter from 'typewriter-effect';
import axios from 'axios';
const { CancelToken } = axios;


const QandA = () => {
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);
  const chatLogContainerRef = useRef(null);
  const [cancelToken, setCancelToken] = useState(null);
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
    setIsLoading(true);
    if (cancelToken) {
      cancelToken.cancel();
    }
    const source = CancelToken.source();
    setCancelToken(source);
    let chatLogNew = [...chatLog, { user: 'Q', message: `${input}` }];
    setInput("");
    try {
      let newPrompt = chatLogNew.map((message) => message.message).join("\n");
      const result = await getResponse(newPrompt, 0.5, source.token);
      setChatLog([...chatLogNew, { user: "A", message: `${result}` }]);
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    } catch (error) {
      if (axios.isCancel(error)) {
        console.log('Request canceled');
      } else {
        console.log('Error', error.message);
      }
    }
    setIsLoading(false);
  }

  return (
    <>
      <BreadCumb header="Ask any educational question" paragraph="Our Al-powered homework bot is here to help." />
      <Sidebar />
      <section className="mt-32 flex justify-center items-center flex-col md:pb-24 pb-12">
        <div className="relative flex flex-col min-h-screen flex-grow w-full lg:max-w-6xl bg-gray-50 shadow-xl rounded-lg overflow-hidden">
          <div ref={chatLogContainerRef} className="flex flex-col flex-grow h-0 p-4 overflow-auto">
            {chatLog.map((data, index) => {
              return <div key={index} className={`flex flex-col`}>
                <div className={`flex w-full mt-2 space-x-3 max-w-xs ${data.user === "Q" ? 'ml-auto justify-end' : ''}`}>
                  {data.user === "A" && <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-300"></div>}
                  <div>
                    <div className={`${data.user === "Q" ? 'bg-indigo-400 text-white' : 'bg-gray-300'} p-3 rounded-r-lg rounded-bl-lg`}>
                      {data.user === "A" ? (
                        <Typewriter
                          onInit={(typewriter) => {
                            typewriter.typeString(data.message)
                              .start();
                          }}
                          options={{
                            delay: 20, // add a 100 millisecond delay between each character
                          }}
                        />
                      ) : (
                        <div className="text-sm">{data.message}</div>
                      )}
                    </div>
                  </div>
                  {data.user === "Q" && <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-300"></div>}
                </div>
              </div>
            })}
            {isLoading && <div className="spinner mt-6 ml-6">
              <div className="bounce1"></div>
              <div className="bounce2"></div>
              <div className="bounce3"></div>
            </div>}
            <div ref={messagesEndRef} />
          </div>
          <form onSubmit={handleSubmit} className="bg-gray-300 p-4">
            <input value={input}
              onChange={(e) => setInput(e.target.value)}
              name="input" className="flex items-center outline-0 h-10 w-full rounded px-3 text-sm" type="text" placeholder="Type your message…" />
          </form>
          {isLoading && (
            <div className="fixed bottom-[1rem] left-[5rem] w-full flex justify-center pb-4">
              <button
                className="bg-transparent border border-blue-500 text-blue-500 rounded-lg hover:bg-blue-700 hover:text-white font-bold py-2 px-8 hover:translate-y-[-10px] transition ease-in"
                onClick={() => cancelToken.cancel()}
              >
                Stop Generating
              </button>
            </div>
          )}

        </div>
      </section>
    </>
  )
}
export default QandA