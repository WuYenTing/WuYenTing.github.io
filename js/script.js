function apidata() {
    $.ajax({
        url:'https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-C0032-001?Authorization=CWB-930C6111-767C-4BCF-A977-B55FED47B943&format=JSON&locationName=%E6%96%B0%E7%AB%B9%E5%B8%82&sort=time',
        method: "GET",
        datatype: "json",
        success: function(res){
            console.log(res);
        }
    });
};

/*
function mainstream(lacationnum){
    $.ajax({
    url:'https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-D0047-091?Authorization=CWB-373C6328-6BF2-41B3-BB3B-147802B82875&format=JSON&locationName=&elementName=&sort=time',
    method: "GET",
    datatype:"json",
    success: function(res){
        console.log(res);
        data = res.records.locations[0].location[lacationnum].weatherElement;
        data1 = res.records.locations[0].location;
        console.log(res.records.locations[0].location[lacationnum].locationName);
        console.log(data);
        rnum=getRandomInt(0,6);
        updateweather();
        charting();
        flag++;
    }
    });
};
*/