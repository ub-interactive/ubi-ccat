import React from "react";
import queryString from 'query-string';
import WsService from "../WsService/WsService";

class User {

    wsService = new WsService();

    getWechatUserInfo = (location, callback) => {
        const code = queryString.parse(location.search).code;
        if (window.navigator.userAgent.toLowerCase().indexOf('micromessenger') === -1) {
            alert("用户未登录，请在微信内打开页面");
        } else if (code) {
            this.wsService.wechatGetUserInfo(code, callback)
        } else {
            this.wsService.wechatGetAuthUrl(document.location, url => document.location = url)
        }
    }

}

export default User