function draw(){
	//canvas要素の取得
	const canvas=document.getElementById('drawingarea');

	//canvas非対応のブラウザでは何もしない
	if(!canvas||!canvas.getContext) return false;

	//描画用contextを取得
	const ctx=canvas.getContext('2d');
	let mrand=Math.random()*500;
	let lrand=Math.random()*500;
	//contextを用いて線を引く
	ctx.beginPath();
	ctx.moveTo(lrand,50);
	ctx.moveTo(lrand,mrand);
	ctx.lineTo(mrand,200);
	ctx.lineTo(200,mrand);
	ctx.lineTo(mrand*mrand/500,lrand);
	ctx.fillRect(mrand,lrand,mrand,lrand);
	ctx.strokeRect(1,1,lrand,mrand);
	ctx.clearRect(99,99,mrand,lrand);
	ctx.fillStyle="(#aaffcc)";
	ctx.closePath();
	ctx.stroke();
}

function aac(){
	const canvas=document.getElementById('drawingarea2');
	const ctx=canvas.getContext('2d');
	var aad=setInterval(aab(ctx),1000);
	aad;
}

function aab(ctx){
	let xrand=Math.random()*640;
	let yrand=Math.random()*480;
	ctx.beginPath();
	ctx.lineTo(xrand,200);
	ctx.lineTo(xrand*yrand/500,xrand);
	ctx.fillRect(yrand,yrand,xrand,xrand);
	ctx.strokeRect(1,1,xrand,yrand);
	ctx.clearRect(99,99,yrand,xrand);
	ctx.closePath();
	ctx.stroke();
}

let scroll;
window.addEventListener("scroll",function(){
scroll=window.pageYOffset;//https://developer.mozilla.org/ja/docs/Web/API/Window/scrollY
if(scroll>2050){
    document.getElementById('artmuseum').style.backgroundColor='#4b0082';//indigo
}else if(scroll>1600){
    document.getElementById('artmuseum').style.backgroundColor='#008000';//green
}else if(scroll>1100){
    document.getElementById('artmuseum').style.backgroundColor='#ff8c00';//darkorange
}else if(scroll>600){
    document.getElementById('artmuseum').style.backgroundColor='#1e90ff';//dodgerblue
}else{
    document.getElementById('artmuseum').style.backgroundColor='#ff1493';//deeppink
}
directiondecision();
});

window.addEventListener("load",start);
function start(){
    dr1();
    dr2();
    dr3();
    var map = L.map('map');
    //mapを表示
    L.tileLayer('https://cyberjapandata.gsi.go.jp/xyz/std/{z}/{x}/{y}.png',{
      maxZoom: 18,
      attribution: 'https://maps.gsi.go.jp/development/ichiran.html'
    }).addTo(map);
    map.setView([35, 140],7);
}
window.addEventListener("resize",dr1);

//dr1
function dr1(){
    //canvas要素の取得
    const canvas=document.getElementById('dr1');
    //canvas非対応のブラウザでは何もしない
    if(!canvas||!canvas.getContext) return false;
    //描画用contextを取得
    canvas.width=innerWidth-100;
    const ctx=canvas.getContext('2d');
    let timer=setInterval(dr1anim,100);
    function dr1anim(){
        ctx.fillStyle="rgb(0,0,0)";
        ctx.fillRect(0,0,canvas.width,canvas.height);
        for(var i=0;i<13;i++){
            for(var j=0;j<((innerWidth-100)/30);j++){
                let mrand=Math.random()*(32000/innerWidth);
                let lrand=Math.random()*(32000/innerWidth);
                ctx.fillStyle='rgb('+Math.floor(255-mrand*i/2)+','+Math.floor(255+mrand-lrand*j/(innerWidth/500))+','+Math.floor(lrand*i+mrand*j/(innerWidth/500))+')';
                ctx.fillRect(j*30,i*30,30,30);
            }
        }
    }
    dr1anim();
}


//dr2
function dr2(){
    //canvas要素の取得
    const canvas=document.getElementById('dr2');
    //canvas非対応のブラウザでは何もしない
    if(!canvas||!canvas.getContext) return false;
    //描画用contextを取得
    canvas.width=innerWidth-100;
    const ctx=canvas.getContext('2d');
    ctx.fillStyle="rgb(0,0,0)";
    ctx.fillRect(0,0,canvas.width,canvas.height);
    window.addEventListener("click",drawnum);
    function drawnum(e){
      ctx.fillStyle="rgb(ff,ff,ff)";
      let x=e.offsetX;
      let y=e.offsetY;
      ctx.fillRect(x,y,20,20);
    }
}

//dr3
let direction;//回転方向
function directiondecision(){
    if(Math.floor(window.pageYOffset)/5%2==1){
        direction=-1;
    }else{
        direction=1;
    }
}
let zanzo=0.05;//背景の透過度
let speed=0.05;//回転速度
let sec=new Date();
let ss=sec.getMilliseconds();
let radius=340;
let radiusaf;//回転の半径
function touchdr3(){
    zanzo=Math.floor(Math.random()*1000)*0.0001+0.03;
    speed=Math.floor(Math.random()*1000)*0.0001+0.01;
}

function dr3(){
const canvas=document.getElementById("dr3");
if(!canvas||!canvas.getContext) return false;
canvas.width=innerWidth-100;//ウィンドウ内に収まるcanvasサイズ
const ctx=canvas.getContext("2d");
let particlesArray=[];
for(let i=0;i<200;i++){//点を作る
  particlesArray[i]=new Particle(//particlesArrayのi番目に新しいParticleオブジェクトを作成
    340,//Particleのx,この値に意味はない
    200,//Particleのy,この値に意味はない
    8,//ParticleのparticleTrailWidth,線の太さ
    generateColor(),//それぞれの線の色
    speed//回転速度
  );
}
anim();

function generateColor(){
  let colrgb="#";
  for (let i=0;i<6;i++){
    colrgb+=Math.floor(Math.random()*15).toString(16);
  }
  return colrgb;
}

function Particle(x,y,particleTrailWidth,strokeColor){
  this.x=x;
  this.y=y;
  this.particleTrailWidth=particleTrailWidth;
  this.strokeColor=strokeColor;
  this.theta=Math.random()*Math.PI*2;
  this.speed=speed;
  this.t=Math.random()*radius;

  this.rotate=function(){
    const ls={
      x: this.x,
      y: this.y,
    };
    this.theta+=speed*0.6;
    this.x=340+direction*Math.cos(this.theta)*this.t*radiusaf/radius;
    this.y=200+Math.sin(this.theta)*this.t*radiusaf/radius;
    ctx.beginPath();
    ctx.lineWidth=this.particleTrailWidth;
    ctx.strokeStyle=this.strokeColor;
    ctx.moveTo(ls.x,ls.y);
    ctx.lineTo(this.x,this.y);
    ctx.stroke();
  };
}

function anim(){
  requestAnimationFrame(anim);
  ctx.fillStyle="rgba(0,0,0,"+zanzo+")";
  radius=(1/document.getElementById('levelselector').value)*100;
  ss=new Date().getMilliseconds();
  radiusaf=340*Math.abs(Math.cos(ss/314.15));
  ctx.fillRect(0,0,canvas.width,canvas.height);
  particlesArray.forEach(function(particle){particle.rotate()});//配列の各要素に対して実行https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach
}
}

function levelselect(){
    let getleveldisp=document.getElementById('getlevelselector');
    let leveldisp=document.getElementById('levelselector').value;
    getleveldisp.innerHTML='半径を設定:'+leveldisp+'&emsp;&emsp;(デフォルト:0.22)';
}
