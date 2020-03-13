import React from 'react';
import './Course.css';

class Course extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const tags = this.props.tags.map((tag) =>
            <div key={tag} className="c-course-tag-item"><i className="iconf-hot"/>{tag}</div>
        );

        return (
            <div className="c-course-item-wrap">
                <div className="c-course-item">
                    <div className="head">
                        <picture className="co-ximg-cover head-img">
                            <img src={this.props.thumbnailUrl} alt=""/>
                        </picture>

                    </div>
                    <div className="info">
                        <div className="course-name">{this.props.title}</div>
                        <div className="tag-list">{tags}</div>
                        <div className="flex-grow1"></div>
                        <div className="money padding-right">
                            <span className="cur"><i>￥</i>{this.props.promotionPrice / 100}</span>
                            <span className="origin">￥>{this.props.price / 100}</span>
                        </div>
                        <div className="action"></div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Course;
