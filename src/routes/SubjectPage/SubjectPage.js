import React from 'react';
import './SubjectPage.css';
import Subject from "../../components/Subject/Subject";

class SubjectPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            courses: []
        }
    }

    componentDidMount() {
        fetch("http://10.0.0.5:9000/api/web/s/3c04acd0-9e72-4be7-9a38-ae419da401ac")
            .then((res) => res.json())
            .then((result) => this.setState({...result.data}))
    }

    render() {
        return (
            <div className="p-index">
                <section><Subject {...this.state}/></section>
            </div>
        );
    }
}

export default SubjectPage;
