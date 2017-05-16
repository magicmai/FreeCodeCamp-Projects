/**
*功能1: 我可以看到 FreeCodeCamp 现在是否在Twitch.tv上直播。
*功能2: 我可以点击链接跳到 FreeCodeCamp 在Twitch.tv上的频道。
*功能3: 如果有人在直播，我可以看到他正在直播什么。
*功能4: 如果直播者关闭了他的账户，我会看到一个404提示页面。
*/

// var rawData,data;
// var apiUrl = 'https://wind-bow.gomix.me/twitch-api/streams/ESL_SC2?callback=?';
// var request = new XMLHttpRequest();
// request.onreadystatechange = function() {
// 	if(request.readyState === 4 && request.status === 200) {
// 		rawData = this.respose;
// 		data = JSON.parse(this.resposeText);
// 		console.log(data);
// 	}
// }
// request.open("GET", apiUrl, true);
// request.send();

var userNames = [
	'ESL_SC2', 
    'OgamingSC2', 
    'cretetion', 
    'freecodecamp', 
    'storbeck', 
    'habathcx', 
    'RobotCaleb', 
    'noobs2ninjas'
];

function userOnline(data) {
	var logo, id, idUrl, status;
	var streams = data.stream.channel;
	logo = streams.logo;
	id = streams.display_name;
	idUrl = streams.url;
	status = streams.status;
	var html = `
	<div class="row online">
	<div class="col-xs-2"><img class="logo" src="${logo}"></div>
	<div class="col-xs-3"><a href="${idUrl}">${id}</a></div>
	<div class="col-xs-7 status">${status}</div>
	`
	//console.log(html);
	$("#display").prepend(html);
}

function userOffline(name) {
  var preLogo, link;
  preLogo = 'https://timgsa.baidu.com/timg?image&quality=80&size=b10000_10000&sec=1493007291&di=51617b7dc2a8bcf4ee038a6655ed50cd&src=http://www.qqzhi.com/uploadpic/2015-01-12/053136460.jpg';
  link = 'https://www.twitch.tv/' + name;
  var html = `
	<div class="row offline">
	<div class="col-xs-2"><img class="logo" src="${preLogo}"></div>
	<div class="col-xs-3"><a href="${link}">${name}</a></div>
	<div class="col-xs-7 status">Offline</div>
	`
	//console.log(html);
	$("#display").append(html);
}

function result(name,links) {
	$.getJSON(links, function(data) {
		console.log(data);
		if (data.stream === null) {
		  	userOffline(name);
		} 
		else {
			userOnline(data);
		}
	});
}
// $.ajax({
// 	type: 'GET',
// 	dataType: 'jsonp',
// 	url: 'https://wind-bow.gomix.me/twitch-api/streams/freecodecamp?callback=?',
// 	success:function(data){
// 		console.log(data);
// 	}
// });

for (var i=0; i<userNames.length; i++) {
	var name = userNames[i];
	var links = 'https://wind-bow.gomix.me/twitch-api/streams/' + name + '?callback=?';
	result(name, links);
}

$(document).ready(function() {
	$("#all").click(function() {
		$(".offline").removeClass("hide");
		$(".online").removeClass("hide");
	});
	$("#online").click(function() {
		$(".offline").addClass("hide");
		$(".online").removeClass("hide");
	});
	$("#offline").click(function() {
  		$(".online").addClass("hide");
  		$(".offline").removeClass("hide");
	});
});