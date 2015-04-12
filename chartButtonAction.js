//读取雨量信息，画出雨量曲线所需的的全局变量定义
var TimeYL ;
var TimeYLJson;
var Time_YLday;
var YLmsg;
function YLchartgetData(nodedisasterPointId,YLstartDate,YLendDate){
//读取远程雨量数据，initYLArray()整理数组，再画出曲线图
	       Ext.Ajax.request({
	                         url:"http://localhost:8080/my_wwj/servlet/ServletYL",
	                         params:{disasterPointId:nodedisasterPointId,startDate:YLstartDate,endDate:YLendDate},
	                         method:"GET",
	                         timeout:180000,
	                         success:function(response){
	                         	var data=response.responseText;
	                         	var json=JSON.parse(data);
	                         	
	                         	if(json.info=="success"){
	                         	      YLmsg=json.msg;
	                         	      initYLArray();
	                         	      paintYLChart();
	                         	   }
	                         	}, 
	                         
	                         failure:function(){
	                               alert("怎么出错了呢,雨量数据返回失败");
	                         }
	                    });

}

//读取小时雨量信息，画出雨量曲线所需的的全局变量定义
var HourYL ;
var HourYLJson;
var Hour_YLday;
var YLhourmsg;
function YLchartHourgetData(nodedisasterPointId,YLendDate){
 //读取远程雨量数据，只读一天数据，initYLHourArray()整理数组，再画出曲线图
	       Ext.Ajax.request({
	                         url:"http://localhost:8080/my_wwj/servlet/ServletYLhour",
	                         params:{disasterPointId:nodedisasterPointId,endDate:YLendDate},
	                         method:"GET",
	                         timeout:180000,
	                         success:function(response){
	                         	var data=response.responseText;
	                         	var json=JSON.parse(data);
	                         	
	                         	if(json.info=="success"){
	                         	      YLhourmsg=json.msg;
	                         	      initYLHourArray();
	                         	      paintYLhourChart();
	                         	   }
	                         	}, 
	                         
	                         failure:function(){
	                               alert("怎么出错了呢,雨量数据返回失败");
	                         }
	                    });
   
}