import domFile = require("./../../01core/0Dom");
import iocFile = require("./../../01core/Ioc");
import domCore = domFile.Core;
import utilFile = require("./../../01core/Util");
import urlFile = require("./../../01core/Url");
import pagination = require("./../../03tool/Pagination");
import React = require("react");
import ReactDOM = require("react-dom");
import buttonFile = require("./../../03tool/Button");
import singleCheckFile = require("./../../02col/02Mulite/SingleCheckBox");
import dataFile = require("./data");

export module MealGridRowDom {
    export class MealGridRowDomAction extends domCore.DomAction { }
    export class MealGridRowDomReact extends domCore.DomReact<MealGridRowDomProps, MealGridRowDomStates, MealGridRowDomAction> implements domCore.IReact {
        public state = new MealGridRowDomStates();
        public pSender(): React.ReactElement<any> {
            return (
                <tr>
                    <td>{this.createRadioCheck()}</td>
                    <td>{this.props.Vm.RowData.Name}</td>
                    <td>{this.props.Vm.RowData.Desc}</td>
                    <td className="text-right">{this.props.Vm.RowData.IndividualPrice}</td>
                    <td className="text-right">{this.props.Vm.RowData.GroupPrice}</td>

                    <td><a onClick={() => { this.viewClick() } }>查看</a></td>
                </tr>
            )
        }
        public createRadioCheck(): React.ReactElement<any> {
            return <span>
                <i  className=" fa fa-circle-o"
                    onClick={() => { this.trClick_fun(); } }
                    ></i>
            </span>
        }

        private viewClick() {
            this.props.Vm.showAllItems();
        }


        private trClick_fun() {
            this.props.Vm.clickItem();
        }  

        protected pComponentDidMount() {
            super.pComponentDidMount();

        }
    }
    export interface IMealConfig{
        RowData: dataFile.ExamPackageSelectorData.IPackageData;
        UniId: string;
        IsGroup?:boolean;
    }
    export class MealGridRowDomVm extends domCore.DomVm {
        public ReactType = MealGridRowDomReact;
        public SingleCheckboxVm = new singleCheckFile.ui.SingleCheckBoxVm();
        public RowData: dataFile.ExamPackageSelectorData.IPackageData;
        public IsGroup: boolean = false; //是否团体

        public constructor(config?: IMealConfig) {
            super();
            if (config) {
                this.UniId = config.UniId;
                this.RowData = config.RowData;
                if (config.IsGroup)
                {
                    this.IsGroup = config.IsGroup;
                }
            }
        }

        public showAllItems()
        {
            this.emitAppEvent("memberexam-packageselector", this.UniId, this.RowData.FID);
        }

        public clickItem() {

            var item: dataFile.ExamPackageSelectorData.IPickItem =
                {
                    Key: this.RowData.FID,
                    Text: this.RowData.Name,
                    IsSelect: this.RowData.IsSelect

                };
            if (!item.IsSelect) {
                this.RowData.IsSelect = true;
                this.forceUpdate("");
                this.emitAppEvent("pickerContainerAddItem", this.UniId, { Text: item.Text, Key: item.Key });
            } else {
                this.RowData.IsSelect = false;
                this.forceUpdate("");
                this.emitAppEvent("pickerContainerDelItem", this.UniId, item.Key);
            }

            this.emitAppEvent("modal-close", this.UniId);
            this.emitAppEvent("ExamPackageItemsDisplay", this.UniId, item);
        }

    }
    export class MealGridRowDomStates extends domCore.DomStates { }
    export class MealGridRowDomProps extends domCore.DomProps<MealGridRowDomVm>{ }
}