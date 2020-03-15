import * as React from "react";
import './SearchBar.css';

class SearchBar extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            keyword: undefined,
            history: []
        }
    }

    onInputValueChange = (e) => {
        const keyword = e.target.value;
        this.onKeywordChange(keyword)
    };

    onKeywordChange = (keyword) => {
        this.setState({keyword: keyword});
        clearTimeout(this.timeout);
        this.timeout = setTimeout(() => {
            keyword && this.setState((prevState, props) => ({
                history: [...new Set([keyword, ...prevState.history])].slice(0, 5)
            }));
            this.props.onKeywordChange(keyword)
        }, 500);
    };

    render() {
        const historySearch = this.state.history.map(item => <div key={item} className="his-item"
                                                                  onClick={() => this.onKeywordChange(item)}>{item}</div>);

        return <div className="co-search">
            <div className="search-wrap">
                <div className="co-search-input">
                    <i className="iconf-search"/>
                    <input type="text" placeholder="点击搜索课程" value={this.state.keyword || ""}
                           autoFocus={this.props.autoFocus}
                           onChange={this.onInputValueChange}/>
                </div>
            </div>
            <div className="search-his" style={this.state.history.length > 0 ? {display: "block"} : {display: "none"}}>
                <div className="his-title">
                    <span className="his-title-t">搜索历史</span>
                    <span className="btn-clean" onClick={() => this.setState({history: []})}>清空</span>
                </div>
                <div className="his-list">
                    {historySearch}
                </div>
            </div>
        </div>
    }
}

export default SearchBar