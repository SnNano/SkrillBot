import { data } from "../../data";
import { Link } from "react-router-dom";

const General = () => {
  return (
    <>
      <div className="bg-indigo-400/5 w-full h-full">
        <div className="container mx-auto flex justify-center items-center lg:py-32 md:py-24 sm:py-12 px-12">
          <div className="grid lg:grid-cols-3 gap-6">
            {data.map((item, index) => {
              return <Link to={item.link} key={index} className="bg-indigo-50 p-10 rounded-lg shadow-md">
                <h1 className="text-2xl text-black font-bold">{item.title}</h1>
                <h2 className="text-sm text-gray-400 my-4">{item.text}</h2>
                <button className="inline-block bg-indigo-400 text-white py-3 px-8 rounded text-sm font-semibold hover:bg-indigo-500">Go to lesson</button>
              </Link>
            })}
          </div>
        </div>
      </div>
    </>
  )
}
export default General