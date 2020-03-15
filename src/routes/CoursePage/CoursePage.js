import React from 'react';
import './CoursePage.css';

class CoursePage extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const url = `http://10.0.0.5:9000/api/web/c/${this.props.match.params.courseId}`;
        fetch(url)
            .then(response => response.json())
            .then(result => this.setState((prevState, props) => ({
                ...result.data
            })));
    }

    render() {
        return <div className="p-c">
            <div className="co-scroll-view">
                <div className="banner">
                    <picture className="c-media-blur-bg co-ximg-cover">
                        <img
                            src="https://assets.xrkmm.cn/u/3000000001831909e3653a34-038a-4222-b7e0-058fc9310fd8.jpg?x-oss-process=image/resize,m_fill,w_1125,h_750,limit_0"/>
                    </picture>
                    <div className="co-media-player co-media-player-audio co-media-player-init">
                        <picture className="co-media-player-cover">
                            <img
                                src="https://assets.xrkmm.cn/u/3000000001831909e3653a34-038a-4222-b7e0-058fc9310fd8.jpg?x-oss-process=image/resize,m_fill,w_1125,h_750,limit_0"/>
                        </picture>
                        <div className="btn-play-mask">
                            <div className="btn-media-play"></div>
                        </div>
                        <div className="audio-disk">
                            <div className="audio-disk-ent"
                                 style={{"background-image": "url(&quot;https://assets.xrkmm.cn/u/3000000001831909e3653a34-038a-4222-b7e0-058fc9310fd8.jpg?x-oss-process=image/resize,m_fill,w_1125,h_750,limit_0&quot;)"}}></div>
                        </div>
                    </div>
                </div>
                <div className="c-info">
                    <div className="main-info">
                        <div className="left">
                            <div className="info-name">
                                <div className="c-title2">心理学家周梵：15节课带你戒除孩子手机瘾/网瘾，收获健康亲子关系！</div>
                                <div className="subname">科学根治孩子手机瘾/网瘾</div>
                            </div>
                            <div className="tag-list">
                                <div className="c-course-tag-item">课程永久有效</div>
                            </div>
                        </div>
                        <div className="right">
                            <div className="info-money">
                                <div className="cur">￥<b>99</b></div>
                                <div className="origin">原价￥<span style={{"text-decoration": "line-through"}}>129</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="co-tab-view panel fixed">
                    <div className="co-tab-view-tabs">
                        <div className="co-tab-view-tab current"><span>课程介绍</span></div>
                        <div className="co-tab-view-tab"><span>课程目录</span></div>
                        <div className="co-tab-view-tab"><span>课程须知</span></div>
                    </div>
                </div>
                <div className="intro-details"/>
                <div className="co-c-intro">
                    {this.props.courseIntro}
                    <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
                    <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
                    <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
                    <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
                </div>
                <div className="intro-dir">
                    {this.props.courseMenu}
                </div>
                <div className="intro-item intro-notice">
                    {this.props.courseInfo}
                </div>
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
