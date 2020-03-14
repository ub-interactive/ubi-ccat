import React from 'react';
import './App.css';
import HomePage from "./routes/HomePage/HomePage";
import SubjectPage from "./routes/SubjectPage/SubjectPage";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";

function App() {
    return (
        <Router>
            <Switch>
                <Route exact path="/" component={HomePage}/>
                <Route path="/s/:subjectId" component={SubjectPage}/>
            </Switch>
        </Router>
    );
}

export default App;
