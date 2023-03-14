import { useEffect, useState } from "react";

const Spinner = () => {
  const [showAlmost, setShowAlmost] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowAlmost(true);
    }, 5000);
    return () => clearTimeout(timer);
  }, [])
  return (
    <div className="flex flex-col items-center justify-center space-x-2 min-h-[20rem]">
      <div className="border-x-indigo-600 border-y-indigo-300 border-4 animate-spin inline-block w-12 h-12 rounded-full mb-4"></div>
      {showAlmost && <p className="text-md text-gray-500">Almost done…</p>}
    </div>
  )
}
export default Spinner