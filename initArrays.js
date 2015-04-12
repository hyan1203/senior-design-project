function initArrays(){
      //远程得到的json字符串转换为json，然后.msg得到后面的json数组
	         var json=JSON.parse(ws_data).msg;
	         //定义取的json数组province属性的去重值
	         //province数组
	         province=new Array();
	         //遍历一遍json，将json所有province一个一个取出来
	         for(i=0;i<json.length;i++){
	                var _province=json[i].provice;
	                if(i==0)province.push(_province);
	                else{
	                   var ifAdd;
	                   //遍历一遍定义的province数组，如果发现重复的就将标志位false，最后如果遍历完成标志位始终为true，那么就将该项放入province数组中
	                   for(j=0;j<province.length;j++){
	                         if(_province==province[j]){
	                            ifAdd=false;
	                            break;
	                         }
	                         else ifAdd=true;
	                   }
	                   if(ifAdd)province.push(_province);
	                } 
	         }
	         //二维数组，它的长度为province数组的个数，这个数组每一项放置相同province的json数组，为下一步整理不同province的disasterName做准备
	         province_disasterName=new Array(province.length);
	         for(i=0;i<province.length;i++){
	         	      //定义一个放不同province的json数组
	         	      var json_province=new Array();
	                  for(j=0;j<json.length;j++){
	                  	       //将相同province的json对象放入同一个json数组json_province
	                  		   if(json[j].provice==province[i])json_province.push(json[j]);
	                  } 
	             //将整理好的相同province的json数组放入 province_disasterName数组    
	             province_disasterName[i]=json_province;   
	         }
//            alert(province_disasterName[0].length);
	         
	         //二维数组，它的长度为province_disasterName的长度，这个数组每一项放置相同province的不同的所有disasterName
	         disasterName_difprov=new Array(province_disasterName.length);
	         //取出province_disasterName中不同province的json数组
	         for(i=0;i<province_disasterName.length;i++){
	         	     //定义一个数组放置相同province的所有disasterName
	         	     var ds_difprov=new Array();
	         	     //遍历不同province的json数组的所有disasterName属性，去重后将ds_difprov数组赋值给disasterName_difprov
	                 for(j=0;j<province_disasterName[i].length;j++){
	                       var _disasterName=province_disasterName[i][j].disasterName;
	                       if(j==0)ds_difprov.push(_disasterName);
	                 else{
	                      var ifAdd;
	                      for(k=0;k<ds_difprov.length;k++){
	                           if(_disasterName==ds_difprov[k]){
	                            ifAdd=false;
	                            break;
	                         }
	                         else ifAdd=true;
	                   }
	                   if(ifAdd)ds_difprov.push(_disasterName);
	                } 
	         } 
	               disasterName_difprov[i]=ds_difprov; 
	         }
//             alert(disasterName_difprov[1].length);
	         
	         //三维数组，province下面是对应的各种disasterName，每个不同的disasterName下面对应的是相同disasterName的所有Json,为下一步所有style分类做准备
	         province_disasterjson=new Array(province.length);
	         for(i=0;i<province.length;i++){
	             var disasterNameArray=new Array(disasterName_difprov[i].length);
	             
	             for(j=0;j<disasterNameArray.length;j++){
	                 var disasterJson=new Array();	                 
	                 for(k=0;k<json.length;k++){
	                     if(json[k].disasterName==disasterName_difprov[i][j]&&json[k].provice==province[i])disasterJson.push(json[k]);
	                 }
	                 disasterNameArray[j]=disasterJson;
	             }
	         	province_disasterjson[i]=disasterNameArray;
	         } 
//	         alert(province_disasterjson[1][1].length);
	        
	         //三维数组，province下面对应的各种disasterName，每个不同的disasterName下面对应的是不同的所有相同disasterName的style
	         province_disasterStyle=new Array(province.length);
	         for(i=0;i<province_disasterStyle.length;i++){
	            var ds_difprov=new Array(disasterName_difprov[i].length);
	            for(j=0;j<ds_difprov.length;j++){
	            	var styleArray=new Array();
	                for(k=0;k<province_disasterjson[i][j].length;k++){
	                    var _style=province_disasterjson[i][j][k].style;
	                    if(k==0)styleArray.push(_style);
	                     else{
	                      var ifAdd;
	                      for(n=0;n<styleArray.length;n++){
	                           if(_style==styleArray[n]){
	                            ifAdd=false;
	                            break;
	                         }
	                         else ifAdd=true;
	                   }
	                   if(ifAdd)styleArray.push(_style);
	                } 
	                } 
	                ds_difprov[j]=styleArray;
	            }
	            province_disasterStyle[i]=ds_difprov;
	         }
//            alert(province_disasterStyle[1][2].length);
	         
	         //四维数组，不同province下面不同的disasterName，不同的disasterName下面不同的style，不同的style下面不同的对应的style的json集合
	         province_disaster_stylejson=new Array(province.length);
	         for(i=0;i<province.length;i++){
	             var disasterNameArray_style=new Array(disasterName_difprov[i].length);
	             	 for(j=0;j<disasterNameArray_style.length;j++){
	                 var styleNameArray=new Array(province_disasterStyle[i][j].length);	                 
	                 for(k=0;k<styleNameArray.length;k++){
	                 	var styleJson=new Array();	
	                 	for(n=0;n<province_disasterjson[i][j].length;n++){
	                 	 //需要同时满足三个条件，相同province，相同disasterName，相同style下面对应的多个json
	                     if(province_disasterjson[i][j][n].style==province_disasterStyle[i][j][k])styleJson.push(province_disasterjson[i][j][n]);
	                 	}
	                 	styleNameArray[k]=styleJson;
	                 	}
	                 disasterNameArray_style[j]=styleNameArray;
	             }
	         	province_disaster_stylejson[i]=disasterNameArray_style;
	         } 
//	         alert(province_disaster_stylejson[1][1][2][0].disasterPointName);
	         
	         
	         //四维数组,不同province下面不同的disasterName，不同的disasterName下面不同的style，不同的style下面不同的disasterPointName与disasterPointId
		         disasterPointId_province=new Array(province.length);
		         disasterPointName_province=new Array(province.length);
		         for(i=0;i<province.length;i++){
		             var disasterPointName_disaName=new Array(disasterName_difprov[i].length);
		             var disasterPointId_disaName=new Array(disasterName_difprov[i].length);
		             for(j=0;j<disasterName_difprov[i].length;j++){
		                 var disasterPointName_style=new Array(province_disasterStyle[i][j].length);
		                 var disasterPointId_style=new Array(province_disasterStyle[i][j].length);
		                 for(k=0;k<province_disasterStyle[i][j].length;k++){
		                      var disasterPointName=new Array();
		                      var disasterPointId=new Array();
		                      for(n=0;n<province_disaster_stylejson[i][j][k].length;n++){
		                            var _disasterPointName=province_disaster_stylejson[i][j][k][n].disasterPointName;
		                            var _disasterPointId=province_disaster_stylejson[i][j][k][n].disasterPointId;
		                            if(n==0){
		                            	disasterPointName.push(_disasterPointName);
		                            	disasterPointId.push(_disasterPointId);
		                            }
		                             else{
		                                 var ifAdd;
		                                 for(y=0;y<disasterPointName.length;y++){
		                                       if(_disasterPointName==disasterPointName[y]){
		                                             ifAdd=false;
		                                             break;
		                                       }
		                                       else ifAdd=true;
		                                }
		                                if(ifAdd){
		                                disasterPointName.push(_disasterPointName);
		                                disasterPointId.push(_disasterPointId);
		                                }
		                               }
		                          } 
                              disasterPointName_style[k]=disasterPointName;
		                      disasterPointId_style[k]=disasterPointId
		                      }
                         disasterPointName_disaName[j]=disasterPointName_style;
		                 disasterPointId_disaName[j]=disasterPointId_style;
		                 }
                     disasterPointName_province[i]=disasterPointName_disaName;
		             disasterPointId_province[i]=disasterPointId_disaName;
		             }
//            alert(disasterPointName_province[1][1][2].length);
	         
	
}

