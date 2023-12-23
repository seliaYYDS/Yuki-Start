
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
    var dat;
    if(date == 1){
        dat = "星期一"
    }
    else if(date ==2){
        dat = "星期二"
    }
    else if(date ==3){
        dat = "星期三"
    }
    else if(date ==4){
        dat = "星期四"
    }
    else if(date ==5){
        dat = "星期五"
    }
    else if(date ==6){
        dat = "星期六"
    }
    else if(date ==0){
        dat = "星期天"
    }

    if(mm<10){  
        mm='0'+mm;  
    }
    if (ss < 10) {
        ss = '0' + ss;
    }
    document.getElementById("disptime").innerHTML=hh+":"+mm+":"+ss+"</a>" ;
    document.getElementById("dispdate").innerHTML=yy+"."+mo+"."+dd+" "+dat;
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
    player.style.transform= "scale(1)";
}
function hideplayer(){
    var player=document.getElementById("musicplayer");
    player.style.transform= "scale(0)";
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
    document.getElementById("progress").style.width = ((music.currentTime/music.duration * 100).toFixed(1)) + "%";
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
    gotoright();
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
            if(data.result.songs[i].artists[4]) authur+="/" + data.result.songs[i].artists[4].name;
            if(data.result.songs[i].artists[5]) authur+="/" + data.result.songs[i].artists[5].name;
            if(data.result.songs[i].artists[6]) authur+="/" + data.result.songs[i].artists[6].name;
            if(data.result.songs[i].artists[7]) authur+="/" + data.result.songs[i].artists[7].name;
            if(data.result.songs[i].artists[8]) authur+="/" + data.result.songs[i].artists[8].name;
            if(data.result.songs[i].artists[9]) authur+="/" + data.result.songs[i].artists[9].name;

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
            if(data.songs[0].ar[4]) authur+="/" + data.songs[0].ar[4].name;
            if(data.songs[0].ar[5]) authur+="/" + data.songs[0].ar[5].name;
            if(data.songs[0].ar[6]) authur+="/" + data.songs[0].ar[6].name;
            if(data.songs[0].ar[7]) authur+="/" + data.songs[0].ar[7].name;
            if(data.songs[0].ar[8]) authur+="/" + data.songs[0].ar[8].name;
            if(data.songs[0].ar[9]) authur+="/" + data.songs[0].ar[9].name;
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
var mouseX;
var mouseY;
document.addEventListener("mousemove",function(e){
    mouseX = e.clientX;
    mouseY = e.clientY;
})


function setcurdu(){
    start = window.innerWidth/2 -400;
    console.log(start);
    relativepos = (start - mouseX) *-1 -7.5;
    console.log(relativepos);
    var pros = (relativepos / 799).toFixed(2);
    music.currentTime = music.duration * pros;
    console.log(pros);
    //music.currentTime = music.duration * (((mouseX-64)/336).toFixed(3))
}

function setvolumn(){
    relativepos = ((window.innerWidth/2 - 400) -7.5 + 800 - 10 - mouseX +16) ;
    var vol = (relativepos / 200).toFixed(2);
    console.log(vol);
    document.getElementById("curvolumn").style.width = vol * 200+ "px";
    music.volume = vol;
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


function gotoright(){
    document.getElementById("playmenu").style.left = "-100%";
    document.getElementById("playertop").style.left = "50%";
}
function gotoleft(){
    document.getElementById("playmenu").style.left = "0%";
    document.getElementById("playertop").style.left = "0%";
}

function onupdate(){
    disptime();
    refreshprogress();
}
function onload(){
    crawl()
}
var mytime = setInterval("onupdate()",10); 
