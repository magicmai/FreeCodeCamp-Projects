/**
*功能1: 点击一个按钮就生存一个新的随机引用短语。
*功能2: 点击一个按钮就把这个引用短语发到twitter中。
*/

$(document).ready(function() {
	$('.btn').click(function() {
        var num = Math.floor((Math.random() * 10) + 1);
        var theQuote = quotes[num]["quote"];
        var quoteAuthor = quotes[num]["author"];
        $('#quote').html(theQuote);
        $('#author').html(quoteAuthor);
	});
    var text = document.getElementById("quote").innerHTML + document.getElementById("author").innerHTML;

	$('.weibo-share').click(function(){
		var link = "http://service.weibo.com/share/share.php?title=" + text;
		window.open(link,"_blank");
	});
	$('.twitter-share').click(function(){
		var link = "https://twitter.com/intent/tweet?text=" + text;
		window.open(link,"_blank");
	});
});

var quotes = [
    {"id":1,
     "quote":"说出来会被嘲笑的梦想，才有实践的价值。即使跌倒了，姿势也会非常豪迈。",
     "author":"九把刀《猎命师传奇》"},
    {"id":2,
     "quote":"我选择沉默的主要原因之一：从话语中，你很少能学到人性，从沉默中却能。假如还想学得更多，那就要继续一声不吭。",
     "author":"王小波《沉默的大多数》"},
    {"id":3,
     "quote":"读书有三到，谓心到，眼到，口到。心不在此，则眼看不仔细，心眼既不专一，却只漫浪诵读，决不能记，久也不能久也。三到之中，心到最急，心既到矣，眼口岂不到乎？",
     "author":"朱熹《训学斋规》"},
    {"id":4,
     "quote":"梦想还是要有的，万一实现了呢？",
     "author":"马云"},
    {"id":5,
     "quote":"生命是以时间为单位的，浪费别人的时间等于谋财害命；浪费自己的时间，等于慢性自杀。",
     "author":"鲁迅"},
    {"id":6,
     "quote":"明日复明日，明日何其多？日日待明日，万事成蹉跎。",
     "author":"钱鹤滩《明日歌》"},
     {"id":7,
     "quote":"人一到群体中，智商就严重降低，为了获得认同，个体愿意抛弃是非，用智商去换取那份让人倍感安全的归属感。",
     "author":"居斯塔夫 · 勒庞《乌合之众》"},
     {"id":8,
     "quote":"三人行，必有我师焉。择其善者而从之，其不善者而改之。",
     "author":"孔子"},
     {"id":9,
     "quote":"山重水复疑无路，柳暗花明又一村。",
     "author":"陆游《游山西村》"},
     {"id":10,
     "quote":"这个世界自始至终只有两种人：一种是像我这样的人，一种是不像我这样的人。",
     "author":"王小波"}
]