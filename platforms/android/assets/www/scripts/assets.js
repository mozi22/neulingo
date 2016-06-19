
var assets = {

  ANDROID : "android",
  IOS : "ios",
  BROWSER : "browser",


  MAIN_PAGE : 1,
  DASHBOARD_PAGE: 2,
  SHOP_PAGE: 3,
  SETTINGS_PAGE: 4,

  getPlatform : function(){
    return device.platform;
  },

  getView : function(viewid){
    // this will check the platform and return the appropriate template view.

    var viewtype = '';

      viewtype = 'browser';


    if(viewid == this.MAIN_PAGE){
      return 'views/'+viewtype+'/main.html';
    }
    else if(viewid == this.DASHBOARD_PAGE){
      return 'views/'+viewtype+'/dashboard.html';
    }
    else if(viewid == this.SHOP_PAGE){
      return 'views/'+viewtype+'/shop.html';
    }
    else if(viewid == this.SETTINGS_PAGE){
      return 'views/'+viewtype+'/settings.html';
    }
    else if(viewid == 5){
      return 'views/'+viewtype+'/jobdetail.html';
    }
    else if(viewid == 6){
      return 'views/'+viewtype+'/jobdetail2.html';
    }
  },
};