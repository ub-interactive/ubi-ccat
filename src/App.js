import React from 'react';
import './App.css';
import HomePage from "./routes/HomePage/HomePage";
import SubjectPage from "./routes/SubjectPage/SubjectPage";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import CoursePage from "./routes/CoursePage/CoursePage";
import SearchPage from "./routes/SearchPage/SearchPage";

function App() {
    return (
        <Router>
            <Switch>
                <Route exact path="/" component={HomePage}/>
                <Route path="/s/:subjectId" component={SubjectPage}/>
                <Route path="/c/:courseId" component={CoursePage}/>
                <Route path="/search" component={SearchPage}/>
            </Switch>
        </Router>
    );
}

export default App;
