import * as React from "react";
import Footer from "../../components/Footer/Footer";
import "./PurchasedPage.css";
import Subject from "../../components/Subject/Subject";
import BottomDetector from "../../components/BottomDetector/BottomDetector";
import WsService from "../../services/WsService";

class PurchasedPage extends React.Component {

    wsService = new WsService();

    PageSize = 1;

    SessionStorageKey = "PURCHASED_PAGE_STATE";

    constructor(props) {
        super(props);
        const cachedState = sessionStorage.getItem(this.SessionStorageKey);
        this.state = cachedState ? JSON.parse(cachedState) : {
            currPage: 1,
            hasMore: true,
            isLoading: false,
            subjects: []
        };
    }

    componentDidMount() {
        this.loadMore();
    }

    loadMore = () => {
        if (this.state.hasMore && !this.state.isLoading) {
            this.setState((prevState, props) => ({
                isLoading: true
            }));
            this.wsService.homePageLoadMore(this.state.currPage, this.PageSize, data => {
                this.setState((prevState, props) => ({
                    currPage: prevState.currPage + 1,
                    hasMore: prevState.currPage < data.page.pages,
                    isLoading: false,
                    subjects: [...prevState.subjects, ...data.subjects]
                }));
                sessionStorage.setItem(this.SessionStorageKey, JSON.stringify(this.state))
            })
        }
    };

    render() {
        const subjects = this.state.subjects.map((subject) =>
            <section key={subject.subjectId}><Subject {...subject}/></section>
        );

        return <div className="p-purc">
            <div className="co-scroll-view">
                <div className="c-header-bg"/>


                <div className="c-panel">
                    <div className="userinfo">
                        <div className="user-name">mikomiko</div>
                        <div className="btn-cours-tips">上课指南</div>
                    </div>

                    <div className="empty-list">
                        <div className="img"/>
                        <div className="desc">暂无已购课程</div>
                    </div>
                </div>

                {subjects}
            </div>
            <BottomDetector onPageBottom={this.loadMore} hasMore={this.state.hasMore}
                            isLoading={this.state.isLoading}/>

            <Footer selected="purchased"/>
        </div>
    }
}

export default PurchasedPage