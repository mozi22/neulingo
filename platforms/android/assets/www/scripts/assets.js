
var assets = {

  ANDROID : "android",
  IOS : "ios",
  BROWSER : "browser",


  MAIN_PAGE : 1,

  getPlatform : function(){
    return device.platform;
  },

  getView : function(viewid){
    // this will check the platform and return the appropriate template view.

    var viewtype = '';

    if(this.getPlatform() == this.ANDROID){
      viewtype = 'android';
    }
    else if( this.getPlatform() == this.BROWSER){
      viewtype = 'browser';
    }


    if(viewid == this.MAIN_PAGE){
      return 'views/'+viewtype+'/main.html';
    }

  },
};