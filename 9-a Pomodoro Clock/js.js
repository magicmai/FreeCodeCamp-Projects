/**
*功能1: 可以启动一个 25 分钟的番茄钟, 计时器将在 25 分钟后停止。
*功能2: 可以重置番茄钟的状态以便启动下一次计时。
*功能3: 可以为每个番茄钟自定义时长。
*/

var i,
pomodoro = 25, 
breakTime =5,
timeInterval,
deadline;

var pomodoroMinute = document.getElementById("minutes");
pomodoroMinute.innerHTML = pomodoro;
var pomodoroSecond = document.getElementById("seconds");
pomodoroSecond.innerHTML = "00";
var pMinutesCount = document.getElementById("pomodoro-minutes-count");
pMinutesCount.innerHTML = pomodoro;
var bMinutesCount = document.getElementById("break-minutes-count");
bMinutesCount.innerHTML = breakTime;

var pMinusBtn = document.getElementById("pomodoro-minus-btn");
var pPlusBtn = document.getElementById("pomodoro-plus-btn");
var bMinusBtn = document.getElementById("break-minus-btn");
var bPlusBtn = document.getElementById("break-plus-btn");

pMinusBtn.onclick = function() {
	pomodoro--;
	if (pomodoro < 1) {
		pomodoro = 1;
	}
	pomodoroMinute.innerHTML = pomodoro;
	pMinutesCount.innerHTML = pomodoro;
}

pPlusBtn.onclick = function() {
	pomodoro++;
	if (pomodoro > 60) {
		pomodoro = 60;
	}
	pomodoroMinute.innerHTML = pomodoro;
	pMinutesCount.innerHTML = pomodoro;
}

bMinusBtn.onclick = function() {
	breakTime--;
	if(breakTime < 1) {
		breakTime = 1;
	}
	bMinutesCount.innerHTML = breakTime;
}

bPlusBtn.onclick = function() {
	breakTime++;
	if(breakTime > 15) {
		breakTime = 15;
	}
	bMinutesCount.innerHTML = breakTime;
}

//计算剩余的时间
function remainTime(end) {
	var remainT = Date.parse(end) - Date.parse(new Date());
	var seconds = Math.floor((remainT/1000)%60);
	var minutes = Math.floor(remainT/1000/60);
	return {
		"remainT": remainT,
		"minutes": minutes,
		"seconds": seconds
	};
}

//开始倒计时
function startClock() {
	timeInterval = setInterval(function() {
		var t = remainTime(deadline);
		pomodoroMinute.innerHTML = t.minutes;
		pomodoroSecond.innerHTML = t.seconds;

		if(t.remainT <= 0) {
			clearInterval(timeInterval);
			alert("Done!");
			if(i === 0) {
				startBreak();
			} 
			else if(i === 1) {
				startPomodoro();
			}
		}
	},1000);
}

function startPompdoro() {
	pomodoroMinute.innerHTML = pomodoro;
	pomodoroSecond.innerHTML = "00";
	//添加类名
	var settingsClass = document.getElementById("settings").getAttribute("class");
	var addSettingsClass = settingsClass.concat(" hidden");
	document.getElementById("settings").setAttribute("class", addSettingsClass);
	var clockClass = document.getElementById("clock").getAttribute("class");
	var addClockClass = clockClass.concat(" clock-start");
	document.getElementById("clock").setAttribute("class", addClockClass);
	var startClass = document.getElementById("start").getAttribute("class");
	var addStartClass = startClass.concat(" hidden");
	document.getElementById("start").setAttribute("class",addStartClass);
	//使reset可见
	var resetClass = document.getElementById("reset").getAttribute("class");
	var removeResetClass = resetClass.replace("hidden", "");
	document.getElementById("reset").setAttribute("class",removeResetClass);

	deadline = new Date(Date.parse(new Date()) + (pomodoro * 60 * 1000));
	//console.log(deadline);
	startClock();
	i = 0;
}

function startBreak() {
	pomodoroMinute.innerHTML = breakTime;
	pomodoroSecond.innerHTML = "00";
	deadline = new Date(Date.parse(new Date()) + (breakTime*60*1000));
	startClock();
	i = 1;
}

function resetClock() {
	//移除类名
	var settingsClass = document.getElementById("settings").getAttribute("class");
	var removeSettingsClass = settingsClass.replace(" hidden", "");
	document.getElementById("settings").setAttribute("class", removeSettingsClass);
	var clockClass = document.getElementById("clock").getAttribute("class");
	var removeClockClass = clockClass.replace(" clock-start", "");
	document.getElementById("clock").setAttribute("class", removeClockClass);
	var startClass = document.getElementById("start").getAttribute("class");
	var removeStartClass = startClass.replace(" hidden", "");
	document.getElementById("start").setAttribute("class",removeStartClass);
	//隐藏reset
	var resetClass = document.getElementById("reset").getAttribute("class");
	var addResetClass = resetClass.concat(" hidden");
	document.getElementById("reset").setAttribute("class",addResetClass);

	clearInterval(timeInterval);
	pomodoroMinute.innerHTML = pomodoro;
	pomodoroSecond.innerHTML = "00";
}

document.getElementById("start").onclick = function() {
	startPompdoro();
}

document.getElementById("reset").onclick = function() {
	resetClock();
}
