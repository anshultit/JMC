function CreateDB(){
MyEchain.app.db.transaction(function (tx) {
    tx.executeSql('CREATE TABLE IF NOT EXISTS companies (id text,name text,website text,twitter text,facebook text,foursquare text,phone text,locator text,photo text,type text,date text)');
    tx.executeSql('CREATE TABLE IF NOT EXISTS Tag_data (server_id text,fakeCompanyId integer,company text,barcode text,code_type text,info text,last_mod text,date_created text,name text,photo text,merchant_type text,is_loyalty text,credits text, isFamilyCard integer,isRXCard integer)');
    tx.executeSql('CREATE TABLE IF NOT EXISTS User_data(view text,authenticated text,user text,password text,phone_id text,msg text,uid text)');
    tx.executeSql('select * from  companies',[], function(tx,results){
        Ext.create('MyEchain.view.Dashboardview', {fullscreen: true});
        if(results.rows.length>0){
            var teml=new Array();
            for(var i=0;i<results.rows.length;i++){
                teml.push({
                    id: results.rows.item(i).id,
                    name: results.rows.item(i).name,
                    website: results.rows.item(i).website,
                    twitter: results.rows.item(i).twitter,
                    facebook: results.rows.item(i).facebook,
                    foursquare: results.rows.item(i).foursquare,
                    phone: results.rows.item(i).phone,
                    locator: results.rows.item(i).locator,
                    photo: results.rows.item(i).photo,
                    date:results.rows.item(i).date
                }) ;
            }
            if(!Ext.getCmp('AddCardView')){
                Ext.Viewport.add({
                    xtype: 'AddCardView',
                    fullscreen: true
                });
            }
            Ext.getStore('CompanyStore').setData(teml);
        }else{
            Ext.Viewport.setMasked({xtype:'loadmask',message:'Welcome to MyEchain<br/> Initializing company data...<br/> This may take a moment'});
            MyEchain.app.GetMainController.getUrlData("companies/",null,function(data){
                Ext.Viewport.setMasked(false);
                console.log(data);
                 MyEchain.app.GetMainController.getAllCompany(data);
            });
           // Ext.Msg.alert('','Welcome to MyEchain<br/> Initializing company data...<br/> This may take a moment.');
            
        }
        if(Ext.fly('backgroundLoader')){Ext.fly('backgroundLoader').destroy();}
    });
});
}