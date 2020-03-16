import React from "react";
import queryString from 'query-string';

class User extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const code = queryString.parse(this.props.location.search).code;
        if (code) {
            fetch(`http://localhost:9000/api/web/wechat/get-user-info?code=${code}`)
                .then(resp => resp.json())
                .then(result => this.props.withUserInfo && this.props.withUserInfo(result.data))
        } else {
            fetch(`http://localhost:9000/api/web/wechat/get-auth-url?redirect_url=${document.location.href}`)
                .then(resp => resp.json())
                .then(result => result.data.url)
                .then(url => document.location = url);
        }
    }

    getConfig = ({url}) =>
        fetch(`http://localhost:9000/api/web/wechat/get-wx-js-api-config?url=${url}`)
            .then(res => res.json())
            .then(result => {
                const {appId, nonceStr, timestamp, url, signature} = result.data;
                return {
                    appId: appId,
                    nonceStr: nonceStr,
                    timestamp: Date.parse(timestamp),
                    url: url,
                    signature: signature
                };
            });

    /* should return an object like {
      appId: "wx05d8cb9deee3c05c",
      nonceStr: "nw0y6jnq1ie",
      signature: "e50d96cb73c09ba1e5848456d1ae90ec1b7ccf43",
      timestamp: 1541346529448
    } */

    render() {
        return null
    }

}

export default User