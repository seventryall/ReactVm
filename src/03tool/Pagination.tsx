import domFile = require("./../01core/0Dom"); import basecolFile = require("./../02col/00core/baseCol"); import BaseColReact = basecolFile.Core.BaseColReact; import BaseColVm = basecolFile.Core.BaseColVm; import BaseColProps = basecolFile.Core.BaseColProps; import BaseColStates = basecolFile.Core.BaseColStates; import BaseColAction = basecolFile.Core.BaseColAction;
import iocFile = require("./../01core/Ioc");
import utilFile = require("./../01core/Util");
/// <reference path="../../typings/react/react.d.ts" />
/// <reference path="../../typings/react/react-dom.d.ts" />
import React = require("react");
import ReactDOM = require("react-dom");
export module tool {


    export class PaginationReact extends BaseColReact<PaginationProps, PaginationStates, PaginationAction> implements domFile.Core.IReact {

        protected shouldComponentUpdate(nextProps: PaginationProps, nextState: PaginationStates, nextContext: any) {
            //  alert();
            return true;
        }

        private gotoClickFun() {
            if (this.props.Vm.PageClickEvent != null) {
                if (this.fIsPageSizeChange) {
                    this.props.Vm.PageGotoNo = 1;           
                }
                this.props.Vm.PageClickEvent(this.props.Vm.PageGotoNo - 1);
            }
        }
        private gotoTxtChangeFun(e: React.FormEvent) {
            var _val = e.target["value"];
            var _reg = /^[0-9]*[1-9][0-9]*$/gi;

            if (_val && _val != "") {
                if (_reg["test"](_val)) {
                    if (parseInt(_val) <= Math.ceil(this.props.Vm.TotalCount / this.props.Vm.PageSize)) {
                        this.props.Vm.PageGotoNo = parseInt(_val);
                    }
                }
            }
            else {
                this.props.Vm.PageGotoNo = _val;
            }
            this.forceUpdate();
        }


        private fBidaHtml(): React.ReactElement<any> {
            var pagintionView = this.fsetPage();
            var rootUl = <ul  className="pagination pagination-sm bd-pagination" role="menubar" aria-label="Pagination">
                <li className={pagintionView.IsAbleBeforeLink ? "arrow" : "arrow disabled"}
                    aria-disabled="false">
                    <a
                        onClick={(e) => { pagintionView.IsAbleBeforeLink ? this.PageClick(e) : ""; return false; } }
                        data-key={this.props.Vm.PageNo - 1}
                        className={pagintionView.IsAbleBeforeLink ? "Hu-pointer" : ""}
                        >
                        <i className="icon-double-angle-left" data-key={this.props.Vm.PageNo - 1}
                            ></i>
                    </a>
                </li>
                {
                    pagintionView.BeforList.map((a, i) => {
                        return <li key={i} className={a == this.props.Vm.PageNo ? "active" : null }>
                            <a className="Hu-pointer" onClick={(e) => { this.PageClick(e); return false; } } data-key={a}>{a + 1}</a>
                        </li>
                    })
                }
                {pagintionView.IsBefoe ? React.createElement("li", null, "...") : ""}

                {
                    pagintionView.AfterList ? pagintionView.AfterList.map((a, i) => {
                        return <li key={i} className={a == this.props.Vm.PageNo ? "active" : null }>
                            <a className="Hu-pointer" onClick={(e) => { this.PageClick(e); return false; } } data-key={a}>{a + 1}</a>
                        </li>
                    }) : ""
                }

                {  pagintionView.IsAfter ? React.createElement("li", null, "...") : ""}

                {
                    pagintionView.IsLastNumber ?
                        <li>
                            <a onClick={(e) => { this.PageClick(e); return false; } } className="Hu-pointer"  data-key={pagintionView.LastNumber}>{pagintionView.LastNumber + 1}</a>
                        </li> : ""
                }
                <li className={pagintionView.IsAbleAfterList ? "arrow" : "arrow disabled"}>
                    <a onClick={(e) => {
                        if (pagintionView.IsAbleAfterList) { this.PageClick(e); return false; };
                    } }
                        data-key={ this.props.Vm.PageNo + 1}
                        className={pagintionView.IsAbleAfterList ? "Hu-pointer" : ""}
                        >
                        <i className="icon-double-angle-right" data-key={this.props.Vm.PageNo + 1}></i>
                    </a>
                </li>
                <span className="Hu-skip">
                    跳
                    <input type="text" value={this.props.Vm.PageGotoNo}  onChange={(e) => { this.gotoTxtChangeFun(e); } } ></input>
                    /{Math.ceil(this.props.Vm.TotalCount / this.props.Vm.PageSize) }页
                    <a className="GoToPage btn btn-primary acs-pagination-surebtn" onClick={() => { this.gotoClickFun(); } }>跳转</a>
                </span>
                <li>{"总共有" + this.props.Vm.TotalCount + "条记录"}</li>
            </ul>
            return rootUl;
        }

