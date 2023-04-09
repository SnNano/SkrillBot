import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useState, createContext, useReducer, useEffect } from "react";

import Home from "./pages/Home";
import NotFound from "./components/layouts/NotFound";
import Essay from "./pages/Functionalities/Essay";
import Email from "./pages/Functionalities/Email";
import BlogArticle from "./pages/Functionalities/BlogArticle";
import SalesCopy from "./pages/Functionalities/SalesCopy";
import AdCopy from "./pages/Functionalities/AdCopy";
import ProductReview from "./pages/Functionalities/ProductReview";
import Ideas from "./pages/Functionalities/Ideas";
import CodeLookUp from "./pages/Functionalities/CodeLookUp";
import QandA from "./pages/Functionalities/QandA";
import { SidebarContext } from "./components/layouts/Sidebar";
import Signup from "./pages/auth/Signup";
import Login from "./pages/auth/Login";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { initialState } from "./Reducers/authReducer";
import { authReducer } from "./Reducers/authReducer";
import Settings from "./components/sections/Settings";
import Dashboard from "./pages/Dashboard";
import Billing from "./components/sections/Billing";
import VerifyEmail from "./components/layouts/VerifyEmail";
import BioGenerator from "./pages/Functionalities/BioGenerator";
import ArticleSummary from "./pages/Functionalities/ArticleSummary";
import BookSummary from "./pages/Functionalities/BookSummary";
import YoutubeTranscripts from "./pages/Functionalities/YoutubeTranscripts";
import YoutubeScripts from "./pages/Functionalities/YoutubeScripts";
import CollegeApp from "./pages/Functionalities/CollegeApp";
import EmailResponder from "./pages/Functionalities/EmailResponder";
import { fetchAuthUserGoogle, fetchAuthUser } from "./services/userService";
import MiniGpt from "./pages/Functionalities/MiniGpt";
import RewriteEssay from "./pages/Functionalities/RewriteEssay";
import TermsOfUse from "./components/sections/TermsOfUse";
import PrivacyPolicy from "./components/sections/PrivacyPolicy";
import RefundPolicy from "./components/sections/RefundPolicy";
import AuthVerify from "./services/AuthVerify";
import { Logout } from "./services/userService";
import CoverLetter from "./pages/Functionalities/CoverLetter";
import packageJson from '../package.json';

export const UserContext = createContext();
export const RemainingWordsContext = createContext({});


function App() {
  const [open, setOpen] = useState(false);
  const [state, dispatch] = useReducer(authReducer, initialState);
  const [remainingWords, setRemainingWords] = useState(state.user ? state.user.user.characters : 0);


  useEffect(() => {
    const log = async () => {
      await fetchAuthUserGoogle(dispatch)
      await fetchAuthUser(dispatch)
    }
    log()
  }, [])
  useEffect(() => {
    const checkAndUpdateCache = () => {
      let version = localStorage.getItem('version');
      if (version !== packageJson.version) {
        if ('caches' in window) {
          caches.keys().then((names) => {
            // Delete all the cache files
            names.forEach((name) => {
              caches.delete(name);
            });
          });

          // Makes sure the page reloads. Changes are only visible after you refresh.
          window.location.reload(true);
        }

        localStorage.clear();
        localStorage.setItem('version', packageJson.version);
      }
    };

    checkAndUpdateCache();
  }, []); // Pass an empty dependency array
  const onLogout = async () => {
    await Logout(state, dispatch);
  }


  return (
    <div className="font-poppins min-h-screen">
      <Router>
        <UserContext.Provider value={{ state, dispatch }}>
          <RemainingWordsContext.Provider value={{ remainingWords, setRemainingWords }}>
            <SidebarContext.Provider value={{ open, setOpen }}>
              <ToastContainer />
              <Routes>
                <Route
                  path="/*"
                  element={
                    state.user ? (
                      <div className="relative sm:ml-64 bg-gray-100 min-h-screen">
                        <Routes>
                          <Route path="/settings" element={<Settings />} />
                          <Route path="/billing" element={<Billing />} />
                          <Route path="/dashboard" element={<Dashboard />} />
                          <Route path="/cover-letter" element={<CoverLetter />} />
                          <Route path="/success" element={<Dashboard />} />
                          <Route path="/rewrite-essay" element={<RewriteEssay />} />
                          <Route path="/essay" element={<Essay />} />
                          <Route path="/college" element={<CollegeApp />} />
                          <Route path="/blog" element={<BlogArticle />} />
                          <Route path="/email" element={<Email />} />
                          <Route path="/sales-copy" element={<SalesCopy />} />
                          <Route path="/ask-anything" element={<MiniGpt />} />
                          <Route path="/ad-copy" element={<AdCopy />} />
                          <Route path="/questions-answers" element={<QandA />} />
                          <Route path="/bio-generator" element={<BioGenerator />} />
                          <Route path="/summarizer" element={<ArticleSummary />} />
                          <Route path="/email-responder" element={<EmailResponder />} />
                          <Route path="/book-summary" element={<BookSummary />} />
                          <Route path="/youtube-transcripts" element={<YoutubeTranscripts />} />
                          <Route path="/youtube-scripts" element={<YoutubeScripts />} />
                          <Route path="/product-review" element={<ProductReview />} />
                          <Route path="/ideas" element={<Ideas />} />
                          <Route path="/code-generator" element={<CodeLookUp />} />
                        </Routes>
                      </div>
                    ) : (<Navigate to="/login" state={{ from: '/billing' }} replace />)
                  }
                />
                <Route path="/sign-up" element={<Signup />} />
                <Route path="/:id/verify/:token" element={<VerifyEmail />} />
                <Route path="/refund-policy" element={<RefundPolicy />} />
                {/* <Route path="/complete-signup" element={state.user ? <Phone /> : <Navigate to="/sign-up" />} /> */}
                <Route path="/sign-up/:referralId" element={<Signup />} />
                <Route path="/login" element={<Login />} />
                <Route path="/terms-of-use" element={<TermsOfUse />} />
                <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                <Route path="/" element={<Home />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
              <AuthVerify logout={onLogout} />
            </SidebarContext.Provider>
          </RemainingWordsContext.Provider>
        </UserContext.Provider>
      </Router>
    </div>
  );
}


export default App;
