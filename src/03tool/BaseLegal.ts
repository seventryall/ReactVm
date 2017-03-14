import domFile = require("./../01core/0Dom"); import basecolFile = require("./../02col/00core/baseCol"); import BaseColReact = basecolFile.Core.BaseColReact; import BaseColVm = basecolFile.Core.BaseColVm; import BaseColProps = basecolFile.Core.BaseColProps; import BaseColStates = basecolFile.Core.BaseColStates; import BaseColAction = basecolFile.Core.BaseColAction;

export module Core {


    export interface ICustomLegalFun
    {
        (ControlObj: BaseColVm ): string;
    }

    export class BaseLegal {


        public ControlObj: BaseColVm;
        public Kind: string;
        public LegalResult: boolean;
        // private fEmit: eventemitter2.EventEmitter2;
        public ErrMsg: string;
        //public LegalKind: string;
        public CustomLegalFunName: string;
        public CustomLegalFun: ICustomLegalFun;

        public LegalReg: string;
        //public ErrMsg: string;
        public LegalExpression: string;

        public initOpts(kind: string, errmsg: string, fun: string, reg: string, expression: string) {
            this.Kind = kind;
            this.ErrMsg = errmsg;
            this.CustomLegalFunName = fun;
            this.LegalReg = reg;
            this.LegalExpression = expression;
        }

        public legal() {
            if (this.Kind && this.Kind != "" && this[this.Kind]) {
                this[this.Kind]();
            } else
                this.LegalResult = true;
        }

        private poshytip(msg: string) {
            this.ErrMsg = msg;
            //this.ControlObj.legal();
        }


        public customNull() {
            if (this.CustomLegalFun) {
                var _val = this.ControlObj.TempDataValue;
                this.LegalResult = true;
                if (_val != null || _val != "") {
                      var error: string = this.CustomLegalFun(this.ControlObj);
                    if (error == null || error == "") {
                        this.LegalResult = true;
                    } else {
                        this.LegalResult = false;
                        this.poshytip(error);

                    }
                }
            }
            else {
                this.poshytip("自定义验证 未指定自定义函数");
                this.LegalResult = false;
            }
        }


        public custom()
        {
            if (this.CustomLegalFun) {

                var error: string = this.CustomLegalFun(this.ControlObj);
                if (error == null || error == "") {
                    this.LegalResult = true;
                }
                else
                {
                    this.LegalResult = false;
                    this.poshytip(error);

                }
            }
            else
            {
                this.poshytip("自定义验证 未指定自定义函数");
                this.LegalResult = false;
            }
        }

        //非空校验
        protected notNull() {
            if (this.ControlObj) {
                var _val = this.ControlObj.TempDataValue;
                this.LegalResult = true;
                if (_val == "" || _val == null) {
                    this.LegalResult = false;
                    this.poshytip("不能为空");
                }
            }
        }

        public reg(str: any): boolean {
            if (str != null) {
                return str["test"](this.ControlObj.TempDataValue);
            } else {
                return false;
            }
        }
        
        //必选校验
        public SelectionNotNull() {
            if (this.ControlObj) {
                var _val = this.ControlObj.TempDataValue;
                this.LegalResult = true;
                if (_val == "" || _val == null) {
                    this.LegalResult = false;
                    this.poshytip("请选择");
                } else if (_val == "--") {
                    this.LegalResult = false;
                    this.poshytip("请选择");
                }
            }
        }

        public RadioNotNull() {
            if (this.ControlObj) {
                var _val = this.ControlObj.TempDataValue;
                this.LegalResult = true;
                if (_val == "" || _val == null) {
                    this.LegalResult = false;
                    this.poshytip("请选择");
                }
            }

        }

        public UserNameLegal() {
            var _reg = /^[0-9a-zA-Z]\w{5,17}$/gi;
            if (this.ControlObj) {
                var _val = this.ControlObj.TempDataValue;
                this.LegalResult = true;
                if (!this.reg(_reg)) {
                    this.LegalResult = false;
                    this.poshytip("用户名长度在6-18位之间，只能包含字符、数字、下划线");
                }
            }
        }

        public PassWordLegal() {
            var _reg = /^[0-9a-zA-Z]\w{5,17}$/gi;
            if (this.ControlObj) {
                var _val = this.ControlObj.TempDataValue;
                this.LegalResult = true;
                if (!this.reg(_reg)) {
                    this.LegalResult = false;
                    this.poshytip("密码长度在6-18位之间，只能包含字符、数字、下划线");
                }
            }
        }

