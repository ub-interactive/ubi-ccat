class WsService {

    gateway = process.env.REACT_APP_GATEWAY;
    isWechatBrowser = window.navigator.userAgent.toLowerCase().indexOf('micromessenger') > -1;

    debug = (msg) => {
        this.isWechatBrowser ? alert(msg) : console.log(msg)
    };

    get = (url, callback) => fetch(url)
        .then(resp => {
            if (!resp.ok) {
                throw new Error('Network response was not ok')
            } else {
                return resp.json()
            }
        })
        .then(result => {
            if (result.code === "ok") {
                callback(result.data)
            } else {
                throw new Error(result.error)
            }
        })
        .catch(error => this.debug(error));

    post = (url, body, callback) => fetch(url, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({data: body})
    })
        .then(resp => {
            if (!resp.ok) {
                throw new Error('Network response was not ok')
            } else {
                return resp.json()
            }
        })
        .then(result => {
            if (result.code === "ok") {
                callback(result.data)
            } else {
                throw new Error(result.error)
            }
        })
        .catch(error => this.debug(error));

    /** USER */
    wechatGetAuthUrl = (redirectUrl, callback) => {
        this.get(`${this.gateway}/user/get-wechat-auth-url?redirect_url=${redirectUrl}`, data => callback(data.url));
    };

    wechatGetUserInfo = (code, callback) => {
        this.get(`${this.gateway}/user/get-wechat-user-info?code=${code}`, callback)
    };

    createUser = (mobile, openId, callback) => {
        this.post(`${this.gateway}/user/create-user`, {mobile, openId}, callback)
    };

    /** HOME PAGE */
    homePageGetInfo = (callback) => {
        this.get(`${this.gateway}/h`, callback)
    };

    homePageLoadMore = (currPage, pageSize, callback) => {
        this.get(`${this.gateway}/h/s?page.curr=${currPage}&page.size=${pageSize}`, callback)
    };

    /** SUBJECT PAGE */
    subjectPageGet = (subjectId, currPage, pageSize, callback) => {
        this.get(`${this.gateway}/s/${subjectId}?page.curr=${currPage}&page.size=${pageSize}`, callback)
    };

    /** COURSE PAGE*/
    coursePageGet = (courseId, callback) => {
        this.get(`${this.gateway}/c/${courseId}`, callback)
    };

    /** SEARCH PAGE */
    searchPageSearch = (keyword, currPage, pageSize, callback) => {
        this.get(`${this.gateway}/search?keyword=${keyword}&page.curr=${currPage}&page.size=${pageSize}`, callback)
    }

}

export default WsService