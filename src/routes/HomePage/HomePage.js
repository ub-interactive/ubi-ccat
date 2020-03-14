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

class HomePage extends React.Component {

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
        fetch("http://10.0.0.5:9000/api/web/h")
            .then(response => response.json())
            .then(result => this.setState((prevState, props) => ({...result.data})))
            .then(r => this.loadMore())
    }

    loadMore = () => {
        if (this.state.hasMore && !this.state.isLoading) {
            const url = `http://10.0.0.5:9000/api/web/h/s?page.curr=${this.state.currPage}&page.size=${this.PageSize}`;
            this.setState((prevState, props) => ({
                isLoading: true
            }));
            fetch(url)
                .then(response => response.json())
                .then(result => this.setState((prevState, props) => ({
                    currPage: prevState.currPage + 1,
                    hasMore: prevState.currPage < result.data.page.pages,
                    isLoading: false,
                    subjects: [...prevState.subjects, ...result.data.subjects]
                })))
                .then(r => sessionStorage.setItem(this.SessionStorageKey, JSON.stringify(this.state)))
        }
    };

    render() {
        const searchField = (
            <a className="search-wrap" href="/search">
                <div className="co-search-input">
                    <i className="iconf-search"/>
                    <input type="text" placeholder="点击搜索课程"/>
                </div>
            </a>
        );

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

        const footer = (
            <div>
                <div className="co-footer-nav">
                    <a className="index current" href="/">
                        <div className="icon icon-index"/>
                        <div className="item-name">首页</div>
                    </a>
                    <a className="purchased" href="/purchased">
                        <div className="icon icon-purchased"/>
                        <div className="item-name">已购</div>
                    </a>
                </div>
                <div className="co-footer-nav-placeholder"/>
            </div>
        );

        return (
            <div className="p-index">
                <div className="co-scroll-view">
                    {searchField}
                    {slider}
                    {categories}
                    {highlights}
                    {subjects}
                </div>
                <BottomDetector onPageBottom={this.loadMore} hasMore={this.state.hasMore}
                                isLoading={this.state.isLoading}/>
                {footer}
            </div>
        );
    }
}

export default HomePage;
