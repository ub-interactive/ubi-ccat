class WsService {

    gateway = process.env.REACT_APP_GATEWAY;

    get = (url, callback) => fetch(url)
        .then(resp => resp.json())
        .then(result => callback(result.data))
        .catch(error => console.log(error));

    /** USER */
    wechatGetAuthUrl = (redirectUrl, callback) => {
        this.get(`${this.gateway}/user/get-wechat-auth-url?redirect_url=${redirectUrl}`, data => callback(data.url));
    };

    wechatGetUserInfo = (code, callback) => {
        this.get(`${this.gateway}/user/get-wechat-user-info?code=${code}`, callback)
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