//得到雨量chart需要的数组
function initYLArray(){
          TimeYL=new Array();
          for(i=0;i<YLmsg.length;i++){
          	        //只需要取得每天的日期，而不需要细分到时分秒
	                var _Timedhms=YLmsg[i].monitorTime.split(" ");
	                var _Timeday=_Timedhms[0];
	                if(i==0)TimeYL.push(_Timeday);
	                else{
	                   var ifAdd;
	                   //遍历一遍定义的Time数组，如果发现重复的就将标志位false，最后如果遍历完成标志位始终为true，那么就将该项放入Time数组中
	                   for(j=0;j<TimeYL.length;j++){
	                         if(_Timeday==TimeYL[j]){
	                            ifAdd=false;
	                            break;
	                         }
	                         else ifAdd=true;
	                   }
	                   if(ifAdd)TimeYL.push(_Timeday);
	                } 
	         }

//二维数组，它的长度为Time数组的个数，这个数组每一项放置相同Time的json数组，为下一步整理不同Time的monitorValue做准备
	       TimeYLJson=new Array(TimeYL.length);
	         for(i=0;i<TimeYL.length;i++){
	         	      //定义一个放不同Time的json数组
	         	      var json_Time=new Array();
	                  for(j=0;j<YLmsg.length;j++){
	                  	       //将相同Time的json对象放入同一个json数组json_Time
	                  	       var time=YLmsg[j].monitorTime.split(" ");
	                  		   if(time[0]==TimeYL[i])json_Time.push(YLmsg[j]);
	                  } 
	             //将整理好的相同Time的json数组放入 TimeJson数组    
	             TimeYLJson[i]=json_Time;   
	         }

//二维数组，它的长度为TimeJson的长度，这个数组每一项放置相同Time的不同的所有monitorValue         
	      var YL_day=new Array(TimeYLJson.length);
	         //取出TimeJson中不同Time的json数组
	         for(i=0;i<TimeYLJson.length;i++){
	         	     //定义一个数组放置相同Time的所有monitorValue
	         	     var monitorValue_day=new Array();
	         	     //遍历不同Time的json数组的所有monitorValue属性，加入到相同Time数值中,不用去重
	                 for(j=0;j<TimeYLJson[i].length;j++){
	                       var _monitorValue=TimeYLJson[i][j].monitorValue;
	                       monitorValue_day.push(_monitorValue);
	              
	         } 
	               YL_day[i]=monitorValue_day; 
	         }
	      
//一维数组，根据不同Time拥有每日monitorValue总和（即雨量总和）的数组	      
	      Time_YLday=new Array();   
	      for(i=0;i<YL_day.length;i++){
	      	   var sum=0;
	      	   //取出每一个Time下所有monitorValue相加，并把相加总和sum加到Time_YLday中
	           for(j=0;j<YL_day[i].length;j++){
	           	var monitorValue=0;
	           	monitorValue=parseFloat(YL_day[i][j]);
	            sum=sum+monitorValue;
	            }
	           Time_YLday.push(sum);
	        }
	      
}


