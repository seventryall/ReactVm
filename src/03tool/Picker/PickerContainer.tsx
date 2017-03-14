import domFile = require("./../../01core/0Dom");
import domCore = domFile.Core;
import utilFile = require("./../../01core/Util");
import iocFile = require("./../../01core/Ioc");
import urlFile = require("./../../01core/Url");
import React = require("react");
import ReactDOM = require("react-dom");
import pickItemDomFile = require("./PickItemDom");
import pickListBaseDomFile = require("./PickListBaseDom");

export module PickerContainer {
    export class PickerContainerAction extends domCore.DomAction {
    }

    export class PickerContainerReact extends domCore.DomReact<PickerContainerProps, PickerContainerStates, PickerContainerAction> implements domCore.IReact {

        public state = new PickerContainerStates();
        protected pIsSetScreenHeight: boolean = true;

        private fPickSure_fun() {
            this.props.Vm.PickSure();
        }
        private _text(str): string {
            try {
                var _texts = $(str).text();
                if (_texts == "") {
                    return str;
                }
                else
                    return _texts;
            }
            catch (ff) {
                return str;
            }
        }

        private fInitSingle(): React.ReactNode
        {
            return <div className="Hm-picker clearfix">
                <div className={this.props.Vm.IsPickSelectHide ? " hide " : ""} >
                    <div>{"（已经选中" + this.props.Vm.PickItemList.length + "个）"}</div>
                        <ul className="nav nav-tabs clearfix" >
                            {this.props.Vm.PickItemList.map((p,i) => {
                                return p.intoDom(i);
                            }) }
                        </ul>
                        {  this.props.Vm.PickItemList.length == 0 ? < button onClick={() => { this.fPickSure_fun(); } }>确定</button> : null }
                    </div>
                    <div>
                    {this._tDom(this.props.Vm.LeftDomVmObj, { nullNode: <span><i className="icon-spinner icon-spin fa  fa-spinner fa-spin "></i>等待载入待选区域...</span> }) }
                    </div>
              
            </div>;
        }


        private fInitMulti(): React.ReactNode
        {
            return <div className="Hm-picker">
                <div className={"col-sm-8 col-lg-" + this.isRightClassName() + " col-xl-" + this.isRightClassName() + "  Hm-picker-left"}>
                    {this._tDom(this.props.Vm.LeftDomVmObj, { nullNode: <span><i className="icon-spinner icon-spin fa  fa-spinner fa-spin "></i>等待载入待选区域...</span> }) }
                    </div>
                    <div className={" col-sm-4 col-lg-4 col-xl-4 Hm-picker-right " + (this.props.Vm.IsPickSelectHide ? " hide " : "") }>
                        <div>{"（已经选中" + this.props.Vm.PickItemList.length + "个）"}</div>
                        <ul className="nav nav-pills clearfix" >
                            {this.props.Vm.PickItemList.map((p,i) => {
                                return p.intoDom(i);
                            }) }
                        </ul>
                        <div className="text-center"><a className="btn btn-sm btn-primary" onClick={() => { this.fPickSure_fun(); } }>确定</a></div>
                    </div>
                   
             </div>;
        }

        protected isRightClassName()
        {
            return this.props.Vm.isRightEmpty ? "12" : "8";
        }

        public pSender(): React.ReactElement<any> {
            return <div className="row" > {this.props.Vm.IsSingle ? this.fInitSingle() : this.fInitMulti() } </div>;
        }
        protected pComponentDidMount() {
            super.pComponentDidMount();

        }


    }

    export interface IReactPickerContainerVm extends domCore.DomVm {
        LeftDomVmObj: pickListBaseDomFile.PickListBaseDom.PickListBaseDomVm;
       // RightNode?: React.ReactNode;
        PickItemList: pickItemDomFile.PickItemDom.PickItemDomVm[];

        PickSure(): void;
        PickCancleSelect(k: string): void;
        PickSelect(k: string): void;
        IsSingle: boolean;
        IsPickSelectHide: boolean;
        isRightEmpty: boolean;
    }

    export interface IPickerContainerConfig {
        LeftDomVmObj: pickListBaseDomFile.PickListBaseDom.PickListBaseDomVm;
       // RightNode?: React.ReactNode;
        PickItemList?: pickItemDomFile.PickItemDom.IPickItemDomConfig[];
        UniId?: string;
        IsSingle?: boolean;
        SetSureCustomerObjFun?: ISetSureCustomerObj;
        IsPickSelectHide?: boolean;

        isRightEmpty?: boolean;
    }
    export interface IPickItem {
        Text: string;
        Key: string;
        IsSelect?: boolean;

    }

    export interface ISetSureCustomerObj {
        (_items: IPickItem[]): any;
    }

    export class PickerContainerVm extends domCore.DomVm implements IReactPickerContainerVm {
        public ReactType = PickerContainerReact;
        public LeftDomVmObj: pickListBaseDomFile.PickListBaseDom.PickListBaseDomVm;
       // public RightNode: React.ReactNode;

