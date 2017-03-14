
import urlFile = require("./Url");
import utilFile = require("./Util");
export class WebApp {

    public notifyMesg(msg: string) {
        //alert("notifyMesg : " + msg );
        utilFile.Core.Util.Noty(msg);

    }  

    public openUrl(url: string,config?:any) {
       // alert("url  : " + url);
        if (url.length >= 5 && url.toUpperCase().indexOf("$WIN") == 0) {
            urlFile.Core.AkUrl.Current().openUrl(url, true, { CanMenuUrl: false });
        }
        else {
            urlFile.Core.AkUrl.Current().openUrl(url, false, config);
        }

    }

   // public 

    public showNavi(title: string) {
        //alert(" 调用 showNavi " +  "title : " + title);
       // return $(".ACT-PAGE-NAVI");
    }
    public reloadToggle() {

    }
    public bindPageEvent() {
    }

}
var _app = new WebApp();
$["AKjs"]["AppGet"] = function () {
    return _app;
};
$["AKjs"]["App"] = _app;