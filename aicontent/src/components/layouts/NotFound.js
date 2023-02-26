import { useEffect } from "react";
//  import error from '../../images/error.svg';

const NotFound = () => {

  useEffect(()=>{
    window.scrollTo({top: 0, left: 0, behavior: "smooth" });
  }, []);

    return (
      <div className="flex items-center justify-center flex-col h-full">
        {/* <img src={error} alt="error-404" className="w-96" /> */}
         <h3 className="text-4xl mt-12 text-gray-500">ERROR 404! This page doesn't exist</h3>
      </div>
    )
  }
  export default NotFound