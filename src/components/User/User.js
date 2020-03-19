import React from "react";
import queryString from 'query-string';
import WsService from "../WsService/WsService";

class User extends React.Component {

    wsService = new WsService();

    constructor(props) {
        super(props);
        this.state = {
            openId: null,
            nickname: null,
            gender: null,
            language: null,
            city: null,
            province: null,
            country: null,
            avatarUrl: null
        }
    };

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (!prevProps.authenticate && this.props.authenticate) {
            const code = queryString.parse(this.props.location.search).code;
            if (window.navigator.userAgent.toLowerCase().indexOf('micromessenger') === -1) {
                alert("用户未登录，请在微信内打开页面");
            } else if (this.state.openId) {
                this.props.onUserInfo(this.state)
            } else if (code) {
                this.wsService.wechatGetUserInfo(code, result => {
                    this.setState({...result.data});
                    this.props.onUserInfo(this.state)
                })
            } else {
                this.wsService.wechatGetAuthUrl(document.location, url => document.location = url)
            }
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