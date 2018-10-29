# logger

A tiny logging library for the browser.

### Setup
```
$ git clone https://github.com/maninder-singh/logger.git
$ cd logger
$ npm install
$ npm run build
```

### Usage
```
<script src="dist/logger.min.js" type="application/javascript"></script>
<script>
    // Check for Logger object on the window 
    if(window.Logger){
        console.log("Logger installed successfully");
    }
</script>
```

### Examples
* Logger Configuration
```
<script>
    // Getter
    Logger.config();
    // {appName: "DefaultLoggerApp"}
    
    
    // Setter
    var _config = {
        "server":"https://log_api_endpoint.com/log",
        "appName:"MyAppName"
    }
    Logger.config(_config);
    // {appName: "MyAppName","server":"https://log_api_endpoint.com/log"}
</script>

```

* Log
``` 
<script>
    // Default log to browser console
    var eventData = {};
    Logger.log("eventName",eventData);
    

    // Log to server
    var _config = {
            "server":"https://log_api_endpoint.com/log",
            "appName:"MyAppName"
        };
    var eventData = {};
    Logger.config(_config);
    Logger.log("eventName",eventData);
</script>
```
