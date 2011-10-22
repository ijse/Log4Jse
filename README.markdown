# Log4Jse
Log4Jse is a very simple easy Logger for Javascript, with only one .js file, and one global variable Logger.

## Usage
That's a very beiefly introduction, Log4Jse is so simple that you can get more information by read it's source.

1. First, include Log4Jse.js file

		<script type="text/javascript" src="Log4Jse.js"></script>


+ Second, define logger

		Logger.define = {
			"view": { //* one logger called "view
			
				level: "debug", // output level
				dateFormat: "yyyy-MM-dd hh:mm:ss", // no comment
				tpl: "{TIMESTAMP},{LOGGERLEVEL}[{LOGGERNAME}]:", // prefix template of output text
				outway: function(prefix,msg,obj) {  // use this for output
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
			},
			"app": { //* another logger
				outway: function(prefix,msg) {
					console.log(prefix,msg);
				}
			}
		}



+ Third, use it easily

		var log = Logger.get("Log4Jse");
		log.info("hello my logger!!");
		var applogger = Logger.get("app");
		applogger.warn("WARN~~~~");
		var viewlogger = Logger.get("view");
		viewlogger.debug("viewlogger out!!");
