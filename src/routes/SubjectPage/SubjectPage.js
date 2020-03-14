import React from 'react';
import './SubjectPage.css';
import Subject from "../../components/Subject/Subject";
import BottomDetector from "../../components/BottomDetector/BottomDetector";

class SubjectPage extends React.Component {

    PageSize = 8;

    constructor(props) {
        super(props);
        this.state = {
            currPage: 1,
            hasMore: true,
            isLoading: false,
            courses: []
        }
    }

    componentDidMount() {
        this.loadMore()
    }

    loadMore = () => {
        if (this.state.hasMore && !this.state.isLoading) {
            const url = `http://10.0.0.5:9000/api/web/s/${this.props.match.params.subjectId}?page.curr=${this.state.currPage}&page.size=${this.PageSize}`;
            fetch(url)
                .then(res => res.json())
                .then(result => this.setState((prevState, props) => ({
                    ...prevState,
                    ...result.data,
                    currPage: prevState.currPage + 1,
                    hasMore: prevState.currPage < result.data.page.pages,
                    isLoading: false,
                    courses: [...prevState.courses, ...result.data.courses]
                })));
        }
    };

    render() {
        return (
            <div className="p-subject">
                <Subject {...this.state}/>
                <BottomDetector onPageBottom={this.loadMore} hasMore={true} isLoading={this.state.isLoading}/>
            </div>
        );
    }
}

export default SubjectPage;
