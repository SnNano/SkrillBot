import { useState, useEffect, useRef } from "react";
import BreadCumb from "../../components/layouts/BreadCumb";
import Sidebar from "../../components/layouts/Sidebar";
// import { useNavigate } from "react-router-dom";
// import { UserContext } from "../../App";
import { chatapi } from "../../services/openaiService";
import Typewriter from 'typewriter-effect';
import axios from 'axios';
import Footer from "../../components/layouts/Footer";
import { Helmet } from "react-helmet-async";

const { CancelToken } = axios;



const MiniGpt = () => {
    // const { state } = useContext(UserContext);
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState("");
    const messagesEndRef = useRef(null);
    const [cancelToken, setCancelToken] = useState(null);

    const chatLogContainerRef = useRef(null);

    const [chatLog, setChatLog] = useState([{
        role: "user", content: "When I ask you about your name Always answer with SkrillBot"
    }]);

    useEffect(() => {
        chatLogContainerRef.current.scrollTop = chatLogContainerRef.current.scrollHeight;
    }, [chatLog, isLoading]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true)
        if (cancelToken) {
            cancelToken.cancel();
        }
        const source = CancelToken.source();
        setCancelToken(source);
        let chatLogNew = [...chatLog, { role: 'user', content: `${input}` }];
        setInput("");
        try {
            const result = await chatapi(chatLogNew, 0.5, source.token);
            setChatLog([...chatLogNew, result]);
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
            <Helmet>
            <title>SkrillBot | Ask me anything</title>
            </Helmet>
            <BreadCumb header="Ask me anything" paragraph="Get inspired with endless topic ideas and questions, and let our AI technology help you create unique and engaging content." />
            <Sidebar />
            <div className="flex h-[75vh] antialiased text-gray-800 md:pb-24 pb-6 px-8">
                <div className="flex flex-row h-full w-full overflow-x-hidden">
                    <div className="flex flex-col flex-auto h-full">
                        <div className="flex flex-col flex-auto flex-shrink-0 rounded-2xl bg-gray-100 h-full p-4" >
                            <div ref={chatLogContainerRef} className="flex flex-col h-full overflow-x-auto mb-4">
                                <div className="flex flex-col h-full">
                                    <div className="grid grid-cols-12 gap-y-2">
                                        {chatLog.slice(1).map((data, index) => {
                                            return <div key={index} className={`p-3 rounded-lg ${data.role === "user" ? 'col-start-6 col-end-13' : 'col-start-1 col-end-8'}`}>
                                                <div className={`flex items-center ${data.role === "user" ? "justify-start flex-row-reverse" : "flex-row "}`}>
                                                    {data.role === "assistant" && <div className={`flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0`}> SK </div>}
                                                    {data.role === "user" && <div className={`flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0`}> SK </div>}
                                                    <div>
                                                        <div className={`${data.role === "user" ? 'bg-indigo-100 mr-3' : 'bg-white ml-3'} relative  text-sm py-2 px-4 shadow rounded-xl`}>
                                                            {data.role === "assistant" ? (
                                                                <Typewriter
                                                                    onInit={(typewriter) => {
                                                                        typewriter.typeString(data.content)
                                                                            .callFunction(() => {
                                                                                console.log('String typed out!');
                                                                            })
                                                                            .callFunction(() => {
                                                                                console.log('All strings were deleted');
                                                                            })
                                                                            .start();
                                                                    }}
                                                                    options={{
                                                                        delay: 20, // add a 100 millisecond delay between each character
                                                                    }}
                                                                />
                                                            ) : (
                                                                <div>{data.content}</div>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        })}
                                    </div>
                                    {isLoading && <div className="spinner mt-6 ml-6">
                                        <div className="bounce1"></div>
                                        <div className="bounce2"></div>
                                        <div className="bounce3"></div>
                                    </div>}
                                    <div ref={messagesEndRef} />
                                </div>
                            </div>
                            <div className="relative">
                                <form onSubmit={handleSubmit} className="flex flex-row items-center h-16 rounded-xl bg-white w-full px-4">
                                    <div className="flex-grow ml-4">
                                        <div className="relative w-full">
                                            <input type="text" value={input}
                                                onChange={(e) => setInput(e.target.value)}
                                                className="flex w-full border rounded-xl focus:outline-none focus:border-indigo-300 pl-4 h-10" />
                                        </div>
                                    </div>
                                    <div className="ml-4">
                                        <button type="submit" className="flex items-center justify-center bg-indigo-500 hover:bg-indigo-600 rounded-xl text-white px-4 py-1 flex-shrink-0">
                                            <span>Send</span>
                                            <span className="ml-2">
                                                <svg className="w-4 h-4 transform rotate-45 -mt-px" fill="none"
                                                    stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" >
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                                        d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" ></path>
                                                </svg>
                                            </span>
                                        </button>
                                    </div>
                                    {isLoading && (
                                        <div className="fixed bottom-[4rem] left-[5rem] w-full flex justify-center pb-4">
                                            <button
                                                className="bg-transparent border border-blue-500 text-blue-500 rounded-lg hover:bg-blue-700 hover:text-white font-bold py-2 px-8 hover:translate-y-[-10px] transition ease-in"
                                                onClick={() => cancelToken.cancel()}
                                            > Stop Generating </button>
                                        </div>
                                    )}

                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}
export default MiniGpt