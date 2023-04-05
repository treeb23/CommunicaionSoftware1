function set_display(node){
  let rf=/none/;
  if(rf.test(node.style.display)){
    node.style.display='inline';
  }else{
    node.style.display='none';
  }
}
function set_display_hide(node){
  let rf=/hidden/;
  if(rf.test(node.style.visibility)){
    node.style.visibility='visible';
  }else{
    node.style.visibility='hidden';
  }
}

let scroll;
window.addEventListener("scroll",function(){
  this.document.body.style.transition='2s';
  scroll=window.pageYOffset;//https://developer.mozilla.org/ja/docs/Web/API/Window/scrollY
  if(scroll>8000){
    document.body.style.backgroundColor='#4b0082';//indigo
  }else if(scroll>6000){
    document.body.style.backgroundColor='#008000';//green
  }else if(scroll>4000){
    document.body.style.backgroundColor='#ff8c00';//darkorange
  }else if(scroll>2000){
    document.body.style.backgroundColor='#1e90ff';//dodgerblue
  }else{
    document.body.style.backgroundColor='#ff1493';//deeppink
  }
});

window.onload=function(){
  document.getElementById('study01').style.margin='10px 30px';
  document.getElementById('study02').style.margin='10px 30px';
  document.getElementById('study03').style.margin='10px 30px';
  document.getElementById('study04').style.margin='10px 30px';
  document.getElementById('study05').style.margin='10px 30px';
  document.getElementById('study06').style.margin='10px 30px';
  document.getElementById('study07').style.margin='10px 30px';
}