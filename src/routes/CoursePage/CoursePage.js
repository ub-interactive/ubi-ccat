import React from 'react';
import './CoursePage.css';
import {Link} from "react-router-dom";
import ScrollableAnchor from 'react-scrollable-anchor'

class CoursePage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            currentTab: 0,
            fixedTabBar: false
        }
    }

    componentDidMount() {
        window.addEventListener("scroll", this.handleScroll);

        const url = `http://10.0.0.5:9000/api/web/c/${this.props.match.params.courseId}`;
        fetch(url)
            .then(response => response.json())
            .then(result => this.setState((prevState, props) => ({
                ...result.data
            })));
    }

    componentWillUnmount() {
        window.removeEventListener("scroll", this.handleScroll);
    }

    handleScroll = () => {
        const cInfo = document.getElementsByClassName("c-info")[0];
        const threshold = cInfo.offsetHeight + cInfo.offsetTop;
        this.setState({
            fixedTabBar: window.pageYOffset >= threshold
        })
    };

    render() {
        return this.state.courseId === undefined ? <div>加载中</div> : <div className="p-c">
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
                                 style={{"background-image": `url(&quot;${this.state.coverUrl}&quot;)`}}/>
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
                                {this.state.tags.map(tag => <div key={tag} className="c-course-tag-item">{tag}</div>)}
                            </div>
                        </div>
                        <div className="right">
                            <div className="info-money">
                                <div className="cur">￥<b>{this.state.promotionPrice / 100}</b></div>
                                <div className="origin">原价￥<span
                                    style={{"text-decoration": "line-through"}}>{this.state.price / 100}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={`co-tab-view panel ${this.state.fixedTabBar ? "fixed" : ""}`}>
                    <div className="co-tab-view-tabs">
                        <a href="#course-intro"
                              className={`co-tab-view-tab ${this.state.currentTab === 0 ? "current" : ""}`}
                              onClick={() => this.setState({currentTab: 0})}><span>课程介绍</span></a>
                        <a href="#course-menu"
                              className={`co-tab-view-tab ${this.state.currentTab === 1 ? "current" : ""}`}
                              onClick={() => this.setState({currentTab: 1})}><span>课程目录</span></a>
                        <a href="#course-info"
                              className={`co-tab-view-tab ${this.state.currentTab === 2 ? "current" : ""}`}
                              onClick={() => this.setState({currentTab: 2})}><span>课程须知</span></a>
                    </div>
                </div>
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
                <a className="btn-home" href="/">
                    <div className="icon"/>
                    <div className="name">首页</div>
                </a>
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
