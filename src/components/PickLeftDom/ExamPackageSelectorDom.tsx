import domFile = require("./../../01core/0Dom");
import iocFile = require("./../../01core/Ioc");
import domCore = domFile.Core;
import utilFile = require("./../../01core/Util");
import urlFile = require("./../../01core/Url");
import React = require("react");
import ReactDOM = require("react-dom");
import buttonFile = require("./../../03tool/Button");
import singleCheckFile = require("./../../02col/02Mulite/SingleCheckBox");
import singleRadioFile = require("./../../02col/01single/Radio");
import dataFile = require("./data");
import packageFormFile = require("./PackageSelectorFormDom");
import itemFormFile = require("./ItemSelectorFormDom");

export module ExamPackageSelectorDomDom {
    export class ExamPackageSelectorDomAction extends domCore.DomAction { }

    export class ExamPackageSelectorDomReact extends domCore.DomReact<ExamPackageSelectorDomProps, ExamPackageSelectorDomStates, ExamPackageSelectorDomAction> implements domCore.IReact {
        public state = new ExamPackageSelectorDomStates();
        public fun_radioChange(e) {
            var _val = e.target["value"];
            if (_val == "1") {
                this.props.Vm.isRadioSel = true;
            } else if (_val == "2") {
                this.props.Vm.isRadioSel = false;
            }
            this.props.Vm.radioClick();
            this.forceUpdate();
        }

        public pSender(): React.ReactElement<any> {
            return (
                <div className="YSm-modals">
                    <div className="YSm-modal-header clearfix">
                        <div className="pull-left"><div className="radio">
                            <label>
                                <input type="radio" name="type" value="1" onChange={(a) => { this.fun_radioChange(a) }
                                } checked={this.props.Vm.isRadioSel}/>套餐类型</label>
                        </div>
                        </div>
                        <div className="pull-left"><div className="radio">
                            <label><input type="radio" name="type" onChange={(a) => { this.fun_radioChange(a) } } value="2" checked={!this.props.Vm.isRadioSel} />体检项目</label>
                        </div>
                        </div>
                    </div>
                    <div className="YSm-modal-body clearfix">
                        <div className={this.props.Vm.isRadioSel?"":" hide "}>{ this._tDom(this.props.Vm.PackageFormVm, { nullNode: <span>请载入表单</span> }) }</div>
                        <div className={this.props.Vm.isRadioSel? " hide " : ""}>  {this._tDom(this.props.Vm.ItemFormVm) }</div>
                    </div>
                </div>
            )
        }
      
        protected pComponentDidMount() {
            super.pComponentDidMount();
        }
    }

    export interface IExamPackageSelectorDomConfig {
        PackagePagerListData?:dataFile.ExamPackageSelectorData.IPackagePagerListData;
        ItemPagerListData?: dataFile.ExamPackageSelectorData.IItemPagerListData;
        UniId?: string;
        IsGroup?: boolean;
    }

    export class ExamPackageSelectorDomVm extends domCore.DomVm {
        public ReactType = ExamPackageSelectorDomReact;

        public SerachTextVm: string;//检索
        public isRadioSel: boolean=true;
        public CheckBoxList = new Array<singleCheckFile.ui.SingleCheckBoxVm>();  //选择框
        public mealRadio: boolean;
        public projRadio: boolean;
        public tableData: IExamPackageSelectorDomConfig;
        public PackageFormVm: packageFormFile.PackageSelectorFormDom.PackageSelectorFormDomVm;
        public ItemFormVm: itemFormFile.ItemSelectorFormDom.ItemSelectorFormDomVm;


        public constructor(config?: IExamPackageSelectorDomConfig) {
            super();
            if(config)
            {
                this.UniId = config.UniId;
                if (config.PackagePagerListData && config.ItemPagerListData) {
                    this.init(config);
                }
            }
        }

        public radioClick()
        {
            if (this.isRadioSel) {
                this.emitAppEvent("pickerSelect-HideOrShow", this.UniId, false);
            }
            else
            {
                this.emitAppEvent("pickerSelect-HideOrShow", this.UniId, true);

            }

        }

        public init(config?: IExamPackageSelectorDomConfig)
        {
            this.PackageFormVm = new packageFormFile.PackageSelectorFormDom.PackageSelectorFormDomVm(
                {
                    PagerListData: config.PackagePagerListData,
                    UniId: this.UniId,
                    IsGroup: config.IsGroup
                });
            this.ItemFormVm = new itemFormFile.ItemSelectorFormDom.ItemSelectorFormDomVm(
                {
                    PagerListData: config.ItemPagerListData,
                    UniId: this.UniId
                });

        }
 
    }

    export class ExamPackageSelectorDomStates extends domCore.DomStates { }

    export class ExamPackageSelectorDomProps extends domCore.DomProps<ExamPackageSelectorDomVm>{ }
}