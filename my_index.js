	function init() {
		//建立一个toolbar并把它渲染到div“panelToolbar”处
	         var toolBar=new Ext.toolbar.Toolbar({
	              renderTo:'panelToolbar',
	              width:1363,
	              height:30
	              
	         });
	        //向toolbar组件添加两个选项按钮 
	         toolBar.add([
	         { 
	             text:'图层管理',
	             id:'layercontrol'
	         },
	         {
	            text:'数据管理',
	            id:'datacontrol'
	         }
	         ]);
//	         var dataStore=new Ext.data.JsonStore({
//	           fields:['YLchoice'],
//	           data:[
//	           {YLchoice:'日降雨量'},
//	           {YLchoice:'1小时降雨量'}
//	           ]
//	         });
//	         
//	         var dataStoresum=new Ext.data.JsonStore({
//	           fields:['EachRain'],
//	           data:[
//	           {EachRain:'每场雨间隔24小时'},
//	           {EachRain:'每场雨间隔36小时'}
//	           ]
//	         });
	         //主菜单布局，布局格式为border,主panel包括两个组件，一个是放地图的tabpanel，以及选项树型treepanel
	         var main=new Ext.panel.Panel({
	              layout:'border',
	              height:551,
	              width:1363,
	              frame:true,
	              renderTo:'panelContent',//整个主panel渲染到div：panelContent
	              items:[{
	                  xtype:'tabpanel',
	                  region:'center',
	                  frame:true,
	                  activeTab:0,
	                  
	                  items:[{
	                      contentEl:'panelMap',//tabpanel其中一块panel渲染到div:panelMap
	                      title:'地图',
	                      autoScroll:true,
	                      id:'mappanel'
	                  }]
	              },{
	              
	                  xtype:'treepanel',
	                  region:'west',
	                  title:"图层管理",
		              id:'layerPanel',
		              collapsible: true,						
	                  split:true,
	                   width: 225,
	                   minSize: 175,
	                   maxSize: 400,
	                   margins:'0 0 0 5',
	                   root:{
	                   	text:'图层管理',
	                   	
	                   	expanded:true
	                   },
	                   //监听器：checkbox是否被点击，返回值为被点击节点和勾勾是点上还是取消，点击之后调用applet函数进行图层显示处理
	                   listeners: { checkchange: function (node,flage) {
	                       var str=node.raw.id;
	                       document.wwjapplet.setLayerEnable(str,flage);
	       	                    }
	                   }
	                 
	                   },{
	                    xtype:'treepanel',
	                    region:'west',
	                    title:"监测点管理",
		                id:'positionPanel',
		                collapsible: true,						
	                    split:true,
	                    width: 225,
	                   minSize: 175,
	                   maxSize: 400,
	          	       margins:'0 0 0 5',
	                   root:{
		                  text:'监测点管理',
		                  expanded:true
	                    },
	                   listeners: { checkchange: function (node,flage){
	                    var str=node.raw.id;
//	                    node.set('checked', false);
	                    var style=node.raw.text.substr(0,2);
	                    var placeMarkLabel="【"+node.parentNode.parentNode.raw.text+"】"+node.parentNode.raw.text+" "+node.raw.text;
	                    positiontreePlaceMark(str,style,flage,node,placeMarkLabel);	                    
	                    if(style=="YL"&&flage==true){
	                    	if(!isfirstChart){
						         var chartYL=Ext.getCmp('chartYL');
					             Ext.getCmp('chartpanel').remove(chartYL);
					             }
	                       nodedisasterPointId=str+'01';
	                       var disastername=node.parentNode.parentNode.raw.text;
	                       var name=node.raw.text;
	                       YL_chart(disastername,name);
	                    }
	                    else if (style=="YL"&&flage==false){
	                       YL_chartRemove();
	                       isfirstChart=true;
	                    }
	                    else if(style!="YL"&&flage==true){
	                       YL_chartRemove();
	                       isfirstChart=true;
	                       
	                    }
	                      }
	                   }
	              }]
	                   
	         });


//	         Ext.getCmp('chartpanel').hide();//最初隐藏图表panel
		     Ext.getCmp('positionPanel').hide();//最初隐藏监测点treepanel
	         Ext.get('layercontrol').addListener('click',onLayerClick);
	         Ext.get('datacontrol').addListener('click',onPositionClick);

 //图层树型动态根据applet里面LayerList Layername生成
	         //首先得到树型的根节点
	         var root1=Ext.getCmp('layerPanel').getRootNode();
	         //得到需要的子节点个数（根据applet里面的函数得到）
		     var length=document.wwjapplet.getLayerslength();
		     //循环调用生成Layer个数的子节点，并得到各种属性
	 	     for(i=0;i<length;i++){
	           var test=document.wwjapplet.getLayernamewithindex(i); 
	           var child=root1.appendChild({
	               text:test,
	               id:test,
	               leaf:true,
	               checked:document.wwjapplet.isLayerEnable(test)
	           });
	           
	                 }
	                 

//监测点树型动态由后台得到webservice数据生成
	 //首先第一步先对从后台得到的数据ws_data进行处理和分层,就是success中的initArray()        
	 //第二步，根据所有分类好的数据province，disasterName，style，disasterPointName画出监测点树型
		     //先是得到监测点管理树型的根节点
		     var root2=Ext.getCmp('positionPanel').getRootNode();
		     //遍历province得到第一层子节点
	         for(i=0;i<province.length;i++){
	               var child_province=root2.appendChild({
	                    text:province[i]
	                    
	               });
	               var child_profContl=child_province.appendChild({
	                    text:'专业监测'
	                    
	               });
	               //遍历disasterName数组得到下一层子节点
	               for(j=0;j<disasterName_difprov[i].length;j++){
	                   var child_disasterName=child_profContl.appendChild({
	                         text:disasterName_difprov[i][j]
	                         
	                   });
	                   //遍历style数组得到下一层子节点
	                   for(k=0;k<province_disasterStyle[i][j].length;k++){
	                         var child_style=child_disasterName.appendChild({
	                               text:province_disasterStyle[i][j][k]
	                               
	                         });
	                         //遍历最后一层disasterPointName得到最终可选的叶子节点，其叶子节点的id为同一disasterPointName的disasterPointId，用于点击后返回给数据库操作使用
	                         for(n=0;n<disasterPointName_province[i][j][k].length;n++){
	                               var child_disasterPointName=child_style.appendChild({
	                                    text:disasterPointName_province[i][j][k][n],
	                                    id:disasterPointId_province[i][j][k][n],
	                                    leaf:true,
	                                    checked:false
	                               });
	                         }
	                   } 
	               }
	         }
	          

	         //toolbar图层管理按钮点击事件，隐藏监测点treepanel
	         function onLayerClick(){
	           Ext.getCmp('positionPanel').hide();
	           Ext.getCmp('layerPanel').show();
	         }
	          //toolbar监测点管理按钮点击事件，隐藏图层treepanel
	         function onPositionClick(){
	             Ext.getCmp('layerPanel').hide();
	             Ext.getCmp('positionPanel').show();
	         }

//	   var formValues=Ext.getCmp('Startdate');
//	   formValues.setDisabled(true);
//	var formValues=Ext.getCmp('form').getForm().getValues();
//	alert(formValues["Startdate"]);      
//	 Ext.getCmp('test').setTitle('测试题目');
	};
	
	// JavaScript Document
	 Ext.onReady(function(){
	         $.ajax({
	           type: "get",
	           url: "http://localhost:8080/my_wwj/servlet/ServletDemoSecond",
	           success:function(data) {
						ws_data=data;
						initArrays();
			            init();
		         },
	           error: function(){
	                   alert("怎么出错了呢");
	      
	             }
	         });
		      
		});