import React from 'react';
import './SubjectPage.css';
import Subject from "../../components/Subject/Subject";
import BottomDetector from "../../components/BottomDetector/BottomDetector";
import Footer from "../../components/Footer/Footer";

class SubjectPage extends React.Component {

    PageSize = 8;

    SessionStorageKey = (subjectId) => `SUBJECT_PAGE_STATE_${subjectId}`;

    constructor(props) {
        super(props);
        const cachedState = sessionStorage.getItem(this.SessionStorageKey(props.match.params.subjectId));
        this.state = cachedState ? JSON.parse(cachedState) : {
            currPage: 1,
            hasMore: true,
            isLoading: false,
            courses: []
        };
    }

    componentDidMount() {
        this.loadMore()
    }

    loadMore = () => {
        if (this.state.hasMore && !this.state.isLoading) {
            const url = `http://10.0.0.5:9000/api/web/s/${this.props.match.params.subjectId}?page.curr=${this.state.currPage}&page.size=${this.PageSize}`;
            this.setState((prevState, props) => ({
                isLoading: true
            }));
            fetch(url)
                .then(res => res.json())
                .then(result => this.setState((prevState, props) => ({
                    ...result.data,
                    currPage: prevState.currPage + 1,
                    hasMore: prevState.currPage < result.data.page.pages,
                    isLoading: false,
                    courses: [...prevState.courses, ...result.data.courses]
                })))
                .then(r => sessionStorage.setItem(this.SessionStorageKey(this.props.match.params.subjectId), JSON.stringify(this.state)));
        }
    };

    render() {
        return (
            <div className="p-subject">
                <Subject {...this.state}/>
                <BottomDetector onPageBottom={this.loadMore} hasMore={true} isLoading={this.state.isLoading}/>
                <Footer/>
            </div>
        );
    }
}

export default SubjectPage;
