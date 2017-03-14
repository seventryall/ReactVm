// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX

 interface IDict<T> {
    [index: string]: T;
} 

export interface IAppConfigDefine {
    JsAmountconvert: string;
}
var AppConfigDefine: IAppConfigDefine = {
    JsAmountconvert:"/AtawStatic/lib/03Extend/amount/amountconvert.js"
}
 interface String {
    AppKv(key: string, defaultValue?: string): string;
}


export class AppContent {
    private static fAppContent: AppContent = new AppContent();
    public AppConfigObj :any;

    private AppContent() {
        this.AppConfigObj = AppConfigDefine;
    }
    public static Current() {
       // var f: String;
        return this.fAppContent;
    }

    public extendAppConfig(obj:any)
    {
        this.AppConfigObj = $.extend({},this.AppConfigObj,obj)
    }

    private fGetByInterface<T>(): T {
        return this.AppConfigObj as T;
    }

    public getByIApp(): IAppConfigDefine {
        return this.fGetByInterface<IAppConfigDefine>();
    }

    public getByInterface<T>(): T {
        //new String ("dfdf").AppKv("","");
        return this.fGetByInterface<T>();
    }

    public appKv(key: string, defaultValue?: string): string {
        var _val = this.AppConfigObj[key];
        if (_val) {
            return _val;
        }
        else
        {
            return defaultValue;
        }
    }

    
     
}




