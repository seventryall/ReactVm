import urlFile = require("./Util");
import Util = urlFile.Core.Util;
import eventFile = require("./Event");

export module Core {


    export  interface IUrlHashEvent
    {
        (url: string, afterFun?: Function, a?: boolean): void;
    }

    export interface ISendPageEvent
    {
        (config:IPageActor,obj:any ):void 
    }

    $(function () {

        Util.AsyncJs([
            "/AtawStatic/lib/03Extend/bbq/jquery.ba-hashchange.min.js"],
            () => {
                $(window).hashchange(() => {
                    var hash = location.hash;
                   // alert(1);
                    eventFile.App.GetAppEvent().emit("refeshMarksys");
                   // this.listenAppEvent("refeshMark"
                    //----------------
                    Core.AkUrl.Current().fEmit.emit("hashchange", hash);
                    //alert(hash);
                    // urlEvent(hash);
                });
            });
    });
    export  enum JsActionType {
        Alert = 1,
        Reload = 2,
        Url = 3,
        Object = 4,
        Noty = 5,
        NoGotoUrl = 6,
        JsonObject = 7,
        JsAjaxFun = 8,
        Lock = 50 
        //1: "Alert",
        //2: "Reload",
        //3: "Url",
        //4: "Object",
        //5: "Noty",
        //6: "NoGotoUrl",
        //7: "JsonObject",
        //8: "JsAjaxFun"
    }


   export  interface IJsResponseResult {
        AKJSRES: string;//AKJS
        ActionType: JsActionType;
        Content: string;
        Obj: any;
    }
   export var ActionCommond = {
       Lock: (res: IJsResponseResult) => {
           AkUrl.Current().openUrl("$WinAppLockPage$", false, { CanMenuUrl: true });
       },
        Alert: (res: IJsResponseResult) => {
            Util.Noty(res.Content);
        },
        Reload: (res: IJsResponseResult) => {
            window.location.reload();;
        },
        Url: (res: IJsResponseResult) => {
            window.location.href = res.Content;

        },
        Object: (res: IJsResponseResult, callback) => {
            if (callback) {
                if (res["BeginTime"] && res["EndTimer"]) {
                    var _begin = Date.parse(res["BeginTime"]);
                    var _end = Date.parse(res["EndTimer"]);
                    console.info("服务器响应时间  ： " +  ( _end - _begin));
                }
                callback(res.Obj);
            }
            return res.Obj;
        },
        Noty: (res: IJsResponseResult) => {
           Util.Noty(res.Content);
           // alert(res.Content);
        },
        NoGotoUrl: (res: IJsResponseResult) => {
            AkUrl.Current().openUrl(res.Content);
        },
        JsonObject: (res: IJsResponseResult, callback) => {
            var _obj = $.parseJSON(res.Obj);
            if (callback) {
                if (res["BeginTime"] && res["EndTimer"]) {
                    var _begin = Date.parse(res["BeginTime"]);
                    var _end = Date.parse(res["EndTimer"]);
                    console.info("服务器响应时间  ： " + (_end - _begin));
                }
                callback(_obj);
            }
            return _obj;
        },
        JsAjaxFun: (aRR: IJsResponseResult, obj_Fun) => {
            //  $.HideAjax();
            Util.ToggleLoading(false);
            if (aRR.Content && aRR.Content != "") {
                var _fun = $.AKjs.JsAjaxFun[aRR.Content];
                if (_fun) {
                    var obj = aRR.Obj;
                    var _res = $.AKjs.JsAjaxFun[aRR.Content](obj);
                    if (_res) {
                        if (obj_Fun)
                            obj_Fun(_res);
                    }
                }
                else {
                    alert("找不到js函数 $.AKjs.JsAjaxFun." + aRR.Content);
                    throw "找不到js函数 $.AKjs.JsAjaxFun." + aRR.Content;
                }
            }
            else {
                alert("js函数 $.AKjs.JsAjaxFun.名不能为空吧！");
                throw "js函数 $.AKjs.JsAjaxFun.名不能为空吧！";
            }
        },
    };

   export function  logTime(end: Date, begin: Date): number
    {
        var _begin: any = begin;
        var _end: any = end;
        var _t: number = (_end - _begin);
        return _t;
    }

   export function getTimeNum(dateStr: string): number {
       if (!dateStr || dateStr == "") return 0;
       var _strs: string[] = dateStr.split(".");
       var _num: number = Date.parse(_strs[0]);
       if (_strs.length > 1) {
           var _ss = _strs[1];
           if (_ss.length >= 3) {
               _ss = _ss.substr(0,3);
           }
           _num = _num + (parseInt(_ss) );
       }
       return _num;
   }
   export interface beforeCallBackEvent {
       (data: any): boolean;
   }
   export interface beforeStringCallBackEvent {
       (data: string): string;
   }
   export interface AkPostConfig
   {
       IsNoOpt?: boolean;

       BeforeCallBackEvent?: beforeCallBackEvent;

