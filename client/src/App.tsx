import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Credential from "./components/parents/Credential";
import Main from "./components/parents/Main";
import NotFound from "./components/parents/NotFound";

const App = () => {
  return (
    <div className={"app"}>
      {/* Handle routing throughout our application.*/}
      <Router>
        <Routes>
          <Route path="/" element={<Main />} />
          {/* Handles every route that does not match an existing one. */}
          <Route path="*" element={<NotFound />} />
          {/* Route for specific item type --- IProduct.SwordType  */}
          <Route path="/item/:type" element={<Main />}></Route>
          {/* Route for login/register */}
          <Route path="/credential/:type" element={<Credential />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
