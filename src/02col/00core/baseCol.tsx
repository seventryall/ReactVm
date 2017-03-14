//import akDispatcher = require("./../../01core/AkDispatcher");


import AkBaseLegal = require("./../../03tool/BaseLegal");
import utilFile = require("./../../01core/Util");
import eventFile = require("./../../01core/Event");

import domFile = require( "./../../01core/0Dom");
import DomReact = domFile.Core.DomReact;
import DomVm = domFile.Core.DomVm;
import DomProps = domFile.Core.DomProps;
import DomStates = domFile.Core.DomStates;
import DomAction = domFile.Core.DomAction;
/// <reference path="../../typings/react/react.d.ts" />
/// <reference path="../../typings/react/react-dom.d.ts" />
import React = require("react");
import ReactDOM = require("react-dom");
export module Core {

    export class BaseColReact<P extends BaseColProps<BaseColVm>, S extends BaseColStates, A extends BaseColAction> extends DomReact<P, S, A>
    {
        private getState(): S {
            if (this.state == null) {

                var s: any = new BaseColStates();
                this.state = s;
            }
            return this.state;
        }
        protected pInstall(): void {
            super.pInstall();
            if (this.props.Vm.LegalObj) {
                this.props.Vm.LegalObj.ControlObj = this.props.Vm;
                this.listenEvent("legal", (msg: string) => {
                    // this.getState().ErrMsg = msg;
                    // this.getState().LegalResult = false;
                    this.legal(msg);

                });
                this.listenEvent("cancleLegal", () => {

                    // alert($(_dom).html());
                    this.cancleLegalSender();
                    //  }
                });
            }
        };

        public legal(msg: string) {
           
            //this.forceUpdate();
            //var _dom = ReactDOM.findDOMNode (this);
            this.legalSender();
            this.legalShowMsg(msg);

        }

        protected getLegalMsgDom(): JQuery {
            try {
                //if(this.isMounted)
                var _dom = ReactDOM.findDOMNode(this);
                return $(_dom);
            }
            catch (ee) {
                return $("<div></div>");
            }
        }
        protected getInputDom(): JQuery {
            try {
                var _dom = ReactDOM.findDOMNode(this);
                return $(_dom);
            }
            catch (ee) {
                return $("<div></div>");
            }
        }

        protected legalShowMsg(msg: string) {
            var _cal = $.fn["calendar"];
            //autosize
            var _autosize = $.fn["autosize"];
            utilFile.Core.Util.AsyncJs(
                ["/AtawStatic/lib/03Extend/qtip/jquery.qtip.min.js", "/AtawStatic/lib/03Extend/qtip/jquery.qtip.min.css"]
                , () => {
                    $.fn["calendar"] = _cal;
                    $.fn["autosize"] = _autosize;
                    var _$dom = this.getLegalMsgDom();
                    var _$domP = _$dom;
                    if (!_$dom.is("div") && !_$dom.is("span")) {
                        _$domP = _$domP.parent();
                    }
                    _$dom.qtip(
                        {
                            position: {
                                my: 'top center',  // Position my top left...
                                at: 'bottom left', // at the bottom right of...
                                container: _$domP,
                                adjust: {
                                    x: (_$dom.width() / 2)
                                }
                            },
                            content: msg,
                            show: {
                                event: 'click'
                            },
                            hide: {
                                event: 'click'
                            }

                        });
                    _$dom.qtip('toggle', true); 
                    //  $(_dom).poshytip("show");
                });
        }

        protected legalSender() {
            this.getInputDom().addClass("Hs-red-border");

        }
        protected cancleLegalSender() {
            this.getInputDom().removeClass("Hs-red-border");

            var _cal = $.fn["calendar"];
            utilFile.Core.Util.AsyncJs(
                [
                    "/AtawStatic/lib/03Extend/qtip/jquery.qtip.min.js", "/AtawStatic/lib/03Extend/qtip/jquery.qtip.min.css"]
                , () => {
                    $.fn["calendar"] = _cal;
                    this.getLegalMsgDom().qtip('toggle', false);
                    this.getLegalMsgDom().qtip('destroy', true)
                });
        }

    }

