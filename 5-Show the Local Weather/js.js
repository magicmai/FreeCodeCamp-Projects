/**
*User Story: I can see the weather in my current location.
*User Story: I can see a different icon or background image (e.g. snowy mountain, hot desert) depending on the weather.
*User Story: I can push a button to toggle between Fahrenheit and Celsius.
*/

$(document).ready(function() {
    var apiKey = 'fe121f7137b346899df949fb590a7c44';
  
    //获取所在地的经纬度
    $.getJSON('https://ipinfo.io', function(data) {
        console.log(data);
        var coord = data.ip;
        console.log(coord);
  
    // 获取天气信息
    // $.getJSON('http://api.openweathermap.org/data/2.5/weather?lat=' 
    //     + latitude 
    //     + "&lon=" 
    //     + longitude 
    //     + '&APPID=5aea8b5b163b7524862fa82b62b9472d',
    //     function(weatherdata) {
    //         console.log(weatherdata);
    // }); 

        var url = 'https://free-api.heweather.com/v5/weather?city=' 
                + coord 
                + '&key=' 
                + apiKey;
        console.log(url);

        $.getJSON(url, function(weatherdata) {
          	var weatherInfo = weatherdata.HeWeather5[0];
          	var city = weatherInfo.basic.city + ' , ' + weatherInfo.basic.cnty;
          	console.log(city);
          	var weather = weatherInfo.now.cond.txt;
          	console.log(weather);
          	var temp = weatherInfo.now.tmp;
          	console.log(temp);
          	$("#city").html(city);
          	$("#weather").html(weather);
          	$("#temp").html(temp + '℃');
            //高温天气
            if (temp >= 30) {
              $('body').css('background-image', 'url(http://img3.imgtn.bdimg.com/it/u=3371167770,4282332295&fm=214&gp=0.jpg)');
            }
            //夏天
            else if (temp > 22) {
              $('body').css('background-image', 'url(https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1494916312603&di=e57dac7029700185c37bf01c5c2eecee&imgtype=0&src=http%3A%2F%2Fpic1.win4000.com%2Fwallpaper%2F1%2F578d93e3eeee7.jpg)');
            }
            //春秋
            else if (temp >= 10) {
              $('body').css('background', 'url(https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1495511452&di=bc64df5c527648754b8ec60c4893a7bf&imgtype=jpg&er=1&src=http%3A%2F%2Fww2.sinaimg.cn%2Flarge%2F005yyi5Jjw1en3d6v77mbj31hc0u04qq.jpg)');
            }
            //冬天
            else {
              $('body').css('background', 'url(https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1495511758&di=0004755543f38915d9e929515c1cfde7&imgtype=jpg&er=1&src=http%3A%2F%2Fimg.taopic.com%2Fuploads%2Fallimg%2F131207%2F240480-13120F9511152.jpg)');
            }

            //温度转换公式
            $("#deg-fa").click(function() {
            	if ($("#temp").text().indexOf('℃') >= 0) {
            		temp = Math.round(parseInt($("#temp").text()) * 1.8 + 32);
            		console.log(temp);
            		$("#temp").html(temp + '℉');
            	} 
                else {
            		temp = Math.round((parseInt($('#temp').text()) - 32) / 1.8);
            		$("#temp").html(temp + '℃');
            		console.log(temp);
            	}
            });
        });
    });
});