        private fHtml(): React.ReactElement<any> {
            var pagintionView = this.fsetPage();

            var rootUl = <div className="Hc-pagination clearfix">
                <ul  className="pagination pagination-sm pull-left" role="menubar" aria-label="Pagination">
                    <li className={pagintionView.IsAbleBeforeLink ? "arrow" : "arrow disabled"}
                        aria-disabled="false">
                        <a
                            onClick={(e) => { pagintionView.IsAbleBeforeLink ? this.PageClick(e) : ""; return false; } }
                            data-key={this.props.Vm.PageNo - 1}
                            className={pagintionView.IsAbleBeforeLink ? "Hu-pointer" : ""}
                            >
                            <i className="icon-double-angle-left fa fa-angle-double-left" data-key={this.props.Vm.PageNo - 1}
                                ></i>
                        </a>
                    </li>
                    {
                        pagintionView.BeforList.map((a, i) => {
                            return <li  key={i} className={a == this.props.Vm.PageNo ? "active" : null }>
                                <a className="Hu-pointer" onClick={(e) => { this.PageClick(e); return false; } } data-key={a}>{a + 1}</a>
                            </li>
                        })
                    }
                    {pagintionView.IsBefoe ? React.createElement("li", null, "...") : ""}

                    {
                        pagintionView.AfterList ? pagintionView.AfterList.map((a, i) => {
                            return <li key={i} className={a == this.props.Vm.PageNo ? "active" : null }>
                                <a className="Hu-pointer" onClick={(e) => { this.PageClick(e); return false; } } data-key={a}>{a + 1}</a>
                            </li>
                        }) : ""
                    }

                    {  pagintionView.IsAfter ? React.createElement("li", null, "...") : ""}

                    {
                        pagintionView.IsLastNumber ? <li>
                            <a onClick={(e) => { this.PageClick(e); return false; } } className="Hu-pointer"  data-key={pagintionView.LastNumber}>{pagintionView.LastNumber + 1}</a>
                        </li> : ""
                    }
                    <li className={pagintionView.IsAbleAfterList ? "arrow" : "arrow disabled"}>
                        <a onClick={(e) => {
                            if (pagintionView.IsAbleAfterList) { this.PageClick(e); return false; };
                        } }
                            data-key={ this.props.Vm.PageNo + 1}
                            className={pagintionView.IsAbleAfterList ? "Hu-pointer" : ""}
                            >
                            <i className="icon-double-angle-right fa fa-angle-double-right" data-key={this.props.Vm.PageNo + 1}></i>
                        </a>
                    </li>
                    <span className="pull-right">{"共有" + this.props.Vm.TotalCount + "条记录"}</span>
                    {this.props.Vm.isPartHidden ? null : this.partPagination() }
                </ul>
                <div className="Hc-pagination-makeup clearfix">
                    <button className="GoToPage btn btn-xs pull-right" onClick={() => { this.gotoClickFun(); } }>确定</button>
                    {this.props.Vm.IsPageSizeHidden ? null : this.PageSize()}
                </div>
            </div>
            return rootUl;
        }

