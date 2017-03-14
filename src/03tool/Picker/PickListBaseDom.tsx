


import domFile = require("./../../01core/0Dom");
import domCore = domFile.Core;
import utilFile = require("./../../01core/Util");
import iocFile = require("./../../01core/Ioc");
import urlFile = require("./../../01core/Url");
import React = require("react");
import ReactDOM = require("react-dom");

export module PickListBaseDom {
    export class PickListBaseDomAction extends domCore.DomAction {
    }

    export class PickListBaseDomReact extends domCore.DomReact<PickListBaseDomProps, PickListBaseDomStates, PickListBaseDomAction> implements domCore.IReact {

        public state = new PickListBaseDomStates();

        private li_clickFun(item: IPickItem)
        {
            this.props.Vm.addItem(item);
        }

       

        public pSender(): React.ReactElement<any> {
            return <div className="Hc-list-item  ">
                <ul className="nav nav-tabs clearfix">
                   {
                        this.props.Vm.PickList.map((item,index) => {
                            return <li key={index} className={"nav-item Hu-pointer Hc-multi-selector pull-left   " + (item.IsSelect ?"Hz-selected":"")}>
                                <a onClick={() => { this.li_clickFun(item) } }>
                                    {item.Text}
                                    {item.IsSelect ? <em/> : null}
                                    {item.IsSelect ? <i className="icon-ok fa fa-check"></i> : null}
                                </a>
                            </li>;
                       
                    })
                   }
                </ul>
            </div>;
        }
        protected pComponentDidMount() {
            super.pComponentDidMount();

        }


    }     

    export interface IReactPickListBaseDomVm extends domCore.DomVm {
        PickList: IPickItem[];
        addItem(item: IPickItem);
    }

    export interface IPickListBaseDomConfig {
        UniId?: string;
        PickList?: IPickItem[];
    }

    export interface IPickItem
    {
        Text: string;
        Key: string;
        IsSelect?: boolean;
       
    }

    export class PickListBaseDomVm extends domCore.DomVm implements IReactPickListBaseDomVm {
        public ReactType :any  = PickListBaseDomReact;
        public PickList: IPickItem[] = [];
        public UniId: string;
        public IsSingle: boolean;
        public SelectPickList: IPickItem[] = [];
        public IsHasEvent: boolean;
        public addSelect(item: IPickItem)
        {
           var _res = this.SelectPickList.filter((a) => {
                return a.Key == item.Key;
            });
           if (_res.length == 0) {
              // alert(window["xxx"].PickItemList);
               this.SelectPickList.push(item);
              // alert(window["xxx"].PickItemList);
              // alert(window["xxx"].PickItemList == this.SelectPickList);
           }
        }

        public regAppEvent() {
            if (!this.IsHasEvent) {
                if (this.UniId) {
                    this.IsHasEvent = true;
                    this.pRegAppEvent();
                }
            }
        }
        protected pRegAppEvent() {
            this.fRegAppEvent();
        }
        protected fRegAppEvent() {
            this.listenAppEvent("PickDom-SetSelect", this.UniId, (keys: string[]) => {
                this.PickList.forEach((i) => {
                    if (keys.indexOf(i.Key) >= 0) {
                        i.IsSelect = true;

                    }
                });
            });

            this.listenAppEvent("pickerContainerDelItem", this.UniId, (k) => {
                var _index: number = -1;
                this.PickList.forEach((r, i) => {
                    if (r.Key == k) {
                        r.IsSelect = false;
                    }
                });
                this.removeSelect(k);
                this.forceUpdate("");
                // this.emitAppEvent("pickerContainerDelItemForce", this.UniId);
            })
        }

        public removeSelect(k:string) {
            var _index: number = -1;
            this.SelectPickList.forEach((r, i) => {
                if (r.Key == k) {
                    _index = i;
                }
            });
            if (_index >= 0) {

                this.SelectPickList.splice(_index, 1);
            }
        }

        public constructor(config?: IPickListBaseDomConfig) {
            super();

            if (config) {
                if (config.UniId) {
                    this.UniId = config.UniId;
                    if (!this.IsHasEvent) {
                        this.IsHasEvent = true;
                        this.fRegAppEvent();
                    }
                }
            }

          

         

        }

        public sysLoadDom(items: IPickItem[], callback: Function) {
            this.loadDom(items, callback);
        }

        protected loadDom(items: IPickItem[], callback: Function)
        {
            this.PickList = [];
            for (var i: number = 0; i < 100; i++) {
                var _item: IPickItem = { Text: "文本项" + i, Key: "key" + i, IsSelect: false };

                if (items.filter((a) => a.Key == _item.Key).length > 0 ) {
                    _item.IsSelect = true;
                }

                this.PickList.push(_item);
            }
            this.IsChange = true;
            callback();
        }

        public addItem(item: IPickItem) {

            if (!item.IsSelect) {   
                item.IsSelect = true;
                this.addSelect({ Text: item.Text, Key: item.Key });
                this.forceUpdate("");   
                this.emitAppEvent("pickerContainerAddItem", this.UniId, { Text: item.Text, Key: item.Key });
                

            } else {
                item.IsSelect = false;
                this.removeSelect(item.Key);
                this.forceUpdate("");
                this.emitAppEvent("pickerContainerDelItem", this.UniId,  item.Key );
            }
            
        }
        protected pDispose() {
            super.pDispose();
        }

    }
    export class PickListBaseDomStates extends domCore.DomStates {
    }


    export class PickListBaseDomProps extends domCore.DomProps<IReactPickListBaseDomVm>{
    }



}


