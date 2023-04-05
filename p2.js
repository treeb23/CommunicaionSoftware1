//全体で使う変数
let node_etime;//残り時間表示する領域

//高速演算大会全体で使う変数
let node_quiz2;//問題と得点を表示する領域
let cnt=30;//残り時間
let score=0;//得点
let finishflag=0;//カウント残り0のときに１度だけ実行するための変数
let userans;//テキストボックスに入力された数字
let ans;//問題の正しい答え
let level=1;//問題の難易度
let timer30;


//全体で使う関数

window.onload=function(){
    node_etime=document.getElementById('etime');//時計の表示領域
    node_etime.style.fontSize='8vw';//時計の大きさはウィンドウ幅pxの8％
    node_etime.style.textAlign='right';//時計は右側に寄せる
    node_quiz2=document.getElementById('quiz2');//問題を表示する領域
    node_quiz2.style.display='none';//最初は非表示にしておく
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


//高速演算大会で使う関数

function put_time(node){
    cnt--;
    let em_s=em_e=' ';
    if(cnt<=10){
        em_s='<em>';
        em_e='</em>';
        node.style.color='#e60033';//赤
    }else{
        node.style.color='#000000';//白
    }
    node.innerHTML=em_s+"残り"+two_digit(cnt)+"秒"+em_e;
    if(cnt<0){
        finishflag++;
    }
    if(finishflag==1){
        node_quiz2.innerHTML='';//問題文や解答欄を消す
        let newNode6=document.createElement('input');
        let score_reload=document.getElementById('scorereload');
        score_reload.appendChild(newNode6);
        newNode6.setAttribute("type","button");
        newNode6.setAttribute("value","スコア表示されない場合");
        newNode6.setAttribute("onclick","scorerecord();");
        scorerecord();//得点を表示する
        clearInterval(timer30);
        document.getElementById('etime').style.display='none';
    }
}

//開始ボタンを押すとカウントが開始され、クイズのvisibilityがvisibleになる
function quiz_start(){
    level=document.getElementById('levelselector').value;
    document.getElementById('etime').style.display='block';
    timer30=setInterval('put_time(node_etime)','1000');
    document.getElementById('quiz2').style.display='block';
    document.getElementById('btnstart').style.display='none';
    makeQuiz();
    document.getElementById('tokutenn').checked=true;
    set_display(document.getElementById('click01'));
}

//問題を生成する
function makeQuiz(){
	let node = document.getElementById('quiz2');
	let str = '';
	str += '次の計算結果を入力せよ'+'(現在のスコア'+score+')';
	let newNode = document.createElement('p');
	let textNode = document.createTextNode(str);
	newNode.appendChild(textNode);
	node.appendChild(newNode);
    var random1=Math.floor(Math.random()*9*level);
    var random2=Math.floor(Math.random()*9*level);
    var random3=Math.floor(Math.random()*3);
    let operator;
    switch(random3){
        case 0:
            operator='+';
            break;
        case 1:
            operator='-';
            break;
        case 2:
            operator='x';
            break;
    }
    let str2='';
    str2+= random1+operator+random2;
    let newNode2 = document.createElement('p');
	let textNode2 = document.createTextNode(str2);
	newNode2.appendChild(textNode2);
	node.appendChild(newNode2);
    switch(random3){
        case 0:
            ans=random1+random2;
            break;
        case 1:
            ans=random1-random2;
            break;
        case 2:
            ans=random1*random2;
            break;
    }
    let newNode3 = document.createElement('form');
    let newNode4 = document.createElement('input');
    newNode3.appendChild(newNode4);
    node.appendChild(newNode3);
	newNode4.setAttribute("type","number");
    newNode4.setAttribute("id","answer");
    newNode4.setAttribute("required","required");
    newNode4.focus();
    userans=document.getElementById("answer");
    //Enterキーで解答を送信
    if(cnt>2){
        document.addEventListener('keypress', Ekeypress1);
    }
}

//解答があっているか確認、時間内の場合得点処理の後に次の問題を表示
function Ekeypress1(e){
    if(e.code === 'Enter'&&cnt>-1){
        if(userans.value===""){
            console.log('解答が記入されていません');
        }else{
            if(userans.value==ans&&finishflag==0){
                score++;
            }else{
                cnt--;
            }
            node_quiz2.innerHTML='';
            userans.value="";
            makeQuiz();
        }
    }
}
//終了時にスコアを表示
function scorerecord(){
    let newNode5=document.createElement('p');
    node_quiz2.appendChild(newNode5);
    newNode5.setAttribute("id","scoreboard")
    let str_score=score+'問正解！';
    let finalscore=document.getElementById('scoreboard');
    let newNode_score=document.createElement('h1');
    let textNode_score=document.createTextNode(str_score);
    newNode_score.appendChild(textNode_score);
    finalscore.appendChild(newNode_score);
    rank();
}

//ランク表示
function rank(){
    let newNode_rank=document.createElement('h1');
    let str_rank='rank';
    switch(Math.floor(score*(level/5+0.8))){
        case 0:
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
            str_rank+='D';
            newNode_rank.style.color='#8b4513';
            break;
        case 6:
        case 7:
        case 8:
        case 9:
        case 10:
            str_rank+='C';
            newNode_rank.style.color='#4169e1';
            break;
        case 11:
        case 12:
        case 13:
        case 14:
        case 15:
            str_rank+='B';
            newNode_rank.style.color='#008000';
            break;
        case 16:
        case 17:
        case 18:
        case 19:
        case 20:
            str_rank+='A';
            newNode_rank.style.color='#ff4500';
            break;
        case 21:
        case 22:
        case 23:
        case 24:
        case 25:
            str_rank+='S';
            newNode_rank.style.color='#ffd700';
            break;
        default:
            str_rank+='S+';
            newNode_rank.style.color='#fffacd';
    }
    let textNode_rank=document.createTextNode(str_rank);
    newNode_rank.appendChild(textNode_rank);
    let node_rank=document.getElementById('scoreboard');
    node_rank.appendChild(newNode_rank);
}

function levelselect(){
    let getleveldisp=document.getElementById('getlevelselector');
    let leveldisp=document.getElementById('levelselector').value;
    getleveldisp.innerHTML='問題の難易度を設定:'+leveldisp;
}
