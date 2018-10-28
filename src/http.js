class HTTP {
    constructor(){}
    post(url,data = {}){
        let _xhr = new XMLHttpRequest();
        _xhr.open("POST",url);
        _xhr.setRequestHeader("Content-Type","application/json;charset=UTF-8");
        _xhr.send(JSON.stringify(data));
    }
}

module.exports = new HTTP();