/**
 * @author: ijse
 */

var Logger = function(loggerName) {
	return !loggerName ? Logger.get("Log4Jse") : Logger.get(loggerName);	
};

Logger.get = function(loggerName) {
	if(Logger.define[loggerName]) {
		Logger.define[loggerName].name = loggerName;
		return new Logger.main(Logger.define[loggerName]);
	} else if (loggerName == "Log4Jse") {
		return new Logger.main();
	} else {
		throw("Log4Jse: No such logger with name " + loggerName);
	}
}

/**
 * 
 */
Logger.main = function(config) {
	var _this = this;
	var tplArgs = {
		timestamp: "{TIMESTAMP}",
		loggername: "{LOGGERNAME}",
		loggerlevel: "{LOGGERLEVEL}",
		logtext:	"{TEXT}"
	}
	var defaultOutway = function(prefix,msg,obj) { 
		switch(obj.level) {
			case "ERROR":
				console.error(prefix,msg);
				break;
			case "WARNNING":
				console.warn(prefix,msg);
				break;
			default:
				console.log(prefix,msg);	
		}
	}
	
	// Deal with configures
	/* Private properties */
	config = config || {};
	_this.name = config.name || "Log4Jse";
	_this.outputLevel = config.level ? config.level.toUpperCase() : "ALL";
	_this.outway = config.outway || defaultOutway;
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
		// Control the level of output log messages according to configuration
		var out = _this.outway;
		var prefix = applyData(logObj);
		if(logObj.level == "LOG") {
			out("",msg,logObj);
			return ;
		}
		switch(_this.outputLevel) {
			case "ALL":
			case "DEBUG":
				if(logObj.level == "DEBUG") {
					out(prefix,msg,logObj); break;
				}
			case "INFO":
				if(logObj.level == "INFO") {
					out(prefix,msg,logObj); break;
				}
			case "WARNNING":
				if(logObj.level == "WARNNING") {
					out(prefix,msg,logObj); break;
				}
			case "ERROR":
				if(logObj.level == "ERROR") {
					out(prefix,msg,logObj); break;
				}
			case "FATAL":
				if(logObj.level == "FATAL") {
					out(prefix,msg,logObj); break;
				}
			case "NONE": 
				break;
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
	Logger.publicMethods = {
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
		}
	} 
	//
	return Logger.publicMethods;
};


// Involved in Log4Jse
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
//TODO: Add pre-defined outway func

if(module && module.exports) {
	module.exports = Logger;
}
