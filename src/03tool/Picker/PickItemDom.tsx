import domFile = require("./../../01core/0Dom");
import domCore = domFile.Core;
import utilFile = require("./../../01core/Util");
import iocFile = require("./../../01core/Ioc");
import urlFile = require("./../../01core/Url");
import React = require("react");
import ReactDOM = require("react-dom");

export module PickItemDom {
    export class PickItemDomAction extends domCore.DomAction {
    }

    export class PickItemDomReact extends domCore.DomReact<PickItemDomProps, PickItemDomStates, PickItemDomAction> implements domCore.IReact {

        public state = new PickItemDomStates();
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
        public pSender(): React.ReactElement<any> {
            return <li className="nav-item Hc-multi-selector  Hz-selected"><a  onClick={() => { this.close_fun(this.props.Vm.Key); } }>{ this._text( this.props.Vm.Text)}<em/><i className="icon-remove fa fa-close"  ></i></a></li>;
        }
        protected pComponentDidMount() {
            super.pComponentDidMount();

        }

        private close_fun(key: string) {
            this.props.Vm.delItem(key);
        }


    }

    export interface IReactPickItemDomVm extends domCore.DomVm {
        Text?: string;
        Key?: string;
        delItem(k: string): void;
    }

    export interface IPickItemDomConfig {
        Text: string;
        Key: string;
        UniId?: string;
        IsSingle?: boolean;
    }

    export class PickItemDomVm extends domCore.DomVm implements IReactPickItemDomVm {
        public ReactType = PickItemDomReact;
        public Text: string;
        public Key: string;
        public UniId: string;
        public IsSingle: boolean;

        public constructor(config?: IPickItemDomConfig) {
            super();
            this.IsMulit = true;
            if (config) {
                if (config.Text) {
                    this.Text = config.Text;
                }
                if (config.Key) {
                    this.Key = config.Key;
                }
                if (config.UniId) {
                    this.UniId = config.UniId;
                }
            }
        }

        public delItem(k: string) {
            this.emitAppEvent("pickerContainerDelItem", this.UniId, k);
        }

    }
    export class PickItemDomStates extends domCore.DomStates {
    }


    export class PickItemDomProps extends domCore.DomProps<IReactPickItemDomVm>{
    }



}


