import Spinner from "./layouts/Spinner";
import ReactMarkdown from 'react-markdown';

import {useState} from "react";


const ContentCode = ({loading, generatedText}) => {
  const [isSuccess, setIsSuccess]= useState(false);

  const copyToClip = () => {
    navigator.clipboard.writeText(generatedText);
    setIsSuccess(true);
    setTimeout(()=>{
      setIsSuccess(false);
    }, 3000)
  }
  return (
    <div className="min-h-[20rem] p-6 bg-white border border-gray-200 rounded-lg shadow-md sm:my-4">
      {!loading && generatedText && <h3 className="text-xl font-semibold text-black my-4">Explanation</h3>}
      {!loading && generatedText && generatedText.map((item, index)=>{
        return <ReactMarkdown key={index} children={item} />
      })
      }
      {loading &&<div className="flex items-center justify-center spinnerH"><Spinner /></div>}
      {!loading && generatedText && 
          <div className="cursor-pointer text-green-400 font-semibold mt-4 text-lg hover:text-green-500" onClick={copyToClip}><i className="fa-regular fa-copy"></i>
          <span className="ml-2">Copy to Clipboard</span>
        </div>}
      {isSuccess && <p className="text-md text-green-700 font-light">The text is copied</p>}
    </div>
  )
}
export default ContentCode