        public MobilePhoneLegal() {
            var _reg = /(^1[3578]\d{9}$)|(^((0\d{2,3})-)(\d{7,8})(-(\d{3,}))?$)/gi;
            if (this.ControlObj) {
                var _val = this.ControlObj.TempDataValue;
                this.LegalResult = true;
                if (!this.reg(_reg)) {
                    this.LegalResult = false;
                    this.poshytip("必须是座机号或手机号，座机号格式为(0(2或者3位)-(7或者8位)");
                }
            }
        }
        public FaxLegal() {
            var _reg = /^(\d{3,4}-)?\d{7,8}$/gi;
            if (this.ControlObj) {
                var _val = this.ControlObj.TempDataValue;
                this.LegalResult = true;
                if (!this.reg(_reg)) {
                    this.LegalResult = false;
                    this.poshytip("输入传真格式不准确");
                }
            }
        }
        public EmailLegal() {
            var _reg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.(?:com|cn)$/gi;
            if (this.ControlObj) {
                var _val = this.ControlObj.TempDataValue;
                this.LegalResult = true;
                if (!this.reg(_reg)) {
                    this.LegalResult = false;
                    this.poshytip("电子邮箱格式不正确");
                }
            }
        }

        public IDCardLegal() {
            var _reg = /(^\d{15}$)|(^\d{17}([0-9]|X)$)/gi;
            if (this.ControlObj) {
                var _val = this.ControlObj.TempDataValue;
                this.LegalResult = true;
                if (!this.reg(_reg)) {
                    this.LegalResult = false;
                    this.poshytip("身份证号码格式不正确");
                }
            }
        }

        public PostCodeLegal() {
            var _reg = /^\d{6}$/gi;
            if (this.ControlObj) {
                var _val = this.ControlObj.TempDataValue;
                this.LegalResult = true;
                if (!this.reg(_reg)) {
                    this.LegalResult = false;
                    this.poshytip("邮政编码为6为整数");
                }
            }
        }

        public VehicleLimitLegal() {
            var _reg = /^\d+(\.\d{1,2})?$/gi;
            if (this.ControlObj) {
                var _val = this.ControlObj.TempDataValue;
                this.LegalResult = true;
                if (!this.reg(_reg)) {
                    this.LegalResult = false;
                    this.poshytip("必须是整数或小数点后1-2位的小数");
                }
            }
        }

        public PriceLegal() {
            var _reg = /^\d+(\.\d{1,2})?$/gi;
            if (this.ControlObj) {
                var _val = this.ControlObj.TempDataValue;
                this.LegalResult = true;
                if (!this.reg(_reg)) {
                    this.LegalResult = false;
                    this.poshytip("必须是整数或小数点后1-2位的小数");
                }
            }
        }

        public SeatLegal() {
            var _reg = /^[0-9]*[1-9][0-9]*$/gi;
            if (this.ControlObj) {
                var _val = this.ControlObj.TempDataValue;
                this.LegalResult = true;
                if (!this.reg(_reg)) {
                    this.LegalResult = false;
                    this.poshytip("必须是大于0的整数");
                }
            }
        }

        public ContextLegal() {
            var _reg = /^.{1,200}$/gi;
            if (this.ControlObj) {
                var _val = this.ControlObj.TempDataValue;
                this.LegalResult = true;
                if (_val != null || _val != "") {
                    this.LegalResult = false;
                    this.poshytip("备注不能为空");
                } else if (!this.reg(_reg)) {
                    this.LegalResult = false;
                    this.poshytip("备注介绍不得大于200字");
                }
            }
        }

        public TitleLegal() {
            var _reg = /^.{1,15}$/gi;
            if (this.ControlObj) {
                var _val = this.ControlObj.TempDataValue;
                this.LegalResult = true;
                if (_val == null || _val == "") {
                    this.LegalResult = false;
                    this.poshytip("输入内容不能为空");
                }
                else if (!this.reg(_reg)) {
                    this.LegalResult = false;
                    this.poshytip("输入内容不得大于15字");
                }
            }
        }
        public EmailLegalNull() {

            if (this.ControlObj) {
                var _val = this.ControlObj.TempDataValue;
                this.LegalResult = true;
                if (_val != null || _val != "") {
                    var _reg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.(?:com|cn)$/gi;
                    this.LegalResult = this.reg(_reg);
                } else {
                    this.LegalResult = true;
                }
                if (!this.LegalResult)
                {
                    this.poshytip("电子邮箱格式不正确");
                }
            }
        }
        public FaxLegalNull() {

            if (this.ControlObj) {
                var _val = this.ControlObj.TempDataValue;
                this.LegalResult = true;
                if (_val != null || _val != "") {
                    var _reg = /^(\d{3,4}-)?\d{7,8}$/gi;
                    this.LegalResult = this.reg(_reg);
                } else {
                    this.LegalResult = true;
                }
                if (!this.LegalResult) {
                    this.poshytip("输入传真格式不准确");
                }
            }
        }
        public IDCardLegalNull()
        {
            if (this.ControlObj) {
                var _val = this.ControlObj.TempDataValue;
                this.LegalResult = true;
                if (_val != null || _val != "") {
                    var _reg = /(^\d{15}$)|(^\d{17}([0-9]|X)$)/gi;
                    this.LegalResult = this.reg(_reg);
                } else {
                    this.LegalResult = true;
                }
                if (!this.LegalResult) {
                    this.poshytip("身份证号码格式不正确");
                }
            }
        }

