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
        fetch("http://localhost:9000/api/web/home")
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
            <div className="subjects">
                {subjects}
            </div>
        );
    }
}

export default Home;
