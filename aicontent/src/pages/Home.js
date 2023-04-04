import FirstSection from "../components/sections/FirstSection";
import Subscribe from "../components/layouts/Subscribe";
import Footer from "../components/layouts/Footer";
import { Helmet } from "react-helmet-async";
import General from "../components/sections/General";
import highSchool from "../assets/images/High-School-01.svg";
import students01 from "../assets/images/Students-01.svg";
import { useEffect } from "react";
import PricingHome from "../components/sections/PricingHome";


const Home = () => {
    <Helmet>
        <title>SkrillBot</title>
        <meta name="description" content="Revolutionize Your Writing and Coding with Skrillbot's AI-Powered Services | Get High-Quality Content and Homework Help in Minutes" />
        <meta rel="canonical" href="/" />
    </Helmet>
    useEffect(() => { window.scrollTo({ top: 0, left: 0, behavior: "smooth" }); }, []);
    return (
        <>
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
                                        <h2 className="text-4xl font-extrabold tracking-tight text-gray-900">Bypass Plagiarism and AI detection<span className="text-indigo-400">.</span></h2>
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
                    <PricingHome />
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
                                        <p>"Writing with SkrillBot has given me so much more confidence in my essays."</p>
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
                    <Subscribe />
                </div>
            </div>
            <Footer />
        </>

    )
}
export default Home
