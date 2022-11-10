// 終了時間-開始時間で時間を計測する
// let startTime = Date.now();//スタートボタンを押した時の箱
// let finishTime = Date.now();//終了ボタンを押した時の箱
// let today = new Date();//表示用の箱
// let week = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];//曜日の表示
// let month = today.getMonth()+1;//getMonthは1月を0として取得するので+1しておく
// let day = today.getDate();
// let hours = today.getHours();
// let minutes = today.getMinutes();

// //計測開始の表示
// $("#start").on("click",function(){
//     startTime;
//     console.log(startTime,'スタート時間');
//     $('#view').html(month + '月' + day + '日' + hours + '時' + minutes + '分');
// });

// //計測終了の表示
// $("#stop").on("click",function(){
//     finishTime
//     console.log(finishTime,'終了時間');
//     $('#view2').html(month + '月' + day + '日' + hours + '時' + minutes + '分');
// });

//タイマー
var startButton;    // startボタン
var stopButton;     // stopボタン
var resetButton;    // resetボタン
var showTime;       // 表示時間

var timer;              // setinterval, clearTimeoutで使用
var startTime;          // 開始時間
var elapsedTime = 0;    // 経過時間
var holdTime = 0;       // 一時停止用に時間を保持

window.onload = function () {
    startButton = document.getElementById("start");
    stopButton = document.getElementById("stop");
    resetButton = document.getElementById("reset");
    showTime = document.getElementById("time");
}

// スタートボタン押下時
function start(){
    // 開始時間を現在の時刻に設定
    startTime = Date.now();

    // 時間計測
    measureTime();

    startButton.disabled = true;
    stopButton.disabled = false;
    resetButton.disabled = false;
}

// ストップボタン押下時
function stop(){
    // タイマー停止
    clearInterval(timer);

    // 停止時間を保持
    holdTime += Date.now() - startTime;

    startButton.disabled = false;
    stopButton.disabled = true;
    resetButton.disabled = false;
}

// リセットボタン押下時
function reset(){
    // タイマー停止
    clearInterval(timer);

    // 変数、表示を初期化
    elapsedTime = 0;
    holdTime = 0;
    showTime.textContent = "00:00:00.000";

    startButton.disabled = false;
    stopButton.disabled = true;
    resetButton.disabled = true;
}

// 時間を計測（再帰関数）
function measureTime() {
    // タイマーを設定
    timer = setTimeout(function () {
        // 経過時間を設定し、画面へ表示
        elapsedTime = Date.now() - startTime + holdTime;
        showTime.textContent = new Date(elapsedTime).toISOString().slice(11, 23);
        
        // 関数を呼び出し、時間計測を継続する
        measureTime();
    }, 10);
}

//計算した時間差分をローカルストレージに保存
const sample = elapsedTime;
  
  const jsonString = JSON.stringify(sample);
  localStorage.setItem('sample', jsonString);



//htmlに保存した勉強差分を表示