import domFile = require("./../01core/0Dom");
import iocFile = require("./../01core/Ioc");
import domCore = domFile.Core;
import utilFile = require("./../01core/Util");
import urlFile = require("./../01core/Url");
import React = require("react");
import ReactDOM = require("react-dom");
import buttonFile = require("./../03tool/Button");
import pickLeftDomFile = require("./PickLeftDom/ExamPackagePickListDom");
import PickDomFile = require("./../03tool/Picker/PickDom");
import eventFile = require("./../01core/Event");
import gridFormFile = require("./ItemGridFormDom");
import gridRowFile = require("./ItemGridRowDom");
import data = require("./data");
import pickData = require("./PickLeftDom/data");



export module MainDom {
    export class MainDomAction extends domCore.DomAction {
    }

    export class MainDomReact extends domCore.DomReact<MainDomProps, MainDomStates, MainDomAction> implements domCore.IReact {

        public state = new MainDomStates();

        public pSender(): React.ReactElement<any> {
            var button = this._initBtns();
            return (
                <div>
                    {button}
                    {this.props.Vm.GridFormVm.intoDom()}
                    <div className="Hf-overflow" style={{ height: 1, width: 1 }}>{this.props.Vm.PickDomObj.intoDom()}
                    </div>
                </div>
            )
        }


        public _initBtns(): React.ReactElement<any> {
            return (
                <div className="YSm-table-btngroup">
                    <div className="btn-group btn-group-sm">
                        {this.props.Vm.BtnList.map((btn) => {
                            return this._tDom(btn);
                        })}
                    </div>
                </div>
            )
        }



        protected pComponentDidMount() {
            super.pComponentDidMount();

        }
    }

    export interface IMainDomConfig {
    }

    export interface IPickItemDomConfig {
        Text: string;
        Key: string;

    }

    export interface IReactMainDomVm extends domCore.DomVm {
        GridFormVm: gridFormFile.ItemGridFormDom.ItemGridFormDomVm;
        BtnList: buttonFile.ui.ButtonVm[];
        PickDomObj: PickDomFile.PickDom.PickDomVm
    }

    export class MainDomVm extends domCore.DomVm implements IReactMainDomVm {
        public ReactType = MainDomReact;
        public GridFormVm: gridFormFile.ItemGridFormDom.ItemGridFormDomVm;
        public BtnList = new Array<buttonFile.ui.ButtonVm>();
        public IsItemSelected: boolean = false;
        public IsPackageSelected: boolean = true; //是否选择套餐
        public PickDomObj: PickDomFile.PickDom.PickDomVm;


        public constructor(config?: IMainDomConfig) {
            super();
            this.initBtnList();
            this.GridFormVm = new gridFormFile.ItemGridFormDom.ItemGridFormDomVm();
            this.UniId = eventFile.App.getUniId().toString();

            var _itemList: IPickItemDomConfig[] = [];

            var _LeftDomVmObj = new pickLeftDomFile.ExamPackagePickListDom.ExamPackagePickListDomVm({ UniId: this.UniId });
            this.PickDomObj = new PickDomFile.PickDom.PickDomVm(
                {

                    UniId: this.UniId,
                    PickItemList: _itemList,
                    PickerContainer:
                    {
                        UniId: this.UniId,
                        IsSingle: true,
                        LeftDomVmObj: _LeftDomVmObj,
                        IsPickSelectHide: true,
                        SetSureCustomerObjFun: (items) => {
                            return _LeftDomVmObj.getObjByItems(items);
                        }
                    }
                }
            );

            this.listenAppEvent("ExamPackageItemsDisplay", this.UniId, (item: IPickItemDomConfig) => {
                this.IsPackageSelected = true;
                //后台获取数据，这里使用静态数据
                var _data = pickData.ExamPackageSelectorData.PackageItemList;
                this.GridFormVm.RowList = [];
                _data.forEach((rowData, index) => {
                    var rowConfig = { RowData: rowData };
                    var rowVm = new gridRowFile.ItemGridRowDom.ItemGridRowDomVm(rowConfig);
                    this.GridFormVm.RowList.push(rowVm);
                });
                this.IsItemSelected = true;
                this.GridFormVm.IsChange = true;
                this.forceUpdate("");
            });

            this.listenAppEvent("picker-sure", this.UniId, (items: IPickItemDomConfig[]) => {
                this.IsPackageSelected = false;
                var _list = [];
                items.forEach(a => {
                    _list.push(a.Key);
                });
                //后台获取数据，这里使用静态数据
                var _data = pickData.ExamPackageSelectorData.SelectItemList;
                this.initAddGridForm(_data);
                this.GridFormVm.IsChange = true;
                this.forceUpdate("");
            });
        }

        private initAddGridForm(data: data.ExamOrder.IMemberExamItemData[]) {
            if (data) {
                this.GridFormVm.RowList = [];
                var totalPrice = 0;
                data.forEach((rowData, index) => {
                    var rowConfig = { RowData: rowData };
                    var rowVm = new gridRowFile.ItemGridRowDom.ItemGridRowDomVm(rowConfig);
                    this.GridFormVm.RowList.push(rowVm);
                    totalPrice += parseFloat(rowData.Price);
                });
            }
        }

        private initBtnList() {
            var btnVm = new buttonFile.ui.ButtonVm();
            btnVm.DisplayName = "选择项目";
            btnVm.KindCss = "btn-primary";
            btnVm.NoEnable = false;
            this.BtnList.push(btnVm);
            btnVm.ClickFun = (a) => {
                this.buttonClickCommond(a);
            };
        }

        public buttonClickCommond(obj: buttonFile.ui.ButtonVm) {
            switch (obj.DisplayName) {
                case "选择项目":
                    this.selectOpt();
                    break;
                default:
                    break;
            }
        }

        public selectOpt() {

            this.PickDomObj.modalObj.open();
            this.emitAppEvent("PackageorItemChecked", this.UniId, this.IsPackageSelected);
        }

    }
    export class MainDomStates extends domCore.DomStates { }
    export class MainDomProps extends domCore.DomProps<IReactMainDomVm>{ }



}