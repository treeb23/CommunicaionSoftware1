//全体で使う変数
let node_etime;//残り時間表示する領域


//TSC全体で使う変数
//残り時間表示する領域は上と同じ
let node_tsctest;//問題と得点を表示する領域
let tsccnt=0;//時間
let tscscore=0;//得点
let tscfinishflag=0;//カウント残り0のときに１度だけ実行するための変数
let tscuserans;//テキストボックスに入力された数字
let tscans='';//問題の正しい答え
let tsclevel=1;//問題の難易度
let timer45;
let characters ='qwaszxedcrfvbghijklmnoptuyQWASZXEDCRFVBGHIJKLMNOPTUY';


//全体で使う関数

window.onload=function(){
    node_etime=document.getElementById('etime');//時計の表示領域
    node_etime.style.fontSize='8vw';//時計の大きさはウィンドウ幅pxの8％
    node_etime.style.textAlign='right';//時計は右側に寄せる
    node_tsctest=document.getElementById('tsctest');//問題を表示する領域
    node_tsctest.style.display='none';//最初は非表示にしておく
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


//TSCで使う関数

function tscput_time(node){
    tsccnt++;
    let em_s=em_e=' ';
    node.style.color='#000000';//白
    node.innerHTML=em_s+two_digit(tsccnt)+"秒"+em_e;
    if(tsccnt>45||tscscore>=5){
        tscfinishflag++;
    }
    if(tscfinishflag==1){
        node_tsctest.innerHTML='';//問題文や解答欄を消す
        let newNodetsc1=document.createElement('input');
        let score_reload=document.getElementById('tscscorereload');
        score_reload.appendChild(newNodetsc1);
        newNodetsc1.setAttribute("type","button");
        newNodetsc1.setAttribute("value","スコア表示されない場合");
        newNodetsc1.setAttribute("onclick","tscscorerecord();");
        tsccnt=tsccnt-1;
        tscscorerecord();//得点を表示する
        clearInterval(timer45);
        document.getElementById('etime').style.display='none';
    }
}

//開始ボタンを押すとカウントが開始され、クイズのvisibilityがvisibleになる
function tsc_start(){
    tsclevel=document.getElementById('tsclevelselector').value;
    document.getElementById('etime').style.display='block';
    timer45=setInterval('tscput_time(node_etime)','1000');
    document.getElementById('tsctest').style.display='block';
    document.getElementById('tscbtnstart').style.display='none';//開始後開始ボタンは消す
    maketsc();
    document.getElementById('tsc').checked=true;
    set_display(document.getElementById('click02'));
}

//問題を生成する
function maketsc(){
	let node = document.getElementById('tsctest');
	let str = '';
	str += '次の文字を入力せよ'+'(現在のスコア'+tscscore+')';
	let newNodetsc = document.createElement('p');
	let textNodetsc = document.createTextNode(str);
	newNodetsc.appendChild(textNodetsc);
	node.appendChild(newNodetsc);
    tscans=makestring();
    let str2=tscans;
    let newNode2tsc = document.createElement('p');
	let textNode2tsc = document.createTextNode(str2);
	newNode2tsc.appendChild(textNode2tsc);
	node.appendChild(newNode2tsc);
    let newNode3tsc = document.createElement('form');
    let newNode4tsc = document.createElement('input');
    newNode3tsc.appendChild(newNode4tsc);
    node.appendChild(newNode3tsc);
	newNode4tsc.setAttribute("type","text");
    newNode4tsc.setAttribute("onpaste","return false");
    newNode4tsc.setAttribute("id","tscanswer");
    newNode4tsc.setAttribute("required","required");
    newNode4tsc.focus();
    tscuserans=document.getElementById("tscanswer");
    //Enterキーで解答を送信
    if((tsccnt>=0&&tsccnt<45)||tscscore<5){
        document.addEventListener('keypress', Ekeypress2);
    }
}
//文字列をランダムに生成する
function makestring(){
    let str2='';
    for(let m=0;m<7;m++){
        str2+=characters.charAt(Math.floor(Math.random()*characters.length*0.125*tsclevel));//https://java-code.jp/185
    }
    return str2;
}

//解答があっているか確認、時間内の場合得点処理の後に次の問題を表示
function Ekeypress2(e){
    if(e.code === 'Enter'){
        if(tscuserans.value===""){
            console.log('解答が記入されていません');
        }else{
            if(tscuserans.value==tscans&&tscfinishflag==0){
                tscscore++;
            }
            node_tsctest.innerHTML='';
            if(tsccnt<45||tscscore<5){
                tscuserans.value="";
                maketsc();
            }
        }
    }
}
//終了時にスコアを表示
function tscscorerecord(){
    let newNode5tsc=document.createElement('p');
    node_tsctest.appendChild(newNode5tsc);
    newNode5tsc.setAttribute("id","tscscoreboard")
    let str_score='レベル：'+tsclevel+' で '+tscscore+'問正解！ タイム'+tsccnt+'秒';
    let tscfinalscore=document.getElementById('tscscoreboard');
    let newNode_score=document.createElement('h1');
    let textNode_score=document.createTextNode(str_score);
    newNode_score.appendChild(textNode_score);
    tscfinalscore.appendChild(newNode_score);
}

function tsclevelselect(){
    let getleveldisp=document.getElementById('gettsclevelselector');
    let leveldisp=document.getElementById('tsclevelselector').value;
    getleveldisp.innerHTML='問題の難易度を設定:'+leveldisp;
}