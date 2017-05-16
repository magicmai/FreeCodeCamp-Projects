/**
*功能1: 可以对两个数字进行加、减、乘、除的运算。
*功能2: 可以使用清除按钮清空当前的所有输入内容。
*功能3: 可以把多个运算连接起来操作, 直到按下等号键, 计算器输出正确的运算结果。
*/

var result = document.getElementById("result");
var memory = document.getElementById("memory");
var inputData = document.getElementsByClassName("btn");

//取得数据，计算结果
function getData() {		
    let sum = '';
    let len = inputData.length;
	for (var i = 0; i < len; i++) {
		inputData[i].onclick = function() {		
			let thedata = this.innerHTML;  //获取当前按键的数据

			if (thedata === 'AC') {  //如果按下AC键，清零返回
				sum = '';
				result.innerHTML = 0;
				memory.innerHTML = 0;				
				return;
			}
			else {
				sum += thedata;  //计算式
				//匹配连续2个或2个以上.或+或-或*或/
				let re1 = /\.{2,}/g;
				sum = sum.replace(re1, '.');
				let re2 = /\+{2,}/g;
				sum = sum.replace(re2, '+');
				let re3 = /\-{2,}/g;
				sum = sum.replace(re3, '-');
				let re4 = /\*{2,}/g;
				sum = sum.replace(re4, '*');
				let re5 = /\/{2,}/g;
				sum = sum.replace(re5, '/');
				
				//匹配小数点前不带零的情况
				let re6 = /^\./g;
				sum = sum.replace(re6, '0.');
				let re7 = /\+\./g;
				sum = sum.replace(re7, '+0.');
				let re8 = /\-\./g;
				sum = sum.replace(re8, '-0.');
				let re9 = /\*\./g;
				sum = sum.replace(re9, '*0.');
				let re10 = /\/\./g;
				sum = sum.replace(re10, '/0.');

				memory.innerHTML = sum;
				
				//转换乘除号	
				let sumChange = sum.replace('x', '*');
				sumChange = sumChange.replace('÷', '/');
				console.log(sumChange);
				
				equal(sumChange);
		    	return;			
			}
		}
	}
}

function equal(datas) {	
	let equ = document.getElementById("equ");
	equ.onclick = function() {
		result.innerHTML = eval(datas);
		//转换乘除号
		var datasChange = datas.replace('*', 'x');
		datasChange = datas.replace('/', '÷');
		memory.innerHTML = datasChange + '=' + eval(datas);
	}
}

window.onload = function() {
	getData();
}