        public partPagination() {
            return  <div className="Hu-skip pull-right">
                    <input type="text" value={this.props.Vm.PageGotoNo}  onChange={(e) => { this.gotoTxtChangeFun(e); } } ></input>
                    <span>/{ Math.ceil(this.props.Vm.TotalCount / this.props.Vm.PageSize) }页</span></div>
        }
        public PageSize() {
            return <div className="Hu-page-size pull-right">
                <a className="btn btn-xs btn-primary"><i className="icon-list-alt fa fa-list-alt"></i></a>
                <input  type="text" value={this.props.Vm.PageSize} onChange={(e) => { this.pageSizeInputChangeFun(e); return false; } }></input>
            </div>
        }
        private fIsPageSizeChange: boolean = false;
        private pageSizeInputChangeFun(e: React.FormEvent)
        {
            var _val = e.target["value"];
            this.props.Vm.PageSize = _val;
            this.fIsPageSizeChange = true;
            this.forceUpdate();
        }

        public pSender(): React.ReactElement<any> {
         //  if (this.props.Vm.TotalCount > this.props.Vm.PageSize)
            if (1==1)
                return this.props.Vm.IsBidaStyle ? this.fBidaHtml() : this.fHtml();
            else
             return  <div className="Hc-pagination-makeup m-b">
                   <span>{"总共有" + this.props.Vm.TotalCount + "条记录"}</span>
               </div>
        }

        private PageClick(e): void {
            if (this.props.Vm.PageClickEvent != null) {

                var _$li = $(e.target);
                // alert(_$li.html());
                //this.props.Vm.is
                //alert(_$li.attr("data-key"));
                this.props.Vm.PageClickEvent(parseInt(_$li.attr("data-key")));

                this.props.Vm.PageGotoNo = parseInt(_$li.attr("data-key")) + 1;
                this.fIsPageSizeChange = false;
                this.props.Vm.IsChange = true;
            }
        }

        private fsetPage(): PaginationStates {

            var myState = new PaginationStates();
            //给最后一页赋值
            myState.LastNumber = Math.ceil(this.props.Vm.TotalCount / this.props.Vm.PageSize) - 1;
            //当前页面
            var activePage = this.props.Vm.PageNo;
            var PageCount;
            if (Math.ceil(this.props.Vm.TotalCount / this.props.Vm.PageSize) <= 7) {
                for (var i = 0; i < Math.ceil(this.props.Vm.TotalCount / this.props.Vm.PageSize); i++) {
                    //var j = i;
                    myState.BeforList[i] = i; //j + 1;
                }
                myState.IsAfter = false;
                myState.IsBefoe = false;
                myState.IsLastNumber = false;
                if (this.props.Vm.PageNo == Math.ceil(this.props.Vm.TotalCount / this.props.Vm.PageSize) - 1) {
                    myState.IsAbleAfterList = false;
                }

                if (this.props.Vm.PageNo == 0) {
                    myState.IsAbleBeforeLink = false;
                }
            } else if (Math.ceil(this.props.Vm.TotalCount / this.props.Vm.PageSize) == 8 && this.props.Vm.PageNo == 4) {
                for (var i = 0; i < 6; i++) {
                    //var j = i;
                    myState.BeforList[i] = i; //j + 1;
                }
                myState.IsBefoe = false;
                myState.IsAfter = true;
                myState.IsLastNumber = true;
            } else if (activePage < 5) {
                //当前页为第一页时
                if (activePage == 0) {
                    myState.IsAbleBeforeLink = false;
                }
                //当前页面和总页面相等时
                if (activePage == Math.ceil(this.props.Vm.TotalCount / this.props.Vm.PageSize) - 1) {
                    myState.IsAbleAfterList = false;
                }
                //当前页面小于或等于6页时
                if (Math.ceil(this.props.Vm.TotalCount / this.props.Vm.PageSize) <= 7) {
                    PageCount = Math.ceil(this.props.Vm.TotalCount / this.props.Vm.PageSize)
                    myState.IsAfter = false;
                    myState.LastNumber = null;
                    myState.IsLastNumber = false;
                } else {
                    PageCount = 6;
                    myState.IsAfter = true;
                    myState.IsLastNumber = true;
                }
                for (var i = 0; i < PageCount; i++) {
                    //var j = i;
                    myState.BeforList[i] = i; //j + 1;
                }

                //把第二个集合给清空
                myState.AfterList.length = 0;
                //第一个不显示，第二个显示
                myState.IsBefoe = false;

            } else if (activePage >= 5 && activePage <= Math.ceil(this.props.Vm.TotalCount / this.props.Vm.PageSize) - 3) {
                myState.BeforList.length = 0;
                myState.BeforList[0] = 0;
                myState.BeforList[1] = 1;
                //都应该显示
                myState.IsBefoe = true;
                if (Math.ceil(this.props.Vm.TotalCount / this.props.Vm.PageSize) - activePage == 3) {
                    myState.IsAfter = false;
                } else {
                    myState.IsAfter = true;
                }
                myState.IsLastNumber = true;
                var j = 0;
                for (var i = activePage - 1; i <= activePage + 2; i++) {
                    myState.AfterList[j] = i - 1;
                    j = j + 1;
                }
            } else {
                if (activePage == Math.ceil(this.props.Vm.TotalCount / this.props.Vm.PageSize) - 1) {
                    myState.IsAbleAfterList = false;
                }
                myState.BeforList.length = 0;
                myState.BeforList[0] = 0;
                myState.BeforList[1] = 1;
                //第一个显示，第二个不显示
                myState.IsBefoe = true;
                myState.IsAfter = false;
                var j = 0;
                for (var i = Math.ceil(this.props.Vm.TotalCount / this.props.Vm.PageSize) - 3; i <= Math.ceil(this.props.Vm.TotalCount / this.props.Vm.PageSize); i++) {
                    myState.AfterList[j] = i - 1;
                    j = j + 1;
                }
                myState.LastNumber = null;
                myState.IsLastNumber = false;
            }

            return myState;
        }

