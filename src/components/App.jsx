import React, { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";
import Axios from "axios";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import About from "./About";
import Welcome from "./Welcome";
import NotesPage from "./NotesPage";

function App() {
  return (
    <div className="application">
      <Router>
        <Header />
        <Switch>
          <Route path="/" exact component={Welcome}></Route>
          <Route path="/about" exact component={About}></Route>
          <Route path="/notes" exact component={NotesPage}></Route>
        </Switch>
      </Router>
      <Footer />
    </div>
  );
}

export default App;
