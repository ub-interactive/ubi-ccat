import React from "react";
import queryString from 'query-string';
import WsService from "../services/WsService";

class UserService {

    wsService = new WsService();

    USER_SERVICE_WECHAT_CODE_KEY = "USER_SERVICE_WECHAT_CODE";
    getWechatUserInfo = (callback) => {
        const code = queryString.parse(document.location).code;
        const cachedCodeJson = sessionStorage.getItem(this.USER_SERVICE_WECHAT_CODE_KEY);
        const cachedCodes = cachedCodeJson !== undefined ? JSON.parse(cachedCodeJson) : [];

        if (window.navigator.userAgent.toLowerCase().indexOf('micromessenger') === -1) {
            alert("用户未登录，请在微信内打开页面");
        } else if (code && cachedCodes.indexOf(code) === -1) {
            sessionStorage.setItem(this.USER_SERVICE_WECHAT_CODE_KEY, JSON.stringify([...cachedCodes, code]));
            this.wsService.wechatGetUserInfo(code, callback)
        } else {
            this.wsService.wechatGetAuthUrl(document.location, url => document.location = url)
        }
    };

    createUser = (mobile, openId, callback) => {
        this.wsService.createUser(mobile, openId, callback)
    }

}

export default UserService