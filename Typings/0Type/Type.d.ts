

declare class KindEditor {
    public static create(a, b): KindEditor;
    public remove($a:JQuery): void;
    public html(str?: string): string;
    public sync(): void;
}


interface IPCAS {
    (arg0?, arg1?, arg2?, arg3?, arg4?, arg5?): void;
}
declare var PCAS: IPCAS;


interface  JQuery { 
    autosize(): void;
    calendar(a:any): void;
    foundation(sign?: string): void;
    hashchange(a: Function): void;
    html5_upload(any): void;
    Jcrop(a: any, fun: Function): void;
    AtawControl();
    poshytip(a?: any);
    qtip(a?: any, b?: any);
    clear(isClear?:boolean);
    SwitchClass(c1: string, c2: string, isT?: boolean);

    //-------
    AtawSnsUserCard(a: any);
    AtawSnsClubCard(a: any);
    MyDigitClock(a: any): void;

    qqFace(a: any): void;
    JSONView(a: any,config?:any): void;
    markdown(a: any): void;
    Swiper(a: any): void;

    
} 

interface JQueryCookieOptions {
    expires?: any;
    path?: string;
    domain?: string;
    secure?: boolean;
}
interface JQueryCookieStatic {
    //以下属性及方法是挂在   $.cookie上的
    raw?: boolean;
    json?: boolean;
    defaults?: JQueryCookieOptions;
    //这个属性ts的重载写法
    (): { [key: string]: string };
    (name: string): any;
    (name: string, value: string): void;
    (name: string, converter: (value: string) => any): any;
    (name: string, value: string, options: JQueryCookieOptions): void;
    (name: string, value: any): void;
    (name: string, value: any, options: JQueryCookieOptions): void;
}

interface JQueryStatic {
    sticky(a?: string): void;
    AKjs: any;
    browser: any;
    toJSON(a: any): string;
    createGooFlow(a: any, b: any): any;


    //------sq----- 
    ShowAjax(): void;
    getSuccessFun(option: any): void;
    cookie?: JQueryCookieStatic;
    removeCookie(name: string): boolean;
    removeCookie(name: string, options: JQueryCookieOptions): boolean;
    HideAjax():void;

}

//declare class Amount {
//    public static atoc(numberValue): string;
//    public static formatValue(val): string;
//}

 interface Iatoc
{
    (numberValue: number): string;
}

interface IformatValue {
    (val: string): string;
 }

declare var atoc: Iatoc;
declare var formatValue: IformatValue;

declare class art {
    public static dialog(a:any):void;
}
