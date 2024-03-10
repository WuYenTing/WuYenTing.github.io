apidata();
currentweather();
var WeatherAPIurl = "https://opendata.cwa.gov.tw/api/v1/rest/datastore/F-C0032-001?Authorization=CWA-190C6DAA-84DC-4F95-A31D-BA4B80F4CC85"
function apidata(){
    $.ajax(
        {
            url: "https://opendata.cwa.gov.tw/api/v1/rest/datastore/F-C0032-001?Authorization=CWA-190C6DAA-84DC-4F95-A31D-BA4B80F4CC85",
            method: "GET",
            datatype:"json",
            success: function(res){
                //console.log(res.records.location);
                var TaipeiWeatherElement=res.records.location[6].weatherElement;
                var Wx = TaipeiWeatherElement[0];
                var PoP = TaipeiWeatherElement[1];
                var MinT = TaipeiWeatherElement[2];
                var CI = TaipeiWeatherElement[3];
                var MaxT = TaipeiWeatherElement[4];
                console.log(Wx);
                //WeatherDescription(Wx);
                //console.log(PoP);
                //console.log(MinT);
                //console.log(MaxT);
                //MinAndMaxTempature(MinT, MaxT);
                //console.log(CI);
                //FeelingDescription(CI);
                Current();
                Prediction(Wx, MinT, MaxT, CI, PoP);
            }
        }               
    );
};
function currentweather(){
    $.ajax(
        {
            url: "https://opendata.cwa.gov.tw/api/v1/rest/datastore/O-A0003-001?Authorization=CWA-190C6DAA-84DC-4F95-A31D-BA4B80F4CC85",
            method: "GET",
            datatype:"json",
            success: function(res){
                var data = res.records.Station;
                console.log(res.records.Station);
                currstate(data);
            }
        }
    )
}

function Current(){
    var now = new Date();
    var day = now.getDay(); 
    var hours = now.getHours();
    var minutes = now.getMinutes();
    var t = document.querySelector("curTime");
    var Day;
    switch(day){
        case 1:
            Day = "MONDAY";
            break;
        case 2:
            Day = "TUESDAY";
            break;
        case 3:
            Day = "WEDNESDAY";
            break;
        case 4:   
            Day = "THURSDAY";
            break;         
        case 5:  
            Day = "FRIDAY";
            break;  
        case 6:
            Day = "SATURDAY";
            break;
        default:
            Day = "SUNDAY";  
    }
    t.textContent = Day + " " + hours + " : " + minutes;
}


function Prediction(Wx, MinT, MaxT, CI, PoP){
    var day = ["今日白天","今晚明晨","明日白天"];
    var night = ["今晚明晨","明日白天","明日晚上"];
    for(let i=0;i<3;i++){
        var now = new Date();
        var hours = now.getHours();
        //console.log(hours);
        var T = document.querySelector("T"+i);
        if( 6 <= hours && hours < 18 ){           
            T.textContent = day[i];
        }
        else{
            T.textContent = night[i];
        }
        //T.textContent = Wx.time[i].startTime.substring(5,16) + "~" + Wx.time[i].endTime.substring(5,16);
        var p = document.querySelector("p"+i);
        var WDimg = document.createElement("img");
        WDimg.setAttribute('src', StateImage(Wx.time[i].parameter.parameterName));
        //WDimg.setAttribute('height', 72);
        //WDimg.setAttribute('width', 72);
        p.appendChild(WDimg);
        var WD = document.querySelector("WD"+i);
        WD.textContent = Wx.time[i].parameter.parameterName;
        var MAMT = document.querySelector("MT"+i);
        MAMT.textContent = MinT.time[i].parameter.parameterName + '°C ~ ' +MaxT.time[i].parameter.parameterName+"°C";
        var Ci = document.querySelector("CI"+i);
        Ci.textContent = CI.time[i].parameter.parameterName;
        var POP = document.querySelector("POP"+i);
        POP.textContent = PoP.time[i].parameter.parameterName+' %';
    }
}

