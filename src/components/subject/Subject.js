import React from 'react';
import './Subject.css';
import Course from "./Course";

class Subject extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const courseItems = this.props.courses.map((course) =>
            <Course key={course.courseId} {...course}/>
        );

        return (
            <div className="subject">
                <div className="c-s-header">
                    <div className="c-title1">{this.props.title}</div>
                </div>
                <div className="c-course-list-style-1">
                    {courseItems}
                </div>
            </div>
        );
    }
}

export default Subject;