        public UniId: string;
        public PickItemList: pickItemDomFile.PickItemDom.PickItemDomVm[] = [];
        public IsSingle: boolean;
        public IsPickSelectHide: boolean;
        public SetSureCustomerObjFun: ISetSureCustomerObj;
        public isRightEmpty: boolean = false;
        private IsRegEvent: boolean = false;

        public regAppEvent() {
            if (!this.IsRegEvent) {
                if (this.UniId) {
                    this.IsRegEvent = true;
                    this.fRegAppEvent();
                }
            }
        }
        private fRegAppEvent()
        {
            this.listenAppEvent("pickerContainerAddItem", this.UniId, (item: IPickItem) => {
              //  alert("增加");
                var _vm: pickItemDomFile.PickItemDom.PickItemDomVm =
                    new pickItemDomFile.PickItemDom.PickItemDomVm({
                        Key: item.Key,
                        Text: item.Text,
                        UniId: this.UniId
                    });
                for (var index = 0; index < this.PickItemList.length;index++)
                {
                    if (this.PickItemList[index].Key == item.Key)
                    {
                        alert("此项已添加！");
                        return;
                    }
                }
                if (this.IsSingle) {
                    this.PickItemList = [_vm];
                    this.PickSure();

                } else {
                    this.PickItemList.push(_vm);
                }
                this.forceUpdate("");
                // this.emitAppEvent("pickerContainerDelItemForce", this.UniId);
            });


            this.listenAppEvent("call-PickDom-SetSelect", this.UniId, () => {
                this.emitAppEvent("PickDom-SetSelect",
                    this.UniId,
                    this.PickItemList.map(
                        (p) => {
                            return p.Key;
                        }));
            });

            this.listenAppEvent("pickerSelect-HideOrShow", this.UniId, (isShow: boolean) => {
                this.IsPickSelectHide = !isShow;
                this.forceUpdate("");
            });

            this.listenAppEvent("pickerContainerDelItem", this.UniId, (k: string) => {
                var _index: number = -1;
                this.PickItemList.forEach((r, i) => {
                    if (r.Key == k) {
                        _index = i;
                    }
                });
                if (_index >= 0) {

                    this.PickItemList.splice(_index, 1);
                    this.PickItemList.forEach((r, i) => {
                        r.toChange();
                    });
                }
                this.forceUpdate("");
                // this.emitAppEvent("pickerContainerDelItemForce", this.UniId);
            })
            this.listenAppEvent("pickerContainerClearItem", this.UniId, () => {
                this.PickItemList = [];
                this.forceUpdate("");
            })
        }

        public constructor(config?: IPickerContainerConfig) {
            super();
            if (config) {
                if (config.LeftDomVmObj) {
                    this.LeftDomVmObj = config.LeftDomVmObj;
                    this.LeftDomVmObj.IsSingle = config.IsSingle;
                }
                if (config.IsSingle) {
                    this.IsSingle = config.IsSingle;
                }
                if (config.IsPickSelectHide)
                {
                    this.IsPickSelectHide = config.IsPickSelectHide;
                }
                if (config.UniId) {
                    this.UniId = config.UniId;
                    if (!this.IsRegEvent) {
                        this.IsRegEvent = true;
                        this.fRegAppEvent();
                    }
                  
                }

                if (config.isRightEmpty)
                {
                    this.isRightEmpty = config.isRightEmpty;
                }
                if (config.PickItemList) {
                    config.PickItemList.forEach((item) => {
                        item.UniId = this.UniId;
                        this.PickItemList.push(new pickItemDomFile.PickItemDom.PickItemDomVm(item));
                    });


                }
            }
        }

        public loadDom(pickItemList: pickItemDomFile.PickItemDom.IPickItemDomConfig[], callback: Function)
        {
            this.PickItemList = [];

            pickItemList.forEach((item) => {
                    item.UniId = this.UniId;
                    this.PickItemList.push(new pickItemDomFile.PickItemDom.PickItemDomVm(item));
            });
            this.IsChange = true;
            //  this.LeftDomVmObj.IsChange = tr
            this.LeftDomVmObj.sysLoadDom(pickItemList, callback);
        }

        protected pSetSureCustomerObj(_items: IPickItem[]): any {

            if (this.SetSureCustomerObjFun) {
                return this.SetSureCustomerObjFun(_items);
            }
        }

        public PickSure() {
            this.emitAppEvent("modal-close", this.UniId);
            var _items: IPickItem[] = this.PickItemList.map((item) => {
                return { Key: item.Key, Text: item.Text };
            });

           // this.LeftDomVmObj = null;
            //  this.PickItemList = [];
            this.emitAppEvent("picker-sure", this.UniId, _items, this.pSetSureCustomerObj(_items));
        }

        public PickCancleSelect(k: string) {

        }

        public PickSelect(k: string) {

        }

    }
    export class PickerContainerStates extends domCore.DomStates {
    }


    export class PickerContainerProps extends domCore.DomProps<IReactPickerContainerVm>{
    }



}


