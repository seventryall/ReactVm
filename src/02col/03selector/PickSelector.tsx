import domFile = require("./../../01core/0Dom");
import domCore = domFile.Core;
import utilFile = require("./../../01core/Util");
import iocFile = require("./../../01core/Ioc");
import urlFile = require("./../../01core/Url");
import React = require("react");
import ReactDOM = require("react-dom");
import eventFile = require("./../../01core/Event");
import basecolFile = require("./../00core/baseCol");
import BaseColReact = basecolFile.Core.BaseColReact;
import BaseColVm = basecolFile.Core.BaseColVm;
import BaseColProps = basecolFile.Core.BaseColProps;
import BaseColStates = basecolFile.Core.BaseColStates;
import BaseColAction = basecolFile.Core.BaseColAction;
import PickDomFile = require("./../../03tool/Picker/PickDom");

import PickListBaseDomFile = require("./../../03tool/Picker/PickListBaseDom");
import PickProtalBaseDomFile = require("./../../03tool/Picker/PickProtalBaseDom");

export module PickSelector {
    export class PickSelectorAction extends BaseColAction {
    }

    export class PickSelectorReact extends BaseColReact<PickSelectorProps, PickSelectorStates, PickSelectorAction> implements domCore.IReact {

        public state = new PickSelectorStates();

        public pSender(): React.ReactElement<any> {
            return <div>{this._tDom(this.props.Vm.PickDomObj) }</div>;
        }
        protected pComponentDidMount() {
            super.pComponentDidMount();

        }


    }

    export interface IReactPickSelectorVm extends BaseColVm {
        PickDomObj: PickDomFile.PickDom.PickDomVm;
    }

    export interface IPickSelectorConfig {
        UniId?: string;
        PortalNode?: PickProtalBaseDomFile.PickProtalBaseDom.PickProtalBaseDomVm;
        LeftDomVmObj?: PickListBaseDomFile.PickListBaseDom.PickListBaseDomVm;
        PickItemList?: IPickItemDomConfig[];
        IsSingle?: boolean;
    }
    export interface IPickItemDomConfig {
        Text: string;
        Key: string;
    }

    export class PickSelectorVm extends BaseColVm implements IReactPickSelectorVm {
        public ReactType = PickSelectorReact;
        public PickDomObj: PickDomFile.PickDom.PickDomVm;
        protected pRegName: string = "筛选器多选控件";
        protected IsSingle: boolean;

        private init(config?: IPickSelectorConfig, isSingle?: boolean) {
            var _itemList: IPickItemDomConfig[] = [];
            var _PortalNode: PickProtalBaseDomFile.PickProtalBaseDom.PickProtalBaseDomVm = null;
            var _LeftDomVmObj: PickListBaseDomFile.PickListBaseDom.PickListBaseDomVm = null;

            if (config) {
                if (config.UniId) {
                    this.UniId = config.UniId;
                }
                if (config.PickItemList) {
                    _itemList = config.PickItemList;
                }

                if (config.PortalNode) {
                    _PortalNode = config.PortalNode;
                }

                if (config.LeftDomVmObj) {
                    _LeftDomVmObj = config.LeftDomVmObj;
                }
            }

            if (!this.UniId) {
                this.UniId = "筛选器" + (isSingle?"单":"多") + "选控件(" + eventFile.App.getUniId() + ")";
            }
            if (!_LeftDomVmObj) {
                _LeftDomVmObj = new PickListBaseDomFile.PickListBaseDom.PickListBaseDomVm({
                    UniId: this.UniId

                });
            }
            if (!_PortalNode) {
                _PortalNode = new PickProtalBaseDomFile.PickProtalBaseDom.PickProtalBaseDomVm(
                    {
                        UniId: this.UniId,
                        PickItemList: _itemList
                    });
            }
            //   alert(this.IsSingle);
            this.PickDomObj = new PickDomFile.PickDom.PickDomVm(
                {
                    IsSingle: isSingle,
                    UniId: this.UniId,
                    PortalNode: _PortalNode,
                    PickItemList: _itemList,
                    PickerContainer:
                    {
                        UniId: this.UniId,
                        IsSingle: true,
                        LeftDomVmObj: _LeftDomVmObj
                    }
                }
            );

            if (isSingle) {
                this.listenAppEvent("picker-sure", this.UniId, (items: IPickItemDomConfig[]) => {
                    if (items.length > 0) {
                        this.reactDataValueSet(items[0].Key);
                    }
                    else {
                        this.reactDataValueSet("");
                    }
                });
            } else {
                this.listenAppEvent("picker-sure", this.UniId, (items: IPickItemDomConfig[]) => {
                    var _strs = items.map((item) => {
                        return "\"" + item.Key + "\"";
                    }).join(",");
                    this.reactDataValueSet(_strs);
                });
            }
        }

        public constructor(config?: IPickSelectorConfig, isSingle?: boolean ) {
            super();
            //  config.IsSingle = false;
            this.init(config, isSingle);
        }

        public static Test(): PickSelectorVm {
            var _bean: PickSelectorVm = new PickSelectorVm(
                {
                    PickItemList: [
                        { Key: "key1", Text: "文本项1" },
                        { Key: "key22", Text: "文本项22" },
                        { Key: "key13", Text: "文本项13" }
                    ]
                }
            );
           
            return _bean;
        }
        protected pDispose() {
            super.pDispose();
        }
    }
    export class PickSelectorStates extends BaseColStates {
    }


    export class PickSelectorProps extends BaseColProps<IReactPickSelectorVm>{
    }

    iocFile.Core.Ioc.Current().RegisterType("PickSelectorVm", BaseColVm, PickSelectorVm);

}


