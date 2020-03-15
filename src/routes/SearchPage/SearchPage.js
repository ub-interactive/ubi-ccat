import * as React from "react";
import SearchBar from "../../components/SearchBar/SearchBar";
import BottomDetector from "../../components/BottomDetector/BottomDetector";
import Course from "../../components/Course/Course";

class SearchPage extends React.Component {

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
        keyword.length > 0 && this.loadMore()
    };

    loadMore = () => {
        if (this.state.hasMore && !this.state.isLoading) {
            const url = `http://10.0.0.5:9000/api/web/search?keyword=${this.state.keyword}&page.curr=${this.state.currPage}&page.size=${this.PageSize}`;
            this.setState((prevState, props) => ({
                isLoading: true
            }));
            fetch(url)
                .then(response => response.json())
                .then(result => this.setState((prevState, props) => ({
                    currPage: prevState.currPage + 1,
                    hasMore: prevState.currPage < result.data.page.pages,
                    isLoading: false,
                    courses: [...prevState.courses, ...result.data.courses]
                })))
        }
    };

    render() {
        const Courses = this.state.courses.map(course => <Course key={course.courseId} {...course} />);

        return <div className="co-search">
            <div className="co-scroll-view">
                <SearchBar keyword={this.state.keyword} onKeywordChange={this.onKeywordChange} autoFocus isPlaceHolder={false}/>
                <div className="c-course-list-style-1">{Courses}</div>
                <BottomDetector onPageBottom={this.loadMore} hasMore={this.state.hasMore}
                                isLoading={this.state.isLoading}/>
            </div>
        </div>
    }
}

export default SearchPage