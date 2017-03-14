


import domFile = require("./../../01core/0Dom");
import domCore = domFile.Core;
import utilFile = require("./../../01core/Util");
import iocFile = require("./../../01core/Ioc");
import urlFile = require("./../../01core/Url");
import React = require("react");
import ReactDOM = require("react-dom");

import basecolFile = require("./../00core/baseCol");
import BaseColReact = basecolFile.Core.BaseColReact;
import BaseColVm = basecolFile.Core.BaseColVm;
import BaseColProps = basecolFile.Core.BaseColProps;
import BaseColStates = basecolFile.Core.BaseColStates;
import BaseColAction = basecolFile.Core.BaseColAction;

import PickSelectorFile = require("./PickSelector");

export module PickSingleSelector {
    export class PickSingleSelectorAction extends BaseColAction {
    }

    export class PickSingleSelectorReact extends BaseColReact<PickSingleSelectorProps, PickSingleSelectorStates, PickSingleSelectorAction> implements domCore.IReact {

        public state = new PickSingleSelectorStates();

        public pSender(): React.ReactElement<any> {
            return <div>{this._tDom(this.props.Vm.PickDomObj) }</div>;
        }
        protected pComponentDidMount() {
            super.pComponentDidMount();

        }


    }

    export interface IReactPickSingleSelectorVm extends PickSelectorFile.PickSelector.IReactPickSelectorVm {

    }

    export interface IPickSingleSelectorConfig extends PickSelectorFile.PickSelector.IPickSelectorConfig {

        RegName?: string;
    }

    export class PickSingleSelectorVm extends PickSelectorFile.PickSelector.PickSelectorVm implements IReactPickSingleSelectorVm {
        public ReactType: any = PickSingleSelectorReact;
        protected IsSingle: boolean = true ;
        protected pRegName: string = "筛选器单选控件";
        public constructor(config?: IPickSingleSelectorConfig) {
            //this.IsSingle = true;
            super(config,true);

        }

        public static Test(): PickSingleSelectorVm {
            var _bean: PickSingleSelectorVm = new PickSingleSelectorVm(
                {
                    PickItemList: [
                        { Key: "key1", Text: "文本项1" }
                    ]
                }
            );

            return _bean;
        }
        protected pDispose() {
            super.pDispose();
        }

    }
    export class PickSingleSelectorStates extends BaseColStates {
    }


    export class PickSingleSelectorProps extends BaseColProps<IReactPickSingleSelectorVm>{
    }

    iocFile.Core.Ioc.Current().RegisterType("PickSingleSelectorVm", BaseColVm, PickSingleSelectorVm);

}


