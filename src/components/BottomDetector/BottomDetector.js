import React from 'react';
import "./BottomDetector.css";

class BottomDetector extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            height: window.innerHeight,
            isLoading: props.isLoading || false,
            hasMore: props.hasMore || true
        };
    }

    handleScroll = () => {
        const windowHeight = "innerHeight" in window ? window.innerHeight : document.documentElement.offsetHeight;
        const body = document.body;
        const html = document.documentElement;
        const docHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
        const windowBottom = windowHeight + window.pageYOffset;
        windowBottom >= docHeight - 200 && this.props.onPageBottom && this.props.onPageBottom()
    };

    componentWillUnmount() {
        window.removeEventListener("scroll", this.handleScroll);
    }

    componentDidMount() {
        window.addEventListener("scroll", this.handleScroll);
    }

    render() {
        const hasMore = this.props.hasMore === undefined ? true : this.props.hasMore;
        const isLoading = this.props.isLoading === undefined ? false : this.props.isLoading;
        return <div className="co-load-status">
            {!hasMore && "- 没有更多了 -"}
            {isLoading && "加载中···"}
        </div>
    }
}

export default BottomDetector;
