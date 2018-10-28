const hash = require('./murmur3').hash;

let _fingerPrint = {};

const _timeZone = () => {
  if(window.Date){
      let tzOffset = new Date().getTimezoneOffset();
      return `${(tzOffset / 60) * (-1)}`;
  }
  return "";
};

const _screenInfo = () => {
    let _screen = {};
    if(window.screen){
        // Current height and width
        _screen.height = window.innerHeight;
        _screen.width = window.innerWidth;

        // Avaiable height and widht
        _screen.totalHeight = screen.availHeight;
        _screen.totalWidth = screen.availWidth;

        // Color Depth
        _screen.colorDepth = screen.colorDepth;

        // Screen orientation
        if(screen.orientation){
            _screen.orientation = screen.orientation.type;
        }

    }
    return _screen;
};

const _fingerPrintId = (fingerPrint) => {
  let keys = Object.values(fingerPrint);
  // screen resolution info
  // reset height and width as it's depend on the browser fullscreen or custom size
  keys = keys.concat(Object.values(Object.assign(_screenInfo(),{height:0,width:0})));
  // local storage
  keys.push(!!window.localStorage);
  // session storage
  keys.push(!!window.sessionStorage);
  // do not track
  keys.push(navigator.doNotTrack);
  // canvas fingerprinting
  keys.push(_canvasFingerprint());
  return hash(keys.join("@@##$$"),31);
};

const _canvasFingerprint= () => {
    let canvas = document.createElement('canvas');
    let ctx = canvas.getContext('2d');
    if(ctx){
        let txt = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%^&*()_+-={}|[]\:"<>?;,.';
        ctx.textBaseline = "top";
        ctx.font = "14px 'Arial'";
        ctx.textBaseline = "alphabetic";
        ctx.fillStyle = "#f60";
        ctx.fillRect(125, 1, 62, 20);
        ctx.fillStyle = "#069";
        ctx.fillText(txt, 2, 15);
        ctx.fillStyle = "rgba(102, 204, 0, 0.7)";
        ctx.fillText(txt, 4, 17);
        return canvas.toDataURL();
    }else {
        return "";
    }
};

if(window.navigator){
    // Cookies enabled
    _fingerPrint.cookieEnabled = navigator.cookieEnabled;

    // Language
    _fingerPrint.language = navigator.language;

    // Is Java Enabled
    if(navigator.javaEnabled){
        _fingerPrint.javaEnabled = navigator.javaEnabled();
    }

    // User Agent
    _fingerPrint.userAgent = navigator.userAgent;

    // Hardware Platform
    _fingerPrint.platform = navigator.platform;

    // Browser Name
    _fingerPrint.browserName = navigator.vendor;

    // Network Type (4g,3g,2g)
    if(navigator.connection){
        _fingerPrint.connectionType = navigator.connection.effectiveType;
    }

    // No. of cpu cores in System
    _fingerPrint.cpuCores = navigator.hardwareConcurrency;

    // Timezone
    _fingerPrint.timeZone = _timeZone();

    // Generate fingerprint id based on murmur hashing algo
    _fingerPrint.id = _fingerPrintId(_fingerPrint);
}

module.exports = {
    "fingerPrint":_fingerPrint,
    "screenInfo":_screenInfo
};