import React from 'react';
import './Footer.css';
import {Link} from "react-router-dom";

class Footer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: props.selected || "index"
        }
    }

    render() {
        return <div>
            <div className="co-footer-nav">
                <Link className={`index ${this.state.selected === "index" ? "current" : ""}`} to="/">
                    <div className="icon icon-index"/>
                    <div className="item-name">首页</div>
                </Link>
                <Link className={`index ${this.state.selected === "purchased" ? "current" : ""}`} to="/purchased">
                    <div className="icon icon-purchased"/>
                    <div className="item-name">已购</div>
                </Link>
            </div>
            <div className="co-footer-nav-placeholder"/>
        </div>
    }
}

export default Footer;
