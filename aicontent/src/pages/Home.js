import FirstSection from "../components/sections/FirstSection";
import Footer from "../components/layouts/Footer";
import { Helmet } from "react-helmet-async";
import General from "./General";
import highSchool from "../assets/images/High-School-01.svg";
import students01 from "../assets/images/Students-01.svg";
import { useEffect } from "react";


const Home = () => {
    <Helmet>
        <title>SkrillBot</title>
        <meta name="description" content="Skrillbot is a website that uses AI to automate homework assignments, reducing stress,saving time and helping students improve their understanding." />
        <meta rel="canonical" href="/" />
    </Helmet>
    useEffect(() => { window.scrollTo({ top: 0, left: 0, behavior: "smooth" }); }, []);
    return (
        <div>
            <div className="site-content bg-white overflow-hidden">
                <FirstSection />
                <section className="relative pt-16 pb-32 overflow-hidden bg-white space-y-24">
                    <div>
                        <div className="lg:mx-auto lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-2 lg:grid-flow-col-dense lg:gap-6 xl:gap-12 2xl:gap-24">
                            <div className="lg:col-start-2 max-w-xl px-4 mx-auto sm:px-6 lg:py-32 lg:max-w-none lg:mx-0 lg:px-0 space-y-6"><div>
                                <h2 className="text-4xl font-extrabold tracking-tight text-gray-900">Boost Your Writing Speed<span className="text-gren-400">.</span></h2>
                                <p className="mt-4 text-lg leading-relaxed text-gray-500 sm:text-xl">SkrillBot helps you write better and faster. From brainstorming to final drafts, our Al-powered tools assist with writing essays, sales copy, and more, ensuring originality and efficiency for everyone.</p>
                            </div>
                                <div></div>
                            </div>
                            <div className="lg:col-start-1 mt-12 sm:mt-16 lg:mt-0">
                                <div className="pr-4 -sm:ml-48 sm:pr-6 md:-ml-16 lg:px-0 lg:m-0 lg:relative lg:h-full lg:flex lg:items-center">
                                    <img className="lg:right-0 w-full lg:absolute lg:w-auto lg:max-w-xl xl:max-w-2xl 2xl:max-w-3xl rounded" src={students01} alt="Improved writing efficiency" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="lg:mx-auto lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-2 lg:grid-flow-col-dense lg:gap-6 xl:gap-12 2xl:gap-24">
                            <div className="max-w-xl px-4 mx-auto sm:px-6 lg:py-32 lg:max-w-none lg:mx-0 lg:px-0 space-y-6">
                                <div>
                                    <h2 className="text-4xl font-extrabold tracking-tight text-gray-900">Bypasses ai plagiarism detectors<span className="text-indigo-400">.</span></h2>
                                    <p className="mt-4 text-lg leading-relaxed text-gray-500 sm:text-xl">Our Ai algorithms ensure that your writing is unique and not flagged by plagiarism detectors, saving you time and hassle. Whether you're a student, professional, or content creator our, Ai-powered writing topics will help you produce high quality work quickly and easily.</p>
                                </div>
                                <div></div>
                            </div>
                            <div className="mt-12 sm:mt-16 lg:mt-0">
                                <div className="pl-4 sm:-mr-48 sm:-mr-6 sm:pl-6 md:-mr-16 lg:px-0 lg:m-0 lg:relative lg:h-full lg:flex lg:items-center">
                                    <img className="lg:left-0 w-full lg:absolute lg:w-auto lg:max-w-xl xl:max-w-2xl 2xl:max-w-3xl rounded" src={highSchool} alt="Bypasses ai plagiarism detectors" />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <General />
                <section className="py-12 overflow-hidden bg-indigo-400 bg-opacity-80 md:py-20">
                    <div className="relative px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
                        <svg className="absolute transform top-full right-full translate-x-1/3 -translate-y-1/4 lg:translate-x-1/2 xl:-translate-y-1/2 rotate-3" width="404" height="404" fill="none" viewBox="0 0 404 404" role="img">
                            <title id="svg-squares">squares</title>
                            <defs>
                                <pattern id="ad119f34-7694-4c31-947f-5c9d249b21f3" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse"><rect x="0" y="0" width="4" height="4" className="text-indigo-400" fill="currentColor"></rect></pattern></defs>
                            <rect width="404" height="404" fill="url(#ad119f34-7694-4c31-947f-5c9d249b21f3)"></rect>
                        </svg>
                        <div className="relative">
                            <blockquote>
                                <div className="max-w-3xl mx-auto text-xl font-bold leading-7 text-center text-white md:leading-10 md:text-3xl text-shadow-sm">
                                    <p>"Writing with ThesisBot has given me so much more confidence in my essays."</p>
                                </div>
                                <footer className="mt-8">
                                    <div className="md:flex md:items-center md:justify-center">
                                        <div className="md:flex-shrink-0">
                                            <img src="https://storage.googleapis.com/mixo-files/public/img/avatars/male-11.png" className="w-10 h-10 mx-auto border-2 border-slate-200 rounded-full shadow-sm object-cover" alt="Testimonial" />
                                        </div>
                                        <div className="mt-3 text-center md:mt-0 md:ml-3 md:flex md:items-center text-shadow-sm">
                                            <div className="text-lg font-medium text-white">Tim White</div>
                                        </div>
                                    </div>
                                </footer>
                            </blockquote>
                        </div>
                    </div>
                </section>
                <Footer />
            </div>
        </div>
    )
}
export default Home


// <header className="px-12 mx-auto">
// <nav className="bg-white border-gray-200 px-2 sm:px-4 py-2.5 rounded">
//   <div className="container flex flex-wrap items-center justify-between mx-auto">
//     <Link to="/" className="flex items-center">
//         <span className="self-center text-xl font-semibold whitespace-nowrap">LOGO</span>
//     </Link>
//     <button type="button" className="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200" aria-controls="navbar-default" aria-expanded="false">
//       <span className="sr-only">Open main menu</span>
//       <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"></path></svg>
//     </button>
//     <div className="hidden w-full md:block md:w-auto" id="navbar-default">
//       <ul className="flex flex-col p-4 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-white">
//         <li>
//           <Link to="/" className="block py-2 pl-3 pr-4 text-white bg-indigo-400 rounded md:bg-transparent md:text-indigo-400 md:p-0">Home</Link>
//         </li>
//         <li>
//           <Link to="/" className="block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-indigo-700 md:p-0">About</Link>
//         </li>
//       </ul>
//     </div>
//   </div>
// </nav>
// </header>