import { useEffect, useState, useRef } from "react";

import BreadCumb from "../../components/layouts/BreadCumb";
import Sidebar from "../../components/layouts/Sidebar";
import { getResponse } from "../../services/openaiService";
import Typewriter from 'typewriter-effect';
import axios from 'axios';
import { MathfieldComponent } from "react-mathlive";
import Footer from "../../components/layouts/Footer";

const { CancelToken } = axios;


const QandA = () => {
  const [input, setInput] = useState("");
  const [latex, setLatex] = useState("");
  const [level, setLevel] = useState("6th-9th Grade");

  const messagesEndRef = useRef(null);
  const chatLogContainerRef = useRef(null);
  const [cancelToken, setCancelToken] = useState(null);
  const [chatLog, setChatLog] = useState([{
    user: "A",
    message: "how can I help you today?"
  }]);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    chatLogContainerRef.current.scrollTop = chatLogContainerRef.current.scrollHeight;
  }, [chatLog, isLoading]);

  const removeIsVisible = () => {
    const tag = document.querySelector('.keyboard-layer');
    tag.classList.remove('is-visible');
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    if (cancelToken) {
      cancelToken.cancel();
    }
    const source = CancelToken.source();
    setCancelToken(source);
    let chatLogNew = [...chatLog, { user: 'Q', message: `Please answer the following question for ${level ? level : '6th-9th Grade'} ${input} ${latex ? latex : ''}` }];
    setInput("");
    try {
      let newPrompt = chatLogNew.map((message) => message.message).join("\n");
      console.log(newPrompt)
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
  // is-visible keyboard-layer
  return (
    <>
      <BreadCumb header="Homework Helper" paragraph="Looking for instant answers to your questions? Our Al-powered homework bot is here to help. Just ask any question and get a reliable answer within seconds." />
      <Sidebar removeIsVisible={removeIsVisible} />
      <section className="px-8 mt-2 flex justify-center items-center flex-col md:pb-24 pb-12">
        <div className="relative flex flex-col h-screen flex-grow w-full lg:max-w-6xl bg-gray-50 shadow-xl rounded-lg overflow-hidden">
          <form onSubmit={handleSubmit} className="bg-gray-300 p-4">
            <div className="grid md:grid-cols-2 grid-cols-1 gap-4 mb-6">
              <div>
                <label htmlFor="subject" className="block mb-2 text-sm font-medium text-indigo-500">Select Subject</label>
                <select name="subject" id="subject" className="block w-full px-4 py-2 text-sm text-gray-900 placeholder-gray-500 border border-gray-300 rounded-md shadow-sm focus:outline-0 focus:border-indigo-400 flex-1">
                  <option value="math">Math</option>
                  <option value="physics">Physics</option>
                  <option value="science">Science</option>
                  <option value="history">History</option>
                  <option value="english">English</option>
                  <option value="chemistry">Chemistry</option>
                  <option value="">Other</option>
                </select>
              </div>
              <div>
                <label htmlFor="level" className="block mb-2 text-sm font-medium text-indigo-500">Select Subject</label>
                <select name="level" id="level" value={level} onChange={(e) => setLevel(e.target.value)} className="block w-full px-4 py-2 text-sm text-gray-900 placeholder-gray-500 border border-gray-300 rounded-md shadow-sm focus:outline-0 focus:border-indigo-400 flex-1">
                  <option value="1st-6th Grade">1st-6th Grade</option>
                  <option value="6th-9th Grade">6th-9th Grade</option>
                  <option value="9th-12th Grade">9th-12th Grade</option>
                  <option value="bachelors">Bachelors</option>
                  <option value="masters">Masters</option>
                  <option value="phd">Phd</option>
                </select>
              </div>
            </div>
            <input value={input}
              onChange={(e) => setInput(e.target.value)}
              name="input" className="mb-2 flex items-center outline-0 h-10 w-full rounded px-3 text-sm" type="text" placeholder="Type your question" />
            <MathfieldComponent
              latex={latex}
              onChange={setLatex}
              mathfieldConfig={{
                virtualKeyboardMode: "manual"
              }}
            />
          </form>
          <div ref={chatLogContainerRef} className="flex flex-col flex-grow h-0 p-4 overflow-auto">
            {chatLog.map((data, index) => {
              return <div key={index} className={`flex flex-col`}>
                <div className={`flex w-full mt-2 space-x-3 max-w-md ${data.user === "Q" ? 'ml-auto justify-end' : ''}`}>
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
      <Footer />
    </>
  )
}
export default QandA