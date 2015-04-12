function onLYLconfirmClick(){
         	var formValues=Ext.getCmp('form').getForm().getValues();
         	var YLcombo=formValues["YLcombo"];
			var YLstartDate=formValues["Startdate"];
			var YLendDate=formValues["Enddate"];
			
			if(YLcombo=="日降雨量"){
				
				YLchartgetData(nodedisasterPointId,YLstartDate,YLendDate);

			}
			if(YLcombo=="1小时降雨量"){
				
			    YLchartHourgetData(nodedisasterPointId,YLendDate);
			}
}