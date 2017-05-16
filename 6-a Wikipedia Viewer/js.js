/**
*功能1: 我可以在一个搜索框搜索维基百科的条目，并看到输出结果。
*功能2: 我可以点击一个按钮就看到一个随机的维基百科条目。
*提示1: 这个URL可以让你获得一个随机的维基百科条目：http://en.wikipedia.org/wiki/Special:Random
*提示2: 这是你使用维基百科API的入口：http://www.mediawiki.org/wiki/API:Main_page
*提示3: 使用这个 https://en.wikipedia.org/wiki/Special:ApiSandbox#action=query&titles=Main%20Page&prop=revisions&rvprop=content&format=jsonfm 来体验维基百科的API。
*/

function showData(data) {
	var item, desc, link, content;
	if (data[1].length === 0) {
		$("#result").html('<p class="novalue">Sorry, we can\'t find it...</p>');
	} 
	else {
		for(var i=0; i<data[1].length; i++) {
			item = data[1][i];
			desc = data[2][i];
			link = data[3][i];
			//console.log(item);
			//console.log(desc);
			//console.log(link);
			content = `
			<div>
			<h2><a href="${link}">${item}</a></h2>
			<p>${desc}</p>
			</div>
			`
			//console.log(content);
			$("#result").append(content);
		}
	}
}

function search() {
	var value = $("#userinput").val();
	if (!value) {
		$("#result").html('<p class="novalue">Please enter something ^^</p>');
		return;
	} 
	else {
		$.ajax({
			type: 'GET',
			url: 'https://en.wikipedia.org/w/api.php?action=opensearch&format=json&callback=?&search=' + value,
			dataType: 'json',
			success: function(data) {
				showData(data);
			},
			error: function(errorMessage) {}
		});
	}
}

$(document).ready(function() {
	$("#search").click(function() {
		$(".title").animate({
			fontSize: '1.5em'
		},500);
		$("#result").empty();
		search();
	});
	$("#userinput").keypress(function(event) {
		if(event.which === 13){
			$(".title").animate({
			fontSize: '1.5em'
		},500);
			$("#result").empty();
			search();
		}
	});
});