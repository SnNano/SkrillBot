import config from '../../config'
import {useContext} from "react";
import { UserContext } from "../../App";

const Pricing = () => {
    const {state, dispatch} = useContext(UserContext);
  return (
    <div className="container my-24 px-6 mx-auto">
    <section className="mb-32 text-gray-800">
      <h2 className="text-3xl font-bold text-center mb-12">Pricing</h2>
  
      <div className="grid lg:grid-cols-3 gap-6 lg:gap-x-12">
        <div className="mb-6 lg:mb-0">
          <div className="block rounded-lg shadow-lg bg-white h-full">
            <div className="p-6 border-b border-gray-300 text-center">
              <p className="uppercase mb-4 text-sm">
                <strong>Basic</strong>
              </p>
              <h3 className="text-2xl mb-6">
                <strong>$9.99</strong>
                <small className="text-gray-500 text-sm">/year</small>
              </h3>
              <form action={config.baseURL + "users/stripe/subscribe"} method="POST" className="flex flex-1">
                <input type="hidden" name="token" value={state.user.token} />
                <input type="hidden" name="priceId" value={config.stripe.monthly} />
                <button type="submit"
                className="inline-block px-6 py-2.5 bg-transparent text-blue-600 font-medium text-xs leading-tight uppercase rounded hover:text-blue-700 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none focus:ring-0 active:bg-gray-200 transition duration-150 ease-in-out w-full">
                Buy
              </button>
            </form>
              
            </div>
            <div className="p-6">
              <ol className="list-inside">
                <li className="mb-4 flex items-center">
                  <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="check"
                    className="text-green-600 w-4 h-4 mr-2" role="img" xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512">
                    <path fill="currentColor"
                      d="M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z">
                    </path>
                  </svg>Unlimited updates
                </li>
                <li className="mb-4 flex items-center">
                  <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="check"
                    className="text-green-600 w-4 h-4 mr-2" role="img" xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512">
                    <path fill="currentColor"
                      d="M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z">
                    </path>
                  </svg>Git repository
                </li>
                <li className="mb-4 flex items-center">
                  <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="check"
                    className="text-green-600 w-4 h-4 mr-2" role="img" xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512">
                    <path fill="currentColor"
                      d="M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z">
                    </path>
                  </svg>npm installation
                </li>
              </ol>
            </div>
          </div>
        </div>
  
        <div className="mb-6 lg:mb-0">
          <div className="block rounded-lg shadow-lg bg-white h-full">
            <div className="p-6 border-b border-gray-300 text-center">
              <p className="uppercase mb-4 text-sm">
                <strong>Advanced</strong>
              </p>
              <h3 className="text-2xl mb-6">
                <strong>$99.99</strong>
                <small className="text-gray-500 text-sm">/year</small>
              </h3>
              <form action={config.baseURL + "users/stripe/subscribe"} method="POST" className="flex flex-1">
                <input type="hidden" name="token" value={state.user.token} />
                <input type="hidden" name="priceId" value={config.stripe.yearly} />
                <button type="submit"
                className="inline-block px-6 py-2.5 bg-transparent text-blue-600 font-medium text-xs leading-tight uppercase rounded hover:text-blue-700 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none focus:ring-0 active:bg-gray-200 transition duration-150 ease-in-out w-full">
                Buy
              </button>
              </form>
            </div>
            <div className="p-6">
              <ol className="list-inside">
                <li className="mb-4 flex items-center">
                  <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="check"
                    className="text-green-600 w-4 h-4 mr-2" role="img" xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512">
                    <path fill="currentColor"
                      d="M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z">
                    </path>
                  </svg>Unlimited updates
                </li>
                <li className="mb-4 flex items-center">
                  <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="check"
                    className="text-green-600 w-4 h-4 mr-2" role="img" xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512">
                    <path fill="currentColor"
                      d="M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z">
                    </path>
                  </svg>Git repository
                </li>
                <li className="mb-4 flex items-center">
                  <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="check"
                    className="text-green-600 w-4 h-4 mr-2" role="img" xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512">
                    <path fill="currentColor"
                      d="M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z">
                    </path>
                  </svg>npm installation
                </li>
                <li className="mb-4 flex items-center">
                  <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="check"
                    className="text-green-600 w-4 h-4 mr-2" role="img" xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512">
                    <path fill="currentColor"
                      d="M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z">
                    </path>
                  </svg>Code examples
                </li>
                <li className="mb-4 flex items-center">
                  <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="check"
                    className="text-green-600 w-4 h-4 mr-2" role="img" xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512">
                    <path fill="currentColor"
                      d="M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z">
                    </path>
                  </svg>Premium snippets
                </li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </section>  
  </div>
  )
}
export default Pricing