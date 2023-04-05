//全体で使う変数
let node_etime;//残り時間表示する領域

//情報学クイズ全体で使う変数
let start;
let prev;
let ss=-1;
let timer1;
let score1=0;
let jsonreturn0=0;
let jsonreturn1=0;
let jsonreturn2=0;
let jsonreturn3=0;
let jsonreturn4=0;
let jsonreturn5=0;

//全体で使う関数

window.onload=function(){
    node_quiz1=document.getElementById('quiz1');//情報学クイズ
    node_etime=document.getElementById('etime');//時計の表示領域
    node_etime.style.fontSize='8vw';//時計の大きさはウィンドウ幅pxの8％
    node_etime.style.textAlign='right';//時計は右側に寄せる
    node_quiz1.style.display='none';
}

function set_display(node){
    let rf=/none/;
    if(rf.test(node.style.display)){
        node.style.display='inline';
    }else{
        node.style.display='none';
    }
}

function two_digit(d){
    if(d<10) return '0'+d;
    return d;
}


//情報学クイズで使う関数
function set_time(){
    start=new Date();
    prev=start.getSeconds();//現在をタイマーの開始時刻に設定
}
function put_timehh(node,setsec){
    let curr=new Date();
    let s=curr.getSeconds();
    if(s==prev) return;
    prev=s;//prevをsに更新

    let e=setsec-Math.floor((curr-start)/1000);//eは経過秒数
    ss=e%60;
    e=Math.floor(e/60);
    let mm=e%60;
    e=Math.floor(e/60);
    let hh=e;

    let em_s=em_e=' ';
    if((hh==0)&&(mm==0)&&(ss<=10)){
        em_s='<em>';
        em_e='</em>';
        node.style.color='#e60033';
    }else{
        node.style.color='#000000';
    }
    if((hh==0)&&(mm==0)&&(ss==00)){
        scorerecord1();
        alert('時間切れ');
    }
    node.innerHTML=em_s+two_digit(hh)+':'+two_digit(mm)+':'+two_digit(ss)+em_e;
}
//開始ボタンを押すとカウントが開始され、クイズのvisibilityがvisibleになる
function quiz1_start(){
    set_time();
    timer1=setInterval('put_timehh(node_etime,60)','1000');
    document.getElementById('quiz1').style.display='block';
    document.getElementById('btnstart1').style.display='none';//開始後開始ボタンは消す
}

function ans1_1(){
    let quiz1_1=document.getElementById('quiz1-1');
    if(quiz1_1.ans.value=='d') score1++;
    set_display(document.getElementById('btn1'));
}
function ans1_2(){
    let quiz1_1=document.getElementById('quiz1-2');
    if(quiz1_1.ans.value=='c') score1++;
    set_display(document.getElementById('btn2'));
}
function ans1_3(){
    let quiz1_1=document.getElementById('quiz1-3');
    if(quiz1_1.ans.value=='b') score1++;
    set_display(document.getElementById('btn3'));
}
function ans1_4(){
    let quiz1_1=document.getElementById('quiz1-4');
    if(quiz1_1.ans.value=='c') score1++;
    set_display(document.getElementById('btn4'));
}
function ans1_5(){
    let quiz1_1=document.getElementById('quiz1-5');
    if(quiz1_1.ans.value=='c') score1++;
    set_display(document.getElementById('btn5'));
}

function scorerecord1(){
    if(typeof timer1 !== 'undefined') clearInterval(timer1);
    const finalscore=document.getElementById('submit');
    finalscore.innerHTML=score1+"問正解！！";
    document.getElementById('etime').style.display='none';
    set_display(document.getElementById('btnsubmit'));
    if(ss==-1) document.getElementById('btnstart1').style.display='block';
    sendAction();
    gchart();
}

function sendAction() {
	fetch('p1.php', {
		method: 'POST',
		cache: 'no-cache',
		headers: {'Content-Type': 'application/json'},
		body: JSON.stringify(score1)
	})
		.then(response => response.json())
		.then(data => {
            console.log(data);
            jsonreturn0=Number(data[1][0]);
            jsonreturn1=Number(data[2][0]);
            jsonreturn2=Number(data[3][0]);
            jsonreturn3=Number(data[4][0]);
            jsonreturn4=Number(data[5][0]);
            jsonreturn5=Number(data[6][0]);
		})
        .then(function gchart(){
            google.charts.load('current', {'packages':['corechart']});
            google.charts.setOnLoadCallback(drawChart);
        })
		.catch(e => console.error(e));
}

function drawChart() {
    // Create the data table.
    var data = new google.visualization.DataTable();
    data.addColumn('string', 'Topping');
    data.addColumn('number','人数');
    data.addRows([
        ['0', jsonreturn0],
        ['1', jsonreturn1],
        ['2', jsonreturn2],
        ['3', jsonreturn3],
        ['4', jsonreturn4],
        ['5', jsonreturn5]
    ]);
    // Set chart options
    var options = {'title':'score',
                    'width':500,
                    'height':300};
    // Instantiate and draw our chart, passing in some options.
    var chart = new google.visualization.BarChart(document.getElementById('chart_div'));
    chart.draw(data, options);
}
