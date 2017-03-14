
import domFile = require("./../01core/0Dom");
import iocFile = require("./../01core/Ioc");
import utilFile = require("./../01core/Util");
/// <reference path="../../typings/react/react.d.ts" />
/// <reference path="../../typings/react/react-dom.d.ts" />
import React = require("react");
import ReactDOM = require("react-dom");
export module ui {

    export class ButtonAction extends domFile.Core.DomAction {

    }
    export class ButtonReact extends domFile.Core.DomReact<ButtonProps, ButtonStates, ButtonAction>{

        public pSender(): React.ReactElement<any> {
            var _fa = this.props.Vm.FaCss != "" ? ("fa fa-" + this.props.Vm.FaCss ) : " ";

            var _icon = this.props.Vm.IconCss != "" ? ("icon-" + this.props.Vm.IconCss ) : " ";

            return <a
                className={("  " + (this.props.Vm.IsNoBg ? "" : "btn ") + " Hu-pointer " + this.props.Vm.KindCss + (this.props.Vm.NoEnable ? " Hs-btn-disabled " :""))}
                onClick = {
                        () => {
                            if (!this.props.Vm.NoEnable) {
                                this.props.Vm.ClickFun(this.props.Vm);
                            }
                            else {
                                alert("该按钮不可用");
                            };
                            return false; 
                         }
                }> <i className={(_icon + " "+ _fa)}></i>
                    {this.props.Vm.DisplayName}
                </a>;
        };
  



    }

    export interface IButtonVmConfig {
        Name?: string;
        DisplayName?: string;
        FaCss?: string;
        IconCss?: string;
        KindCss?: string;
        NoEnable?: boolean;
        ClickFun?: Function;
        Right?: string;
        IsData?: boolean;
        IsNoBg?: boolean;
    }

    export class ButtonVm extends domFile.Core.DomVm {

        public ReactType = ButtonReact;
        public Name: string;
        public DisplayName: string;
        public FaCss: string = "";
        public IconCss: string = "";
        public NoEnable: boolean;
        public KindCss: string = "btn-sm";
        public ClickFun: Function;
        public Right: string;
        public IsData: boolean;
        public IsNoBg: boolean;

        public constructor(config?: IButtonVmConfig) {
            super();
            if (config) {
                if (config.Name) {
                    this.Name = config.Name;
                }
                if (config.DisplayName) {
                    this.DisplayName = config.DisplayName;
                }
                if (config.FaCss) {
                    this.FaCss = config.FaCss;
                }
                if (config.FaCss) {
                    this.FaCss = config.FaCss;
                }
                if (config.IconCss) {
                    this.IconCss = config.IconCss;
                }
                if (config.NoEnable) {
                    this.NoEnable = config.NoEnable;
                }               
                if (config.KindCss) {
                    this.KindCss = config.KindCss;
                }
                if (config.ClickFun) {
                    this.ClickFun = config.ClickFun;
                } 
                if (config.Right) {
                    this.Right = config.Right;
                }
                if (config.IsData) {
                    this.IsData = config.IsData;
                }
                if (config.IsNoBg) {
                    this.IsNoBg = config.IsNoBg;
                }
            }
        }
    }


    export class ButtonProps extends domFile.Core.DomProps<ButtonVm>{




    }
    export class ButtonStates extends domFile.Core.DomStates {




    }
}