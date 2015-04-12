//画出雨量数据的图表
function paintYLChart(){
	         //判断是不是第一次画图表，不是第一次就要先remove掉之前画的图表
	         if(!isfirstChart){
						         var chartYL=Ext.getCmp('chartYL');
					             Ext.getCmp('chartpanel').remove(chartYL);
					             }
             
             isfirstChart=false;

             //建立数据源
		     var dataStore=new Ext.data.JsonStore({
	         fields:['date','YL']
	          });
	         //往数据源dataStore里面添加数据
	         for(i=0;i<TimeYL.length;i++){
	             dataStore.add({
	             date:TimeYL[i],
	             YL:Time_YLday[i]
	             });
	         }
	      
	         
	         //向图表组件panel里面添加图表，雨量图表为折线图
	         var chartYL=Ext.getCmp('chartpanel').add({
	               xtype:'chart',
	               store:dataStore,
	               id:'chartYL',
	               axes:[{
	                   type:'Numeric',
	                   //dashSize:2,
	                   position:'left',
	                   fields:['YL'],
	                   title:'每日雨量总和(mm)',
                       grid:{
	                      odd:{
	                         opacity:1,
	                         fill:'#FFFFFF',
	                         stroke:'#000000',
	                         'stroke-width':0.5
	                      },
	                      even:{
	                        opacity:0,
	                        stroke:'#FFFFFF',
	                         'stroke-width':0.5
	                      }
	                   },
	                   majorTickSteps:10,
	                   minorTickSteps:3
	               },{
	                  type:'Category',
	                  //dashSize:2,
	                  position:'bottom',
	                  fields:['date'],
	                  grid:true,
	                  title:'日期',

	                  majorTickSteps:20,
	                  minorTickSteps:1
                       
	               }],
	               series:[{
	                   type:'line',
	                   axis:'left',
	                   xField:'date',
	                   yField:'YL',
	                   style: {
	                   	    opacity: 1,
						    stroke: '#FF0000',
						    'stroke-width': 2
						    
						},
						 markerConfig: {
				            type: 'circle',
				            radius: 4,
				            'fill': '#FFFFFF'
				        },
	                   tips: {
						  trackMouse: true,
						  width: 150,
						  height: 40,
						  renderer: function(storeItem, item) {
						    this.setTitle(storeItem.get('date')+"总雨量为"+storeItem.get('YL') +" mm(毫米)");
						  }
                       }                                   
	               }]
	         });	
	      
	         
}

function paintYLhourChart(){
         //判断是不是第一次画图表，不是第一次就要先remove掉之前画的图表
	         if(!isfirstChart){
						         var chartYL=Ext.getCmp('chartYL');
					             Ext.getCmp('chartpanel').remove(chartYL);
					             }
             
             isfirstChart=false;
             for(i=0;i<HourYL.length;i++){
                 HourYL[i]=HourYL[i]+":00";
             }
             //建立数据源
		     var dataStore=new Ext.data.JsonStore({
	         fields:['hour','YL']
	          });
	         //往数据源dataStore里面添加数据
	         for(i=0;i<HourYL.length;i++){
	             dataStore.add({
	             hour:HourYL[i],
	             YL:Hour_YLday[i]
	             });
	         }
	      
	         
	         //向图表组件panel里面添加图表，雨量图表为折线图
	         var chartYL=Ext.getCmp('chartpanel').add({
	               xtype:'chart',
	               store:dataStore,
	               id:'chartYL',
	               axes:[{
	                   type:'Numeric',
	                   //dashSize:2,
	                   position:'left',
	                   fields:['YL'],
	                   title:'每日雨量总和(mm)',
                       grid:{
	                      odd:{
	                         opacity:1,
	                         fill:'#FFFFFF',
	                         stroke:'#000000',
	                         'stroke-width':0.5
	                      },
	                      even:{
	                        opacity:0,
	                        stroke:'#FFFFFF',
	                         'stroke-width':0.5
	                      }
	                   },
	                   majorTickSteps:10,
	                   minorTickSteps:3
	               },{
	                  type:'Category',
	                  //dashSize:2,
	                  position:'bottom',
	                  fields:['hour'],
	                  grid:true,
	                  title:'时间',

	                  majorTickSteps:20,
	                  minorTickSteps:0
                       
	               }],
	               series:[{
	                   type:'line',
	                   axis:'left',
	                   xField:'hour',
	                   yField:'YL',
	                   style: {
	                   	    opacity: 1,
						    stroke: '#FF0000',
						    'stroke-width': 2
						    
						},
						 markerConfig: {
				            type: 'circle',
				            radius: 4,
				            'fill': '#FFFFFF'
				        },
	                   tips: {
						  trackMouse: true,
						  width: 150,
						  height: 40,
						  renderer: function(storeItem, item) {
						    this.setTitle(storeItem.get('hour')+"总雨量为"+storeItem.get('YL') +" mm(毫米)");
						  }
                       }                                   
	               }]
	         });	
}