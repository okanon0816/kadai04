// const titles = [];
// let array=[];

// //addボタンをクリックしたら配列に追加
// $('#add').on('click',function(){
//     //#viewに表示されたものを削除
//     // $('#view').empty();
//     //#titleのvalue追加
//     const title =$('#title').val();
//     console.log(title);
//     //配列にtitle保存
//     // titles.push(title);
//     //配列をloCalStorageに保存
//     if(window.localStorage) { //ブラウザがlocalStorage使えるか判断
//         // let json = JSON.stringify(titles, undefined, 1);
//         localStorage.setItem(localStorage.length.toString(),title)
//     }
//     // #viewに表示する
//         $('#view').append('<div class="delete">'+title+'</div>');
    
// });

// //ページ読み込み、保存データ取得表示
// for(let i=0; i<localStorage.length; i++){
//     const key   = localStorage.key(i);
//     // console.log(key);
//     if (window.localStorage) {
//         //ページ読み込みしても順番が入れ替わらない処理
//         let keyArray = JSON.parse(key);
//         array.push(keyArray)
//         console.log(array,'array');
//         //昇順(小→大)へ並べ替える
//         array.sort(function(a,b){
//             return(a < b ? -1:1)
//         });
//         console.log(array,'ソート後');
//         const value = localStorage.getItem(array[i]);
//         // console.log(json,'json');
//         // let array = JSON.parse(json);
//         // console.log(array,'array');
//         $('#view').append('<div class="delete" data-titles="'+i+'">'+value+'</div>');
//     }
// }

// //削除イベント
// $('div').on('click','.delete',function(){
//     //#viewに表示されたものを削除
//     $('#view').empty();
//     //配列から1つ削除する
//     titles.splice($(this).attr('data-titles', 1 ));
//     //配列の数だけデータを表示する
//     for(let i = 0; i<titles.length; i++){
//         $('#view').prepend('<div class="delete" data-titles="'+i+'">'+titles[i]+'</div>');
//     }
// })

let array=[];
let data = {};

var time = '';
let todoVal ='';

let day = "";
let todo ="";

$(function(){
    //1. 削除処理
    $("#delete").on("click", function(){
    localStorage.clear();
    $("#table").empty();
    // showList();
    });

    // 2.保存処理
    $("#save").on("click", function(){  
        //日付を取得する
        // let now = new Date();//表示用の箱
        // let monthStart = now.getMonth()+1;//getMonthは1月を0として取得するので+1しておく
        // let dayStart = now.getDate();
        // let hoursStart = now.getHours();
        // let minutesStart = now.getMinutes();
        // // console.log((monthStart + '月' + dayStart + '日' + hoursStart + '時' + minutesStart + '分'));
        // let nowHyouji = (monthStart + '月' + dayStart + '日' + hoursStart + '時' + minutesStart + '分');

        var dateObj = new Date();

        var aryWeek = ['日', '月', '火', '水', '木', '金', '土'];

        time = dateObj.getFullYear() + '年' + //年の取得
       (dateObj.getMonth() + 1) + '月' + //月の取得 ※0~11で取得になるため+1
       dateObj.getDate() + '日' + //日付の取得
       '(' + aryWeek[dateObj.getDay()] + ')' + //曜日の取得 0~6で取得になるため事前に配列で設定
       dateObj.getHours() + '時' + //時間の取得
       dateObj.getMinutes() + '分' ; //分の取得

        //ローカルストレージに時間とtodoを保存する
        todoVal = $("#todo").val();
        // console.log(todoVal,'todoVal');

        //日付と入力内容を配列にいれる
        data = {
            day : time,
            todo : todoVal
        };
    
        //dataを空配列arrayにpush
        // array.push(data);
        // console.log(array);

        //配列arrayをJSONで文字列に変換してlocalStorageに保存
        let json = JSON.stringify(data, undefined, 1);
        // let key = localStorage.length.toString()
        let key = localStorage.length
        localStorage.setItem(key,json);
        // $("#todo").val("");

        //localStorageから取り出した文字列を配列に変換
        const getItem = localStorage.getItem(key);
        const view = JSON.parse(getItem);
        // console.log(view,'view');

        //表示
        // for(let i=0; i<localStorage.length;i++){
        //     const html = `
        //     <tr>
        //         <th style="width:100px;">${key}</th>
        //         <td style="width:150px;">${view[i].day}</td>
        //         <td style="width:300px;">${view[i].todo}</td>
        //     </tr>
        //     `;
        //     $("#list").append(html);
        // }

        const html =
        `
        <tr>
            <td>${data.day}</td>
            <td>>${data.todo}</td>            
        
        </tr>
        
        `
        $('#table').append(html);
        console.log(localStorage);

        // showList();
    });
});
    // showList();

// $(window).on('unload', function(e){
    // console.log('ok');
//3.ページ更新しても保存、読み込み
for(let i =0; i<localStorage.length; i++){
    const key = localStorage.key(i)
    // console.log(key,'key');

    //localStorageから取り出した文字列を配列に変換
    const getItem = localStorage.getItem(key);
    const view = JSON.parse(getItem);
    console.log(view,'view');

    // console.log(keyBefore,'keyBefore');
    // console.log(key);

    // data = {
    //     day : time,
    //     todo : todoVal
    // };

    // array.push(data);

    // console.log(view[i].day,'view[i].day');
    // console.log(data.day,'data.day');

    const html =
    `
    <tr>
        <td>${view.day}</td>
        <td>${view.todo}</td>            
    
    </tr>
    
    `
    $('#table').append(html);

}

//1行だけ削除処理
