import { useEffect, useState } from "react";
import { checkCharacters } from "../../services/userService";



const BreadCumb = ({header, paragraph}) => {
  const [characters, setCharacters]= useState(0);

  useEffect(() => {
    const getCharacter = async ()=>{
      let data = await checkCharacters();
      setCharacters(data)
    }
    getCharacter()
    const intervalId = setInterval(checkCharacters, 10000);
    return () => clearInterval(intervalId);
  }, []);
  
  return (
    <div className="w-full p-4 breadbubble-element bg-white shadow-md absolute top-0 left-0">
        <h1 className="lg:text-4xl md:text-2xl text-xl font-semibold text-gray-900 px-2 py-2">{header}</h1>
        <p className="text-green-500">Characters {characters === -1 ? '∞' : `${characters}`}</p>
        <div className="font-normal text-gray-400 lg:text-lg md:text-md text-sm py-2 px-2">{paragraph}</div>
    </div>
  )
}
export default BreadCumb