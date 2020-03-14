import React from 'react';
import './Home.css';
import Slider from 'react-slick';
import Subject from "../subject/Subject";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            banners: [],
            subjects: []
        }
    }

    componentDidMount() {
        fetch("http://10.0.0.5:9000/api/web/home")
            .then((res) => res.json())
            .then((result) => this.setState({...result.data}))
    }

    render() {
        const subjects = this.state.subjects.map((subject, index) =>
            <Subject key={index} {...subject}/>
        );

        const sliderSettings = {
            dots: false,
            arrows: false,
            infinite: true,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1
        };
        const slidersItems = this.state.banners.map((banner) =>
            <div key={banner.coverUrl}><img src={banner.coverUrl}/></div>
        );

        return (

            <div className="p-index">
                <div className="co-scroll-view">

                    <a className="search-wrap" href="/search">
                        <div className="co-search-input"><i className="iconf-search"></i><input type="text"
                                                                                                placeholder="点击搜索课程"/>
                        </div>
                    </a>

                    {this.state.banners.length > 0 && <Slider {...sliderSettings}>{slidersItems}</Slider>}

                    <div className="section">
                        {subjects}
                    </div>

                </div>

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

            </div>
        );
    }
}

export default Home;