       BeforeStringCallBackEvent?: beforeStringCallBackEvent;
   }
   export interface IAkCallBackEvent
   {
       (data: any,JsonError?:any ): void;
   }

   export function AkPost(url: string, data: any, callback: IAkCallBackEvent, settings?: JQueryAjaxSettings, $div?: JQuery, config?: AkPostConfig): JQueryXHR {
        // return null;
       // Util.Noty("请求");
        Util.ToggleLoading(true);
        var isLoading: boolean = true;
        if (settings)
            isLoading = settings["isLoading"];
        if (isLoading)
            Util.ToggleLoading(true);
       // alert();
        var _d0:Date = new Date();
        var d1: number = 0;
        var d2: number = 0;
        var d3: number = 0;

        function opt(a) {
            var _opt = true;
            if (config) {
                if (config.IsNoOpt) {
                    _opt = false;
                }
            }
            if (_opt) {
                var _d1: Date = new Date();
                d1 = logTime(_d1, _d0);
                console.info("网络响应总时间 : " + d1);

                if (isLoading)
                    Util.ToggleLoading(true);
                var _isJson = false;
                try {

                    if (config && config.BeforeStringCallBackEvent)
                    {
                       a =  config.BeforeStringCallBackEvent(a);
                    }

                    var _obj = $.parseJSON(a);
                    _isJson = true;
                }
                catch (e) {
                    if ($div) {
                        $div.html(a);
                    }
                    else {
                        console.log(e);
                        console.log(a);
                        callback(a,e);
                    }
                }
                if (_isJson) {
                    var _ajaxRes: IJsResponseResult = _obj;
                    if (_ajaxRes.AKJSRES == "AKJS") {
                        var _d00 = getTimeNum(_ajaxRes["BeginTime"]);
                        var _d11 = getTimeNum(_ajaxRes["EndTimer"]);
                        d2 = (_d11 - _d00);
                        console.info("服务器执行时间 : " + d2);
                        var _isCallback = true;
                        if (config && config.BeforeCallBackEvent) {
                            _isCallback = config.BeforeCallBackEvent(_ajaxRes);
                        }
                        if (_isCallback) {
                            ActionCommond[_ajaxRes.ActionType](_ajaxRes, callback);
                        }
                        var _d3: Date = new Date();
                        d3 = logTime(_d3, _d0);
                        console.info(" 总时间 ：  " + d3);
                        $("#ACT-TIME").text(d2 + "<  " + (d1 - d2) + "<  " + logTime(_d3, _d1));

                    }
                    else {
                        callback(_obj);
                    }
                }
            }
            else {
                callback(a);
            }
            Util.ToggleLoading(false);
        }

        var _oop = $.extend({},
            {
                //  isLoading:true,
                url: url,
                type: "POST",
                async: true,
                dataType: "text",
                data: data,
                error: function (a, b) {
                    // alert("错误");
                    opt(a.responseText);
                },   
                complete: function () {
                   // Util.ToggleLoading(false);
                    if (isLoading)
                        Util.ToggleLoading(false);
                },
                success: function (a) {
                    opt(a);
                },
                //jsonp: "callbackparam",//传递给请求处理程序或页面的，用以获得jsonp回调函数名的参数名(默认为:callback)
                //jsonpCallback:"success_jsonpCallback"//自定义的jsonp回调函数名称，默认为jQuery自动生成的随机函数名
            }, settings
        );

        // $["jsonp"](_oop);
        return $.ajax(_oop);
    }

    export interface IPageActor {
        FromPanelName: string;
        FromModulename: string;
        ToPanelName: string;
        ToModuleName?: string;

        Param1?: string;
        Param2?: string;
        Param3?: string;
    }

    export interface IUrlConfig
    {
        CanMenuUrl?: boolean;
        AfterFun?: Function;
        noUrl?: boolean;
    }

    export interface IPageUrlMode {
        PanelName: string;
        ModuleName: string;
        Param1?: string;
        Param2?: string;
        Param3?: string;

    }

    export class AkUrl 
    {
        private static fAkUrl: AkUrl = new AkUrl();
        public static Current() {
            if (this.fAkUrl.fEmit == null) {
                this.fAkUrl.fEmit =  new EventEmitter2();
            }
            return this.fAkUrl;
        }

        public fEmit: eventemitter2.EventEmitter2 ;

        public static Fetch(): AkUrl {
            return this.fAkUrl = new AkUrl();
        }

        public refresh() {
            Core.AkUrl.Current().fEmit.emit("hashchange", location.hash);
        }

