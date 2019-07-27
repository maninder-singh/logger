const http = require('./http');
const {fingerPrint,screenInfo} = require('./fingerprint');

let _config = {},
    _metaInfo = {},
    _eventType = "DefaultEvent";

const _defaultConfig = () => {
    let _conf = {};
    _conf.appName = "DefaultLoggerApp";
    return _conf;
};

const _initMetaInfo = () => {
    _metaInfo = Object.assign({},fingerPrint);
};

class Logger {

    // Browser meta info
    constructor(){
        // gather meta info
        _initMetaInfo();

        // Default logger configuration
        _config = _defaultConfig();
    }

    config(options){
        if(!options){
            // get config
            return Object.assign({},_config);
        }
        // set config
        if(options.constructor === Object){
            _config = Object.assign(_config,options);
        }
    }

    log(eventType,data){
        let _log = {
            "metaInfo":Object.assign(_metaInfo,screenInfo()),
            "appName":_config.appName
        };
        if(!eventType){
            eventType = _eventType;
        }
        _log["eventType"] = eventType;

        if(!data){
            data = {};
        }
        _log["data"] = data;

        // Send log to server
        if(_config.server){
            http.post(_config.server,_log);
        }else {
            // Send log to browser console
            console.log("Logger : " , _log);
        }
    }
}

module.exports = Logger;