import React from 'react';
import './Course.css';

class Course extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="item">
                <div className="thumbnail">
                    <img src={this.props.thumbnailUrl} alt=""/>
                </div>
                <div className="desc">
                    <div className="title">{this.props.title}</div>
                    <div className="tags"></div>
                    <div className="price"></div>
                    <div className="action"></div>
                </div>

            </div>
        );
    }
}

export default Course;
