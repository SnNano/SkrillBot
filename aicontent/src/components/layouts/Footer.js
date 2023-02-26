import { useEffect, useState } from "react"
import { getRandomUser } from "../../services/openaiService"


const Footer = () => {
    const [users, setUsers] = useState([]);
    useEffect(()=>{
        getUsersImages();
    }, [])
    const getUsersImages=async ()=>{
        const result = await getRandomUser();
        setUsers(result);
    }
  return (
    <section className="relative py-12 sm:py-20 md:py-24 lg:py-32">
        <div className="block">
            <div className="absolute inset-y-0 left-0 w-1/2 bg-gray-50 rounded-r-3xl mb-12"></div>
            <svg className="absolute -ml-3 top-8 left-1/2" width="404" height="392" fill="none" viewBox="0 0 404 392"  ><defs  ><pattern id="8228f071-bcee-4ec8-905a-2a059a2cc4fb" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse"  ><rect x="0" y="0" width="4" height="4" className="text-gray-200" fill="currentColor"  ></rect></pattern></defs><rect width="404" height="392" fill="url(#8228f071-bcee-4ec8-905a-2a059a2cc4fb)"  ></rect></svg>
        </div>
        <div className="max-w-md px-4 mx-auto sm:max-w-3xl sm:px-6 lg:max-w-7xl lg:px-8">
            <div className="relative px-6 py-10 overflow-hidden bg-white border-green-400 border-2 shadow-xl rounded-2xl sm:px-12 sm:py-20">
                <div className="absolute inset-0 -mt-72 sm:-mt-32 md:mt-0">
                    <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 1463 360"  >
                    <path className="text-green-400/5" fill="currentColor" d="M-82.673 72l1761.849 472.086-134.327 501.315-1761.85-472.086z"  ></path><path className="text-green-400/10" fill="currentColor" d="M-217.088 544.086L1544.761 72l134.327 501.316-1761.849 472.086z"  ></path>
                    </svg>
                </div>
                <div className="relative">
                    <div className="flex flex-wrap justify-center w-full mx-auto sm:max-w-3xl">
                       { users && users.map((user, index)=>{
                        return  <img key={index} src={user.picture.medium} alt={user.name.first} className="border-2 border-green-400 h-[3.5rem] w-[3.5rem] mx-[1.5rem] rounded-full user-avatar" />
                       })}
                    </div>
                    <div className="mt-6 sm:mt-12 sm:text-center">
                        <h2 className="text-3xl font-black tracking-tight text-gray-900 sm:text-4xl md:text-5xl md:leading-tight md:max-w-4xl md:mx-auto">Join our community of fans that love SkrillBot<span className="text-green-400">.</span></h2>
                    </div>
                    <div className="mt-6 sm:mt-12 sm:mx-auto sm:max-w-lg flex flex-col items-center"></div>
                        <form className="grid gap-2 grid-cols-1 sm:w-full sm:flex sm:items-center sm:flex-wrap mt-6 sm:mt-12 sm:mx-auto sm:max-w-lg">
                            <input type="email" id="email" className="block w-full px-5 py-3 text-base text-gray-900 placeholder-gray-500 border border-gray-300 rounded-md shadow-sm focus:outline-0 flex-1" required="" placeholder="Enter your email..." />
                            <div>
                                <button className="text-white px-4 py-2 rounded-md bg-green-400 hover:bg-green-500" type="submit">Join the waiting list</button>
                            </div>
                        </form>
                </div>
            </div>
        </div>
    </section>
  )
}
export default Footer