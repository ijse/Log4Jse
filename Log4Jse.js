/**
 * @author: ijse
 */


/*
 *	
 *  
	date time		{DATETIME[yyyy-MM-dd HH:mm:ss]}
	logger name		{LOGGERNAME}
	logger level	{LOGGERLEVEL}
	logtext			{TEXT}
*/

/**
 * @params: {
 * 		
 * }
 */
var Logger = function(config) {
	var _this = this;
	//TODO: Deal with configures
	this.outway = function(log) {
		console.log(log);
	}
	
	
	//TODO: Make a simple template engin
	var tplArgs = {
		timestamp: "{TIMESTAMP}",
		loggername: "{LOGGERNAME}",
		loggerlevel: "{LOGGERLEVEL}",
		logtext:	"{TEXT}"
	}
	_this.tpl = "{TIMESTAMP},{LOGGERLEVEL} [{LOGGERNAME}]:{TEXT}";
	
	
	/* Private properties */
	this.name = config.name;
	this.OutputLevel = "INFO";
	
	/* Private methods */
	
	/**
	 * Apply data to template
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
	var output = function(logObj) {
		//TODO: control the level of output log messages according to configuration
		var out = _this.outway;
		var msg = applyData(logObj);
		switch(_this.OutputLevel) {
			case "DEBUG":
				if(logObj.level == "DEBUG") {
					out(msg); break;
				}
			case "INFO":
				if(logObj.level == "INFO") {
					out(msg); break;
				}
			case "WARNNING":
				if(logObj.level == "WARNNING") {
					out(msg); break;
				}
			case "ERROR":
				if(logObj.level == "ERROR") {
					out(msg); break;
				}
			case "FATAL":
				if(logObj.level == "FATAL") {
					out(msg); break;
				}
			case "NONE":
		}
	}
	//////////////////////////////////////////////////////////////////////////////////////
	
	/* Static Methods */
	//var staticMethods = {
	Logger.prototype.getLogger = function(args) {
			var r = {};
			if(getType(args) == 'string') {
				r = { name: args }
			} else if(getType(args) == 'object') {
				if(!args.name)
					r.name = "Log4Jse"
			} else {
				//throw("Invalid arguments!!");
				new Logger("Log4Jse").error("Invalid arguments for",args);
			}
			return new Logger(r);
		}
	//}

	/**
	 * Normal Methods
	 * 		when logger got a name
	 */
	var publicMethods = {
		debug: function(txt) {
			
		},
		info: function(txt) {
			var logs = {
				timestamp: new Date().format("yyyy-MM-dd hh:mm:ss"),
				name: _this.name,
				level: "INFO",
				text: txt
			}
			output(logs);
		},
		error: function() {
			
		},
		warn: function() {
			
		},
	}
	
	//
	return this.logName ? publicMethods : publicMethods;
};

/**
 * Get type of variables
 */
Object.prototype.getType = function() {  
	var _t, o=this;
	return ((_t = typeof(o)) == "object" ? o==null && "null" ||Object.prototype.toString.call(o).slice(8,-1):_t).toLowerCase();  
}

Logger.getLogger = function(args) {
	var r = {};
	if(args.getType() == 'string') {
		r = { name: args }
	} else if(args.getType() == 'object') {
		if(!args.name)
			r.name = "Log4Jse"
	} else {
		//throw("Invalid arguments!!");
		new Logger("Log4Jse").error("Invalid arguments for",args);
	}
	return new Logger(r);
}


//TODO: Involved in Log4Jse 
Date.prototype.format = function(format) {
	/*
	 * eg:format="YYYY-MM-dd hh:mm:ss";
	 */
	var o = {
		"M+": this.getMonth() + 1, //month
		"d+": this.getDate(), //day
		"h+": this.getHours(), //hour
		"m+": this.getMinutes(), //minute
		"s+": this.getSeconds(), //second
		"q+": Math.floor((this.getMonth() + 3) / 3), //quarter
		"S": this.getMilliseconds() //millisecond
	}

	if(/(y+)/.test(format)) {
		format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
	}

	for(var k in o) {
		if(new RegExp("(" + k + ")").test(format)) {
			format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
		}
	}
	return format;
}
