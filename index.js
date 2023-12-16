
var curengine="baidu";
const music = new Audio("")
music.loop=false;
var musicstate = 0;

function disptime(){  
    var today=new Date();  
    var hh=today.getHours();  
    var mm=today.getMinutes();  
    var ss= today.getSeconds(); 
    var date=today.getDay();
    var mo=today.getMonth();
    var yy=today.getFullYear();
    var dd=today.getDate();
    if(date == 1){
        datee = "星期一"
    }
    else if(date ==2){
        datee = "星期二"
    }
    else if(date ==3){
        datee = "星期三"
    }
    else if(date ==4){
        datee = "星期四"
    }
    else if(date ==5){
        datee = "星期五"
    }
    else if(date ==6){
        datee = "星期六"
    }
    else if(date ==7){
        datee = "星期天"
    }

    if(mm<10){  
        mm='0'+mm;  
    }
    if (ss < 10) {
        ss = '0' + ss;
    }
    document.getElementById("disptime").innerHTML=hh+":"+mm+":"+ss+"</a>" ;
    document.getElementById("dispdate").innerHTML=yy+"."+mo+"."+dd+" "+datee;
}


function crawl(){
    var slogan;
    var xml = new XMLHttpRequest();
    xml.open("GET","https://v1.hitokoto.cn");
    xml.send(null);
    xml.onload = function(){
        console.log(this.status)
        var data = JSON.parse(xml.responseText);
        slogan = data.hitokoto;
        console.log(slogan)
        document.getElementById("slogan").innerHTML=slogan;
    }

    xml.onerror = function(error){
        console.log(error)
    }
   
}

function changeengine(){
    if(curengine=="baidu") document.getElementById("ename").innerHTML="bing";
    if(curengine=="bing") document.getElementById("ename").innerHTML="bilibili";
    if(curengine=="bilibili") document.getElementById("ename").innerHTML="baidu";
    curengine = document.getElementById("ename").textContent;
    console.log(curengine)
}

function search(){
    var url;
    var keywrod = document.getElementById("inputbar").value;
    console.log(keywrod);
    if(curengine == "baidu") url="https://www.baidu.com/s?wd=";
    if(curengine == "bing") url="https://cn.bing.com/search?q=";
    if(curengine == "bilibili") url="https://search.bilibili.com/all?keyword=";
    url = url+keywrod;
    window.open(url,"_blank");
}

function showplayer(){
    var player=document.getElementById("musicplayer");
    player.style.left = "50px";
}
function hideplayer(){
    hideposter();
    var player=document.getElementById("musicplayer");
    player.style.left = "-500px";
}

function play(songurl,songname,coverurl,authur){

}

function refreshprogress(){
    time = music.currentTime.toFixed(0);
    timem = time/60;
    timem = timem - timem%1;
    times = time%60;
    ttime = music.duration.toFixed(0);
    ttimem = ttime/60;
    ttimem = ttimem - ttimem%1;
    ttimes = ttime%60;
    if(times <10) times = "0"+times; 
    if(ttimes <10) ttimes = "0"+ttimes; 
    document.getElementById("duration").innerHTML = timem+":"+times+"/"+ttimem+":"+ttimes;
    document.getElementById("progress").style.width = ((music.currentTime/music.duration * 96).toFixed(1)) + "%";
    if (music.currentTime == music.duration){
        musicstate=0;
        music.pause();
        playbtn.style.backgroundImage = "url('img/play.png')";
    }
}
function playmusic(){
    var playbtn = document.getElementById("playbtn");
    
    if(musicstate == 0){
        console.log(musicstate);
        musicstate=1;
        music.play();
        playbtn.style.backgroundImage = "url('img/pause.png')";
    }
    else if(musicstate==1){
        console.log(musicstate);
        musicstate=0;
        music.pause();
        playbtn.style.backgroundImage = "url('img/play.png')";
    }
}


function replaymusic(){
    music.currentTime=0;
}
function searchmusic(keyword){
    var xml = new XMLHttpRequest;
    xml.open("GET","https://www.yukimusicapi.love/search?keywords="+keyword);
    xml.send();
    xml.onload = function(){
        console.log(this.status)
        var data = JSON.parse(xml.responseText);
        console.log(data)
        var songlsit = document.getElementById("songbox");
        if(songlsit.hasChildNodes){
            while (songlsit.firstChild) {
                songlsit.removeChild(songlsit.firstChild);
            }
        }

        for(i = 0;i<data.result.songs.length;i++){
            var authur = data.result.songs[i].artists[0].name;
            var songid = data.result.songs[i].id;
            var cursong = document.createElement("li");
            var sep = document.createElement("div");
            sep.id="sep";
            cursong.id = "songs";
            if(data.result.songs[i].artists[1]) authur+="/" + data.result.songs[i].artists[1].name;
            if(data.result.songs[i].artists[2]) authur+="/" + data.result.songs[i].artists[2].name;
            if(data.result.songs[i].artists[3]) authur+="/" + data.result.songs[i].artists[3].name;
            cursong.innerHTML = data.result.songs[i].name + "   -   "  + authur;
            cursong.value = songid;
            let curid = songid;
            cursong.onclick = function(){
                postmusic(curid);
                console.log(curid);
            }
            songlsit.appendChild(cursong);
            songlsit.appendChild(sep);
            
        }        
    } 
}



function postmusic(songid){
        var xmlll = new XMLHttpRequest;
        var data
        xmlll.open("GET","https://www.yukimusicapi.love/song/detail?ids="+songid);
        xmlll.send();
        xmlll.onload = function(){
            console.log(this.status)
            data = JSON.parse(xmlll.responseText);
            console.log(data);
            var coverurl = data.songs[0].al.picUrl;
            console.log(coverurl);
            document.getElementById("songcover").style.backgroundImage = "url(" + coverurl + ")";
            var songname=data.songs[0].name;
            var authur = data.songs[0].ar[0].name;
            if(data.songs[0].ar[1]) authur+="/" + data.songs[0].ar[1].name;
            if(data.songs[0].ar[2]) authur+="/" + data.songs[0].ar[2].name;
            if(data.songs[0].ar[3]) authur+="/" + data.songs[0].ar[3].name;
            document.getElementById("songname").innerHTML = songname;
            console.log(authur);
            document.getElementById("authur").innerHTML = authur;
        }
        var xmll = new XMLHttpRequest;
        xmll.open("GET","https://www.yukimusicapi.love/song/url?id="+songid);
        xmll.send();
        xmll.onload = function(){
            console.log(this.status)
            var dataa = JSON.parse(xmll.responseText);
            var songurl = dataa.data[0].url;
            console.log(dataa+"|"+songurl);
            music.src = songurl;
            music.play();
            musicstate=1;
            playbtn.style.backgroundImage = "url('img/pause.png')";
        }
}
        
function lyric(songid){
    xml = new XMLHttpRequest;
    xml.open("GET","https://www.yukimusicapi.love/lyric?id="+songid)
    xml.send()
    xml.onload = function(){
        console.log(xml.status);
        var data = JSON.parse(xml.responseText);
        console.log(data);
    }
}



function searchm(){
    var song = document.getElementById("postinput").value;
    console.log(song);
    searchmusic(song);
}

function showposter(){
    document.getElementById("poster").style.left = "410px"
}
function hideposter(){
    document.getElementById("poster").style.left = "-650px"
}


function onupdate(){
    disptime();
    refreshprogress();
}
function onload(){
    crawl()
}
var mytime = setInterval("onupdate()",10); 