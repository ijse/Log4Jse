# Log4Jse
Log4Jse is a very simple and easy logger lib for Javascript, with only one .js file(Less than 200 code lines), and one global variable `Logger`.

## Features
+ Simple, Lightweight and Easy-To-Custom
+ Similar to Log4Javascript which similar to Log4J, but more simple
+ With 5 logging level: `ALL`,`DEBUG`,`INFO`,`WARNNING`,`ERROR`,`NONE`
+ Easy to use: `Logger('MyLoggerName').info("Hello World!")'`
+ Custom output method, you can export logs in the way you like within Js

## Usage
That's a very briefly introduction, Log4Jse is so simple that you can get more information by reading its source.

1. First, include Log4Jse.js file

		<script type="text/javascript" src="Log4Jse.js"></script>


+ Configure Log4Jse

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
					alert(prefix + msg);
				}
			}
		}



+ Use it easily

		// Usage:
		var mylog = Logger.get("app");
		mylog.log("Hello my app!!");
		
		var viewlog = Logger.get("view");
		viewlog.warn("where am I?");
		viewlog.error("I don't want work!!");
		
		Logger.get("view").info("Goodbye");
		
		// Above will pop an window, and output these in console:
		// 2011-10-22 17:20:54,WARNNING[view]: where am I?
		// 2011-10-22 17:20:54,ERROR[view]: I don't want work!!
		// 2011-10-22 17:20:54,INFO[view]: Goodbye
		
## Contact me

>QQ: 197728786

>E-mail: i@ijser.cn

>Website: http://www.ijser.cn
  
  