//得到雨量chart需要的数组
function initYLHourArray(){
          HourYL=new Array();
          for(i=0;i<YLhourmsg.length;i++){
          	        //只需要取得每天的日期，而不需要细分到时分秒
	                var _Timedhms=YLhourmsg[i].monitorTime.split(" ");
	                var _Timehour=_Timedhms[1].substr(0,2);
	                if(i==0)HourYL.push(_Timehour);
	                else{
	                   var ifAdd;
	                   //遍历一遍定义的Time数组，如果发现重复的就将标志位false，最后如果遍历完成标志位始终为true，那么就将该项放入Time数组中
	                   for(j=0;j<HourYL.length;j++){
	                         if(_Timehour==HourYL[j]){
	                            ifAdd=false;
	                            break;
	                         }
	                         else ifAdd=true;
	                   }
	                   if(ifAdd)HourYL.push(_Timehour);
	                } 
	         }

//二维数组，它的长度为Time数组的个数，这个数组每一项放置相同Time的json数组，为下一步整理不同Time的monitorValue做准备
	       HourYLJson=new Array(HourYL.length);
	         for(i=0;i<HourYL.length;i++){
	         	      //定义一个放不同Time的json数组
	         	      var json_Hour=new Array();
	                  for(j=0;j<YLhourmsg.length;j++){
	                  	       //将相同Time的json对象放入同一个json数组json_Time
	                  	       var time=YLhourmsg[j].monitorTime.split(" ");
	                  		   if(time[1].substr(0,2)==HourYL[i])json_Hour.push(YLhourmsg[j]);
	                  } 
	             //将整理好的相同Time的json数组放入 TimeJson数组    
	             HourYLJson[i]=json_Hour;   
	         }

//二维数组，它的长度为TimeJson的长度，这个数组每一项放置相同Time的不同的所有monitorValue         
	      var YL_hour=new Array(HourYLJson.length);
	         //取出TimeJson中不同Time的json数组
	         for(i=0;i<HourYLJson.length;i++){
	         	     //定义一个数组放置相同Time的所有monitorValue
	         	     var monitorValue_hour=new Array();
	         	     //遍历不同Time的json数组的所有monitorValue属性，加入到相同Time数值中,不用去重
	                 for(j=0;j<HourYLJson[i].length;j++){
	                       var _monitorValue=HourYLJson[i][j].monitorValue;
	                       monitorValue_hour.push(_monitorValue);
	              
	         } 
	               YL_hour[i]=monitorValue_hour; 
	         }
	      
//一维数组，根据不同Time拥有每日monitorValue总和（即雨量总和）的数组	      
	      Hour_YLday=new Array();   
	      for(i=0;i<YL_hour.length;i++){
	      	   var sum=0;
	      	   //取出每一个Time下所有monitorValue相加，并把相加总和sum加到Time_YLday中
	           for(j=0;j<YL_hour[i].length;j++){
	           	var monitorValue=0;
	           	monitorValue=parseFloat(YL_hour[i][j]);
	            sum=sum+monitorValue;
	            }
	           Hour_YLday.push(sum);
	        }
	      
}