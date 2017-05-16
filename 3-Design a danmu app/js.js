/**
功能: 实现发射弹幕、清除弹幕、显示弹幕功能。
*/

$(document).ready(function() {

	var n = 1;

	function displayDanmu() {
		let text = $('input').val();
		let id = 'p' + n;
		$('#danmu').append(`<p id=${id}>${text}</p>`);
		danmuSize(id);
		danmuTop(id);
		danmuColor(id);
		moveDanmu(id);
		n += 1;
	}

	//随机字体大小
	function danmuSize(id) {
		let dmSize = Math.round(Math.random() * 14 + 14); // 14px~28px
		console.log('fontsize:', dmSize);
		$('#'+id).css('font-size', dmSize + 'px');
	}

	//随机top
	function danmuTop(id) {
		let dmTop = Math.round(Math.random() * 380 + 10); // 10px~390px
		console.log('top:', dmTop);
		$('#'+id).css('top', dmTop + 'px');
	}

	//随机颜色
	function danmuColor(id) {
		let r, g, b;
		r = Math.round(Math.random() * 255); // 0~255
		g = Math.round(Math.random() * 255); // 0~255
		b = Math.round(Math.random() * 255); // 0~255
		if (r === 255 && g === 255 && b === 255) {
			r = 0;
			g = 0;
			b = 0;
		}
		console.log('r:', r, 'g:', g, 'b:', b);
		$('#'+id).css('color',`rgb(${r}, ${g}, ${b})`);
	}

	var move;

	function moveDanmu(id) {
		//let len = 600;
		let len = -$('#'+id).width(); //弹幕字符串的长度,最终的left，处于容器的最左边
		console.log('len:', len);
		//let i = 800;
		let i = Math.round($('#danmu').width()); //容器的长度
		console.log('i:', i);
		$('#'+id).css('left', i+'px'); //设置left初始值，处于容器的最右边

		//10~250ms的随机速度
		let speed = Math.round(Math.random() * 240 + 100); 
		console.log('speed:', speed);
		move = setInterval(function() {	
			i -= 5;	
			$('#'+id).css('left', i+'px');			
			if (i < len) {
				clearInterval(move);
			}		
		}, speed);
	}

	$('#sub').click(function() {
		displayDanmu();
	});

	$('input').keypress(function(event) {
	    if(event.keyCode === 13){
	    	displayDanmu();
	    	return false;  //阻止默认行为
	    }
	});

	$('#clear').click(function() {
		$('#danmu').html('');
		$('input').val('');
		clearInterval(move);
	});
	
});