import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, createContext, useReducer } from "react";

import Home from "./pages/Home";
import NotFound from "./components/layouts/NotFound";
import Header from "./components/layouts/Header";
import Essay from "./pages/Functionalities/Essay";
import Email from "./pages/Functionalities/Email";
import BlogArticle from "./pages/Functionalities/BlogArticle";
import SalesCopy from "./pages/Functionalities/SalesCopy";
import AdCopy from "./pages/Functionalities/AdCopy";
import ProductReview from "./pages/Functionalities/ProductReview";
import Ideas from "./pages/Functionalities/Ideas";
import CodeLookUp from "./pages/Functionalities/CodeLookUp";
import QandA from "./pages/Functionalities/QandA";
import {SidebarContext} from "./components/layouts/Sidebar";
import Signup from "./pages/auth/Signup";
import Login from "./pages/auth/Login";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { initialState } from "./Reducers/authReducer";
import { authReducer } from "./Reducers/authReducer";
import Pricing from "./components/sections/Pricing";

export const UserContext = createContext();

function App() {
  const [open, setOpen] = useState(false);
  const [state, dispatch] = useReducer(authReducer, initialState);
  
  return (
    <div className="font-poppins">
    <Router>
    {/* <Header /> */}
    <UserContext.Provider value={{state, dispatch}}>
      <SidebarContext.Provider value={{ open, setOpen }}>
        <ToastContainer />
          <Routes>
            <Route
            path="/*"
            element={
              <div className="relative px-8 py-4 sm:ml-64">
                <Routes>
                  <Route path="/success" element={<Essay />} />
                  <Route path="/essay" element={<Essay />} />
                  <Route path="/blog" element={<BlogArticle />} />
                  <Route path="/email" element={<Email />} />
                  <Route path="/sales-copy" element={<SalesCopy />} />
                  <Route path="/ad-copy" element={<AdCopy />} />
                  <Route path="/questions-answers" element={<QandA />} />
                  <Route path="/product-review" element={<ProductReview />} />
                  <Route path="/ideas" element={<Ideas />} />
                  <Route path="/code-generator" element={<CodeLookUp />} />
                </Routes>
              </div>
            }
          />
            <Route path="/sign-up" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/" element={<Home />} />
            <Route path="*" element={<NotFound />} />
          
          </Routes>
      </SidebarContext.Provider>
    </UserContext.Provider>
   </Router>
</div>
  );
}

export default App;
