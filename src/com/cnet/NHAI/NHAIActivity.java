package com.cnet.NHAI;

import java.util.ArrayList;

import android.content.Context;
import android.os.Bundle;
import android.telephony.SmsManager;
import android.telephony.TelephonyManager;
import android.widget.Toast;

import org.apache.cordova.*;


public class NHAIActivity extends DroidGap {
    /** Called when the activity is first created. */
	GPSTracker gps;
    @Override
    public void onCreate(Bundle savedInstanceState)
     {
        super.onCreate(savedInstanceState);
        gps = new GPSTracker(NHAIActivity.this);
        TelephonyManager tm = (TelephonyManager)this.getApplicationContext().getSystemService(Context.TELEPHONY_SERVICE);
		// check if GPS enabled		
        if(gps.canGetLocation()){
        	
        	double latitude = gps.getLatitude();
        	double longitude = gps.getLongitude();
        	
            
        	// \n is for new line
        	//Toast.makeText(getApplicationContext(), tm.getLine1Number().toString(), Toast.LENGTH_LONG).show();	
        }else{
        	// can't get location
        	// GPS or Network is not enabled
        	// Ask user to enable GPS/network in settings
        	gps.showSettingsAlert();
        	//gps = new GPSTracker(NHAIActivity.this);
        }
      
        super.loadUrl("file:///android_asset/www/index.html");
        appView.addJavascriptInterface(gps, "MyCls");
        appView.addJavascriptInterface(tm, "MyCls1");
       // appView.addJavascriptInterface(NHAIActivity.this ,"MyCls2");
      
     }
 
}  