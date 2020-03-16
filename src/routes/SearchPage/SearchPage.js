import * as React from "react";
import SearchBar from "../../components/SearchBar/SearchBar";
import BottomDetector from "../../components/BottomDetector/BottomDetector";
import Course from "../../components/Course/Course";
import WsService from "../../components/WsService/WsService";

class SearchPage extends React.Component {

    wsService = new WsService();

    PageSize = 8;

    constructor(props) {
        super(props);
        this.state = {
            currPage: 1,
            hasMore: true,
            isLoading: false,
            keyword: undefined,
            courses: []
        };
    }

    onKeywordChange = (keyword) => {
        this.setState({
            currPage: 1,
            hasMore: true,
            keyword: keyword,
            courses: []
        });

        if (keyword && keyword.length > 0) {
            this.loadMore()
        }
    };

    loadMore = () => {
        if (this.state.hasMore && !this.state.isLoading) {
            this.setState((prevState, props) => ({
                isLoading: true
            }));
            this.wsService.searchPageSearch(this.state.keyword, this.state.currPage, this.PageSize, data => {
                this.setState((prevState, props) => ({
                    currPage: prevState.currPage + 1,
                    hasMore: prevState.currPage < data.page.pages,
                    isLoading: false,
                    courses: [...prevState.courses, ...data.courses]
                }))
            });
        }
    };

    render() {
        const Courses = this.state.courses.map(course => <Course key={course.courseId} {...course} />);

        return <div className="co-search">
            <div className="co-scroll-view">
                <SearchBar keyword={this.state.keyword} onKeywordChange={this.onKeywordChange} autoFocus
                           isPlaceHolder={false}/>
                <div className="c-course-list-style-1">{Courses}</div>
                <BottomDetector onPageBottom={this.loadMore} hasMore={this.state.hasMore}
                                isLoading={this.state.isLoading}/>
            </div>
        </div>
    }
}

export default SearchPage