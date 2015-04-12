function positiontreePlaceMark(str,style,flage,node,placeMarkLabel){
                        Ext.Ajax.request({
	                         url:"http://localhost:8080/my_wwj/servlet/ServletDatabase",
	                         params:{disasterPointId:str},
	                         timeout:60000,
	                         method:"GET",
	                         success:function(response){
	                               var longitudeAndlatitude=response.responseText;
	                         	   var temp=new Array();
	                         	   var temp=longitudeAndlatitude.split(",");
	                         	   var longitude=parseFloat(temp[0]);
	                         	   var latitude=parseFloat(temp[1]);
	                         	   if(flage&&formerNode!=null){
	                         	      formerNode.set('checked', false);
	                         	      document.wwjapplet.removeMark();
	                         	      document.wwjapplet.placeMark(latitude,longitude,name,placeMarkLabel);
	                         	      formerNode=node;
	                         	   }
	                         	   else if(flage&&formerNode==null){
	                         	      document.wwjapplet.placeMark(latitude,longitude,name,placeMarkLabel);
	                         	      formerNode=node;
	                         	   }
                                   else {
                                      document.wwjapplet.removeMark();
                                      formerNode=null;
                                   }
                                   
	                         }, 
	                         failure:function(){
	                               alert("怎么出错了呢,数据库返回数据失败");
	                         }
	                    });
}


var YLcount=0;//用于计数是否是第一次连续点选雨量YL选项，如果是就生成一个panel来放置曲线，否则就只改变该panel的title
function YL_chart(disastername,name,YLparams){
	         var title="【"+disastername+"】"+"雨量计"+"【"+name+"】"+"监测数据";
	         if(YLcount==0){
		       var dataStore=new Ext.data.JsonStore({
	           fields:['YLchoice'],
	           data:[
	           {YLchoice:'日降雨量'},
	           {YLchoice:'1小时降雨量'}
	           ]
	         });
	         
	         var dataStoresum=new Ext.data.JsonStore({
	           fields:['EachRain'],
	           data:[
	           {EachRain:'每场雨间隔24小时'},
	           {EachRain:'每场雨间隔36小时'}
	           ]
	         });
	         
	         Ext.getCmp('mappanel').add({
	                	         
	                	         xtype:'panel',
			                     layout:'border',
			                     title:title,
			                     width:1090,
			                     height:230,
			                     //closable:true,
			                     resizable:true,
			                     id:'mainchartpanel',
			                     collapsible:true,
			                     autoScroll:true,

			                     items:[{
			                         xtype:'form',
			                         region:'north',
			                         layout:'absolute',
			                         id:'form',
			                         width:1100,
			                         height:40,
			                         items:[{
			                         	xtype:'combo',
			                         	x:220,
			                         	y:5,
			                         	width:100,
			                         	listConfig:{
			                         	   emptyText:'未找到匹配值',
			                         	   maxHeight:60
			                         	},
			                         	name:'YLcombo',
			                         	triggerAction:'all',
			                         	store:dataStore,
			                         	displayField:'YLchoice',
			                         	valueField:'YLchoice',
			                         	value:'日降雨量',
			                         	queryMode:'local',
			                         	forceSelection:true,
			                         	typeAhead:true,
			                         	allowBlank : false,
			                         	listeners: {change: function (form,newValue,oldValue,object) {
								                      if(newValue=='1小时降雨量'){
								                          	   var date=Ext.getCmp('Startdate');
														       date.setDisabled(true);
								                      }
								                      else if(newValue=='日降雨量'){
								                               var date=Ext.getCmp('Startdate');
														       date.setDisabled(false);
								                      }
								       	                    }
						    }
			              },
			                         {
			                           xtype:'combo',
			                         	x:330,
			                         	y:5,
			                         	width:150,
			                         	listConfig:{
			                         	   emptyText:'未找到匹配值',
			                         	   maxHeight:60
			                         	},
			                         	name:'YLsumcombo',
			                         	triggerAction:'all',
			                         	store:dataStoresum,
			                         	displayField:'EachRain',
			                         	valueField:'EachRain',
			                         	value:'每场雨间隔24小时',
			                         	queryMode:'local',
			                         	forceSelection:true,
			                         	typeAhead:true,
			                         	allowBlank : false
			                         	
			                             
			                         },{
			                            xtype:'datefield',
			                            x:500,
			                            y:5,
			                            format:'Y-m-d',
			                            width:120,
			                            name:'Startdate',
			                            id:'Startdate',
			                            value:'06/13/2013'
			                           
			                            
			                         },{
			                            xtype:'label',
			                            x:630,
			                            y:5,
			                            text:'→'
			                         
			                         },{
				                       xtype:'datefield',
				                       x:650,
				                       y:5,
				                       format:'Y-m-d',
				                       width:120,
				                       name:'Enddate',
				                       id:'Enddate',
				                       value:'06/21/2013'
				                       
			                     },{
			                           xtype:'button',
			                           id:'YLconfirm',
			                           x:790,
			                           y:5,
			                           width:100,
			                           text:'确定'
			                     
			                     }]
			                     },{
			                        xtype:'panel',
			                        region:'center',
			                        id:'chartpanel',
			                        width:1100,
			                        height:160,
			                        layout:'fit'
			                        //title:'chart放置处',
			                        
			                     
			                     }
			                     
			                   ]
	         });
	          

             YLcount=YLcount+1;
             Ext.get('YLconfirm').addListener('click',onLYLconfirmClick);
	         }
	         else Ext.getCmp('mainchartpanel').setTitle(title);
	         
}

function YL_chartRemove(){
        Ext.getCmp('mappanel').remove('mainchartpanel');
        YLcount=0;//去除掉了该曲线panel之后记得将雨量计数还原，让下一次重建panel
}
              
