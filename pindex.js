// 東京(130000)の予報を取得
let url = "https://www.jma.go.jp/bosai/forecast/data/forecast/130000.json";

fetch(url)
    .then(function(response) {
        return response.json();
    })
    .then(function(weather) {
        console.log(weather);
        // 特定の地域(今回は東京)だけ選択して変数に詰め直す
        let area = weather[0].timeSeries[0].areas[0];
        let tempss = weather[0].timeSeries[2].areas[0];
        console.log(area);
        // 発表者と報告日時の情報を画面に書き出す
        document.getElementById("source").innerHTML = "source:"+weather[0].publishingOffice+","+weather[0].reportDatetime+"("+area.area.name+")";
        document.getElementById("weather").innerHTML = "今日 : "+weatherCodes(area.weatherCodes[0])+", 明日 : "+weatherCodes(area.weatherCodes[1])+", 明後日 : "+weatherCodes(area.weatherCodes[2])+", 最低気温 : "+tempss.temps[0]+", 最高気温 : "+tempss.temps[1];
        weatherimgw(area.weatherCodes[0]);
    });

function weatherCodes(aa){
    switch(Math.floor(aa/100)){
        case 1:
            return '晴れ';
        case 2:
            return '曇り';
        case 3:
            return '雨';
        case 4:
            return '雪';
    }
}

function weatherimgw(aa){
    switch(Math.floor(aa/100)){
        case 1:
            document.getElementById('imgw').src="images/hare.png";
            return;
        case 2:
            document.getElementById('imgw').src="images/kumori.png";
            return;
        case 3:
            document.getElementById('imgw').src="images/ame.png";
            return;
        case 4:
            document.getElementById('imgw').src="images/yuki.png";
            return;
    }
}