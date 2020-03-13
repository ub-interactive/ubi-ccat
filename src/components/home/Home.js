import React from 'react';
import './Home.css';
import Subject from "../subject/Subject";

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            subjects: []
        }
    }

    componentDidMount() {
        fetch("http://10.0.0.5:9000/api/web/home")
            .then((res) => res.json())
            .then(
                (result) => {
                    const response = result.data;
                    this.setState({
                        subjects: response.subjects
                    })
                }
            )
    }

    render() {
        const subjects = this.state.subjects.map((subject) =>
            <Subject key={subject.subjectId} {...subject}/>
        );

        return (
            <div className="p-index">
                <div className="co-scroll-view">

                    <a className="search-wrap" href="/search">
                        <div className="co-search-input"><i className="iconf-search"></i><input type="text" placeholder="点击搜索课程" /></div>
                    </a>

                    <div className="section">
                        {subjects}
                    </div>
                </div>

                <div className="co-footer-nav"><a className="index current" href="/">
                    <div className="icon icon-index"></div>
                    <div className="item-name">首页</div>
                </a><a className="purchased" href="/purchased">
                    <div className="icon icon-purchased"></div>
                    <div className="item-name">已购</div>
                </a></div>

            </div>
        );
    }
}

export default Home;