        public state: PaginationStates = this.getInitialState1();

        public getInitialState1(): PaginationStates {
            //alert("这是初始话的时候");
            return this.fsetPage();
        }
    }

    export interface IPageClickEvent {
        (pageIndex: number): void
    }

    export class PaginationProps extends BaseColProps<PaginationVm> {
        public Vm: PaginationVm = new PaginationVm();

    }
    export interface PaginationVmConfig {
        IsBidaStyle: boolean;
        isPartHidden?: boolean;
        IsPageSizeHidden?: boolean;
    }

    export class PaginationVm extends BaseColVm {
        public PageNo = 3;
        public PageSize = 5;
        public TotalCount = 40;
        public PageClickEvent: IPageClickEvent = null;
        public ReactType = PaginationReact;
        public IsBidaStyle: boolean = false;
        protected pRegName = "分页控件（控件接口待完善）";
        public isPartHidden: boolean = false;
        public PageGotoNo: number = 1;
        public IsPageSizeHidden: boolean = false;

        public constructor(config?: PaginationVmConfig) {
            super();
            if (config) {
                this.IsBidaStyle = config.IsBidaStyle;
                if (config.isPartHidden) {
                    this.isPartHidden = config.isPartHidden;
                }
                if (config.IsPageSizeHidden)
                {
                    this.IsPageSizeHidden = config.IsPageSizeHidden;
                }
            }
        }
        public static Test(): PaginationVm {
            var _bean: PaginationVm = new PaginationVm();
            return _bean;
        }
    }

    export class PaginationStates extends BaseColStates {
        //前页数
        public BeforList: Array<number> = new Array<number>();
        //后页数
        public AfterList: Array<number> = new Array<number>();
        //是否出现第一个...
        public IsBefoe: boolean;
        //是否出现第二个...
        public IsAfter: boolean;
        //上一页的页码
        public BefoePageNum: number;
        //下一页的页面
        public AfterPageNum: number;
        //下一页是否是灰键
        public IsAbleAfterList: boolean = true;
        //上一页是否是灰键
        public IsAbleBeforeLink: boolean = true;
        //最后一页的页码
        public LastNumber: number;
        //最后一页是否显示
        public IsLastNumber: boolean;
    }

    export interface Pagination {
        PageNo: number;
        PageSize: number;
        TotalCount: number;
    }

    export class PaginationAction extends BaseColAction {

    }

    iocFile.Core.Ioc.Current().RegisterType("PaginationVm", BaseColVm, PaginationVm);


} 