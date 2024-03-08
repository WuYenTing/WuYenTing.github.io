apidata();
var WeatherAPIurl = "https://opendata.cwa.gov.tw/api/v1/rest/datastore/F-C0032-001?Authorization=CWA-190C6DAA-84DC-4F95-A31D-BA4B80F4CC85"
function apidata(){
    $.ajax({
    url: "https://opendata.cwa.gov.tw/api/v1/rest/datastore/F-C0032-001?Authorization=CWA-190C6DAA-84DC-4F95-A31D-BA4B80F4CC85",
    method: "GET",
    datatype:"json",
    success: function(res){
        console.log(res.records.location[5]);
        var TaipeiWeatherElement=res.records.location[5].weatherElement;
        var Wx = TaipeiWeatherElement[0];
        var PoP = TaipeiWeatherElement[1];
        var MinT = TaipeiWeatherElement[2];
        var CI = TaipeiWeatherElement[3];
        var MaxT = TaipeiWeatherElement[4];
        //console.log(Wx);
        //WeatherDescription(Wx);
        //console.log(PoP);
        //console.log(MinT);
        //console.log(MaxT);
        //MinAndMaxTempature(MinT, MaxT);
        //console.log(CI);
        //FeelingDescription(CI);
        Prediction(Wx, MinT, MaxT, CI, PoP);
    }           
    });
};


function WeatherDescription(Wx){
    for(let i=0;i<3;i++){
        var WD = document.querySelector("WD"+i);
        WD.textContent = Wx.time[i].parameter.parameterName;
        console.log(Wx.time[i].parameter);
    }
}
function MinAndMaxTempature(MinT, MaxT){
    for(let i=0;i<3;i++){
        var MAMT = document.querySelector("MT"+i);
        MAMT.textContent = MinT.time[i].parameter.parameterName + ' ' +MaxT.time[i].parameter.parameterName;
        console.log(MinT.time[i].parameter);
        console.log(MaxT.time[i].parameter);
    }
}
function FeelingDescription(CI){
    for(let i=0;i<3;i++){
        var Ci = document.querySelector("CI"+i);
        Ci.textContent = CI.time[i].parameter.parameterName;
        console.log(CI.time[i].parameter);
    }
}

function Prediction(Wx, MinT, MaxT, CI, PoP){
    for(let i=0;i<3;i++){
        var WD = document.querySelector("WD"+i);
        WD.textContent = Wx.time[i].parameter.parameterName;
        var MAMT = document.querySelector("MT"+i);
        MAMT.textContent = MinT.time[i].parameter.parameterName + ' ' +MaxT.time[i].parameter.parameterName;
        var Ci = document.querySelector("CI"+i);
        Ci.textContent = CI.time[i].parameter.parameterName;
        var POP = document.querySelector("POP"+i);
        POP.textContent = PoP.time[i].parameter.parameterName;
    }
}