        public PostCodeLegalNull()
        {
            if (this.ControlObj) {
                var _val = this.ControlObj.TempDataValue;
                this.LegalResult = true;
                if (_val != null || _val != "") {
                    var _reg = /^\d{6}$/gi;
                    this.LegalResult = this.reg(_reg);
                } else {
                    this.LegalResult = true;
                }
                if (!this.LegalResult) {
                    this.poshytip("邮政编码为6为整数");
                }
            }
        }

        public MobilePhoneLegalNull()
        {
            if (this.ControlObj) {
                var _val = this.ControlObj.TempDataValue;
                this.LegalResult = true;
                if (_val != null || _val != "") {
                    var _reg = /(^1[3578]\d{9}$)|(^((0\d{2,3})-)(\d{7,8})(-(\d{3,}))?$)/gi;
                    this.LegalResult = this.reg(_reg);
                } else {
                    this.LegalResult = true;
                }
                if (!this.LegalResult) {
                    this.poshytip("必须是座机号或手机号，座机号格式为(0(2或者3位)-(7或者8位)");
                }
            }
        }

        public VehicleLimitLegalNull()
        {
            if (this.ControlObj) {
                var _val = this.ControlObj.TempDataValue;
                this.LegalResult = true;
                if (_val != null || _val != "") {
                    var _reg = /^\d+(\.\d{1,2})?$/gi;
                    this.LegalResult = this.reg(_reg);
                } else {
                    this.LegalResult = true;
                }
                if (!this.LegalResult) {
                    this.poshytip("必须是整数或小数点后1-2位的小数");
                }
            }
        }

        public PriceLegalNull()
        {
            if (this.ControlObj) {
                var _val = this.ControlObj.TempDataValue;
                this.LegalResult = true;
                if (_val != null || _val != "") {
                    var _reg = /^\d+(\.\d{1,2})?$/gi;
                    this.LegalResult = this.reg(_reg);
                } else {
                    this.LegalResult = true;
                }
                if (!this.LegalResult) {
                    this.poshytip("必须是整数或小数点后1-2位的小数");
                }
            }
        }

        public SeatLegalNull()
        {
            if (this.ControlObj) {
                var _val = this.ControlObj.TempDataValue;
                this.LegalResult = true;
                if (_val != null || _val != "") {
                    var _reg = /^[0-9]*[1-9][0-9]*$/gi;
                    this.LegalResult = this.reg(_reg);
                } else {
                    this.LegalResult = true;
                }
                if (!this.LegalResult) {
                    this.poshytip("必须是大于0的整数");
                }
            }
        }

        public ContextLegalNull()
        {
            if (this.ControlObj) {
                var _val = this.ControlObj.TempDataValue;
                this.LegalResult = true;
                if (_val != null || _val != "") {
                    var _reg = /^.{1,200}$/gi;
                    this.LegalResult = this.reg(_reg);
                } else {
                    this.LegalResult = true;
                }
                if (!this.LegalResult) {
                    this.poshytip("备注介绍不得大于200字");
                }
            }
        }

        public TitleLegalNull()
        {
            if (this.ControlObj) {
                var _val = this.ControlObj.TempDataValue;
                this.LegalResult = true;
                if (_val != null || _val != "") {
                    var _reg = /^.{1,15}$/gi;
                    this.LegalResult = this.reg(_reg);
                } else {
                    this.LegalResult = true;
                }
                if (!this.LegalResult) {
                    this.poshytip("标题不得大于15字");
                }
            }
        }

        public nonnegativeIntegerNull()
        {
            if (this.ControlObj) {
                var _val = this.ControlObj.TempDataValue;
                this.LegalResult = true;
                if (_val != null || _val != "") {
                    var _reg = /^([1-9]\d{0,}|0)$/gi;
                    this.LegalResult = this.reg(_reg);
                } else {
                    this.LegalResult = true;
                }
                if (!this.LegalResult) {
                    this.poshytip("必须为非负整数");
                }
            }
        }

        public nonnegativeInteger()
        {
            var _reg = /^([1-9]\d{0,}|0)$/gi;
            if (this.ControlObj) {
                var _val = this.ControlObj.TempDataValue;
                this.LegalResult = true;
                if (!this.reg(_reg)) {
                    this.LegalResult = false;
                    this.poshytip("必须为非负整数");
                }
            }
        }

        public MorethanZeroLegal()
        {
            var _reg = /^\d+(\.\d{2})?$/;
            if (this.ControlObj) {
                var _val = this.ControlObj.TempDataValue;
                this.LegalResult = true;
                if (!this.reg(_reg)) {
                    this.LegalResult = false;
                    this.poshytip("必须为非负数且大于0");
                }
            }
        }

        public MorethanZeroLegalNull()
        {
            if (this.ControlObj) {
                var _val = this.ControlObj.TempDataValue;
                this.LegalResult = true;
                if (_val != null || _val != "") {
                    var _reg = /^\d+(\.\d{2})?$/;
                    this.LegalResult = this.reg(_reg);
                } else {
                    this.LegalResult = true;
                }
                if (!this.LegalResult) {
                    this.poshytip("必须为非负数且大于0");
                }
            }
        }
    }
}