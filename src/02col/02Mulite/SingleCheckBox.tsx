/// <reference path="../../../typings/jquery/jquery.d.ts" />

import domFile = require("./../../01core/0Dom"); import basecolFile = require("./../00core/baseCol"); import BaseColReact = basecolFile.Core.BaseColReact; import BaseColVm = basecolFile.Core.BaseColVm; import BaseColProps = basecolFile.Core.BaseColProps; import BaseColStates = basecolFile.Core.BaseColStates; import BaseColAction = basecolFile.Core.BaseColAction;
import iocFile = require("./../../01core/Ioc");
import utilFile = require("./../../01core/Util");
/// <reference path="../../typings/react/react.d.ts" />
/// <reference path="../../typings/react/react-dom.d.ts" />
import React = require("react");
import ReactDOM = require("react-dom");

export module ui {
    export class SingleCheckBoxAction extends BaseColAction {

    }

    export class SingleCheckBoxReact extends BaseColReact<SingleCheckBoxProps, SingleCheckBoxStates, SingleCheckBoxAction> implements domFile.Core.IReact {
        
        private $CheckBox = $("<a/>");
        private IsCheck: boolean = false;
        private CheckBoxObj:any = null;

        protected pInputOnChange(e: React.FormEvent) {
            //生成action ,并且广播
            var _val = e.target["value"];
            var _ac: SingleCheckBoxAction = new SingleCheckBoxAction();
            _ac.DataValue = _val;
            this.pDispatcher(_ac);

            //调用Object的设置
            this.props.Vm.reactDataValueSet(_val);
        }

        public pSender(): React.ReactElement<any> {
            var __this = this;
            var _dateval = __this.props.Vm.reactDataValueGet();
            if (!(_dateval == "true" || _dateval == "false" || _dateval == "")) {
                alert("输入的数据格式不正确");
            }
            else {
                __this.IsCheck = _dateval == "true" ? true : false;
            }

            //return React.DOM.div(null, React.DOM.i({
            //    ref: "singlecheckbox",
            //    className: __this.IsCheck ? "fa fa-check-square-o Hu-pointer" :"fa fa-square-o Hu-pointer",
            //    value: __this.IsCheck?"true":"false",
            //    onClick: function () { __this.singleCheckBoxClick(); }
            //}, ""));

            return <span>
                        <i ref="singlecheckbox"
                    className={"Hu-checkbox Hu-pointer " + (__this.IsCheck ? "icon-check fa fa-check-square-o " : "icon-check-empty fa fa-square-o")}
                            value={__this.IsCheck ? "true" : "false"}
                            onClick={(e) => { e.stopPropagation(); __this.singleCheckBoxClick(); return false;  } }
                            ></i>
                    </span>
        }

        private singleCheckBoxClick() {
            var _$dom = this.fGetSingleCheckBoxDom();
            if (this.IsCheck) {
                this.IsCheck = false;
                _$dom.removeClass("icon-check fa fa-check-square-o");
                _$dom.addClass("icon-check-empty fa fa-square-o");
                this.props.Vm.reactDataValueSet("false");
            }
            else {
                this.IsCheck = true;
                _$dom.removeClass("icon-check-empty fa fa-square-o");
                _$dom.addClass("icon-check fa fa-check-square-o");
                this.props.Vm.reactDataValueSet("true");
            }
        }

        private fGetSingleCheckBoxDom(): JQuery {
            var _reactObj = this.refs["singlecheckbox"];
            var _dom = ReactDOM.findDOMNode(_reactObj);
            var _$dom = $(_dom);
            return _$dom;
        }

    }

    export class SingleCheckBoxProps extends BaseColProps<SingleCheckBoxVm> {

    }

    export class SingleCheckBoxStates extends BaseColStates {

    }

    export class SingleCheckBoxVm extends BaseColVm {
        public ReactType: any = SingleCheckBoxReact;
        protected pRegName = "打勾";

        public constructor() {
            super();

        }
        public static Test(): SingleCheckBoxVm {
            var _bean: SingleCheckBoxVm = new SingleCheckBoxVm();
            //var dateVal = new Date().toLocaleDateString();
            //dateVal = dateVal.replace(/\//g, "-");
            //_bean.dataValueSet(dateVal);
            return _bean;

        }
    }

   iocFile.Core.Ioc.Current().RegisterType("SingleCheckBoxVm", BaseColVm, SingleCheckBoxVm);
} 