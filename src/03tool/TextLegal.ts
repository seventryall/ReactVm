import dom = require("./../01core/0Dom");
import baselegal = require("./BaseLegal");

export module Code
{
    export class TextLegal extends baselegal.Core.BaseLegal
    {
        //邮箱验证
        protected email()
        {
            var Expression = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.(?:com|cn)$/gi;
            
            if (this.ControlObj) {
                var _val = this.ControlObj.TempDataValue;
                this.LegalResult = true;
                if (!this.reg(Expression)) {
                    this.LegalResult = false;
                    this.ErrMsg = "邮箱格式不对，格式如admin@163.com";
                }
            }
        }

        //手机验证
        protected mobile()
        {
            var _reg = /^1[358]\d{9}$/;
            if (this.ControlObj) {
                var _val = this.ControlObj.TempDataValue;
                this.LegalResult = true;
                if (!this.reg(_reg)) {
                    this.LegalResult = false;
                    this.ErrMsg = "手机格式不对,必须以13、15、18开头并且为11位";
                }
            }
        }

        //座机验证
        public tel()
        {
            var _reg = '/^((0\d{2,3})-)(\d{7,8})(-(\d{3,}))?$/';
            if (this.ControlObj) {
                var _val = this.ControlObj.TempDataValue;
                this.LegalResult = true;
                if (!this.reg(_reg)) {
                    this.LegalResult = false;
                    this.ErrMsg = "座机号码格式不对,必须为(0(2或者3位)-(7或者8位),如0571-8888888";
                }
            }
        }

        //密码验证
        public pwd()
        {
            var _reg = '/^[a-zA-Z]{1}([a-zA-Z0-9]|[._]){4,19}$/';
            if (this.ControlObj) {
                var _val = this.ControlObj.TempDataValue;
                this.LegalResult = true;
                if (!this.reg(_reg)) {
                    this.LegalResult = false;
                    this.ErrMsg = "只能输入5-20个以字母开头、可带数字、“_”、“.”的字符串!";
                }
            }
        }

        //用户名验证
        public username()
        {
            var _reg = '/^[a-zA-Z]{1}([a-zA-Z0-9]|[._]){4,19}$/';
            if (this.ControlObj) {
                var _val = this.ControlObj.TempDataValue;
                this.LegalResult = true;
                if (!this.reg(_reg)) {
                    this.LegalResult = false;
                    this.ErrMsg = "只能输入5-20个以字母开头、可带数字、“_”、“.”的字串!";
                }
            }
        }
    }
}