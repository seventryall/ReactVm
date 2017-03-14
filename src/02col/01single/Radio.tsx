import domFile = require("./../../01core/0Dom"); import basecolFile = require("./../00core/baseCol"); import BaseColReact = basecolFile.Core.BaseColReact; import BaseColVm = basecolFile.Core.BaseColVm; import BaseColProps = basecolFile.Core.BaseColProps; import BaseColStates = basecolFile.Core.BaseColStates; import BaseColAction = basecolFile.Core.BaseColAction;
import iocFile = require("./../../01core/Ioc");
import utilFile = require("./../../01core/Util");
import kvFile = require("./../../03tool/Kv");
/// <reference path="../../typings/react/react.d.ts" />
/// <reference path="../../typings/react/react-dom.d.ts" />
import React = require("react");
import ReactDOM = require("react-dom");
export module ui {
    export class RadioAction extends BaseColAction {
        public SelectText: string;
    }

    export class RadioReact extends BaseColReact<RadioProps, RadioStates, RadioAction> implements domFile.Core.IReact {

        private fOnClick(a) {
            var _val = a.Value;
            var _act = new RadioAction();
            _act.DataValue = _val;
            _act.SelectText = a.Text;

            this.pDispatcher(_act);
            this.props.Vm.reactDataValueSet(_val);
        }

        public pSender(): React.ReactElement<any> {
            super.pSender();
            var _select = this.props.Vm.ItemList.map((a, i)=> {
                //return React.DOM.li({
                //    className: "acsSingleSelectorItem left " + (a.Text == this.props.Vm.SelectText ? "selected" : ""),
                //    value: a.Value,
                //    onClick: () => { this.fOnClick(a); }
                //}, a.Text,
                //    a.Text == this.props.Vm.SelectText ? React.DOM.em(null) : null,
                //    a.Text == this.props.Vm.SelectText ? React.DOM.i({ className: "fa fa-check" }) : null);
                return <li key={i}
                    className={"nav-item Hu-pointer Hc-single-selector " + (a.Text == this.props.Vm.SelectText ? "Hz-selected" : "") }
                    value={a.Value}
                    onClick={() => { this.fOnClick(a); return false;}}
                    >
                    {a.Text}
                    {a.Text == this.props.Vm.SelectText ? React.DOM.em(null) : null}
                    {a.Text == this.props.Vm.SelectText ? React.DOM.i({ className: " icon-ok fa fa-check" }) : null}
                    </li>
                
                
            });
            //return React.DOM.ul({ className: " clearfix" }, _select);
            return <ul className="nav nav-tabs Hc-radio-list clearfix">{_select}</ul>
        }

    }

    export class RadioProps extends BaseColProps<RadioVm>
    {

    }

    export class RadioStates extends BaseColStates {

    }

    export class RadioVm extends BaseColVm {

        public ReactType: any = RadioReact;
        protected pRegName = "单选控件";
        public ItemList: Array<kvFile.data.KV> = new Array<kvFile.data.KV>();
        public SelectText: string;

        public dataValueGet(): string {
            return this.pDataValue;
        }

        protected pOnchange(val: string): boolean {
            var isCheck: boolean = super.pOnchange(val);
            if (isCheck) {
                this.pDataValue = val;
                for (var i = 0; i < this.ItemList.length; i++) {
                    if (this.ItemList[i].Value == val) {
                        this.SelectText = this.ItemList[i].Text;
                        break;
                    }
                }
            }
            return isCheck;
        }

        public static Test(num?: number): RadioVm {
            if (num == undefined)
                num = 7;
            var bean: RadioVm = new RadioVm();
            for (var i = 0; i < num; i++) {

                bean.ItemList = bean.ItemList.concat(
                    { Value: i.toString(), Text: "选项 " + i }
                );

            }
            bean.initDataValue((num - 1).toString());
            var _item = bean.ItemList[num - 1];
            if (_item)
                bean.SelectText = (_item).Text;
            return bean;
        }

    }

    iocFile.Core.Ioc.Current().RegisterType("RadioVm", BaseColVm, RadioVm);
}
