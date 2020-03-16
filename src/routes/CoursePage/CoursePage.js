import React from 'react';
import './CoursePage.css';
import ScrollableAnchor from 'react-scrollable-anchor';
import {Link} from "react-router-dom";
import WsService from "../../components/WsService/WsService";

class CoursePage extends React.Component {

    wsService = new WsService();

    constructor(props) {
        super(props);
        this.state = {
            currentTab: 0,
            fixedTabBar: false
        };
    }

    componentDidMount() {
        this.wsService.coursePageGet(this.props.match.params.courseId, data => {
            this.setState({
                ...data
            });
            window.addEventListener("scroll", this.handleScroll)
        });
    }

    componentWillUnmount() {
        window.removeEventListener("scroll", this.handleScroll);
    }

    handleScroll = () => {
        const cInfo = document.getElementsByClassName("c-info")[0];
        const courseIntro = document.getElementsByClassName("course-intro")[0];
        const courseMenu = document.getElementsByClassName("course-menu")[0];
        const courseInfo = document.getElementsByClassName("course-info")[0];

        this.setState({
            fixedTabBar: window.pageYOffset >= (cInfo.offsetTop + cInfo.offsetHeight),
            currentTab: window.pageYOffset >= courseIntro.offsetTop ? window.pageYOffset >= courseMenu.offsetTop ? window.pageYOffset >= courseInfo.offsetTop ? 2 : 1 : 0 : 0
        });
    };

    render() {
        return this.state.courseId === undefined ? <div className="p-c"/> : <div className="p-c">
            <div className="co-scroll-view">
                <div className="banner">
                    <picture className="c-media-blur-bg co-ximg-cover">
                        <img src={this.state.coverUrl}/>
                    </picture>
                    <div className="co-media-player co-media-player-audio co-media-player-init">
                        <picture className="co-media-player-cover">
                            <img src={this.state.coverUrl}/>
                        </picture>
                        <div className="btn-play-mask">
                            <div className="btn-media-play"/>
                        </div>
                        <div className="audio-disk">
                            <div className="audio-disk-ent"
                                 style={{backgroundImage: `url(&quot;${this.state.coverUrl}&quot;)`}}/>
                        </div>
                    </div>
                </div>
                <div className="c-info">
                    <div className="main-info">
                        <div className="left">
                            <div className="info-name">
                                <div className="c-title2">{this.state.title}</div>
                                <div className="subname">{this.state.subtitle}</div>
                            </div>
                            <div className="tag-list">
                                {this.state.tags.map((tag, index) => <div key={index}
                                                                          className="c-course-tag-item">{tag}</div>)}
                            </div>
                        </div>
                        <div className="right">
                            <div className="info-money">
                                <div className="cur">￥<b>{this.state.promotionPrice / 100}</b></div>
                                <div className="origin">原价￥<span
                                    style={{textDecoration: "line-through"}}>{this.state.price / 100}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={`co-tab-view panel ${this.state.fixedTabBar ? "fixed" : ""}`}>
                    <div className="co-tab-view-tabs">
                        <a href="#course-intro"
                           className={`co-tab-view-tab ${this.state.currentTab === 0 ? "current" : ""}`}><span>课程介绍</span></a>
                        <a href="#course-menu"
                           className={`co-tab-view-tab ${this.state.currentTab === 1 ? "current" : ""}`}><span>课程目录</span></a>
                        <a href="#course-info"
                           className={`co-tab-view-tab ${this.state.currentTab === 2 ? "current" : ""}`}><span>课程须知</span></a>
                    </div>
                </div>
                <div className="co-tab-view-placeholder" style={{display: this.state.fixedTabBar ? "block" : "none"}}/>
                <ScrollableAnchor id="course-intro">
                    <div className="course-intro" dangerouslySetInnerHTML={{__html: this.state.courseIntro}}/>
                </ScrollableAnchor>
                <ScrollableAnchor id="course-menu">
                    <div className="course-menu" dangerouslySetInnerHTML={{__html: this.state.courseMenu}}/>
                </ScrollableAnchor>
                <ScrollableAnchor id="course-info">
                    <div className="course-info" dangerouslySetInnerHTML={{__html: this.state.courseInfo}}/>
                </ScrollableAnchor>
                <div className="footer-placeholder"/>
            </div>
            <div className="footer">
                <Link className="btn-home" to={"/"}>
                    <div className="icon"/>
                    <div className="name">首页</div>
                </Link>
                <div className="btns">
                    <div className="btn">
                        <div>立即购买</div>
                    </div>
                </div>
            </div>
        </div>
    }
}

export default CoursePage;
