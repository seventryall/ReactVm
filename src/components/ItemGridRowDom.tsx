import domFile = require("./../01core/0Dom");
import domCore = domFile.Core;
import utilFile = require("./../01core/Util");
import iocFile = require("./../01core/Ioc");
import urlFile = require("./../01core/Url");
import React = require("react");
import ReactDOM = require("react-dom");
import singleCheckFile = require("./../02col/02Mulite/SingleCheckBox");
import examDataFile = require("./data");

export module ItemGridRowDom {
    export class ItemGridRowDomAction extends domCore.DomAction {
    }

    export class ItemGridRowDomReact extends domCore.DomReact<ItemGridRowDomProps, ItemGridRowDomStates, ItemGridRowDomAction> implements domCore.IReact {

        public state = new ItemGridRowDomStates();

        public pSender(): React.ReactElement<any> {
            var gridRow = this.creatRow();
            return gridRow;
        }

        public creatRow(): React.ReactElement<any> {
            return (
                <tr>
                    <td>{this.props.Vm.RowData.PackageName}</td>
                    <td>{this.props.Vm.RowData.Name}</td>
                    <td>{this.props.Vm.RowData.DepartmentName}</td>
                    <td className="text-right">{this.props.Vm.RowData.Price}</td>
                </tr>
            )
        }
        protected pComponentDidMount() {
            super.pComponentDidMount();

        }
    }

    export interface IItemGridRowDomConfig {
        RowData: examDataFile.ExamOrder.IMemberExamItemData;
    }

    export interface IReactItemGridRowDomVm extends domCore.DomVm {

    }


    export class ItemGridRowDomVm extends domCore.DomVm implements IReactItemGridRowDomVm  {
        public ReactType = ItemGridRowDomReact;
        public SingleCheckboxVm = new singleCheckFile.ui.SingleCheckBoxVm();
        public RowNumber: string;
        public RowData: examDataFile.ExamOrder.IMemberExamItemData;
        public constructor(config?: IItemGridRowDomConfig) {
            super();
            if (config) {
                this.RowData = config.RowData;
            }
        }

    }
    export class ItemGridRowDomStates extends domCore.DomStates { }
    export class ItemGridRowDomProps extends domCore.DomProps<ItemGridRowDomVm>{ }



}