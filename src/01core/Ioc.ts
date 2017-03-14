export module Core {

    export interface IClassMeta {
        RegName: string;
        Author?: string;
        Message?: string;
        BaseType: any;
        InstanceType: any;
        customData?: any
    }

    export interface IErrorData
    {
        Path: string;
        error: string;
    }

    export interface IClassList {
        [index: string]: IClassMeta;
    }

    export interface IIocAsy<T> {
        (obj: T): void;
    }
    export interface IRegisterTypeSrcConfig {
        NullFun: INullFun;
    }
    export interface INullFun {
        (regName: string, baseTypeStr: string): void
    }


    export class Ioc {
        private static fIoc: Ioc = new Ioc();
        public static Current() {

            return this.fIoc;
        }

        public IocModel(): IClassList {
            return this.fInstanceClassList;
        }

        public IocSrcModel(): IClassList {
            return this.fInstanceSrcList;
        }

        private fInstanceClassList: IClassList = {};
        private fInstanceSrcList: IClassList = {};

        public RegisterType(regName: string, baseType, instaceType,customData?:any) {
            // var _f = typeof (TTo);
            // alert(baseType.toString());
            regName = regName.toUpperCase();
            var _stre = Ioc.fGetFunName(baseType);
            var _meta: IClassMeta = { RegName: regName, BaseType: baseType, InstanceType: instaceType, customData: customData };
            this.fInstanceClassList[_stre + "_" + regName] = _meta;

        }

        public RegisterTypeSrc(regName: string, baseType, src: string) {
            regName = regName.toUpperCase();
            var _stre = Ioc.fGetFunName(baseType);
            var _meta: IClassMeta = { RegName: regName, BaseType: baseType, InstanceType: src };
            this.fInstanceSrcList[_stre + "_" + regName] = _meta;

        }

        public fetchPromise<T>(regName: string, baseType: any, config?: IRegisterTypeSrcConfig) {
            var _p = $.Deferred<T>();

            this.fFetchAsyInstance(
                regName,
                baseType,
                (a:T) => {
                    _p.resolve(a);
                },
                () => { _p.reject(); },
                config

            )

            return _p.promise();
        }

        public FetchAsyInstance<T>(regName: string, baseType, fun: IIocAsy<T>, error?: Function, config?: IRegisterTypeSrcConfig): void {
            this.fFetchAsyInstance<T>(regName, baseType, fun, error , config );
        }

        private fFetchAsyInstance<T>(regName: string, baseType, fun: IIocAsy<T>, error?: Function, config?: IRegisterTypeSrcConfig): void {
            regName = regName.toUpperCase();
            var _obj: T = this.FetchInstance<T>(regName, baseType);
            if (!_obj) {
                var _stre = Ioc.fGetFunName(baseType);
                var _meta: IClassMeta = this.fInstanceSrcList[_stre + "_" + regName];
                if (_meta) {
                    window["require"]([_meta.InstanceType], (file) => {
                        var obj: T = this.fFetchInstance<T>(regName, baseType);
                        fun(obj);
                    }, (a) => {
                        console.warn(a);
                        error(_meta.InstanceType +"      "+a );
                    });
                }
                else {
                    console.log("注册名为 " + regName + "的类 " + _stre + "未注册 或者 不存在 ");
                    var _isNull: boolean = false;
                    if (config) {
                        if (config.NullFun) {
                            config.NullFun(regName, _stre);
                        }
                        else
                        {
                            _isNull = true;
                        }
                    }
                    else {
                        _isNull = true;
                    }
                    if (_isNull)
                    {
                        fun(null);
                    }
                    // error(null);
                }
            }
            else {
                return fun(_obj);
            }
        }

        private fFetchInstance<T>(regName: string, baseType): T {
            regName = regName.toUpperCase();
            var _stre = Ioc.fGetFunName(baseType);
            var _meta: IClassMeta = this.fInstanceClassList[_stre + "_" + regName];
            if (_meta) {
                var _f = new _meta.InstanceType();
                return _f;
            } else {
                console.log("注册名为: " + regName + "  类型为" + baseType + "没有注册");
                return null;
            }
        }

        public FetchInstance<T>(regName: string, baseType): T {
            regName = regName.toUpperCase();
            return this.fFetchInstance<T>(regName, baseType);
        }

        public static fGetFunName(s) {
            if (typeof s == "string")
                return s;
            //if (s.constructor && s.constructor.name)
            //    return s.constructor.name;
            //else {
            s = s.toString();
            var m = s.match(/function\s+([^(]+)/);
            if (m)
                return m[1];
            else
                return "";
            // }
            //s = s.toString();
            //var m = s.match(/function\s+([^(]+)/);
            //if (m)
            //    return m[1];
            //else
            //    return "";
        }

        public GetTypeList(baseType): Array<IClassMeta> {

            var _list = new Array<IClassMeta>();
            var _stre = Ioc.fGetFunName(baseType);
            for (var _m in this.fInstanceClassList) {
                var _strM: string = _m;
                if (_strM.indexOf(_stre + "_") == 0) {

                    var _col = this.fInstanceClassList[_strM];
                    _list.push(_col);
                }
            }
            return _list;

        }
    }


} 