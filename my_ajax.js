// JavaScript Document

function onGet(){
   $.ajax({
     type: "get",
     url: "http://localhost:8080/my_wwj/servlet/ServletDemoSecond",
     success: function(data){
	 // var obj = JSON.parse("[" + data +"]");
       //var obj = JSON.parse(data);
	   ws_data=data;
	   //alert(obj.msg[0].diasaterName);
     },
     error: function(){
      alert("怎么出错了呢");
     }
    });
  }