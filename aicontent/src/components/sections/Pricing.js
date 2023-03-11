import config from '../../config'
import { useContext } from "react";
import { UserContext } from "../../App";
import { cancelSubscription } from '../../services/stripeService';

const Pricing = () => {
  const { state, dispatch } = useContext(UserContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await cancelSubscription(dispatch);
    window.location.reload();
  }

  return (

    <section className="text-gray-800">
      <div className="grid md::grid-cols-2 grid-cols-1 gap-6 px-12 ">
        {state.user.user.plan !== "monthly" && <div className="mb-6 lg:mb-0">
          <div className="block rounded-lg shadow-lg bg-gray-100 w-[300px] h-full">
            <div className="p-6 border-b border-gray-300 text-center">
              <p className="uppercase mb-4 text-sm">
                <strong>Basic</strong>
              </p>
              <h3 className="text-2xl mb-6">
                <strong>$9.99</strong>
                <small className="text-gray-500 text-sm">/month</small>
              </h3>
              <form action={config.baseURL + "stripe/stripe/subscribe"} method="POST" className="flex flex-1">
                <input type="hidden" name="token" value={state.user.token} />
                <input type="hidden" name="priceId" value={config.stripe.monthly} />
                <button type="submit"
                  className="inline-block px-6 py-2.5 bg-gradient-to-r from-pink-500 to-blue-500 text-white font-medium text-xs leading-tight uppercase rounded hover:scale-90 focus:bg-gray-100 focus:outline-none focus:ring-0 active:bg-gray-200 transition duration-150 ease-in-out w-full">
                  Choose Plan
                </button>
              </form>
            </div>
            <div className="p-6">
              <ol className="list-inside">
                <li className="mb-4 flex items-center">
                  <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="check"
                    className="text-indigo-600 w-4 h-4 mr-2" role="img" xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512">
                    <path fill="currentColor"
                      d="M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z">
                    </path>
                  </svg>AI detection bypasser
                </li>
                <li className="mb-4 flex items-center">
                  <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="check"
                    className="text-indigo-600 w-4 h-4 mr-2" role="img" xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512">
                    <path fill="currentColor"
                      d="M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z">
                    </path>
                  </svg>Unique zero percent plagiarism
                </li>
                <li className="mb-4 flex items-center">
                  <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="check"
                    className="text-indigo-600 w-4 h-4 mr-2" role="img" xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512">
                    <path fill="currentColor"
                      d="M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z">
                    </path>
                  </svg>Multiple prompt generators
                </li>
                <li className="mb-4 flex items-center">
                  <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="check"
                    className="text-indigo-600 w-4 h-4 mr-2" role="img" xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512">
                    <path fill="currentColor"
                      d="M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z">
                    </path>
                  </svg>Unlimited characters
                </li>
                <li className="mb-4 flex items-center">
                  <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="check"
                    className="text-indigo-600 w-4 h-4 mr-2" role="img" xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512">
                    <path fill="currentColor"
                      d="M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z">
                    </path>
                  </svg>High quality customer service
                </li>
              </ol>
            </div>
          </div>
        </div>}

        {state.user.user.plan !== "yearly" && <div className="mb-6 lg:mb-0">
          <div className="block rounded-lg shadow-lg bg-gray-100 w-[300px] h-full">
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
                  className="inline-block px-6 py-2.5 bg-gradient-to-r from-pink-500 to-blue-500 text-white font-medium text-xs leading-tight uppercase rounded hover:scale-90 focus:bg-gray-100 focus:outline-none focus:ring-0 active:bg-gray-200 transition duration-150 ease-in-out w-full">
                  Choose Plan
                </button>
              </form>
            </div>
            <div className="p-6">
              <ol className="list-inside">
                <li className="mb-4 flex items-center">
                  <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="check"
                    className="text-indigo-600 w-4 h-4 mr-2" role="img" xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512">
                    <path fill="currentColor"
                      d="M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z">
                    </path>
                  </svg>AI detection bypasser
                </li>
                <li className="mb-4 flex items-center">
                  <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="check"
                    className="text-indigo-600 w-4 h-4 mr-2" role="img" xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512">
                    <path fill="currentColor"
                      d="M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z">
                    </path>
                  </svg>Unique zero percent plagiarism
                </li>
                <li className="mb-4 flex items-center">
                  <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="check"
                    className="text-indigo-600 w-4 h-4 mr-2" role="img" xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512">
                    <path fill="currentColor"
                      d="M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z">
                    </path>
                  </svg>Multiple prompt generators
                </li>
                <li className="mb-4 flex items-center">
                  <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="check"
                    className="text-indigo-600 w-4 h-4 mr-2" role="img" xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512">
                    <path fill="currentColor"
                      d="M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z">
                    </path>
                  </svg>Unlimited characters
                </li>
                <li className="mb-4 flex items-center">
                  <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="check"
                    className="text-indigo-600 w-4 h-4 mr-2" role="img" xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512">
                    <path fill="currentColor"
                      d="M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z">
                    </path>
                  </svg>High quality customer service
                </li>
              </ol>
            </div>
          </div>
        </div>}
        {state.user.user.plan !== "free" && state.user.user.plan !== "canceled" && <div className="mb-6 lg:mb-0">
          <div className="block w-[300px] h-full">
            <div className="p-6 h-full flex items-center justify-center text-center">
              <form onSubmit={handleSubmit}>
                <button type="submit" className="px-4 py-2 bg-red-500 text-white text-md hover:bg-red-400">
                  Cancel Subscription
                </button>
              </form>
            </div>
          </div>
        </div>}
      </div>
    </section>
  )
}
export default Pricing