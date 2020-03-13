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
                <div className="title">{this.props.title}</div>
                <div className="course-items">
                    {courseItems}
                </div>
            </div>
        );
    }
}

export default Subject;
