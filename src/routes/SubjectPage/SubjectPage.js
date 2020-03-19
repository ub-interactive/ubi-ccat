import React from 'react';
import './SubjectPage.css';
import Subject from "../../components/Subject/Subject";
import BottomDetector from "../../components/BottomDetector/BottomDetector";
import Footer from "../../components/Footer/Footer";
import WsService from "../../services/WsService";

class SubjectPage extends React.Component {

    wsService = new WsService();

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
            this.setState((prevState, props) => ({
                isLoading: true
            }));
            this.wsService.subjectPageGet(this.props.match.params.subjectId, this.state.currPage, this.PageSize, data => {
                this.setState((prevState, props) => ({
                    ...data,
                    currPage: prevState.currPage + 1,
                    hasMore: prevState.currPage < data.page.pages,
                    isLoading: false,
                    courses: [...prevState.courses, ...data.courses]
                }));
                sessionStorage.setItem(this.SessionStorageKey(this.props.match.params.subjectId), JSON.stringify(this.state))
            });
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
