import React from 'react';
import './HomePage.css';
import Slider from 'react-slick';
import Subject from "../../components/Subject/Subject";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import iconCateChinese from "./icon-cate-chinese.png";
import iconCateEnglish from "./icon-cate-english.png";
import iconCateMath from "./icon-cate-math.png";
import iconCateQuality from "./icon-cate-quality.png";
import iconCateSteam from "./icon-cate-steam.png";
import iconHighlightBaby from "./icon-highlight-baby.png";
import iconHighlightKid from "./icon-highlight-kid.png";
import {Link} from "react-router-dom";
import BottomDetector from "../../components/BottomDetector/BottomDetector";
import Footer from "../../components/Footer/Footer";
import SearchBar from "../../components/SearchBar/SearchBar";
import WsService from "../../services/WsService";
import UserService from "../../services/UserService";

class HomePage extends React.Component {

    wsService = new WsService();
    userService = new UserService();

    PageSize = 1;

    SessionStorageKey = "HOME_PAGE_STATE";

    constructor(props) {
        super(props);
        const cachedState = sessionStorage.getItem(this.SessionStorageKey);
        this.state = cachedState ? JSON.parse(cachedState) : {
            currPage: 1,
            hasMore: true,
            isLoading: false,
            banners: [],
            subjects: []
        };
    }

    componentDidMount() {
        this.userService.getWechatUserInfo(this.props.location,userInfo => {
            this.wsService.createUser("18600094776", userInfo.openId, alert("user created"));
        });
        console.log(1234);
        this.wsService.homePageGetInfo(data => {
            this.setState({...data});
            this.loadMore()
        })
    }

    loadMore = () => {
        if (this.state.hasMore && !this.state.isLoading) {
            this.setState({authenticate: true});

            this.setState({
                isLoading: true
            });
            this.wsService.homePageLoadMore(this.state.currPage, this.PageSize, data => {
                this.setState((prevState) => ({
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
        const sliderSettings = {
            dots: false,
            arrows: false,
            infinite: true,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1
        };
        const slider = this.state.banners.length > 0 && <Slider {...sliderSettings}>{this.state.banners.map((banner) =>
            <Link key={banner.coverUrl} to={"/s/" + banner.subjectId}><img src={banner.coverUrl}/></Link>
        )}</Slider>;

        const categories = (
            <section>
                <div className="cate-list">
                    <div className="cate-item">
                        <picture className="head-img">
                            <img src={iconCateChinese}/>
                        </picture>
                        <div className="name">语文</div>
                    </div>
                    <div className="cate-item">
                        <picture className="head-img">
                            <img src={iconCateMath}/>
                        </picture>
                        <div className="name">数学</div>
                    </div>
                    <div className="cate-item">
                        <picture className="head-img">
                            <img src={iconCateEnglish}/>
                        </picture>
                        <div className="name">英语</div>
                    </div>
                    <div className="cate-item">
                        <picture className="head-img">
                            <img src={iconCateQuality}/>
                        </picture>
                        <div className="name">素质</div>
                    </div>
                    <div className="cate-item">
                        <picture className="head-img">
                            <img src={iconCateSteam}/>
                        </picture>
                        <div className="name">STEAM</div>
                    </div>
                </div>
            </section>
        );

        const highlights = (
            <section>
                <div className="subject-list">
                    <div className="subject-item-wrap">
                        <div className="subject-item">
                            <picture className="co-ximg-cover abs-100">
                                <img src={iconHighlightBaby}/>
                            </picture>
                        </div>
                    </div>
                    <div className="subject-item-wrap">
                        <div className="subject-item">
                            <picture className="co-ximg-cover abs-100">
                                <img src={iconHighlightKid}/>
                            </picture>
                        </div>
                    </div>
                </div>
            </section>
        );

        const subjects = this.state.subjects.map((subject) =>
            <section key={subject.subjectId}><Subject {...subject}/></section>
        );

        return (
            <div className="p-index">
                <div className="co-scroll-view">
                    <Link to="/search"><SearchBar isPlaceHolder/></Link>
                    {slider}
                    {categories}
                    {highlights}
                    {subjects}
                </div>
                <BottomDetector onPageBottom={this.loadMore} hasMore={this.state.hasMore}
                                isLoading={this.state.isLoading}/>

                <Footer selected="index"/>
            </div>
        );
    }
}

export default HomePage;