    export interface IChangeValSet {
        (isChange: boolean, val: string, col: BaseColVm): void;
    }

    export class BaseColVm extends DomVm {

        public IsDataValueChange: boolean;
        public IsKey: boolean;

        public LegalObj: AkBaseLegal.Core.BaseLegal = new AkBaseLegal.Core.BaseLegal();


        public showLegal()
        {
            if (!this.LegalObj.LegalResult) {
                this.getEmit("React").emit("legal", this.LegalObj.ErrMsg);
            }
            else {
                this.getEmit("React").emit("cancleLegal");
            }
        }

        public legal(): boolean {
            if (this.LegalObj) {
                this.LegalObj.legal();
                if (!this.LegalObj.LegalResult) {
                    this.getEmit("React").emit("legal", this.LegalObj.ErrMsg);
                }
                else {
                    this.getEmit("React").emit("cancleLegal");
                }
                return this.LegalObj.LegalResult;
            }
            return true;
            //this.getEmit().emit("legal",mesg);
        }
        protected pOnchange(val: string): boolean {

            var res = super.pOnchange(val);
            if (this.legal()) {
                this.IsDataValueChange = true;
                this.getEmit().emit("BaseColVm_change", this);
            }

            return res;
        }


        public getChangeValFun(changeValFun: IChangeValSet)
        {
            var _val = this.getChangeVal();
            changeValFun(_val!= null,this.vmDataValueGet(),this);
        }

        private getChangeVal() :string{
            var _val = this.vmDataValueGet();
            var _ori = this.getOriValue();
            if (_val == _ori) {
                return null;
            }
            else {
                return _val;
            }

        }

        public makerInNavi(config?: INaviMakerConfig)
        {
            this.pMakerInNavi(config);
        }
        protected pMakerInNavi(config?: INaviMakerConfig) {
        }

    }

    export interface INaviMakerConfig
    {
        NavigationColumnConfig: INavigationColumn;
        DataSet: IDataSet;
    }

    export interface IDict<T> {
        [index: string]: T;
    }

    //-----------------IData-----------------
    export interface IDataRow extends IDict<string | number> {
        [index: string]: string | number;
    }

    //export interface IDataTable extends IDict<IDataRow> {
    //    [index: string]: IDataRow;
    //}

    export interface IDataSet extends IDict<Array<IDataRow>> {
        [index: string]: Array<IDataRow>;
    }

    export interface IDataValue {
        TableName: string;
        ColumnName: string;
        Index: number;
        FunString: string;
        DataValueType: string;
        Value: string;
        IsChange: boolean;
    }
    export interface IOption {
        RegName: string;
        DataValue: IDataValue;
        IsKey: boolean;
        IsParentColumn: boolean;
        Id: string;
       // Legal: IControlLegal;
        PostSetting: string;
        IsReadOnly: boolean;
        DetialFormatFun: string;
        IsLike: boolean;
        DisplayName: string;
        Prompt: string;
        ValPrompt: string;
        IsOpenByDefault: boolean;
    }

    export interface INavigationColumn {
        IsRefrech: boolean;
        IsAvailable: boolean;
        IsExpand: boolean;
        Name: string;
        DisplayName: string;
        Prompt: string;
        ValPrompt: string;
        Kind: string;
        ControlType: string;
       // ShowType: number;
       // Sortable: boolean;
       // IsDetailLink: boolean;
        Options: IOption;
        ChangeEventFun: string;
        //MarkDown: string;
       // Report: IReport;
       // Editor: string;
       // QingColumnName: string;
        TreeConfig: string;
       // Amount: string;
       // Changer: IChager;
       // LinkFormat: string;
       // NormalStyle: string;
       // Width: string;
       // TdStyle: string;
       // ShortCutName: string;
       // CustomControl: string;
       // IsHiddenCol: boolean;

    }

    export class BaseColProps<T extends BaseColVm> extends DomProps<T> {

    }


    export class BaseColStates extends DomStates {
        public LegalResult: boolean;
        public ErrMsg: string;
    }

    export class BaseColAction extends DomAction {

    }



}