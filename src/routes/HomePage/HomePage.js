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

class HomePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            banners: [],
            subjects: []
        };
    }

    componentDidMount() {
        const homePageContentRequest = "http://10.0.0.5:9000/api/web";
        fetch(homePageContentRequest)
            .then(response => response.json())
            .then(result => this.setState({...result.data}));
    }

    render() {
        const SearchField = (
            <a className="search-wrap" href="/search">
                <div className="co-search-input">
                    <i className="iconf-search"></i>
                    <input type="text" placeholder="点击搜索课程"/>
                </div>
            </a>
        );

        const Categories = (
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

        const Hightlights = (
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

        const Subjects = this.state.subjects.map((subject) =>
            <section key={subject.subjectId}><Subject {...subject}/></section>
        );

        const Footer = (
            <div className="co-footer-nav">
                <a className="index current" href="/">
                    <div className="icon icon-index"></div>
                    <div className="item-name">首页</div>
                </a>
                <a className="purchased" href="/purchased">
                    <div className="icon icon-purchased"></div>
                    <div className="item-name">已购</div>
                </a>
            </div>
        );

        const sliderSettings = {
            dots: false,
            arrows: false,
            infinite: true,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1
        };
        const Slides = this.state.banners.map((banner) =>
            <div key={banner.coverUrl}><Link to={"/s/" + banner.subjectId}><img src={banner.coverUrl}/></Link></div>
        );

        return (
            <div className="p-index">
                <div className="co-scroll-view">
                    {SearchField}
                    {this.state.banners.length > 0 && <Slider {...sliderSettings}>{Slides}</Slider>}
                    {Categories}
                    {Hightlights}
                    {this.state.subjects.length > 0 && Subjects}
                </div>
                {Footer}
            </div>
        );
    }
}

export default HomePage;
