import dataFile = require("./../../03tool/data");
import pageFile = require("./../../03tool/Pagination");

export namespace ExamPackageSelectorData {

    export interface IPackageData {
        FID: string;
        Name: string;  //套餐名
        Desc: string; //套餐描述
        IndividualPrice: string;//套餐个人价格
        GroupPrice: string//套餐团体价格
        IsSelect?: boolean;
    }

    export interface IPackagePagerListData {
        Pager: dataFile.Right.PagerData;
        ListData: Array<IPackageData>;
    }

    export interface IItemData {
        ItemId: string;
        DepartmentName: string;  //科室名
        Name: string; //项目名
        Price: string;//项目价格
        GroupPrice: string// 
        IsSelect?: boolean;
    }

    export interface IItemPagerListData {
        Pager: dataFile.Right.PagerData;
        ListData: Array<IItemData>;
    }

    export interface IPickItem {
        Key: string;
        Text: string;
        IsSelect?: boolean;
    }

    export const PackageSelectorData = { Pager: { TableName: "exam_Package", PageNo: 0, PageSize: 15, TotalCount: 2 }, ListData: [{ FID: "11", Name: "套餐1", GroupPrice: "200", IndividualPrice: "300" }, { FID: "22", Name: "套餐2", GroupPrice: "800", IndividualPrice: "900" }] };
    export const ItemSelectorData = { Pager: { TableName: "exam_Item", PageNo: 0, PageSize: 15, TotalCount: 2 }, ListData: [{ ItemId: "1", Name: "项目1", DepartmentName: "检验科", Price: "300" }, { ItemId: "2", Name: "项目2", DepartmentName: "外科", Price: "300" }] };
    export const PackageItemList = [{ PackageName: "套餐", Name: "项目1", DepartmentName: "检验科", Price: "50" }, { PackageName: "套餐", Name: "项目2", DepartmentName: "外科", Price: "250" }]
    export const SelectItemList = [{ PackageName: "", Name: "项目1", DepartmentName: "检验科", Price: "50" }, { PackageName: "", Name: "项目2", DepartmentName: "外科", Price: "250" }]

}