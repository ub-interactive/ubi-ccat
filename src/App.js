import React from 'react';
import './App.css';
import HomePage from "./routes/HomePage/HomePage";
import SubjectPage from "./routes/SubjectPage/SubjectPage";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import CoursePage from "./routes/CoursePage/CoursePage";
import SearchPage from "./routes/SearchPage/SearchPage";
import PurchasedPage from "./routes/PurchasedPage/PurchasedPage";

class App extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route path="/" exact component={HomePage}/>
                    <Route path="/s/:subjectId" component={SubjectPage}/>
                    <Route path="/c/:courseId" component={CoursePage}/>
                    <Route path="/search" component={SearchPage}/>
                    <Route path="/purchased" component={PurchasedPage}/>
                </Switch>
            </BrowserRouter>
        );
    }
}

export default App;
