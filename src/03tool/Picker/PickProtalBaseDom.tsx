
import domFile = require("./../../01core/0Dom");
import domCore = domFile.Core;
import utilFile = require("./../../01core/Util");
import iocFile = require("./../../01core/Ioc");
import urlFile = require("./../../01core/Url");
import React = require("react");
import ReactDOM = require("react-dom");

export module PickProtalBaseDom {
    export class PickProtalBaseDomAction extends domCore.DomAction {
    }
    export interface IPickItem {
        Text: string;
        Key: string;
    }
    export class PickProtalBaseDomReact extends domCore.DomReact<PickProtalBaseDomProps, PickProtalBaseDomStates, PickProtalBaseDomAction> implements domCore.IReact {

        public state = new PickProtalBaseDomStates();


        private getInputVal():string 
        {
            var _list: string[] = this.props.Vm.PickItemList.map((m) => { return m.Text });
            return _list.join(",");
        }

        public pSender(): React.ReactElement<any> {
            return <input className="form-control" ref="input" value={this.getInputVal() } readOnly="true"></input>;
        }
        protected pComponentDidMount() {
            super.pComponentDidMount();

        }


    }
   
    export interface IReactPickProtalBaseDomVm extends domCore.DomVm {
      //  TextAreaText: string;
        PickItemList: IPickItem[];
    }

    export interface IPickProtalBaseDomConfig {
        PickItemList?: IPickItem[];
        UniId?: string;
    }

    export class PickProtalBaseDomVm extends domCore.DomVm implements IReactPickProtalBaseDomVm {
        public ReactType = PickProtalBaseDomReact;
      //  public TextAreaText: string;
        public PickItemList: IPickItem[] = [];

        protected pPickerSure(items: IPickItem[]) {
            if (this.pCheckItemEq(items)) {
               //没有更新不需要操作
                this.forceUpdate("");
            } else {
                this.PickItemList = items;
                this.forceUpdate("");
            }
        }
       
        public constructor(config?: IPickProtalBaseDomConfig) {
            super();
            if (config) {
                if (config.PickItemList) {
                    this.PickItemList = config.PickItemList.map((c) => {
                        return { Text: c.Text, Key: c.Key };
                    });
                }
                if (config.UniId) {
                    this.UniId = config.UniId;
                    this.listenAppEvent("picker-sure", this.UniId, (items: IPickItem[]) => {
                        //--------
                        this.pPickerSure(items);

                    })


                }
            }
        }

        protected pCheckItemEq(items: IPickItem[]): boolean {
            var _isCheck = true;
            if (items.length == this.PickItemList.length) {
                for (var i: number = 0; i < items.length; i++) {
                    var it = items[i];
                    if (this.PickItemList.filter((v) => v.Key == it.Key).length > 0) {

                    }
                    else {
                        _isCheck = false;
                        break;
                    }
                }



            } else {
                _isCheck = false;
            }
            return _isCheck;
        }

    }
    export class PickProtalBaseDomStates extends domCore.DomStates {
    }


    export class PickProtalBaseDomProps extends domCore.DomProps<IReactPickProtalBaseDomVm>{
    }
       


}