        public getUrlCode(m: IPageUrlMode) {
            if (m) {
                return "$" + m.PanelName+ m.ModuleName + "$" + m.Param1 + "$" + m.Param2 + "$" + m.Param3 + "$";
            }
            return "";
        }
        public getPageUrlModel(a: string): IPageUrlMode
        {
            if (!a) a = location.hash;
            var _strs = a.split("$");
            //  alert(_strs.length);
            if (_strs.length >= 2) {
                var _moduleName = _strs[1];
                var _param1 = _strs[2];
                var _param2 = "";
                if (_strs.length >= 3)
                    _param2 = _strs[3];

                var _param3 = "";
                if (_strs.length >= 3)
                    _param3 = _strs[4];
                var _param = "";
                //if (_name.indexOf("0") == 0) {
                //    _param = "0";
                //}

                if (_moduleName == "") _moduleName = "DEFAULT";
                if (_moduleName == "0") { _moduleName = "DEFAULT"; _param = "0"; }
                var _name = _moduleName.toUpperCase();


                var _isWin0: boolean = false;
                var _isWin: boolean = false;
                var _isPanel: boolean = false;


                if (_name.indexOf("WIN") == 0) {
                    _isWin = true;
                    if (_name.indexOf("WIN0") == 0) {
                        _name = _name.replace("WIN0", "");
                        _isWin0 = true;
                    }
                    else {
                        _name = _name.replace("WIN", "");
                    }

                }
                else {
                    if (_name.indexOf("PANEL") == 0) {
                        _isPanel = true;
                        _name = _name.replace("PANEL", "");

                    }
                }
                // this.ShowTip = "正在载入数据";

                // var f: baseWedPage.Web.BaseWebPageVm = this.MainPageObj;
                var _paneName = "";
                if (_isWin) {
                    _paneName = "win";
                }
                else {
                    if (_isPanel) {
                        _paneName = "panel";
                    }
                }

                if (_moduleName == "DEFAULT" && _param1 && _param1.length > 4 && (_param1.lastIndexOf(".xml") == _param1.length - 4)) {
                    _param1 = _param1.replace(".xml", "");
                    // alert();
                }

                return {
                    PanelName: _paneName,
                    ModuleName: _name,
                    Param1: _param1,
                    Param2: _param2,
                    Param3: _param3,
                };
            } else {
                return null;
            }
          //  return null;
                
        }


        public SendToPage(config: IPageActor, obj: any):void
        {
            Core.AkUrl.Current().fEmit.emit("sendtopage__" + config.ToPanelName, config ,obj);
        }

        public closePage(pageName: string):void
        {
            Core.AkUrl.Current().fEmit.emit("closePage__" + pageName);
        }

        public openUrlByNoMenu(url: string,name?:string)
        {
            if (!name) name = "$MENU$";
            var _isMenu = url.length >= name.length && url.toUpperCase().indexOf(name.toUpperCase()) == 0;
            this.openUrl(url, _isMenu, { CanMenuUrl:true  });
        }

        public openUrl(url: string, noUrl?: boolean, urlConfig?: IUrlConfig)
        {

            if (noUrl) {
                console.info("url跳转到:  " + url  );
            }
            var _fun = null;

            if (urlConfig && urlConfig.AfterFun) {
                _fun = urlConfig.AfterFun;
            }
            if (urlConfig && urlConfig.noUrl) {
                noUrl = true;
            }
            
            if (noUrl) {
                Core.AkUrl.Current().fEmit.emit("hashchange", url, _fun, !(urlConfig && urlConfig.CanMenuUrl));
            }
            else {
                if (location.hash ==("#"+ url))
                    Core.AkUrl.Current().fEmit.emit("hashchange", "#"+url, _fun);
                    else
                {
                    if (!this.IsStartNoUrl(url, "$WIN") && !this.IsStartNoUrl(url, "$PANEL")) {
                        location.hash = url;
                    }
                    else {
                        Core.AkUrl.Current().fEmit.emit("hashchange", "#" + url, _fun, true);
                    }
                }
            }
        }

        private IsStartNoUrl(url: string, sign: string) {
            if (url.length > sign.length) {
                if (url.substr(0, sign.length).toUpperCase() == sign.toUpperCase()) {
                    return true;
                }
            }
            return false;
        }

        public bindSendPage(panelName: string, fun: ISendPageEvent)
        {
            if (this.fEmit == null) {
                this.fEmit = new EventEmitter2();
            }
            this.fEmit.removeAllListeners(("sendtopage__" + panelName));
            this.fEmit.on(("sendtopage__" + panelName), fun);
        }

        public bindClosePage(panelName: string, fun: Function) {
            this.fEmit.removeAllListeners(("closePage__" + panelName));
            this.fEmit.on(("closePage__" + panelName), fun);
        }


        public ready()
        {
            var hash = location.hash;
            Core.AkUrl.Current().fEmit.emit("ready", hash);
        }

        public bindHashChange(urlEvent: IUrlHashEvent )
        {
           
            if (this.fEmit == null) {
                this.fEmit = new EventEmitter2();
            }
            this.fEmit.addListener("hashchange", urlEvent);
           // alert();
        }
        
        public bindReady(urlEvent: IUrlHashEvent) {

            if (this.fEmit == null) {
                this.fEmit = new EventEmitter2();
            }
            this.fEmit.addListener("ready", urlEvent);
            // alert();
        }  
    }

}  