/**
 * @author: ijse
 */

var Logger = {};


Logger.get = function(loggerName) {
	if(Logger.define[loggerName]) {
		Logger.define[loggerName].name = loggerName;
		return new Logger.main(Logger.define[loggerName]);
	} else {
		throw("Log4Jse: No such logger with name " + loggerName);
	}
}

Logger.getLogger = function(args) {
	var r = {};
	/**
	 * Get type of variables
	 */
	var getType = Logger.util.getType;
	
	if(getType(args) == 'string') {
		r = { name: args }
	} else if(getType(args) == 'object') {
		if(!args.name)
			r.name = "Log4Jse"
	} else {
		//throw("Invalid arguments!!");
		new Logger.main("Log4Jse").error("Invalid arguments for",args);
	}
	return new Logger.main(r);
}


/**
 * @params: {
 * 		
 * }
 */
Logger.main = function(config) {
	var _this = this;
	var tplArgs = {
		timestamp: "{TIMESTAMP}",
		loggername: "{LOGGERNAME}",
		loggerlevel: "{LOGGERLEVEL}",
		logtext:	"{TEXT}"
	}
	
	//TODO: Deal with configures
	/* Private properties */
	_this.name = config.name || "Log4Jse";
	_this.outputLevel = config.level ? config.level.toUpperCase() : "INFO";
	_this.outway = config.outway || function(prefix,msg) { console.log(prefix,msg); }
	_this.tpl = config.tpl || "{TIMESTAMP},{LOGGERLEVEL}[{LOGGERNAME}]:";
	_this.dateFormat = config.dateFormat || "yyyy-MM-dd hh:mm:ss";
	

	/* Private methods */
	
	/**
	 * Apply data to template
	 * 		a simple template engine
	 */
	var applyData = function(data) {
		var t = _this.tpl;
		t = t.replace(tplArgs.timestamp,	data.timestamp);
		t = t.replace(tplArgs.loggername, 	data.name);
		t = t.replace(tplArgs.loggerlevel, 	data.level);
		t = t.replace(tplArgs.logtext, 		data.text);
		return t;
	}
	
	/**
	 * Output log messages
	 */
	var output = function(logObj,msg) {
		//TODO: Control the level of output log messages according to configuration
		var out = _this.outway;
		var prefix = applyData(logObj);
		switch(_this.outputLevel) {
			case "DEBUG":
				if(logObj.level == "DEBUG") {
					out(prefix,msg); break;
				}
			case "INFO":
				if(logObj.level == "INFO") {
					out(prefix,msg); break;
				}
			case "WARNNING":
				if(logObj.level == "WARNNING") {
					out(prefix,msg); break;
				}
			case "ERROR":
				if(logObj.level == "ERROR") {
					out(prefix,msg); break;
				}
			case "FATAL":
				if(logObj.level == "FATAL") {
					out(prefix,msg); break;
				}
			case "NONE":
		}
	}
	
	var getTimestamp = function() {
		return Logger.util.DateFormat(new Date(),_this.dateFormat);	
	}
	//////////////////////////////////////////////////////////////////////////////////////
	
	/**
	 * Normal Methods
	 * 		when logger got a name
	 */
	var publicMethods = {
		log: function(txt) {
			var logs = {
				timestamp: getTimestamp(),
				name: _this.name,
				level: "LOG"
			}
			output(logs,txt);
		},
		debug: function(txt) {
			var logs = {
				timestamp: getTimestamp(),
				name: _this.name,
				level: "DEBUG"
			}
			output(logs,txt);
		},
		info: function(txt) {
			var logs = {
				timestamp: getTimestamp(),
				name: _this.name,
				level: "INFO"
			}
			output(logs,txt);
		},
		error: function(txt) {
			var logs = {
				timestamp: getTimestamp(),
				name: _this.name,
				level: "ERROR"
			}
			output(logs,txt);
		},
		warn: function(txt) {
			var logs = {
				timestamp: getTimestamp(),
				name: _this.name,
				level: "WARNNING"
			}
			output(logs,txt);
		},
	} 
	//
	return publicMethods;
};



//TODO: Involved in Log4Jse
Logger.util = {};
Logger.util.getType = function(t) {
	var _t, o=t;
	return ((_t = typeof(o)) == "object" ? o==null && "null" ||Object.prototype.toString.call(o).slice(8,-1):_t).toLowerCase();
}
Logger.util.DateFormat = function(date,format) {
	/*
	 * eg:format="YYYY-MM-dd hh:mm:ss";
	 */
	var o = {
		"M+": date.getMonth() + 1, //month
		"d+": date.getDate(), //day
		"h+": date.getHours(), //hour
		"m+": date.getMinutes(), //minute
		"s+": date.getSeconds(), //second
		"q+": Math.floor((date.getMonth() + 3) / 3), //quarter
		"S": date.getMilliseconds() //millisecond
	}

	if(/(y+)/.test(format)) {
		format = format.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
	}

	for(var k in o) {
		if(new RegExp("(" + k + ")").test(format)) {
			format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
		}
	}
	return format;
}
