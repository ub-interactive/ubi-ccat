import React from 'react';
import './SubjectPage.css';
import Subject from "../../components/Subject/Subject";

class SubjectPage extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        fetch("http://10.0.0.5:9000/api/web/s/" + this.props.match.params.subjectId)
            .then(res => res.json())
            .then(result => this.setState({...result.data}))
    }

    render() {
        return (
            <div className="p-subject">
                {this.state && <Subject {...this.state}/>}
            </div>
        );
    }
}

export default SubjectPage;
