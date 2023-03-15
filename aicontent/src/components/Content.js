import Spinner from "./layouts/Spinner";

import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../App";
import Confetti from 'react-confetti';
import Facts from "./layouts/Facts";

const Content = ({ showModal, setShowModal, loading, generatedText }) => {
  const [isSuccess, setIsSuccess] = useState(false);
  const [displayedLineIndex, setDisplayedLineIndex] = useState(0);
  const [displayedCharIndex, setDisplayedCharIndex] = useState(0);
  const [visible, setVisible] = useState(false)

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
        }, 5);
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
  useEffect(() => {
    if (displayedText === generatedText) {
      setVisible(false);
    } else {
      setVisible(true);
    }
  }, [displayedText, generatedText]);

  const copyToClip = () => {
    navigator.clipboard.writeText(generatedText);
    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
    }, 3000)
  }
  return (
    <>
      <Facts showModal={showModal} setShowModal={setShowModal} />
      {visible && displayedText && <div className="left-[25%] w-full h-full fixed top-0 left-0">
        <Confetti width={900}
          height={500} numberOfPieces={900}
          recycle={false}
          colors={['#FF0080', '#00FFFF', '#FFA500', '#ffff00', '#39FF14']}
          tweenDuration={2000} />
      </div>}
      <div className="min-h-[10rem] flex-col p-6  border border-gray-200 rounded-lg shadow-md sm:my-4">
        {!loading && generatedText && displayedText && <pre style={{ whiteSpace: 'pre-wrap', fontFamily: 'Times New Roman', fontSize: '20px' }}>{displayedText}</pre>
        }
        {!generatedText && !loading && <div className="flex min-h-[10rem] justify-center items-center"><p className="text-2xl text-center text-gray-400">Answer will appear here.</p></div>}
        {loading && <div className="spinnerH"><Spinner /></div>}
        {!loading && generatedText &&
          <div className="cursor-pointer text-indigo-500 font-semibold mt-4 text-md hover:text-indigo-500" onClick={copyToClip}><i className="fa-regular fa-copy"></i>
            <span className="ml-2">Copy to Clipboard</span>
          </div>}
        {isSuccess && <p className="text-md text-indigo-700 font-light">The text is copied</p>}
      </div>
    </>
  )
}
export default Content
