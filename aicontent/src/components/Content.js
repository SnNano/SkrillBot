import Spinner from "./layouts/Spinner";

import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../App";

const Content = ({ loading, generatedText }) => {
  const [isSuccess, setIsSuccess] = useState(false);
  const [displayedLineIndex, setDisplayedLineIndex] = useState(0);
  const [displayedCharIndex, setDisplayedCharIndex] = useState(0);
  const navigate = useNavigate();
  const { state, dispatch } = useContext(UserContext);
  useEffect(() => {
    if (!state.user) {
      navigate("/login");
    }
  }, [state.user, navigate, dispatch]);
  let newText;
  if (generatedText) {
    newText = generatedText.split("\n");
  }
  useEffect(() => {
    if (newText) {
      const line = newText[displayedLineIndex];
      if (line && displayedCharIndex < line.length) {
        const intervalId = setInterval(() => {
          setDisplayedCharIndex(displayedCharIndex + 1);
        }, 20);
        return () => clearInterval(intervalId);
      } else if (displayedLineIndex < newText.length - 1) {
        setDisplayedLineIndex(displayedLineIndex + 1);
        setDisplayedCharIndex(0);
      }
    }
  }, [newText, displayedLineIndex, displayedCharIndex]);
  let displayedText;
  if (generatedText) {
    displayedText = newText
      .slice(0, displayedLineIndex + 1)
      .map((line, index) => {
        if (index < displayedLineIndex) {
          return line;
        } else if (index === displayedLineIndex) {
          return line.substring(0, displayedCharIndex);
        } else {
          return '';
        }
      })
      .join('\n');
  }
  const copyToClip = () => {
    navigator.clipboard.writeText(generatedText);
    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
    }, 3000)
  }
  return (
    <div className="min-h-[20rem] flex-col p-6  border border-gray-200 rounded-lg shadow-md sm:my-4">
      {!loading && generatedText && displayedText && <pre style={{ whiteSpace: 'pre-wrap' }}>{displayedText}</pre>
      }
      {!generatedText && !loading && <div className="flex min-h-[20rem] justify-center items-center"><p className="text-2xl text-center text-gray-400">Answer will appear here.</p></div>}
      {loading && <div className="spinnerH"><Spinner /></div>}
      {!loading && generatedText &&
        <div className="cursor-pointer text-indigo-500 font-semibold mt-4 text-md hover:text-indigo-500" onClick={copyToClip}><i className="fa-regular fa-copy"></i>
          <span className="ml-2">Copy to Clipboard</span>
        </div>}
      {isSuccess && <p className="text-md text-indigo-700 font-light">The text is copied</p>}
    </div>
  )
}
export default Content
