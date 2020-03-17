class WsService {

    gateway = "http://localhost:9000/api/web";

    /** USER */
    wechatGetAuthUrl = (redirectUrl, callback) => {
        fetch(`${this.gateway}/user/get-wechat-auth-url?redirect_url=${redirectUrl}`)
            .then(resp => resp.json())
            .then(result => callback(result.data.url))
    };

    wechatGetUserInfo = (code, callback) => {
        fetch(`${this.gateway}/user/get-wechat-user-info?code=${code}`)
            .then(resp => resp.json())
            .then(result => callback(result.data))
    };

    /** HOME PAGE */
    homePageGetInfo = (callback) => {
        fetch(`${this.gateway}/h`)
            .then(response => response.json())
            .then(result => callback(result.data))
    };

    homePageLoadMore = (currPage, pageSize, callback) => {
        fetch(`${this.gateway}/h/s?page.curr=${currPage}&page.size=${pageSize}`)
            .then(response => response.json())
            .then(result => callback(result.data))
    };

    /** SUBJECT PAGE */
    subjectPageGet = (subjectId, currPage, pageSize, callback) => {
        fetch(`${this.gateway}/s/${subjectId}?page.curr=${currPage}&page.size=${pageSize}`)
            .then(response => response.json())
            .then(result => callback(result.data))
    };

    /** COURSE PAGE*/
    coursePageGet = (courseId, callback) => {
        fetch(`${this.gateway}/c/${courseId}`)
            .then(response => response.json())
            .then(result => callback(result.data))
    };

    /** SEARCH PAGE */
    searchPageSearch = (keyword, currPage, pageSize, callback) => {
        fetch(`${this.gateway}/search?keyword=${keyword}&page.curr=${currPage}&page.size=${pageSize}`)
            .then(response => response.json())
            .then(result => callback(result.data))
    }

}

export default WsService