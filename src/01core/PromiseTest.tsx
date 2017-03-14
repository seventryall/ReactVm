export class PromiseTest
{

    public constructor()
    {
       //$.when(this.pFun1("123")).done((a) => this.pFun1("123").then((b) => { this.pFun1("123") }));
        //$.when(this.pFun1("123")).then(this.pFun2).then(this.pFun3);
      var _s =  this.pFun1("构造函数调用123").
            done((a) => { alert(" done " + a); }).
            always((a) => { alert("always " + a); }).
            fail((a) => { alert("fail" + a); }).progress(((a) => { alert("propress" + a); })).state();
            

      alert(_s);
    }

    protected pCreatePromise<T>(): JQueryDeferred<T>
    {
        var _p: JQueryDeferred<T> = $.Deferred<T>(); 
        return _p;
    }

    public pFun1(a: string): JQueryPromise<String> {
        var _p = this.pCreatePromise<String>();
        alert(a);
      //  _p.resolve(a);
        _p.reject("失败");
        return _p.promise();
       // return a;
    }   

    public ff()
    {
        this.pFun1("ff调用");
    }
    protected pFun2(a: number): Number {
        return a;
    }

    protected pFun3(a: number):Number{
        return a;
    }
}