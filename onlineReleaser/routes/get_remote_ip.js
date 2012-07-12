var sys = require('sys');
var exec = require('child_process').exec;
var fs = require('fs');

exports.getRemoteDesktopIp = function(callback) {
	function parse(error, stdout, stderror) {
		var result = stdout.match(/\d+\.\d+\.\d+\.\d+:3389\s+([\d.]+?):/g);
		if(result) {
			callback.call(null, RegExp.$1);
		}
	}
	exec('netstat -na -p TCP', parse);
}

exports.getRemoteDesktopIp(function(ip){console.log(ip);});