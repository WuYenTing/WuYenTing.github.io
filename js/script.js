function apidata() {
    $.ajax({
        url:'https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-D0047-091?Authorization=CWB-1ED588D9-6FA7-4767-9C73-350D6A7B0401&format=JSON&locationName=%E8%87%BA%E5%8D%97%E5%B8%82&sort=time',
        method: "GET",
        datatype:"json",
        success: function(res){
            console.log(res);
        }
    });
};

//CWB-1ED588D9-6FA7-4767-9C73-350D6A7B0401