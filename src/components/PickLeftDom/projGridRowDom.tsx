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
export module ProjGridRowDom {
    export class ProjGridRowDomAction extends domCore.DomAction { }
    export class ProjGridRowDomReact extends domCore.DomReact<ProjGridRowDomProps, ProjGridRowDomStates, ProjGridRowDomAction> implements domCore.IReact {
        public state = new ProjGridRowDomStates();
        public pSender(): React.ReactElement<any> {
            var row = this.createRow();
            return row;
        }
        public createSingleChecbox(): React.ReactElement<any> {
            return this.props.Vm.SingleCheckboxVm.intoDom();
        }
        private trClick_fun() {
            this.props.Vm.clickItem();
        }

        public createRow(): React.ReactElement<any> {
            return (
                <tr  onClick={() => { this.trClick_fun(); } }>
                    <td>{this.createSingleChecbox() }</td>
                    <td>{this.props.Vm.RowData.DepartmentName}</td>
                    <td>{this.props.Vm.RowData.Name}</td>
                    <td className="text-right">{this.props.Vm.RowData.Price}</td>
                </tr>
                )
        }
    }
    export interface IProjDomConfig {
        RowData: dataFile.ExamPackageSelectorData.IItemData;
        UniId: string;

    }
    export class ProjGridRowDomVm extends domCore.DomVm {
        public ReactType = ProjGridRowDomReact;
        public RowData:dataFile.ExamPackageSelectorData.IItemData;
        public SingleCheckboxVm = new singleCheckFile.ui.SingleCheckBoxVm();

        public constructor(config?: IProjDomConfig) {
            super();
            if (config) {
                this.UniId = config.UniId;
                this.RowData=config.RowData;
            }

            this.listenAppEvent("PickDom-SetSelect", this.UniId, (keys: string[]) => {
                if (keys.indexOf(this.RowData.ItemId) >= 0) {
                    this.RowData.IsSelect = true;
                    this.forceUpdate("");

                }
            });

            this.listenAppEvent("pickerContainerDelItem", this.UniId, (k: string) => {
                var _index: number = -1;

                if (k == this.RowData.ItemId) {
                    this.RowData.IsSelect = false;
                    this.SingleCheckboxVm.dataValueSet("false");
                }
                this.forceUpdate("");
            })
        }


        public clickItem() {

            var item: dataFile.ExamPackageSelectorData.IPickItem =
                {
                    Key: this.RowData.ItemId,
                    Text: this.RowData.Name,
                    IsSelect: this.RowData.IsSelect

                };
            if (!item.IsSelect) {
                this.RowData.IsSelect = true;
                this.SingleCheckboxVm.dataValueSet("true");
                this.forceUpdate("");
                this.emitAppEvent("pickerContainerAddItem", this.UniId, { Text: item.Text, Key: item.Key });
            } else {
                this.RowData.IsSelect = false;
                this.SingleCheckboxVm.dataValueSet("false");
                this.forceUpdate("");
                this.emitAppEvent("pickerContainerDelItem", this.UniId, item.Key);
            }
        }

    }
    export class ProjGridRowDomStates extends domCore.DomStates { }
    export class ProjGridRowDomProps extends domCore.DomProps<ProjGridRowDomVm>{ }
}