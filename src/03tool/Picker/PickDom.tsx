import domFile = require("./../../01core/0Dom");
import domCore = domFile.Core;
import utilFile = require("./../../01core/Util");
import iocFile = require("./../../01core/Ioc");
import urlFile = require("./../../01core/Url");
import React = require("react");
import ReactDOM = require("react-dom");
import ModalDomFile = require("./../Modal/ModalDom");
import pickItemDomFile = require("./PickItemDom");
import PickerContainerFile = require("./PickerContainer");

import pickProtalBaseDomFile = require("./PickProtalBaseDom");

export module PickDom {
    export class PickDomAction extends domCore.DomAction {
    }

    export class PickDomReact extends domCore.DomReact<PickDomProps, PickDomStates, PickDomAction> implements domCore.IReact {

        public state = new PickDomStates();

        public pSender(): React.ReactElement<any> {
            return <div className="clearfix"> <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 input-group Hm-input-group ACT-M-PARENT">
                { this._tDom(this.props.Vm.PortalNode) }
                <span className="input-group-addon Hu-pointer"
                    onClick={() => { this.openModal_fun(); }}>
                    <i className="icon-search fa fa-search"></i>
                </span>
                {this._tDom(this.props.Vm.modalObj, { nullNode: <span><i className="icon-spinner icon-spin fa  fa-spinner fa-spin "></i>未能载入弹出框组件</span>}) }
            </div>
                </div>;
        }
        protected pComponentDidMount() {
            super.pComponentDidMount();

        }

        private openModal_fun()
        {
            if (this.props.Vm.modalObj) {
                this.props.Vm.modalObj.open();
            } else {
                alert("没有弹出层组件");
            }
        }

    }

    export interface IReactPickDomVm extends domCore.DomVm {
      //  PickItemList: pickItemDomFile.PickItemDom.PickItemDomVm[];
        modalObj: ModalDomFile.ModalDom.ModalDomVm;
        PortalNode?: pickProtalBaseDomFile.PickProtalBaseDom.PickProtalBaseDomVm;
        IsSingle: boolean;
    }

    export interface IPickDomConfig {
        UniId: string;
        PickItemList?: pickItemDomFile.PickItemDom.IPickItemDomConfig[];
        PickerContainer?: PickerContainerFile.PickerContainer.IPickerContainerConfig;
        PortalNode?: pickProtalBaseDomFile.PickProtalBaseDom.PickProtalBaseDomVm;
        IsSingle?: boolean;
    }

    export class PickDomVm extends domCore.DomVm implements IReactPickDomVm {
        public ReactType = PickDomReact;
        //public PickItemList: pickItemDomFile.PickItemDom.PickItemDomVm[] = [];
        public UniId: string;
        public PickerContainer: PickerContainerFile.PickerContainer.PickerContainerVm;
        public modalObj: ModalDomFile.ModalDom.ModalDomVm;
        protected pRegName: string = "pick";
        public PortalNode: pickProtalBaseDomFile.PickProtalBaseDom.PickProtalBaseDomVm;
        public IsSingle: boolean;

        public constructor(config?: IPickDomConfig) {
            super();
            if (config) {
                if (config.IsSingle) {
                    this.IsSingle = config.IsSingle;
                }
                if (config.UniId) {
                    this.UniId = config.UniId;
                    if (config.PickItemList) {
                        if (!config.PortalNode) {
                            this.PortalNode = new pickProtalBaseDomFile.PickProtalBaseDom.PickProtalBaseDomVm(
                                {
                                    PickItemList: config.PickItemList,
                                    UniId: this.UniId
                                   // Is 
                                });
                        }
                        else {
                            this.PortalNode = config.PortalNode;
                        }
                    }
                    if (config.PickerContainer) {
                        config.PickerContainer.UniId = this.UniId;
                        config.PickerContainer.PickItemList = config.PickItemList;
                        config.PickerContainer.IsSingle = config.IsSingle;
                        this.PickerContainer = new PickerContainerFile.PickerContainer.PickerContainerVm(config.PickerContainer);            
                    }
                }
                this.modalObj = new ModalDomFile.ModalDom.ModalDomVm({
                    Title: "请选择",
                    IsDebug: false,
                    UniId: this.UniId,
                    DomObj: this.PickerContainer,
                    ModalShowingFun: (obj,b) => {
                        if (!obj.DomObj) {
                            // alert("弹出");
                            obj.DomObj = this.PickerContainer;
                            this.PickerContainer.regAppEvent();
                            this.PickerContainer.LeftDomVmObj.regAppEvent();

                        }


                        this.PickerContainer.loadDom(this.PortalNode.PickItemList,b);

                       // b();
                    }

                });


                this.listenAppEvent("PickDom-ModalOpen", this.UniId, () => {
                    if (this.modalObj) {
                        this.modalObj.open();
                    } else {
                        alert("没有弹出层组件");
                    }
                })
               
            }

            //this.listenAppEvent("pickerContainerDelItemForce", this.UniId, () => {
            //    this.forceUpdate("");
            //})
        }
        protected pDispose() {
            super.pDispose();
        }


    }
    export class PickDomStates extends domCore.DomStates {
    }


    export class PickDomProps extends domCore.DomProps<IReactPickDomVm>{
    }



}


