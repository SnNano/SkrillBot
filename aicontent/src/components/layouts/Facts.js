import axios from 'axios';
import { useEffect, useState } from 'react';


const Facts = ({ showModal, setShowModal }) => {
    const [fact, setFact] = useState("");
    useEffect(() => {
        if (showModal) {
            const intervalId = setInterval(() => {
                axios
                    .get("https://uselessfacts.jsph.pl/api/v2/facts/random?language=en")
                    .then((response) => setFact(response.data.text))
                    .catch((error) => console.log(error));
            }, 5000); // 5000 milliseconds = 5 seconds
            return () => clearInterval(intervalId);
        }
        // cleanup function to clear the interval
    }, [showModal]);


    return (
        <>
            {showModal ? (
                <>
                    <div className="flex p-4 mb-4 text-purple-800 rounded-lg bg-purple-50 dark:bg-gray-800" role="alert">
                        <svg className="flex-shrink-0 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path></svg>
                        <span className="sr-only">Facts</span>
                        <div className="ml-2 text-sm font-medium">
                            <span className='font-semibold mr-3'>Fun Fact:</span> {fact}
                        </div>
                        <button type="button" className="outline-none ml-auto -mx-1.5 -my-1.5 bg-purple-50 text-purple-500 rounded-lg focus:ring-2 focus:ring-purple-400 p-1.5 hover:bg-purple-200 inline-flex h-8 w-8" onClick={() => setShowModal(false)}>
                            <span className="sr-only">Close</span>
                            <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                        </button>
                    </div>
                </>
            ) : null}
        </>
    )
}
export default Facts