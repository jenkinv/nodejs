var fs = require('fs');
var http = require('http');
var sys = require('sys');
var cp = require('child_process');
var remoteIP = require('./get_remote_ip.js');

var dataFilePath = './.clientIPs.data';
var dataFileEncode = 'UTF-8';

var clientIPs ;

try {
	clientIPs = JSON.parse(fs.readFileSync(dataFilePath, dataFileEncode));
} catch (e){
	clientIPs = [{ip:'127.0.0.1', name: 'localhost'}];
}

/*
 * GET home page.
 */  
exports.index = function(req, res){
  var localIp = req.connection.remoteAddress;
  var localName = getClientName(localIp);
  var data = {title: 'Express', localIp: localIp, localName: localName, clientIPs: clientIPs};
  remoteIP.getRemoteDesktopIp(function(ip){
    data.remoteDesktopIp = ip;
    data.remoteDesktopName = getClientName(ip);
    res.render('index', data);
  });  
};

exports.update = function(req, res) {
  var localIp = req.connection.remoteAddress;
  var localName = req.params.name;
  if(!!localName) updateIpName(localIp, localName);
  res.send('1')
  return false;
};

exports.release = function(req, res) {
  function parse(error, stdout, stderr) {
    if(error) console.log(error)
    console.log(stdout);
    console.log(stderr);
    res.send(stdout);
  }
  try {
    cp.execFile('D:/lofter-branch2/releaser/allinone-online.bat',{cwd:'D:/lofter-branch2/releaser'},{}, parse); 
  } catch (e) {
    console.log(e);
  }
  
};

function getClientName (ip) {
  var name ;
  clientIPs.forEach(function(client){
    if(client.ip == ip) {
      name = client.name;
    }
  });
  return name;
}

/**
* Update IP and Name record 
*/
function updateIpName(ip, name){
	var isExists;
  clientIPs.forEach(function(client){
    if(!!isExists) return;
    if(client.ip == ip) {
      client.name = name;
      isExists = true;
    }
  });

	if(!isExists) {
		clientIPs.unshift({'ip': ip, 'name': name});
	}
	
  fs.writeFile(dataFilePath, JSON.stringify(clientIPs), dataFileEncode, function(err) {
		if(err) throw err;
		console.log('update ip and name succ.ip=' + ip + ',name=' + name);
	});
}