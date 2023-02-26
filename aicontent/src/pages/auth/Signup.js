import { Link } from "react-router-dom"
import { toast } from 'react-toastify';
import { UserContext } from "../../App";
import { useContext, useState, useEffect } from "react";
import {useNavigate} from "react-router-dom";
import { register } from "../../services/userService";
import GeneralSpinner from "../../components/layouts/GeneralSpinner";

const Signup = () => {

    const {state, dispatch} = useContext(UserContext);
    const [formData, setFormData] = useState({
      username:'',
      email:'',
      password:'',
      cpassword:''
    });
    const { username, email, password, cpassword } = formData;
    const navigate = useNavigate();
  
    useEffect(()=>{
      if(state.isError){
        toast.error(state.message);
      }
      if (state.isSuccess || state.user) {
        navigate('/essay');
      }
      dispatch({type:"RESET"});
    }, [state.isError, state.isSuccess, state.isLoading, state.message, navigate, state.user, dispatch]);

      // setForm data values
    const handleChange = (e) => {
        setFormData((prevState)=>({
        ...prevState,
        [e.target.name]:e.target.value
        }))
    }
     // Submit the htmlForm
  const handleSubmit = async (e) => {
    e.preventDefault();
    if(password !== cpassword){
      toast.error("Password mismatch", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    } else {
      const userData = {username, email, password};
      await register(userData, dispatch);
    }
  }

  if (state.isLoading) {
    return <GeneralSpinner />
    }

  return (
   <div>
        <header>
            <nav className="bg-white py-6 shadow-md flex justify-center">
                <Link to="/">SkrillBot</Link>
            </nav>
        </header>
        <div className="h-full w-full relative">
            <div className="hidden gradients lg:flex justify-center items-center">
                <div className="absolute left-[5%] top-0 rounded-full cyan "></div>
                <div className="absolute right-[5%] top-0 rounded-full red"></div>
            </div>
            <div className="mt-12 flex flex-col items-center justify-center">
                <h3 className="text-6xl md:text-4xl text-center max-w-[40rem]">Let's get you an account for the most powerful academic weapon!</h3>
                <form className="mt-12 md:max-w-md" onSubmit={handleSubmit}>
                    <div className="mb-6">
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                <i className="fa-regular fa-user w-5 h-5 text-gray-500"></i>
                            </div>
                            <input type="text" value={username} onChange={handleChange} id="username" name="username" className="outline-0 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full pl-10 p-2.5" placeholder="Your username" required/>
                        </div>
                    </div>
                    <div className="mb-6">
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                <i className="fa-regular fa-envelope w-5 h-5 text-gray-500"></i>
                            </div>
                            <input type="email" value={email} onChange={handleChange} id="email" name="email" className="outline-0 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full pl-10 p-2.5" placeholder="name@gmail.com" required/>
                        </div>
                    </div>
                    <div className="mb-6">
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                <i className="fa-solid fa-lock w-5 h-5 text-gray-500"></i>
                            </div>
                            <input type="password" value={password} onChange={handleChange} id="password" name="password" className="outline-0 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full pl-10 p-2.5" placeholder="Password" required/>
                        </div>
                    </div>
                    <div className="mb-6">
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                <i className="fa-solid fa-unlock w-5 h-5 text-gray-500"></i>
                            </div>
                            <input type="password" value={cpassword} onChange={handleChange} id="cpassword" name="cpassword" className="outline-0 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full pl-10 p-2.5" placeholder="Confirm Password" required/>
                        </div>
                    </div>
                    <div className="mb-6">
                        <div className="flex items-center">
                            <input id="terms" type="checkbox" value="" className="w-4 h-4 text-green-700 bg-gray-100 border-gray-300 rounded focus:ring-green-500 focus:ring-2" />
                            <label for="terms" className="ml-2 text-sm font-medium text-gray-900">I agree with the <a href="##" className="text-green-600 hover:underline">terms and conditions</a>.</label>
                        </div>
                    </div>
                    <div className="mb-6 flex justify-center">
                        <button className="uppercase rounded-lg px-6 py-2 text-md bg-green-700 text-white hover:bg-green-800">Sign Up</button>
                    </div>
                    <div className="text-sm text-center">
                        <Link to="/login">Already signed up? Click here to <span className="text-green-700">log in!</span></Link>
                    </div>
                </form>   
            </div>
        </div>
   </div>
  )
}
export default Signup