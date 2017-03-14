import dataFile = require("./../03tool/data");
export namespace ExamOrder {

    export interface IMemberReservationData {
        MemberData?: IMemberData;
        ReservationData?: IReservationData;
    
    }

    export interface IMemberData {
        MemberId?: string;
        FileNumber?: string; //档案编号
        UnitId?: string;//单位id
        Name?: string; //单位名称
        Gender?: number;//性别
        BirthDate?: string;//出生日期
        Age?: number;//年龄
        MaritalStatus?: number;//婚姻状况
        Nation?: number;//名族
        NativePlace?: string;//籍贯
        IDCard?: string;//身份证
        WorkUnit?: string;//工作单位
        Job?: number//职务
        JobTitle?: number;//职称
        Phone?: string;//联系电话
        MemberType?: number; //类型
        Address?: string;//单位地址
        PastMedicalHistory?: string; //既往病史
        FamilyMedicalHistory?: string;//家族病史
        ExamCount?: number;//体检次数
        Remark?: string;//备注
        ExamType?: number;// 体检类型
        ExamDate?: string;  // 体检时间
        Exampkg?: string;// 体检套餐
        ExamFee?: string; //体检价格
        ReservationId?: string;
        ItemListData?: IMemberExamItemData[];

    }

    export interface IReservationData {
        ExamType?: number;// 体检类型
        ExamDate?: string;  // 体检时间
        Exampkg?: string;// 体检套餐
        ExamFee?: string; //体检价格
        ReservationId?: string; //预约Id
        ItemListData?: IMemberExamItemData[];
    }



    export interface IMemberExamItemData {
        FID?: string;
        PackageId?: string; //  套餐Id 
        PackageName?: string;//套餐名称
        ItemId?: string;  //体检项目Id
        Name?: string;//项目名称
        DepartmentName?: string; //检查科室
        Price?: string;// 项目价格
        PackagePrice?: string;//套餐价格
        MemberExamItemId?: string;//个人体检项目Id
        ReservationNumber?: string; //预约编号
        ExamNumber?: string; //体检编号
    }

    export interface IExamItemData {
        FID?: string;
        PackageID?: string; //  套餐ID 
        PackageName?: string;//套餐名称
        ItemId?: string;  //体检项目Id
        Name?: string;//项目名称
        DepartmentName?: string; //检查科室
        Price?: string;// 项目价格
        PackagePrice?: string;//套餐价格
    }

    export interface IExamOrderData {
        FID?: string;
        FileNumber?: string; //档案编号
        UnitId?: string;//单位id
        Name?: string; //单位名称
        Gender?: number;//性别
        BirthDate?: string;//出生日期
        Age?: number;//年龄
        MaritalStatus?: number;//婚姻状况
        Nation?: number;//名族
        NativePlace?: string;//籍贯
        IDCard?: string;//身份证
        WorkUnit?: string;//工作单位
        Job?: number//职务
        JobTitle?: number;//职称
        Phone?: string;//联系电话
        MemberType?: number; //类型
        Address?: string;//单位地址
        PastMedicalHistory?: string; //既往病史
        FamilyMedicalHistory?: string;//家族病史
        ExamCount?: number;//体检次数
        Remark?: string;//备注
        ExamType?: number;// 体检类型
        ExamDate?: string;  // 体检时间
        Exampkg?: string;// 体检套餐
        ExamFee?: number;
    }
  
    export interface IMealTypeListData {
        mealID: string;  //套餐ID
        ItemCode: string; //体检项目
        Price: string;//体检价格
    }
    export interface IProjItemListData {
        ItemCode: string;  //体检项目
        DepartmentId: string; //检查科室
        Price: string; //项目价格
    }
  
}