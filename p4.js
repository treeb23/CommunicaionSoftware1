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

let str='';//演算子以降の入力した内容を文字として記録する
let showstr='';//表示する計算式
let operator='';//演算子
let cal=0;//演算子以降の計算結果
let flag=0;//現在入力できる項目を示す,0:定数・数字,1:関数・演算子・結果表示
let map_ans=new Map();//演算子を入力したときにi項目のcalをMapのi番目に格納しcalをリセットする
let map_op=new Map();//i番目の演算子をMapのi番目に格納
let map_str=new Map();//i項目の計算式と演算子を格納
let map_mem1=new Map();//計算結果を保持するメモリー
let i=0;//項数
let ans;

function constantread(){//数値入力の読取り
    if(flag==0){
        cal=Number(document.getElementById('cons').value);
        str+=cal;
        flag=1;
        disprefresh();
    }else{
        alert('この入力は受け付けていません');
    }
}

function opercalc(f){//演算子の追加
    if(flag==1){
        switch(f){
            case 1:
                operator='+';
                break;
            case 2:
                operator='-';
                break;
            case 3:
                operator='*';
                break;
            case 4:
                operator='/';
                break;
        }
        str='('+str+')'+operator;
        map_op.set(i,f);
        map_ans.set(i,cal);
        map_str.set(i,str);
        str='';
        i++;
        flag=0;
        disprefresh();
    }else{
        alert('数値入力を行っている間は入力を受け付けません');
    }
}


function funccalc(f){//関数の適用
    if(flag==1){
        switch(f){
            case 1:
                str='sin('+str+')';
                cal=Math.sin(cal);
                break;
            case 2:
                str='cos('+str+')';
                cal=Math.cos(cal);
                break;
            case 3:
                str='tan('+str+')';
                cal=Math.tan(cal);
                break;
            case 4:
                str='arcsin('+str+')';
                cal=Math.asin(cal);
                break;
            case 5:
                str='arccos('+str+')';
                cal=Math.acos(cal);
                break;
            case 6:
                str='arctan('+str+')';
                cal=Math.atan(cal);
                break;
            case 7:
                str='log('+str+')';
                cal=Math.log(cal);
                break;
            case 8:
                str='log10('+str+')';
                cal=Math.log10(cal);
                break;
            case 9:
                str='log2('+str+')';
                cal=Math.log2(cal);
                break;
            case 10:
                str='exp('+str+')';
                cal=Math.exp(cal);
                break;
            case 11:
                str='abs('+str+')';
                cal=Math.abs(cal);
                break;
            case 12:
                str='sinh('+str+')';
                cal=Math.sinh(cal);
                break;
            case 13:
                str='cosh('+str+')';
                cal=Math.cosh(cal);
                break;
            case 14:
                str='tanh('+str+')';
                cal=Math.tanh(cal);
                break;
            case 15:
                str='sqrt('+str+')';
                cal=Math.sqrt(cal);
                break;
            case 16:
                str='a('+str+')';
                cal=Math.asin(cal);
                break;
            case 17:
                str='a('+str+')';
                cal=Math.acos(cal);
                break;
            case 18:
                str='a('+str+')';
                cal=Math.atan(cal);
                break;
            case 19:
                str='a('+str+')';
                cal=Math.log(cal);
                break;
            case 20:
                str='a('+str+')';
                cal=Math.log10(cal);
                break;
            case 21:
                str='a('+str+')';
                cal=Math.log2(cal);
                break;
            case 22:
                str='a('+str+')';
                cal=Math.exp(cal);
                break;
            case 23:
                str='a('+str+')';
                cal=Math.abs(cal);
                break;
            case 24:
                str='a('+str+')';
                cal=Math.exp(cal);
                break;
        }
        disprefresh();
    }else{
        alert('関数を適用できる対象がありません');
    }
}


function getans(){//答えを表示する
    if(flag==1){
        map_str.set(i+1,str);
        str='';
        ans=map_ans.get(0);
        for(let k=0;k<i-1;k++){
            str+=map_str.get(k);
            f=map_op.get(k);
            switch(f){
                case 1:
                    ans+=map_ans.get(k+1);
                    break;
                case 2:
                    ans-=map_ans.get(k+1);
                    break;
                case 3:
                    ans=ans*map_ans.get(k+1);
                    break;
                case 4:
                    ans=ans/map_ans.get(k+1);
                    break;
            }
        }
        f=map_op.get(i-1);
        switch(f){
            case 1:
                ans+=cal;
                break;
            case 2:
                ans-=cal;
                break;
            case 3:
                ans=cal*ans;
                break;
            case 4:
                ans=ans/cal;
                break;
        }
        for(let r=i-1;r<=i+1;r++){
            if(map_str.get(r)!==undefined){
                str+=map_str.get(r);
            }
        }
        if(ans===undefined) ans=cal;
        //alert(str+'の計算結果は'+ans+'です');
        document.getElementById('ansdisp').innerHTML=str+' の計算結果は '+ans+' です';
        resetf();
    }else{
        alert('計算式が不完全です');
    }
}

function resetf(){//使用した変数をすべて初期化
    for(let q=0;q<=i+1;q++){
        map_ans.delete(q);
        map_op.delete(q);
        map_str.delete(q);
    }
    document.getElementById('showstr').innerHTML='計算式を入力';
    str='';
    showstr='';
    operator='';
    cal=0;
    flag=0;
    i=0;
}

function disprefresh(){//表示する計算式を更新
    document.getElementById('showstr').innerHTML='';
    for(let r=0;r<=i+1;r++){
        if(map_str.get(r)!==undefined){
            showstr+=map_str.get(r);
        }
    }
    document.getElementById('showstr').innerHTML=showstr+str;
    showstr='';
}

function ansuse(){
    document.getElementById('cons').value=ans;
    constantread();
}

function valuecalc(f){
    switch(f){
        case 1:
            document.getElementById('cons').value=Math.PI;
            break;
        case 2:
            document.getElementById('cons').value=Math.E;
            break;
        case 3:
            document.getElementById('cons').value=Math.LN2;//2の自然対数
            break;
        case 4:
            document.getElementById('cons').value=Math.LN10;//10の自然対数
            break;
        case 5:
            document.getElementById('cons').value=Math.LOG2E;//log2(e)
            break;
        case 6:
            document.getElementById('cons').value=Math.LOG10E;//log10(e)
            break;
        case 7:
            document.getElementById('cons').value=299792458;//光速m/s
            break;
        case 8:
            document.getElementById('cons').value=1.602176634*10**-19;//電気素量C
            break;
        case 9:
            document.getElementById('cons').value=1.25663706212*10**-6;//真空の透磁率N/A^2
            break;
        case 10:
            document.getElementById('cons').value=8.8541878128*10**-12;//真空の誘電率F/m
            break;
    }
    constantread();
}