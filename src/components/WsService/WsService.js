class WsService {

    gateway = "http://localhost:9000/api/web";

    /** USER */
    getUserInfo = (callback) => {
        fetch(`${this.gateway}/wechat/get-user-info?code=${code}`)
            .then(resp => resp.json())
            .then(result => callback(result.data))
    };

    wechatGetAuthUrl = (callback) => {
        fetch(`${this.gateway}/wechat/get-auth-url?redirect_url=${document.location.href}`)
            .then(resp => resp.json())
            .then(result => callback(result.data.url))
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

    /** COURSE PAGE*/
    coursePageGet = (courseId, callback) => {
        const url = `http://10.0.0.5:9000/api/web/c/${courseId}`;
        fetch(url)
            .then(response => response.json())
            .then(result => callback(result.data))
    };

    /** SEARCH PAGE */
    searchPageSearch = (keyword, currPage, pageSize, callback) => {
        fetch(`http://10.0.0.5:9000/api/web/search?keyword=${keyword}&page.curr=${currPage}&page.size=${pageSize}`)
            .then(response => response.json())
            .then(result => callback(result.data))
    }

}

export default WsService