function StateImage(description){ 
    var pic;
    switch(description){
        case "晴天":
            pic="01";
            break;
        case "晴":
            pic="01";
            break;    
        case "晴時多雲":
            pic="02";
            break; 
        case "多雲時晴":
            pic="03";
            break;       
        case "多雲":
            pic="04";
            break;
        case "多雲時陰":
            pic="05";
            break;
        case "陰時多雲":
            pic="06";
            break;
        case "陰天":
            pic="07"
            break;
        default:
            break;        
    }  
    if(["多雲陣雨","多雲短暫雨","多雲短暫陣雨","午後短暫陣雨","短暫陣雨","多雲時晴短暫陣雨","多雲時晴短暫雨","晴時多雲短暫陣雨","晴短暫陣雨","短暫雨"].includes(description)){
        pic="08";                
    }
    else if(["多雲時陰短暫雨","多雲時陰短暫陣雨"].includes(description)){
        pic="09";
    }
    else if(["陰時多雲短暫雨","陰時多雲短暫陣雨"].includes(description)){
        pic="10";
    }
    else if(["雨天","晴午後陰短暫雨","晴午後陰短暫陣雨","陰短暫雨","陰短暫陣雨","陰午後短暫陣雨"].includes(description)){
        pic="11";
    } 
    else if(["多雲時陰有雨","多雲時陰陣雨","晴時多雲陣雨","多雲時晴陣雨"].includes(description)){
        pic="12";
    }
    else if(["陰時多雲有雨","陰時多雲有陣雨","陰時多雲陣雨"].includes(description)){
        pic="13";
    }
    else if(["陰有雨","陰有陣雨","陰雨","陰陣雨","陣雨","午後陣雨","有雨"].includes(description)){
        pic="14";
    }
    else if(["多雲陣雨或雷雨","多雲短暫陣雨或雷雨","多雲短暫雷陣雨","多雲雷陣雨","短暫陣雨或雷雨後多雲",
                    "短暫雷陣雨後多雲","短暫陣雨或雷雨","晴時多雲短暫陣雨或雷雨","晴短暫陣雨或雷雨","多雲時晴短暫陣雨或雷雨",
                    "午後短暫雷陣雨"].includes(description)){
        pic="15";
    }
    else if(["多雲時陰陣雨或雷雨","多雲時陰短暫陣雨或雷雨","多雲時陰短暫雷陣雨","多雲時陰雷陣雨",
                    "晴陣雨或雷雨","晴時多雲陣雨或雷雨","多雲時晴陣雨或雷雨"].includes(description)){
        pic="16";
    }
    else if(["陰時多雲有雷陣雨","陰時多雲陣雨或雷雨","陰時多雲短暫陣雨或雷雨","陰時多雲短暫雷陣雨","陰時多雲雷陣雨","陰有陣雨或雷雨","陰有雷陣雨","陰陣雨或雷雨",
                    "陰雷陣雨","晴午後陰短暫陣雨或雷雨","晴午後陰短暫雷陣雨","陰短暫陣雨或雷雨","陰短暫雷陣雨","雷雨","陣雨或雷雨後多雲",
                    "陰陣雨或雷雨後多雲","陰短暫雷陣雨後多雲","陰雷陣雨後多雲","雷陣雨後多雲","陣雨或雷雨","雷陣雨","午後雷陣雨"].includes(description)){
        pic="17"
    }
    else if(["多雲局部陣雨或雪","多雲時陰有雨或雪","多雲時陰短暫雨或雪","多雲短暫雨或雪","陰有雨或雪","陰時多雲有雨或雪",
                    "陰時多雲短暫雨或雪","陰短暫雨或雪","多雲時陰有雪","多雲時陰短暫雪","多雲短暫雪","陰有雪","陰時多雲有雪","陰時多雲短暫雪",
                    "陰短暫雪","有雨或雪","有雨或短暫雪","陰有雨或短暫雪","陰時多雲有雨或短暫雪","多雲時陰有雨或短暫雪","多雲有雨或短暫雪",
                    "多雲有雨或雪","多雲時晴有雨或雪","晴時多雲有雨或雪","晴有雨或雪","短暫雨或雪","多雲時晴短暫雨或雪","晴時多雲短暫雨或雪",
                    "晴短暫雨或雪","有雪","多雲有雪","多雲時晴有雪","晴時多雲有雪","晴有雪","短暫雪","多雲時晴短暫雪","晴時多雲短暫雪","晴短暫雪"].includes(description)){
        pic="18";
    }
    else if(["晴有霧","晴晨霧"].includes(description)){
        pic="24";
    }
    else if(["晴時多雲有霧","晴時多雲晨霧"].includes(description)){
        pic="25";
    }
    else if(["多雲時晴有霧","多雲時晴晨霧"].includes(description)){
        pic="26";
    }
    else if(["多雲有霧","多雲晨霧","有霧","晨霧"].includes(description)){
        pic="27";
    }
    else if(["陰有霧","陰晨霧","多雲時陰有霧","多雲時陰晨霧","陰時多雲有霧","陰時多雲晨霧"].includes(description)){
        pic="28";
    }
    else if(["多雲局部雨","多雲局部陣雨","多雲局部短暫雨","多雲局部短暫陣雨"].includes(description)){
        pic="29";
    }
    else if(["多雲時陰局部雨","多雲時陰局部陣雨",
                    "多雲時陰局部短暫雨","多雲時陰局部短暫陣雨","晴午後陰局部雨","晴午後陰局部陣雨","晴午後陰局部短暫雨","晴午後陰局部短暫陣雨",
                    "陰局部雨","陰局部陣雨","陰局部短暫雨","陰局部短暫陣雨","陰時多雲局部雨","陰時多雲局部陣雨","陰時多雲局部短暫雨","陰時多雲局部短暫陣雨"].includes(description)){
        pic="30";
    }
    else if(["多雲有霧有局部雨","多雲有霧有局部陣雨","多雲有霧有局部短暫雨","多雲有霧有局部短暫陣雨","多雲有霧有陣雨","多雲有霧有短暫雨",
                    "多雲有霧有短暫陣雨","多雲局部雨有霧","多雲局部雨晨霧","多雲局部陣雨有霧","多雲局部陣雨晨霧","多雲局部短暫雨有霧","多雲局部短暫雨晨霧",
                    "多雲局部短暫陣雨有霧","多雲局部短暫陣雨晨霧","多雲陣雨有霧","多雲短暫雨有霧","多雲短暫雨晨霧","多雲短暫陣雨有霧","多雲短暫陣雨晨霧",
                    "有霧有短暫雨","有霧有短暫陣雨"].includes(description)){ 
        pic="31";   
    }
    else if(["多雲時陰有霧有局部雨","多雲時陰有霧有局部陣雨","多雲時陰有霧有局部短暫雨","多雲時陰有霧有局部短暫陣雨",
                    "多雲時陰有霧有陣雨","多雲時陰有霧有短暫雨","多雲時陰有霧有短暫陣雨","多雲時陰局部雨有霧","多雲時陰局部陣雨有霧","多雲時陰局部短暫雨有霧",
                    "多雲時陰局部短暫陣雨有霧","多雲時陰陣雨有霧","多雲時陰短暫雨有霧","多雲時陰短暫雨晨霧","多雲時陰短暫陣雨有霧","多雲時陰短暫陣雨晨霧",
                    "陰有霧有陣雨","陰局部雨有霧","陰局部陣雨有霧","陰局部短暫陣雨有霧","陰時多雲有霧有局部雨","陰時多雲有霧有局部陣雨","陰時多雲有霧有局部短暫雨",
                    "陰時多雲有霧有局部短暫陣雨","陰時多雲有霧有陣雨","陰時多雲有霧有短暫雨","陰時多雲有霧有短暫陣雨","陰時多雲局部雨有霧","陰時多雲局部陣雨有霧",
                    "陰時多雲局部短暫雨有霧","陰時多雲局部短暫陣雨有霧","陰時多雲陣雨有霧","陰時多雲短暫雨有霧","陰時多雲短暫雨晨霧","陰時多雲短暫陣雨有霧",
                    "陰時多雲短暫陣雨晨霧","陰陣雨有霧","陰短暫雨有霧","陰短暫雨晨霧","陰短暫陣雨有霧","陰短暫陣雨晨霧"].includes(description)){
        pic="32";
    }
    else if(["多雲局部陣雨或雷雨","多雲局部短暫陣雨或雷雨","多雲局部短暫雷陣雨","多雲局部雷陣雨"].includes(description)){
        pic="33";
    }
    else if(["多雲時陰局部陣雨或雷雨","多雲時陰局部短暫陣雨或雷雨",
                    "多雲時陰局部短暫雷陣雨","多雲時陰局部雷陣雨","晴午後陰局部陣雨或雷雨","晴午後陰局部短暫陣雨或雷雨","晴午後陰局部短暫雷陣雨","晴午後陰局部雷陣雨",
                    "陰局部陣雨或雷雨","陰局部短暫陣雨或雷雨","陰局部短暫雷陣雨","陰局部雷陣雨","陰時多雲局部陣雨或雷雨","陰時多雲局部短暫陣雨或雷雨","陰時多雲局部短暫雷陣雨",
                    "陰時多雲局部雷陣雨"].includes(description)){
        pic="34";   
    }
    else if(["多雲有陣雨或雷雨有霧","多雲有雷陣雨有霧","多雲有霧有陣雨或雷雨","多雲有霧有雷陣雨","多雲局部陣雨或雷雨有霧","多雲局部短暫陣雨或雷雨有霧",
                    "多雲局部短暫雷陣雨有霧","多雲局部雷陣雨有霧","多雲陣雨或雷雨有霧","多雲短暫陣雨或雷雨有霧","多雲短暫雷陣雨有霧","多雲雷陣雨有霧","多雲時晴短暫陣雨或雷雨有霧"].includes(description)){
        pic="35";
    }
    else if(["多雲時陰有陣雨或雷雨有霧","多雲時陰有雷陣雨有霧","多雲時陰有霧有陣雨或雷雨","多雲時陰有霧有雷陣雨","多雲時陰局部陣雨或雷雨有霧","多雲時陰局部短暫陣雨或雷雨有霧",
                    "多雲時陰局部短暫雷陣雨有霧","多雲時陰局部雷陣雨有霧","多雲時陰陣雨或雷雨有霧","多雲時陰短暫陣雨或雷雨有霧","多雲時陰短暫雷陣雨有霧","多雲時陰雷陣雨有霧",
                    "陰局部陣雨或雷雨有霧","陰局部短暫陣雨或雷雨有霧","陰局部短暫雷陣雨有霧","陰局部雷陣雨有霧","陰時多雲有陣雨或雷雨有霧","陰時多雲有雷陣雨有霧",
                    "陰時多雲有霧有陣雨或雷雨","陰時多雲有霧有雷陣雨","陰時多雲局部陣雨或雷雨有霧","陰時多雲局部短暫陣雨或雷雨有霧","陰時多雲局部短暫雷陣雨有霧",
                    "陰時多雲局部雷陣雨有霧","陰時多雲陣雨或雷雨有霧","陰時多雲短暫陣雨或雷雨有霧","陰時多雲短暫雷陣雨有霧","陰時多雲雷陣雨有霧","陰短暫陣雨或雷雨有霧",
                    "陰短暫雷陣雨有霧","雷陣雨有霧"].includes(description)){
        pic="36";
    }
    else if(["短暫陣雨有霧","短暫陣雨晨霧","短暫雨有霧","短暫雨晨霧"].includes(description)){
        pic="38";
    }
    else if(["有雨有霧", "陣雨有霧"].includes(description)){
        pic="39";
    }
    else if(["短暫陣雨或雷雨有霧","陣雨或雷雨有霧"].includes(description)){
        pic="41";
    }
    else if(["晴午後多雲局部雨","晴午後多雲局部陣雨","晴午後多雲局部短暫雨","晴午後多雲局部短暫陣雨","晴午後多雲短暫雨","晴午後多雲短暫陣雨","晴午後局部雨",
                    "晴午後局部陣雨","晴午後局部短暫雨","晴午後局部短暫陣雨","晴午後陣雨","晴午後短暫雨","晴午後短暫陣雨","晴時多雲午後短暫陣雨"].includes(description)){
        pic="19";
    }
    else if(["多雲午後局部雨","多雲午後局部陣雨","多雲午後局部短暫雨","多雲午後局部短暫陣雨","多雲午後陣雨","多雲午後短暫雨","多雲午後短暫陣雨","多雲時陰午後短暫陣雨",
                    "陰時多雲午後短暫陣雨","多雲時晴午後短暫陣雨"].includes(description)){
        pic="20";
    }
    else if(["晴午後多雲陣雨或雷雨","晴午後多雲雷陣雨","晴午後陣雨或雷雨","晴午後雷陣雨","晴午後多雲局部陣雨或雷雨","晴午後多雲局部短暫陣雨或雷雨","晴午後多雲局部短暫雷陣雨",
                    "晴午後多雲局部雷陣雨","晴午後多雲短暫陣雨或雷雨","晴午後多雲短暫雷陣雨","晴午後局部短暫雷陣雨","晴午後局部雷陣雨","晴午後短暫雷陣雨","晴雷陣雨","晴時多雲雷陣雨","晴時多雲午後短暫雷陣雨"].includes(description)){
        pic="21";
    }
    else if(["多雲午後局部陣雨或雷雨","多雲午後局部短暫陣雨或雷雨","多雲午後局部短暫雷陣雨","多雲午後局部雷陣雨","多雲午後陣雨或雷雨","多雲午後短暫陣雨或雷雨","多雲午後短暫雷陣雨","多雲午後雷陣雨",
                    "多雲午後雷陣雨","多雲時晴雷陣雨","多雲時晴午後短暫雷陣雨","多雲時陰午後短暫雷陣雨","陰時多雲午後短暫雷陣雨","陰午後短暫雷陣雨"].includes(description)){
        pic="22";
                    }
    else if(["下雪","積冰","暴風雪"].includes(description)) { //雪
        pic="42";
    }
    else{
        console.log("ERROR");
    }
    var path = '../picture/weathericon/day/'+pic+'.svg';
    return path;   
}

function currstate(data){
    var t = document.querySelector("curTemp");
    t.textContent = data[13].WeatherElement.AirTemperature + "°C";
    var l = document.querySelector("location");
    l.textContent = data[13].StationName;
    console.log(data[13].StationName);
    var p = document.querySelector("curimg");
    p.textContent = data[13].WeatherElement.Weather;
    console.log(data[13].WeatherElement.Weather);
    var wdsp = document.querySelector("windspeed");
    wdsp.textContent = data[13].WeatherElement.WindSpeed + "m/s";
    var wddir = document.querySelector("winddirection");
    wddir.textContent = data[13].WeatherElement.WindDirection;
    var hum = document.querySelector("humidity");
    hum.textContent = data[13].WeatherElement.RelativeHumidity + "%";
    var uvi = document.querySelector("uvi");
    uvi.textContent = data[13].WeatherElement.UVIndex + "級";
    
    
    
}